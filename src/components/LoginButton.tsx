"use client";

import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { PiCheckCircleFill } from "react-icons/pi";

/**
 * 에러일 때 에러 처리를 해줘야 함.
 * 로그아웃은 useSWRMutation로 작성됬는데 로그인도 useSWRMutation로 작성해야함.
 */

export default function GoogleLoginButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      logo_alignment={"center"}
      shape={"rectangular"}
      width={"220px"}
      onSuccess={async (credentialResponse) => {
        await fetch("/api/auth/google", {
          method: "POST",
          body: JSON.stringify({ idToken: credentialResponse.credential }),
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
      onError={() => {
        console.log("Login Failed");
      }}></GoogleLogin>
  );
}
