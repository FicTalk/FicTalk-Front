import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * idToken과 함께 서버쪽으로 회원가입 요청을 보내면 됩니다.
 * 응답으로 token이 발행이 되면 쿠키에 저장을 합니다.
 * KEY는 auth-token 입니다.
 */
export async function POST(req: NextRequest) {
  const { idToken } = await req.json();
  const cookieStore = cookies();

  const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/google", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ idToken: idToken }),
  });

  if (!getData.ok) {
    return NextResponse.json(getData.statusText, { status: getData.status });
  }

  const data = await getData.json();
  cookieStore.set("auth-token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60, // 1 hour in seconds
    path: "/",
  });

  return NextResponse.json(data, { status: getData.status });
}

/**
 * 구글 로그아웃할 때
 */
export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete("auth-token");

  return NextResponse.json("success", { status: 200 });
}
