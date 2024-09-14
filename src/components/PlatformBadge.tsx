import { cn } from "@/lib/utils";

export default function PlatformBadge({ platform, className }: { platform: string; className?: string }) {
  return (
    <p
      className={cn(
        `text-white text-xs px-1 py-0.5 rounded w-fit ${
          platform === "KAKAO" ? "bg-yellow-500" : platform === "NAVER" ? "bg-green-500" : "bg-blue-500"
        }`,
        className
      )}>
      {platform}
    </p>
  );
}
