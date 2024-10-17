import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    console.log(params.id)
    const cookieStore = cookies()
    const authToken = cookieStore.get('auth-token')

    if (!authToken) {
        console.log('required token')
        return NextResponse.json('required login', { status: 403 })
    }

    const data = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/posts/${params.id}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken?.value}`,
        },
    })

    if (!data.ok) {
        console.log('fail')
        return NextResponse.json('Server Error', { status: 500 })
    }

    console.log('success')

    return NextResponse.json('success', { status: 201 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    console.log(params.id)
    const cookieStore = cookies()
    const authToken = cookieStore.get('auth-token')

    if (!authToken) {
        console.log('required token')
        return NextResponse.json('required login', { status: 403 })
    }

    const data = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/posts/${params.id}/like`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken?.value}`,
        },
    })

    if (!data.ok) {
        console.log('fail')
        return NextResponse.json('Server Error', { status: 500 })
    }

    console.log('success')

    return NextResponse.json('success', { status: 200 })
}
