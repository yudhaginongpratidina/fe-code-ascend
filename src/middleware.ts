import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookie } from './utils/cookie';

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
        const authenticated = await getCookie('authenticated');
        if (authenticated) { return NextResponse.redirect(new URL('/', req.url)); }
    }

    const protectedPaths = [
        '/dashboard',
        '/leaderboard',
        '/my-learning',
        '/my-module',
        '/my-profile',
        '/user-management',
    ];

    const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(`${path}/`));
    if (isProtectedPath) {
        try {
            const authenticated = await getCookie('authenticated');
            if (!authenticated) { return NextResponse.redirect(new URL('/login', req.url)); }
        } catch (error) {
            console.error("Error in middleware:", error);
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    const protected_superadmin_paths = [
        '/user-management',
    ];
    const isProtectedSuperadminPath = protected_superadmin_paths.some(path => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(`${path}/`));
    if (isProtectedSuperadminPath) {
        const role = await getCookie('role');
        if (role !== 'superadmin') { return NextResponse.redirect(new URL('/dashboard', req.url)); }
    }

    return NextResponse.next();
}