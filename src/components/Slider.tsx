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
            <img src={item.thumbnailUrl} className='border rounded aspect-[3/4] object-cover' />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
