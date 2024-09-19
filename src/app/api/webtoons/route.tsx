import { NextRequest, NextResponse } from "next/server";
/**
 * 에러처리 해야함 없으면 그냥 빈배열 처리하면 될 듯
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const queries = searchParams.toString();
  const newQueries = queries
    .split("&")
    .map((item) => item.split("=").map((ele) => ele))
    .map((item) => {
      if (item[0] === "page") {
        return parseInt(item[1]) ? ["page", (parseInt(item[1]) - 1).toString()].join("=") : item.join("=");
      }
      return item.join("=");
    })
    .join("&");

  const data = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/webtoons?${newQueries}`);

  return NextResponse.json(await data.json(), { status: 200 });
}
