import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PiCheck } from "react-icons/pi";

/**
 * 알람 해제했을 때, 알람 설정했을 때, 로그인 했을 때, 로그아웃 했을 때
 * 각각의 Sonner을 생성하던지 headless하게 만들어서 재사용하던지 해야함.
 */

export function SonnerDemo() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.success("로그인 완료", {
          description: "환영합니다! 성공적으로 로그인되었습니다.",
          duration: 1500,
          icon: "🎉",
        })
      }>
      Show Toast
    </Button>
  );
}
