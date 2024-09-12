"use client";

import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { CheckIcon } from "@radix-ui/react-icons";

/**
 * 에러일 때 에러 처리를 해줘야 함.
 * 로그아웃은 useSWRMutation로 작성됬는데 로그인도 useSWRMutation로 작성해야함.
 */

export default function GoogleLoginButton() {
  const router = useRouter();
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        await fetch("/api/auth/google", {
          method: "POST",
          body: JSON.stringify({ idToken: credentialResponse.credential }),
        }).then(() => {
          toast.success("로그인 완료", {
            description: "환영합니다! 성공적으로 로그인되었습니다.",
            duration: 1500,
            icon: (
              <div className='h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center'>
                <CheckIcon className='h-4 w-4 text-white' />
              </div>
            ),
          });
          router.push("/");
          router.refresh();
        });
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
    />
  );
}
