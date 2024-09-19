"use client";

import { usePathname } from "next/navigation";
import SideMenuButton from "./SideMenuButton";
import { useState } from "react";
import { usePostSubmit } from "@/hooks/usePostSubmit";
import { usePostContent, usePostTitle, usePostType } from "@/store/posts";
import { useRouter, useParams, useSelectedLayoutSegment } from "next/navigation";

const SubmitBtn = () => {
  const { onSubmit, isMutating } = usePostSubmit();

  const { title, reset: titleReset } = usePostTitle();
  const { content, reset: contentReset } = usePostContent();
  const { contentType, reset: typeReset } = usePostType();

  const onClick = async () => {
    await onSubmit({ title, content, contentType }).then(() => {
      titleReset();
      contentReset();
      typeReset();
    });
  };

  return (
    <button className='text-white' onClick={onClick}>
      {isMutating ? "작성 중..." : "작성하기"}
    </button>
  );
};

export default function GNB() {
  const pathname = usePathname();
  const [menu, setMenu] = useState([
    { label: "마이페이지", key: "/profile" },
    { label: "TOONS", key: "/" },
    { label: "웹툰", key: "/webtoons" },
    { label: "자유게시판", key: "/posts" },
    { label: "로그인", key: "/login" },
    { label: "게시글 작성", key: "/posts/create" },
  ]);
  const postOrPut = pathname.split("/").at(-1);
  return (
    <header className='bg-background-1'>
      <nav className='p-3 flex justify-between'>
        <div className='flex gap-2'>
          <SideMenuButton />
          <h2 className='text-white'>{menu.find((item) => item.key === pathname)?.label}</h2>
        </div>
        {postOrPut === "edit" || postOrPut === "create" ? <SubmitBtn /> : null}
      </nav>
    </header>
  );
}
