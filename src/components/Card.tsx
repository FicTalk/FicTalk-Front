import { getDayInKorean } from "@/lib/strings";
import PlatformBadge from "./PlatformBadge";
import { ReactNode } from "react";
import { Webtoon } from "@/types/webtoon";

export default function Card({ item, button }: { item: Webtoon; button: ReactNode }) {
  return (
    <div key={item.id} className='border rounded'>
      <div className='relative'>
        <img src={item.thumbnailUrl} className='bg-black/30 w-full aspect-[4/5] rounded object-cover' />
        <PlatformBadge platform={item.platform} className='absolute top-0 right-0 m-1' />
      </div>
      <div className='p-2'>
        <div className='flex justify-between'>
          <p className='text-xs font-medium truncate'>{item.title}</p>
          {button}
        </div>
        <div className='mt-2'>
          <p className='text-xs'>{getDayInKorean(item.dayOfWeek)}요일</p>
        </div>
      </div>
    </div>
  );
}
