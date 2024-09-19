import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { idToken, nickname } = await req.json();
  const cookieStore = cookies();
  const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/kakao", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ idToken, nickname }),
  });

  if (!getData.ok) {
    return NextResponse.json(getData.statusText, { status: getData.status });
  }

  const { token } = await getData.json();

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60, // 1 hour in seconds
    path: "/",
  });

  return NextResponse.json("success", { status: getData.status });
}
