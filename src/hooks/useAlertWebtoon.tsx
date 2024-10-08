import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * 알람 요청 중인 웹툰들 가져오는 것, 삭제하는 것, 생성하는 것 합칠려했는데
 * 각각 다른 hook으로 나눠야 함
 */

async function getUser(url: string) {
  const getData = await fetch(url, {
    method: "GET",
  });

  if (!getData.ok) return [];

  return getData.json();
}

async function updateUser(url: string, { arg }: { arg: { webtoonId: number } }) {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg.webtoonId),
  });
}

async function deleteUser(url: string, { arg }: { arg: { webtoonId: number } }) {
  await fetch(url + `/${arg.webtoonId}`, {
    method: "DELETE",
    body: JSON.stringify(arg.webtoonId),
  });
}

function useTrigger() {
  const { isLoading, data, error } = useSWR("/api/cookie", getUser);

  if (isLoading) return false;
  if (error) return false;

  return data;
}

function useAlertWebtoons() {
  const t = useTrigger();
  return useSWR(t ? "/api/alert" : null, getUser);
}

function useDeleteAlertWebtoon() {
  return useSWRMutation(`/api/alert`, deleteUser);
}

function useCreateAlertWebtoon() {
  return useSWRMutation("/api/alert", updateUser);
}

export { useAlertWebtoons, useDeleteAlertWebtoon, useCreateAlertWebtoon };
