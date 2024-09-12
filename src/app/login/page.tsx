"use client";

import GoogleLoginButton from "@/components/LoginButton";
import { useRouter } from "next/navigation";

/**
 * 디자인 해야함
 */

export default function Login() {
  const router = useRouter();
  return (
    <div>
      <h2>로그인</h2>
      <GoogleLoginButton />
      <button>카카오 로그인</button>
    </div>
  );
}
