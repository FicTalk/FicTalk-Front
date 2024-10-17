import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(params: NextRequest) {
    const data = await params.json()
    const cookieStore = cookies()
    const authToken = cookieStore.get('auth-token')

    await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/posts?boardId=1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken?.value}`,
        },
        body: JSON.stringify(data),
    })

    return NextResponse.json('success', { status: 201 })
}
