import useSWR from "swr";

const fetcher = (url: string) => fetch(url, { next: { revalidate: 60 * 10 } }).then((res) => res.json());

export function useItems(queries: string) {
  const { data, error, isLoading } = useSWR(`/api/webtoons?${queries}`, fetcher);

  return { data, error, isLoading };
}
