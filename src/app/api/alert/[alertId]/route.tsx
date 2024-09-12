/**
 * alertId가 필요한 작업들
 */

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const webtoonId = await req.json();

  const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");

  const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/alarms/${webtoonId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken?.value}`,
    },
  });

  if (!getData.ok) {
    return NextResponse.json(getData.statusText, { status: getData.status });
  }

  return NextResponse.json("succses", { status: 200 });
}
