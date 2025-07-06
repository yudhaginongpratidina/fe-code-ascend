import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
    [key: string]: any;
}

interface RefreshTokenResponse {
    message: string;
    token: string;
}

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

const burl = process.env.NEXT_PUBLIC_API_BACKEND_URL;

// Buat instance axios utama
const api: AxiosInstance = axios.create({
    baseURL: burl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

// Buat instance axios terpisah untuk refresh token (tanpa interceptors)
const refreshApi: AxiosInstance = axios.create({
    baseURL: burl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

let isRefreshing: boolean = false;
let refreshSubscribers: Array<(token: string | null) => void> = [];

const subscribeTokenRefresh = (cb: (token: string | null) => void): void => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token: string | null): void => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

const performLogout = async (): Promise<void> => {
    try {
        console.log("Performing logout...");
        await refreshApi.get('/auth/logout');
        console.log("Logout successful");
    } catch (error: any) {
        console.error("Logout request failed:", error);
    } finally {
        // Clear semua data auth
        secureLocalStorage.removeItem("token");
        secureLocalStorage.clear();
        if (typeof window !== 'undefined') {
            window.location.href = "/login";
        }
    }
};

const refreshToken = async (): Promise<string | null> => {
    try {
        console.log("Attempting to refresh token...");
        
        const response = await refreshApi.get<RefreshTokenResponse>('/auth/token');
        
        if (response.data && response.data.token) {
            const newToken = response.data.token;
            secureLocalStorage.setItem("token", newToken);
            console.log("Token refreshed successfully");
            return newToken;
        } else {
            throw new Error("No token received from refresh endpoint");
        }
    } catch (error: any) {
        console.error("Failed to refresh token:", error);
        
        // Lakukan logout ke backend dan cleanup
        await performLogout();
        
        return null;
    }
};

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const bufferTime = 60; // 60 detik buffer sebelum expired
        
        return decoded.exp <= (currentTime + bufferTime);
    } catch (error) {
        console.error("Error decoding token:", error);
        return true;
    }
};

const getValidToken = async (): Promise<string | null> => {
    const storedToken = secureLocalStorage.getItem("token");
    
    if (!storedToken || typeof storedToken !== 'string') {
        return null;
    }
    
    // Cek apakah token expired
    if (isTokenExpired(storedToken)) {
        console.log("Token expired, attempting refresh...");
        
        if (isRefreshing) {
            // Tunggu refresh yang sedang berlangsung
            return new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    resolve(token);
                });
            });
        } else {
            // Lakukan refresh
            isRefreshing = true;
            const newToken = await refreshToken();
            isRefreshing = false;
            onRefreshed(newToken);
            return newToken;
        }
    }
    
    return storedToken;
};

// Request interceptor
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        try {
            const token = await getValidToken();
            
            if (token && config.headers) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error in request interceptor:", error);
        }
        
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error: any) => {
        const originalRequest: ExtendedAxiosRequestConfig = error.config;
        
        if (!originalRequest) {
            return Promise.reject(error);
        }
        
        // Jika error 401 dan belum pernah retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                if (isRefreshing) {
                    // Tunggu refresh yang sedang berlangsung
                    const newToken = await new Promise<string | null>((resolve) => {
                        subscribeTokenRefresh(resolve);
                        
                        // Timeout setelah 10 detik
                        setTimeout(() => {
                            resolve(null);
                        }, 10000);
                    });
                    
                    if (newToken && originalRequest.headers) {
                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        return api(originalRequest);
                    }
                } else {
                    // Lakukan refresh
                    isRefreshing = true;
                    const newToken = await refreshToken();
                    isRefreshing = false;
                    onRefreshed(newToken);
                    
                    if (newToken && originalRequest.headers) {
                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                console.error("Error during token refresh in response interceptor:", refreshError);
                isRefreshing = false;
                onRefreshed(null);
                
                // Lakukan logout dan cleanup
                await performLogout();
            }
        }
        
        return Promise.reject(error);
    }
);

// Utility functions untuk manual token management
export const logout = async (): Promise<void> => {
    await performLogout();
};

export const clearAuthData = (): void => {
    secureLocalStorage.removeItem("token");
    secureLocalStorage.clear();
};

export const setAuthToken = (token: string): void => {
    secureLocalStorage.setItem("token", token);
};

export const getAuthToken = (): string | null => {
    const token = secureLocalStorage.getItem("token");
    return typeof token === 'string' ? token : null;
};

export const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    return token !== null && !isTokenExpired(token);
};

export default api;