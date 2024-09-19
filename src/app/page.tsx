import Slider from "@/components/Slider";
import { HotPost } from "@/types/Posts";
import { Webtoon } from "@/types/webtoon";
import { HiOutlineChatBubbleLeftEllipsis, HiOutlineHandThumbUp } from "react-icons/hi2";

const fetching = async (url: string) => await fetch(url, { next: { revalidate: 0 } }).then((res) => res.json());

export default async function Home() {
  const datas = await fetching(process.env.NEXT_PUBLIC_API_URL + "/api/home");
  return (
    <main className='flex-1 flex flex-col gap-5 bg-black/5 py-2'>
      <section className='mx-2 bg-white rounded'>
        <h3 className='font-bold text-base py-2'>🔥완결 예정인 웹툰이예요</h3>
        <Slider datas={datas.completedWebtoons} />
      </section>
      <section className='mx-2 bg-white rounded'>
        <h3 className='font-bold text-base py-2'>👍추천 수가 많은 게시글이예요</h3>
        <div className='rounded'>
          {datas.hotPosts.map((item: HotPost) => (
            <div className='flex flex-col gap-1 px-2 border-b py-2 first:border-t last:border-none' key={item.id}>
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
            </div>
          ))}
        </div>
      </section>
      <section className='mx-2 bg-white rounded'>
        <h3 className='font-bold text-base py-2'>⏰알람이 많이 등록된 웹툰이예요</h3>
        <div className='flex flex-wrap'>
          {datas.topAlarmWebtoons.map((item: Webtoon) => (
            <div key={item.id} className='basis-1/2 rounded overflow-hidden border p-2'>
              <img src={item.thumbnailUrl} className='aspect-[3/4] w-full object-cover rounded' />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
