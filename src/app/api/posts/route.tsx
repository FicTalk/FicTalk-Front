import { NextRequest, NextResponse } from 'next/server'

export async function GET(params: NextRequest) {
    const searchParams = params.nextUrl.searchParams

    const newParams = searchParams.toString()
        ? searchParams
              .toString()
              .split('&')
              .map((item) => item.split('=').map((ele) => ele))
              .map((item) => {
                  if (item[0] === 'page') {
                      return parseInt(item[1]) ? ['page', (parseInt(item[1]) - 1).toString()].join('=') : item.join('=')
                  }
                  return item.join('=')
              })
              .join('&')
        : 'page=0'
    const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/posts?boardId=1&' + newParams, {
        cache: 'no-cache',
    })

    const data = await getData.json()
    return NextResponse.json(data, { status: 200 })
}
