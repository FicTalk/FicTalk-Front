import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Container({ children, className }: { children: ReactNode; className?: string }) {
	return <main className={cn(`p-3 flex flex-col flex-1 gap-1 pb-[80px]`, className)}>{children}</main>;
}
