import SideMenuToggleBtn from '@components/btn/sideMenuToggleBtn'
import Card from '@components/Card'

import Slider from '@components/Slider'
import Title from '@components/Title'
import Container from '@components/Container'

import { Webtoon } from '@dto/webtoon'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { HotPost } from '@dto/Posts'

const fetching = async (url: string) => await fetch(url, { next: { revalidate: 60 * 60 } }).then((res) => res.json())

const List = ({ data }: { data: HotPost[] }) => {
    return data.map((item, i) => (
        <div key={item.id} className="flex gap-1 items-center">
            {/* <div className="bg-black/30 rounded-full p-1.5">
				<PiUser className="text-white" />
			</div> */}
            <p className="font-light text-sm bg-black/80 text-white w-5 h-5 rounded text-center">{i + 1}</p>
            <Link key={item.id} href={`/posts/${item.id}`} className="px-2 py-2 rounded">
                <p className="font-base text-xs">{item.title} &#40;0&#41;</p>
            </Link>
            {/* <div className="flex items-center gap-2">
				<p className="text-black/70 flex items-center gap-0.5 text-xs font-medium">
					<HiOutlineHandThumbUp />
					{item.likeCount}
				</p>
				<p className="text-black/70 flex items-center gap-0.5 text-xs font-medium">
					<HiOutlineChatBubbleLeftEllipsis />
					{item.likeCount}
				</p>
			</div> */}
        </div>
    ))
}

export default async function Home() {
    const datas = await fetching(process.env.NEXT_PUBLIC_API_URL + '/api/home')
    return (
        <Container>
            <Title button={<SideMenuToggleBtn showText={false} className="text-black/80" />}>TOONS.</Title>
            <div className="flex flex-col gap-5">
                <section className="mx-2 bg-white rounded">
                    <div className="flex items-center">
                        <h3 className="font-medium text-base py-1.5">추천 게시글</h3>
                        <Link href="/posts" className="text-black/80">
                            <ChevronRight />
                        </Link>
                    </div>
                    <div className="rounded flex flex-col">
                        <List data={datas.hotPosts} />
                    </div>
                </section>
                <section className="mx-2 bg-white">
                    <h3 className="font-medium text-base py-1.5">완결 예정인 웹툰</h3>
                    <Slider datas={datas.completedWebtoons} />
                </section>
                <section className="mx-2 bg-white rounded">
                    <h3 className="font-medium text-base py-1.5">알람 등록 순위</h3>
                    <div className="grid grid-cols-3">
                        {datas.topAlarmWebtoons.map((item: Webtoon) => (
                            <Link
                                target="_blank"
                                href={item.link}
                                key={item.id}
                                className="basis-1/3 rounded overflow-hidden p-0.5"
                            >
                                {/* <img src={item.thumbnailUrl} className="aspect-[3/4] w-full object-cover rounded" /> */}
                                <Card item={item} className="border-none" />
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </Container>
    )
}
