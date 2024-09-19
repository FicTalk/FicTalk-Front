"use client";

import GoogleLoginButton from "@/components/LoginButton";
import { useRouter } from "next/navigation";
import { PiCheckCircleFill } from "react-icons/pi";
import KakaoLogin from "react-kakao-login";
import { toast } from "sonner";
/**
 * 디자인 해야함 v
 * 카카오 로그인 해야함
 */

const Kakao = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.96052 3C5.83983 3 2.5 5.59377 2.5 8.79351C2.5 10.783 3.79233 12.537 5.75942 13.5807L4.9313 16.6204C4.85835 16.8882 5.1634 17.1029 5.39883 16.9479L9.02712 14.5398C9.33301 14.5704 9.64386 14.587 9.96052 14.587C14.0812 14.587 17.421 11.9932 17.421 8.79351C17.421 5.59377 14.0812 3 9.96052 3Z'
        fill='black'></path>
    </svg>
  );
};

export default function Login() {
  const router = useRouter();
  return (
    <main className='flex-1 bg-white max-w-[600px] overflow-hidden' style={{ alignContent: "center" }}>
      <div className='transform -translate-y-1/2'>
        <p className='text-center text-4xl text-black font-bold'>TOONS.</p>
        <p className='text-center text-black/50'>툰즈에 오신 것을 환영합니다👏</p>
        <div className='mt-5 flex flex-col gap-2'>
          <div className='mx-auto'>
            <GoogleLoginButton />
          </div>
          <KakaoLogin
            style={{
              padding: "2px 10px",
            }}
            token={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string}
            onSuccess={async (res) => {
              const idToken = (res.response as never as { ["id_token"]: string }).id_token;
              const nickname = res.profile!.properties.nickname;

              await fetch("/api/auth/kakao", {
                method: "POST",
                body: JSON.stringify({ idToken, nickname }),
              }).then(() => {
                toast.message("로그인이 되었습니다.", {
                  duration: 1500,
                  icon: <PiCheckCircleFill className='text-xl text-white' />,
                  style: {
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: 0,
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  },
                });

                router.push("/");
                router.refresh();
              });
            }}
            onFail={console.error}
            onLogout={console.info}
            render={({ onClick }) => {
              return (
                <button
                  onClick={onClick}
                  className='min-w-[220px] mx-auto flex gap-2 justify-center rounded py-2 items-center'
                  style={{ backgroundColor: "rgb(254, 229, 0)" }}>
                  <Kakao />
                  <p className='font-semibold'>카카오 로그인</p>
                </button>
              );
            }}>
            카카오로 로그인하기
          </KakaoLogin>
        </div>
      </div>
    </main>
  );
}
