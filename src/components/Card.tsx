import { getDayInKorean } from "@/lib/strings";
import PlatformBadge from "./platformBadge";
import { ReactNode } from "react";
import { Webtoon } from "@/types/webtoon";
import { cn } from "@/lib/utils";

export default function Card({ item, button, className }: { item: Webtoon; button?: ReactNode; className?: string }) {
	return (
		<div key={item.id} className={cn("border rounded", className)}>
			<div className="relative">
				<img src={item.thumbnailUrl} className="bg-black/30 w-full aspect-[4/5] rounded object-cover" />
				<PlatformBadge platform={item.platform} className="absolute top-0 right-0 m-1" />
			</div>
			<div className="flex flex-col gap-0.5 p-2">
				<div className="flex justify-between">
					<p className="text-xs font-bold truncate">{item.title}</p>
					{button ? button : null}
				</div>
				<div>
					<p className="text-xs font-medium">{getDayInKorean(item.dayOfWeek)}요일</p>
				</div>
			</div>
		</div>
	);
}
