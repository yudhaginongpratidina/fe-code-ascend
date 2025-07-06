import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookie } from './utils/cookie';

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    
    // Redirect root ke home
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    // Konfigurasi path yang dilindungi
    const protectedPaths = [
        '/dashboard',
        '/leaderboard',
        '/my-learning',
        '/my-module',
        '/my-profile',
        '/user-management',
    ];

    const adminPaths = [
        '/my-module',
    ];

    const superAdminPaths = [
        '/user-management',
    ];

    const publicPaths = ['/login', '/register'];

    // Helper function untuk mengecek apakah path cocok
    const isPathMatching = (paths: string[], currentPath: string) => {
        return paths.some(path => 
            currentPath === path || currentPath.startsWith(`${path}/`)
        );
    };

    try {
        // Cek jika user sudah login pada halaman public
        if (publicPaths.includes(pathname)) {
            const authenticated = await getCookie('authenticated');
            if (authenticated) {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }
            return NextResponse.next();
        }

        // Cek authentication untuk protected paths
        if (isPathMatching(protectedPaths, pathname)) {
            const authenticated = await getCookie('authenticated');
            
            if (!authenticated) {
                return NextResponse.redirect(new URL('/login', req.url));
            }

            // Cek role untuk super admin paths
            if (isPathMatching(superAdminPaths, pathname)) {
                const role = await getCookie('role');
                if (role !== 'superadmin') {
                    return NextResponse.redirect(new URL('/dashboard', req.url));
                }
            }
            // Cek role untuk admin paths (tapi bukan super admin paths)
            else if (isPathMatching(adminPaths, pathname)) {
                const role = await getCookie('role');
                if (role !== 'admin' && role !== 'superadmin') {
                    return NextResponse.redirect(new URL('/dashboard', req.url));
                }
            }
        }

        return NextResponse.next();
        
    } catch (error) {
        console.error("Error in middleware:", error);
        // Redirect ke login jika terjadi error
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}