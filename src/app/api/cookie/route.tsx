/**
 * 로그인이 된 유저인지 아닌지 판별합니다.
 */

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    const cookieStore = cookies()
    const getCookie = cookieStore.get('auth-token')

    if (!getCookie) {
        return NextResponse.json(false, { status: 200 })
    }

    return NextResponse.json(true, { status: 200 })
}
