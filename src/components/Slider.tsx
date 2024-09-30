"use client";

import { Webtoon } from "@/types/webtoon";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import PlatformBadge from "./platformBadge";
import { getDayInKorean } from "@/lib/strings";
import Card from "./card";

export default function Slider({ datas }: { datas: Webtoon[] }) {
	return (
		<Carousel
			opts={{ loop: true, align: "start" }}
			plugins={[
				Autoplay({
					delay: 1500,
					stopOnInteraction: false,
					stopOnMouseEnter: true,
				}),
			]}
		>
			<CarouselContent>
				{datas.map((item: Webtoon) => (
					<CarouselItem className="basis-1/3" key={item.id}>
						<Card item={item} className="border-none" />
						{/* <div className="relative aspect-[3/4]">
							<Link href={item.link}>
								<img src={item.thumbnailUrl} alt={item.title} className="object-cover w-full h-full" />
							</Link>
							<PlatformBadge className="absolute top-0 right-0 text-xs p-0 px-0.5 m-2" platform={item.platform} />
						</div>
						<div className="p-1.5">
							<p className="text-xs font-semibold truncate leading-relaxed">{item.title}</p>
							<p className="text-xs font-semibold truncate">{getDayInKorean(item.dayOfWeek)}요일</p>
						</div> */}

						{/* <img src={item.thumbnailUrl} className='border rounded asppect object-cover' /> */}
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
