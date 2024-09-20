"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Title({ children }: { children: string }) {
  const router = useRouter();
  return (
    <div className='flex gap-2 items-center mb-2'>
      <button onClick={() => router.back()}>
        <ChevronLeft className='text-2xl' />
      </button>
      <h2 className='font-black text-black/80 text-2xl'>{children}</h2>
    </div>
  );
}
