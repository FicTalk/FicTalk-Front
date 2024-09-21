import useSWR from "swr";

const fetching = async (url: string) => await fetch(url, { next: { revalidate: 60 } }).then((res) => res.json());

export function useUserInfo() {
  return useSWR("/api/profile", fetching);
}
