"use client";

import AlertWebtoons from "@/components/AlertWebtoons";
import SubscribeBtn from "@/components/SubscribeBtn";
import { InputForm } from "@/components/VerifyBtn";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { PiEyesFill } from "react-icons/pi";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const DisableText = ({ children }: { children: ReactNode }) => {
  return <p className='text-xs text-black/50'>{children}</p>;
};

const Text = ({ children }: { children: ReactNode }) => {
  return <p className='text-sm text-black'>{children}</p>;
};

const Error = () => {
  return <>error?</>;
};

/**
 * 이메일 인증 구현하야함. v
 */

const fetching = async (url: string) => await fetch(url).then((res) => res.json());

export default function Profile() {
  const { data, isLoading, error } = useSWR("/api/profile", fetching);

  if (isLoading) return <p>loading...</p>;
  if (error) return <Error />;

  return (
    <main className='flex-1 py-3 flex flex-col gap-5'>
      <div className='relative m-3 p-2 border rounded-lg'>
        <h3 className='absolute bg-white text-sm px-2 top-0 left-0 transform -translate-y-1/2'>내 정보</h3>
        <div className='mt-5 flex flex-col gap-3'>
          <div>
            <DisableText>성명</DisableText>
            <Text>{data.name}</Text>
          </div>
          <div>
            <DisableText>이메일</DisableText>
            {data.verifiedEmail ? <Text>{data?.verifiedEmail}</Text> : <InputForm />}
          </div>
          <div>
            <DisableText>제공자</DisableText>
            <Text>{data.provider}</Text>
          </div>
          <div>
            <DisableText>알람</DisableText>
            <SubscribeBtn isSubscribe={data.subscribe} />
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
    </main>
  );
}
