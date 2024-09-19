/**
 * 체크리스트 -------------------------
 * Authorization
 * 1. 유저가 로그인 상태인지 아닌지 체크 // 다른 곳에서도 쓰일 수 있어서 customHook으로? // SSR OR CSR
 * 1-1. 글쓰기 버튼을 누를 때 CSR
 * 2. 해당 게시글이 유저의 게시글인지 체크 CSR
 * 2-1. 업데이트, 삭제 버튼을 달아주기 위함 CSR
 *
 * POST // CSR
 * 1. 요청 시 query로 boardId=1이 같이 넘어가야 함
 * 2. page query로 페이지를 구분
 *
 * Pagination // CSR
 * 1. 1페이지에 해당하는 API를 받아온후 useMemo로 페이지 총 갯수 저장.
 * 2. useMemo로 저장한 값을 paginate로 넘겨서 pagination을 그려줌.
 */

"use client";

import useSWR from "swr";
import dayjs from "dayjs";
import Link from "next/link";
import Paginate from "@/components/Paginate";
import { usePageTotal } from "@/store/posts";
import { usePagination } from "@/hooks/usePagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { toast } from "sonner";
import { PiWarningCircleFill, PiX } from "react-icons/pi";
import useSWRMutation from "swr/mutation";
import React from "react";
import { useDeletePost, useGetPost, useGetPosts } from "@/hooks/usePost";

const toastStyles = {
  base: {
    color: "white",
    border: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  success: { backgroundColor: "#3b82f6" },
  warning: { backgroundColor: "#f59e0b" },
  error: { backgroundColor: "#ef4444" },
};

/**
 * fetching
 */
const fetching = async (url) => await fetch(url).then((res) => res.json());

const isAuth = () => {
  return useSWR("/api/cookie", fetching);
};

/**
 * Btn
 */
const CreatePostBtn = ({ auth }: { auth: boolean }) => {
  const router = useRouter();
  const handleAlertToggle = useCallback(() => {
    if (!auth) {
      return toast.message("로그인이 필요한 서비스입니다.", {
        duration: 1500,
        icon: <PiWarningCircleFill className='text-2xl text-white rounded-full' />,
        style: { ...toastStyles.base, ...toastStyles.error },
      });
    }

    router.push("/posts/create");
  }, [auth]);

  return (
    <div className='text-end max-w-[600px] w-full fixed bottom-0 p-3 leading-none'>
      <button className='ml-auto rounded-full bg-black w-10 h-10 text-white' onClick={() => handleAlertToggle()}>
        <IoCreateOutline className='mx-auto text-xl' />
      </button>
    </div>
  );
};

/**
 * Pagination
 */

function Page() {
  const { total } = usePageTotal();

  const { currentPage, paginationRange, createPageUrl, isFirstPage, isLastPage } = usePagination({
    totalPages: total,
    maxVisiblePages: 5,
  });

  return (
    <>
      <Paginate
        currentPage={currentPage}
        paginationRange={paginationRange}
        createPageUrl={createPageUrl}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  );
}

function PostList({ auth }: { auth: boolean }) {
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useGetPosts(`/api/posts?${searchParams.toString()}`);
  const { change } = usePageTotal();

  useEffect(() => {
    if (isLoading) return;
    change(data?.totalPages ?? 0);
  }, [data]);

  if (isLoading) return <></>;
  if (error) return <></>;

  return (
    <div className='flex flex-col gap-2'>
      {data.content.map((item) => (
        <div key={item.id} className='flex items-center'>
          <Link href={"/posts/" + item.id} className='w-full'>
            <div className='flex flex-col gap-2 border-b p-2'>
              <div className='flex gap-2'>
                <p className='font-medium text-black text-sm'>{item.title}</p>
              </div>
              {item.tag ? <p>{item.tag}</p> : null}
              <div>
                <p className='text-xs text-black/50'>{item.username}</p>
                <p className='text-xs text-black/50'>{dayjs(item.createdAt).format("YYYY-MM-DD")}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function Posts() {
  const { data: auth, isLoading, error } = isAuth();

  if (isLoading) return <></>;
  if (error) return <></>;
  return (
    <>
      <PostList auth={auth} />
      <Page />
      {/* <CreatePostBtn auth={auth} /> */}
    </>
  );
}
