import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookieAuthenticated } from './utils/cookie-authenticated';
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
    // ------------------------------------------------------------------
    // Check if user visits the root page and redirect to /home
    // ------------------------------------------------------------------
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    // Redirect authenticated users away from /auth
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
        const token = await getCookieAuthenticated();
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // Define protected paths
    const protectedPaths = [
        '/leaderboard',
        '/dashboard',
        '/my-profile',
        '/my-learning',
        '/my-module',
        '/user-management'
    ];

    // Check if the current path is protected or starts with one of the protected paths
    const isProtectedPath = protectedPaths.some(path =>
        request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
    );

    if (isProtectedPath) {
        try {
            const token = await getCookieAuthenticated();

            if (!token) {
                return NextResponse.redirect(new URL('/login', request.url));
            }

            // Optional: Verify refresh token if needed
            const refresh_token = request.cookies.get('refresh_token')?.value;
            if (refresh_token) {
                try {
                    const decoded: any = jwtDecode(refresh_token);

                    // cek apakah user punya akses askes ke my module
                    if (request.nextUrl.pathname === '/my-module' || request.nextUrl.pathname.startsWith('/my-module/')) {
                        if (decoded.role !== 'superadmin' && decoded.role !== 'admin' && decoded.role !== 'contributor') {
                            return NextResponse.redirect(new URL('/dashboard', request.url));
                        }
                    }

                    // cek apakah user punya akses kes user management
                    if (request.nextUrl.pathname === '/user-management') {
                        if (decoded.role !== 'superadmin') {
                            return NextResponse.redirect(new URL('/dashboard', request.url));
                        }
                    }

                    // Check if token is expired
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decoded.exp && decoded.exp < currentTime) {
                        // Token expired, redirect to auth
                        return NextResponse.redirect(new URL('/login', request.url));
                    }
                } catch (error) {
                    console.error("Error decoding refresh token:", error);
                    // If there's an error decoding the token, redirect to auth
                    return NextResponse.redirect(new URL('/login', request.url));
                }
            }
        } catch (error) {
            console.error("Error in middleware:", error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

// Define config for matcher
export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/dashboard/:path*',
        '/my-profile/:path*',
        '/my-learning/:path*',
        '/my-module/:path*',
        '/user-management/:path*'
    ],
};