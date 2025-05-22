import { setStorageAuthenticated, removeStorageAuthenticated, getStorageAuthenticated } from "./secure-storage-authenticated";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";

// Interface untuk JWT token yang didecode
interface DecodedToken {
    exp: number;
    [key: string]: any;
}

// Interface untuk response dari endpoint refresh token
interface RefreshTokenResponse {
    data: {
        token: string;
    }
}

// Extended AxiosRequestConfig dengan property retry
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

const burl = process.env.NEXT_PUBLIC_API_BACKEND_URL;

// Buat instance axios dengan konfigurasi yang benar
const api: AxiosInstance = axios.create({
    baseURL: burl,
    withCredentials: true, // Ini memungkinkan pengiriman cookies dengan request
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // Membantu beberapa server untuk mengenali request AJAX
    }
});

let isRefreshing: boolean = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Fungsi untuk mendaftarkan callback yang akan dipanggil setelah token di-refresh
const subscribeTokenRefresh = (cb: (token: string) => void): void => {
    refreshSubscribers.push(cb);
};

// Fungsi untuk memanggil semua callback dengan token baru
const onRefreshed = (token: string): void => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

// Fungsi untuk refresh token
const refreshToken = async (): Promise<string | null> => {
    try {
        isRefreshing = true;
        // Gunakan endpoint /auth/token untuk refresh token
        const response = await axios.get<RefreshTokenResponse>(`${burl}/auth/token`, {
            withCredentials: true // Penting untuk menyertakan cookies
        });

        // Ekstrak token dari response.data.data
        const token = response.data.data.token;

        if (!token) {
            throw new Error("No token received from refresh endpoint");
        }

        await setStorageAuthenticated(token);
        onRefreshed(token);
        return token;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        await removeStorageAuthenticated();
        secureLocalStorage.clear();
        // Periksa apakah kode berjalan di browser sebelum mengakses window
        if (typeof window !== 'undefined') {
            window.location.href = "/login"; // Redirect jika gagal refresh
        }
        return null;
    } finally {
        isRefreshing = false;
    }
};

// Fungsi untuk memeriksa apakah token sudah expired
const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        // Tambahkan buffer 10 detik untuk menghindari masalah timing
        return decoded.exp < (Date.now() / 1000) - 10;
    } catch (error) {
        return true; // Jika error saat decode, anggap token expired
    }
};

// Interceptor untuk menangani request
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const storedToken = await getStorageAuthenticated();
        let token: string | null = null;

        // Pastikan token adalah string
        if (typeof storedToken === 'string') {
            token = storedToken;

            // Cek apakah token sudah expired
            if (isTokenExpired(token)) {
                // Jika belum ada proses refresh yang berjalan, lakukan refresh
                if (!isRefreshing) {
                    token = await refreshToken();
                } else {
                    // Jika sedang refresh, tunggu sampai selesai
                    token = await new Promise<string>((resolve) => {
                        subscribeTokenRefresh(resolve);
                    });
                }
            }

            // Set Authorization header dengan token yang valid
            if (token && config.headers) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk menangani response error
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: any) => {
        if (!error.config) {
            return Promise.reject(error);
        }

        const originalRequest: ExtendedAxiosRequestConfig = error.config;

        // Jika error 401 (Unauthorized) dan belum mencoba retry
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Jika tidak sedang refresh, lakukan refresh token
            if (!isRefreshing) {
                try {
                    const newToken = await refreshToken();
                    if (newToken && originalRequest.headers) {
                        // Update header untuk request original
                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        // Ulangi request asli dengan token baru
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    console.error("Error during token refresh:", refreshError);
                    await removeStorageAuthenticated();
                    secureLocalStorage.clear();
                    if (typeof window !== 'undefined') {
                        window.location.href = "/login";
                    }
                    return Promise.reject(refreshError);
                }
            } else {
                // Jika sedang refresh, tunggu sampai selesai
                try {
                    const newToken = await new Promise<string>((resolve, reject) => {
                        subscribeTokenRefresh(resolve);
                        // Tambahkan timeout untuk menghindari hanging request
                        setTimeout(() => reject(new Error("Token refresh timeout")), 10000);
                    });

                    if (originalRequest.headers) {
                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    }
                    return api(originalRequest);
                } catch (waitError) {
                    console.error("Error waiting for token refresh:", waitError);
                    return Promise.reject(waitError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;