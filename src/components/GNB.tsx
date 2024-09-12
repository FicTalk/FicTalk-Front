"use client";

import { usePathname } from "next/navigation";
import SideMenuButton from "./SideMenuButton";
import { useState } from "react";

export default function GNB() {
  const pathname = usePathname();
  const [menu, setMenu] = useState([
    { label: "마이페이지", key: "/profile" },
    { label: "TOONS", key: "/" },
    { label: "웹툰", key: "/webtoons" },
    { label: "자유게시판", key: "/posts" },
    { label: "로그인", key: "/login" },
  ]);
  return (
    <header className='bg-background-1'>
      <nav className='p-3'>
        <div className='flex gap-2'>
          <SideMenuButton />
          <h2 className='text-white'>{menu.find((item) => item.key === pathname)?.label}</h2>
        </div>
      </nav>
    </header>
  );
}
