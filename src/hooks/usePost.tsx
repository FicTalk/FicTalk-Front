/**
 * 1. getPost
 * 2. getPosts
 * 3. createPost
 * 4. putPost
 * 5. deletePost
 */

import { CreatePost, PutPost } from "@/types/Posts";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**GET */
const fetching = async (url: string) => await fetch(url, { cache: "no-cache" }).then((res) => res.json());

/**POST */
const postFetching = async (url: string, data: CreatePost) => {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
/**PUT */
const putFetching = async (url: string, data: PutPost) => {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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

export function useGetPost(id: string) {
  return useSWR(`/api/post/${id}`, fetching);
}
export function useGetPosts(url: string) {
  return useSWR(url, fetching);
}
export function useCreatePost(id: number, data: CreatePost) {
  return useSWRMutation(`/api/post`, (key) => postFetching(key, data));
}
export function usePutPost(id: number, data: PutPost) {
  return useSWRMutation(`/api/post/${id}`, (key) => putFetching(key, data));
}
export function useDeletePost(id: string) {
  return useSWRMutation(`/api/post/${id}`, deleteFetching);
}
