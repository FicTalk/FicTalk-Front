import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PostCreatePage from "../client-conponent";
import { Post } from "@/types/Posts";
import Container from "@/components/Container";
import Title from "@/components/Title";

const fetching = async (url: string) => {
  return (
    await fetch(process.env.NEXT_PUBLIC_API_URL + `/` + url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
  ).json();
};

const isMyPost = async (email: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");

  if (!token) return false;

  const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/members/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    next: { revalidate: 0 },
  });

  const { name } = await getData.json();
  return email === name ? true : false;
};

export default async function PostUpdate({ params }: { params: { id: string } }) {
  const post: Post = await fetching(`api/posts/${params.id}`);
  const isAuthor = await isMyPost(post.username);

  if (!isAuthor) return redirect("/");
  return (
    <Container>
      <Title>BOARD</Title>
      <PostCreatePage initialValues={post} id={params.id} />
    </Container>
  );
}
