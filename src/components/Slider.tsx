"use client";

import { Webtoon } from "@/types/webtoon";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Slider({ datas }: { datas: Webtoon[] }) {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 1500,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}>
      <CarouselContent>
        {datas.map((item: Webtoon) => (
          <CarouselItem className='basis-1/3' key={item.id}>
            <div className='relative aspect-[3/4] rounded overflow-hidden'>
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className='absolute top-0 left-0 w-full h-full object-cover'
              />
            </div>
            {/* <img src={item.thumbnailUrl} className='border rounded asppect object-cover' /> */}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
