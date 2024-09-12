"use client";

import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

async function logout() {
  const response = await fetch("/api/auth/google", { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

export default function LogoutButton() {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation("/api/auth/google", logout);

  const onClick = async () => {
    try {
      await trigger().then(() => {
        googleLogout();
        router.push("/");
        router.refresh();
      });
    } catch (error) {
      console.error("Logout error:", error);
      // 여기에 에러 처리 로직을 추가할 수 있습니다.
    }
  };
  return (
    <button
      onClick={onClick}
      disabled={isMutating}
      className={`w-fit text-xs text-white/50
      ${isMutating ? "text-white cursor-not-allowed" : "hover:text-white"}`}>
      {isMutating ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
