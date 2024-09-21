"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { PiHeartFill, PiUser } from "react-icons/pi";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { Edit, Trash2 } from "lucide-react";
import { useDeletePost, useGetPost } from "@/hooks/usePost";
import { useUserInfo } from "@/hooks/useUserInfo";
import DOMPurify from "dompurify";

const EditBtn = ({ id, post }: { id: string; post: { username: string } }) => {
  const { data, isLoading, error } = useUserInfo();

  if (isLoading) return <></>;
  if (error) return <></>;
  return data.name === post.username ? (
    <Link
      href={`/posts/${id}/edit`}
      className='transition h-fit bg-white text-black/80 hover:text-emerald-500 rounded p-1 text-sm'>
      <Edit />
    </Link>
  ) : null;
};

const DeleteBtn = ({ post }: { post: { username: string } }) => {
  const { trigger, isMutating } = useDeletePost();
  const { data, isLoading, error } = useUserInfo();
  if (isLoading) return <></>;
  if (error) return <></>;

  return data.name === post.username ? (
    <button
      onClick={() => trigger()}
      disabled={isMutating}
      className='h-fit text-black/80 p-1 hover:text-red-500 rounded text-sm'>
      <Trash2 />
    </button>
  ) : null;
};

export default function PostDetail({ params }: { params: { id: string } }) {
  const { data: post, isLoading, error } = useGetPost();

  if (isLoading) return <></>;
  if (error) return <></>;
  const times = dayjs().diff(post.createdAt, "days");
  return (
    <Container>
      <div className='border-b'>
        {post.tag ? <p className='text-xs text-black/50 font-medium px-2'>{post.tag}</p> : null}
        <div className='flex justify-between'>
          <Title>BOARD</Title>
          <div className='flex gap-2'>
            <EditBtn id={params.id} post={post} />
            <DeleteBtn post={post} />
          </div>
        </div>
        <p className='text-sm pl-2 font-bold mt-5'>{post.title}</p>
        <div className='flex justify-between px-2'>
          <div className='flex gap-2 items-center'>
            <div className='bg-black/30 rounded-full w-fit p-0.5'>
              <PiUser className='text-white' />
            </div>
            <p className='text-xs font-medium'>{post.username}</p>
            <p className='p-2 text-xs text-black/50 font-medium'>{times}일 전</p>
          </div>
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
              __html: DOMPurify.sanitize(post.content),
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
    </Container>
  );
}
