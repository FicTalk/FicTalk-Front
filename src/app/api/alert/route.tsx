/**
 * alertId가 필요하지 않은 작업들
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");

  if (!authToken) {
    return NextResponse.json([], { status: 403 });
  }

  const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/alarms", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken?.value}`,
    },
  });

  if (!getData.ok) {
    return NextResponse.json(getData.statusText, { status: getData.status });
  }

  return NextResponse.json(await getData.json(), { status: 200 });
}

export async function POST(req: NextRequest) {
  const webtoonId = await req.json();
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");
  const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/alarms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken?.value}`,
    },
    body: JSON.stringify({ webtoonId }),
  });

  if (!getData.ok) {
    return NextResponse.json(getData.statusText, { status: getData.status });
  }

  return NextResponse.json("succses", { status: 200 });
}
