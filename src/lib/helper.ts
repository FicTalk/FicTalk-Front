export const getPost = async (id: string) =>
  fetch(process.env.NEXT_PUBLIC_API_URL + `/` + `api/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  }).then((res) => res.json());

export const getMe = async (token: string) =>
  fetch(process.env.NEXT_PUBLIC_API_URL + "/api/members/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
