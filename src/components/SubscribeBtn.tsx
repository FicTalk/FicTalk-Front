import { useEffect } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

const toastStyles = {
  base: {
    color: "white",
    border: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  success: { backgroundColor: "#3b82f6" },
  warning: { backgroundColor: "#f59e0b" },
  error: { backgroundColor: "#ef4444" },
};

const fetching = async (url: string) => await fetch(url, { method: "POST" }).then((res) => res.json());
export default function SubscribeBtn({ isSubscribe }: { isSubscribe: boolean }) {
  const { data, trigger, isMutating } = useSWRMutation("/api/members/subscribe", () =>
    fetching(isSubscribe ? "/api/members/unSubscribe" : "/api/members/subscribe")
  );

  const onClick = async () => {
    await trigger()
      .then(() => {
        toast.success(`알람이 성공적으로 ${isSubscribe ? "꺼졌습니다." : "켜졌습니다."}`, {
          duration: 2500,
          style: { ...toastStyles.base, ...toastStyles.success },
        });
      })
      .catch(() => {
        toast.error("요청에 실패하였습니다.", {
          duration: 2500,
          style: { ...toastStyles.base, ...toastStyles.error },
        });
      });
  };

  return (
    <button onClick={onClick} disabled={isMutating}>
      {data === undefined ? (isSubscribe ? "알람 끄기" : "알람 켜기") : data ? "알람 끄기" : "알람 켜기"}
    </button>
  );
}
