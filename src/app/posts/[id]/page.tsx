import BackForward from "@/components/BackForward";
import { getMe, getPost } from "@/lib/helper";
import { Post } from "@/types/Posts";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { PiHeartFill, PiUser } from "react-icons/pi";
import { DeleteBtn } from "./client-conponent";

/**
 * 1. 버튼을 눌렀을 때 /posts/:id/update로 리다이렉션
 * 2.
 */

const ReDirectionBtn = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/posts/${id}/edit`}
      className='transition h-fit bg-black/50 text-white/50 hover:bg-black hover:text-white rounded px-2 py-1 text-sm'>
      수정
    </Link>
  );
};

const isMyPost = async (email: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");
  if (!token) return false;

  const { name } = await getMe(token.value);
  return email === name ? true : false;
};

export default async function PostDetail({ params }: { params: { id: string } }) {
  const post: Post = await getPost(params.id);
  const isAuthor = await isMyPost(post.username);
  const times = dayjs().diff(post.createdAt, "days");
  return (
    <main className='pt-3 flex flex-col flex-1'>
      <div className='border-b'>
        {post.tag ? <p className='text-xs text-black/50 font-medium px-2'>{post.tag}</p> : null}
        <div className='flex gap-2 items-center pl-2'>
          <BackForward />
          <p className='text-base font-medium'>{post.title}</p>
        </div>
        <div className='flex justify-between px-2'>
          <div className='flex gap-2 items-center'>
            <div className='bg-black/30 rounded-full w-fit p-0.5'>
              <PiUser className='text-white' />
            </div>
            <p className='text-xs font-medium'>{post.username}</p>
            <p className='p-2 text-xs text-black/50 font-medium'>{times}일 전</p>
          </div>
          {isAuthor ? (
            <div className='flex gap-2'>
              <ReDirectionBtn id={params.id} />
              <DeleteBtn id={params.id} />
            </div>
          ) : null}
        </div>
      </div>
      <div className='p-2 flex-1'>
        {post && (
          <div
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              minHeight: "300px",
            }}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        )}
      </div>
      <div className='p-2 flex gap-0.5 items-center'>
        <PiHeartFill className='text-black/30' /> <p className='text-sm text-black/50'>0</p>
      </div>
      <div className='sticky flex gap-2 p-2 border items-center bottom-0 w-full bg-white max-w-[600px]'>
        <div className='bg-black/30 rounded-full w-fit h-fit p-0.5'>
          <PiUser className='text-white text-xl' />
        </div>
        <div className='flex-1'>
          <input disabled placeholder='준비중인 기능입니다...' className='text-sm' />
        </div>
        <button disabled className='bg-black/50 text-white rounded text-sm p-1 px-2'>
          제출
        </button>
      </div>
    </main>
  );
}
