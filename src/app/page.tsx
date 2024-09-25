import Slider from "@/components/Slider";
import { HotPost } from "@/types/Posts";
import { Webtoon } from "@/types/webtoon";
import Link from "next/link";
import { HiOutlineChatBubbleLeftEllipsis, HiOutlineHandThumbUp } from "react-icons/hi2";

const fetching = async (url: string) => await fetch(url, { next: { revalidate: 60*60 } }).then((res) => res.json());

const List = ({data} : {data: HotPost[]}) => {
  return data.map(item =>
    <Link key={item.id} href={`/posts/${item.id}`} className='flex flex-col gap-1 px-2 border-b py-2 first:border-t last:border-none' >
    <div className='flex items-center gap-2'>
      <p className='text-black/70 flex items-center gap-0.5 text-xs font-medium'>
        <HiOutlineHandThumbUp />
        {item.likeCount}
      </p>
      <p className='text-black/70 flex items-center gap-0.5 text-xs font-medium'>
        <HiOutlineChatBubbleLeftEllipsis />
        {item.likeCount}
      </p>
    </div>
    <p className='font-medium text-sm'>{item.title}</p>
  </Link>
  )
}

export default async function Home() {
  const datas = await fetching(process.env.NEXT_PUBLIC_API_URL + "/api/home");
  return (
    <main className='flex-1 flex flex-col gap-3 bg-black/5 py-2 pb-[80px]'>
      <h2 className='font-black text-black/80 text-2xl px-2'>TOONS.</h2>
      <section className='mx-2 bg-white rounded overflow-hidden'>
        <h3 className='font-bold text-base p-2'>완결 예정</h3>
        <Slider datas={datas.completedWebtoons} />
      </section>
      <section className='mx-2 bg-white rounded'>
        <h3 className='font-bold text-base p-2'>추천 게시글</h3>
        <div className='rounded'>
          <List data={datas.hotPosts} />
        </div>
      </section>
      <section className='mx-2 bg-white rounded'>
        <h3 className='font-bold text-base p-2'>알람 등록 순위</h3>
        <div className='flex flex-wrap'>
          {datas.topAlarmWebtoons.map((item: Webtoon) => (
            <Link target="_blank" href={item.link} key={item.id} className='basis-1/3 rounded overflow-hidden border p-2'>
              <img src={item.thumbnailUrl} className='aspect-[3/4] w-full object-cover rounded' />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
