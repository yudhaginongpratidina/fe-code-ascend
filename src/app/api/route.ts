import { NextResponse } from 'next/server';
import { getCookieAuthenticated } from '@/utils/cookie-authenticated';

export async function GET() {
    const token = await getCookieAuthenticated();
    return NextResponse.json({ authenticated: token?.value === 'true' });
}