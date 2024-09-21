"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "제목을 입력해주세요" }),
  contentType: z.enum(["GENERAL", "WEBTOON"]),
  content: z.string().trim().min(1, { message: "내용을 입력해주세요" }),
});

type FormData = z.infer<typeof formSchema>;

/**GET */
const fetching = async (url: string) => await fetch(url, { cache: "no-cache" }).then((res) => res.json());

/**POST */
const postFetching = async (url: string, { arg }: { arg: { post: FormData } }) => {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.post),
  }).then((res) => res.json());
};
/**PUT */
const putFetching = async (url: string, { arg }: { arg: { post: FormData } }) => {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.post),
  }).then((res) => res.json());
};

/**DELETE */
const deleteFetching = async (url: string) => {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export function useGetPost() {
  const { id } = useParams();
  return useSWR(`/api/post/${id}`, fetching);
}
export function useGetPosts(url: string) {
  return useSWR(url, fetching);
}
export function useCreatePost() {
  return useSWRMutation(`/api/post`, postFetching);
}
export function usePutPost() {
  const { id } = useParams();
  return useSWRMutation(id ? `/api/post/${id}` : null, putFetching);
}
export function useDeletePost() {
  const { id } = useParams();
  return useSWRMutation(`/api/post/${id}`, deleteFetching);
}
