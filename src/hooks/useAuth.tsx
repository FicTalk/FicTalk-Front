/**
 * 쿠키 유무 확인
 */

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const fetching = async (url: string) =>
  await fetch(url, { next: { revalidate: 0 } })
    .then((res) => res.json())
    .catch(() => {
      throw new Error("403");
    });

export function useCookie() {
  return useSWR("/api/cookie", fetching);
}

export function useRevalidationCookie() {
  return useSWRMutation("/api/cookie", fetching);
}
