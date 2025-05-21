import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // ------------------------------------------------------------------
    // Check if user visits the root page and redirect to /home
    // ------------------------------------------------------------------
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url));
    }
}