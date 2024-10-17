import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { email } = await req.json()
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/members/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({ email }),
    })

    return NextResponse.json('success', { status: 200 })
}
