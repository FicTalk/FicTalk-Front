import AlertWebtoons from "@/components/AlertWebtoons";
import LogoutButton from "@/components/LogoutButton";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ReactNode } from "react";
import { PiEyesFill } from "react-icons/pi";

const DisableText = ({ children }: { children: ReactNode }) => {
  return <p className='text-xs text-black/50'>{children}</p>;
};

const Text = ({ children }: { children: ReactNode }) => {
  return <p className='text-sm text-black'>{children}</p>;
};

const getData = async (token: string | undefined) => {
  const getData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!getData.ok) {
    return NextResponse.json(getData.statusText, { status: getData.status });
  }

  const data = await getData.json();

  return NextResponse.json(data, { status: 200 });
};

/**
 * 이메일 인증 구현하야함.
 */

export default async function Profile() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");

  if (!authToken) return <p>잘못된 접근입니다.</p>;

  const data = await (await getData(authToken?.value)).json();
  return (
    <div className='py-3 flex flex-col gap-5'>
      <div className='relative m-3 p-2 border rounded-lg'>
        <h3 className='absolute bg-white text-sm px-2 top-0 left-0 transform -translate-y-1/2'>내 정보</h3>
        <div className='mt-5 flex flex-col gap-3'>
          <div>
            <DisableText>성명</DisableText>
            <Text>{data.name}</Text>
          </div>
          <div>
            <DisableText>이메일</DisableText>
            <Text>{data?.verifiedEmail}</Text>
          </div>
          <div>
            <DisableText>제공자</DisableText>
            <Text>{data.provider}</Text>
          </div>
        </div>
      </div>
      <div className='relative m-3 border rounded-lg'>
        <h3 className='absolute bg-white text-sm px-2 top-0 left-0 transform -translate-y-1/2'>알림 등록된 웹툰</h3>
        <ul className='flex flex-col mt-1'>
          <AlertWebtoons />
        </ul>
      </div>
      <div className='relative m-3 p-2 border rounded-lg'>
        <h3 className='absolute bg-white text-sm px-2 top-0 left-0 transform -translate-y-1/2'>알림 등록된 소설</h3>
        <div style={{ alignContent: "center" }} className='p-10 text-center'>
          <PiEyesFill className='text-black/50 text-xl mx-auto' />
          <DisableText>준비중입니다...</DisableText>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
