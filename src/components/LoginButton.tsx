"use client";

import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { PiCheckCircleFill } from "react-icons/pi";
import { useUser } from "@/hooks/useUserInfo";

/**
 * 에러일 때 에러 처리를 해줘야 함.
 * 로그아웃은 useSWRMutation로 작성됬는데 로그인도 useSWRMutation로 작성해야함.
 *
 * 유저 정보가 필요한 페이지마다 서버에 유저 정보를 요청하면 비효율적인 것 같음.
 *
 * 로그인이 성공하면 zustand에 유저 정보를 저장하고, 로그아웃 시 zustand에 저장된 유저 정보를 삭제한다
 * cookie가 유효시간이 60분인데 cookie가 없을 때 로그인이 필요한 요청을 했을 시 zustand에 저장된
 * 유저정보를 삭제하고 다시 로그인화면으로 리다이렉션을 해준다.
 *
 * zustand에 저장 시 새로고침을 하면 유저정보가 삭제될텐데 persist을 이용해서 해보자
 */

export default function GoogleLoginButton() {
  const router = useRouter();
  const setUser = useUser((state) => state.setUserInfo);
  return (
    <GoogleLogin
      logo_alignment={"center"}
      shape={"rectangular"}
      width={"220px"}
      onSuccess={async (credentialResponse) => {
        await fetch("/api/auth/google", {
          method: "POST",
          body: JSON.stringify({ idToken: credentialResponse.credential }),
        }).then(async (res) => {
          await fetch("/api/profile").then(async (user) => setUser(await user.json()));
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
      onError={() => {
        console.log("Login Failed");
      }}></GoogleLogin>
  );
}
