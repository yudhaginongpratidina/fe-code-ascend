"use server"

import { cookies } from 'next/headers'

const setCookieAuthenticated = async (token: boolean) => {
    const cookieStore = cookies()
    ;(await cookieStore).set('authenticated', token.toString(), { 
        httpOnly: true, // ⛔ Tidak bisa diakses via client-side JS
        secure: true,   // ✅ Hanya dikirim lewat HTTPS
        sameSite: 'strict', // ✅ Tambahan untuk keamanan CSRF
        path: '/', // ✅ Berlaku untuk semua path
        maxAge: 60 * 60 * 24 // opsional, contoh: 1 hari
    })
}

const getCookieAuthenticated = async () => {
    const cookieStore = cookies()
    return (await cookieStore).get('authenticated')
}

const removeCookieAuthenticated = async () => {
    const cookieStore = cookies()
    ;(await cookieStore).delete('authenticated')
}

export { setCookieAuthenticated, getCookieAuthenticated, removeCookieAuthenticated }