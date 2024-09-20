/**
 * 로그인이 된 유저인지 아닌지 판별합니다.
 * CSR인 컴포넌트에서 사용합니다.
 */

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const getCookie = cookieStore.get("auth-token");

  if (!getCookie) {
    return NextResponse.json(false, { status: 403 });
  }

  return NextResponse.json(true, { status: 200 });
}
