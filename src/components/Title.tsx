"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Title({ children, button }: { children: string; button?: ReactNode }) {
	const router = useRouter();
	return (
		<div className="flex gap-2 items-center mb-2">
			{button ? (
				button
			) : (
				<button onClick={() => router.back()}>
					<ChevronLeft className="text-2xl" />
				</button>
			)}
			<h2 className="font-black text-black/80 text-2xl">{children}</h2>
		</div>
	);
}
