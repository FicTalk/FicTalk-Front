"use client";

import { useSideMenuToggle } from "@/store/sidemenu";
import { PiGithubLogo, PiInstagramLogo, PiUser, PiX, PiXLogo } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import LogoutButton from "./LogoutButton";
import useSWR from "swr";
import { useUser } from "@/hooks/useUserInfo";

const P = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <p className={cn("text-white/50 text-sm font-base", className)}>{children}</p>;
};

const fetching = async (url: string) => await fetch(url).then((res) => res.json());

const MyProfile = () => {
  return (
    <div className='flex items-center gap-2'>
      <Link href={"/profile"} className='w-8 h-8 rounded-full bg-white' style={{ alignContent: "center" }}>
        <PiUser className='text-black mx-auto' />
      </Link>
      <div>
        <P className='text-xs'>내 정보</P>
      </div>
    </div>
  );
};

export default function SideMenu({ isLogin }: { isLogin: boolean }) {
  const { toggle, onChange } = useSideMenuToggle();
  const router = useParams();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange(false);
  }, [router]);

  const modalOutSideClick = (e: any) => {
    if (ref.current === e.target) {
      onChange(false);
    }
  };

  return (
    <AnimatePresence>
      {toggle ? (
        <motion.aside
          onClick={(e) => modalOutSideClick(e)}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed z-10 flex flex-col w-full h-full bg-white max-w-[600px] overflow-hidden'>
          <div className='flex flex-col'>
            <h2 className='font-black text-black/80 text-2xl p-2 border-b'>TOONS.</h2>
            <div className='flex flex-col'>
              <Link href='/posts' className='p-2 border-b text-base font-bold'>
                자유 게시판
              </Link>
              <Link href='/webtoons' className='p-2 border-b text-base font-bold'>
                웹툰
              </Link>
              <Link href='/webtoons' className='p-2 border-b text-base font-bold'>
                문의하기
              </Link>
            </div>
            <div className='p-2'>
              <P className='text-xs text-black/50'>CONNECT</P>
              <div className='flex gap-2'>
                <Link
                  href={"/"}
                  className='group hover:bg-black transition w-10 h-10 border border-black/10 rounded'
                  style={{ alignContent: "center" }}>
                  <PiGithubLogo className='text-black/50 mx-auto group-hover:text-white text-lg' />
                </Link>
                <Link
                  href={"/"}
                  className='group hover:bg-black transition w-10 h-10 border border-black/10 rounded'
                  style={{ alignContent: "center" }}>
                  <PiInstagramLogo className='text-black/50 mx-auto group-hover:text-white text-lg' />
                </Link>
                <Link
                  href={"/"}
                  className='group hover:bg-black transition w-10 h-10 border border-black/10 rounded'
                  style={{ alignContent: "center" }}>
                  <PiXLogo className='text-black/50 mx-auto group-hover:text-white text-lg' />
                </Link>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <Link href='/'>
                    <P className='text-xs text-black/50'>개인정보처리방침</P>
                  </Link>
                  <Link href='/'>
                    <P className='text-xs text-black/50'>이용약관</P>
                  </Link>
                </div>
                <P className='text-xs text-black/50'>© 2024 웹툰 완결 알리미. All Rights Reserved.</P>
              </div>
            </div>
          </div>
          {/* <motion.div className='relative z-10 h-fit w-2/3 p-2 flex-1 bg-black flex flex-col justify-between'>
            <div className='flex flex-col gap-20'>
              <div className='flex justify-between'>
                <Link href={"/"} className='text-lg text-white font-bold'>
                  TOONS
                </Link>
                <button onClick={() => onChange(false)}>
                  <PiX className='text-white text-lg' />
                </button>
              </div>
              <div className='flex flex-col gap-10'>
                {isLogin ? (
                  <div className='flex flex-col gap-1.5'>
                    <P className='text-xs text-white/30 hover:text-white/30'>MY PROFILE</P>
                    <MyProfile />
                  </div>
                ) : (
                  <div className='flex flex-col gap-1.5'>
                    <P className='text-xs text-white/30 hover:text-white/30'>LOGIN</P>
                    <Link href={"/login"}>
                      <P>로그인</P>
                    </Link>
                  </div>
                )}
                <div className='flex flex-col gap-1.5'>
                  <P className='text-xs text-white/30 hover:text-white/30'>MENU</P>
                  <Link href={"/webtoons"}>
                    <P>웹툰</P>
                  </Link>
                  <Link href={"/posts"}>
                    <P>자유 게시판</P>
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-1.5'>
                <P className='text-xs text-white/30 hover:text-white/30'>CONTECT</P>
                <div className='flex gap-2'>
                  <Link
                    href={"/"}
                    className='group hover:bg-white transition w-10 h-10 border border-white/50 rounded'
                    style={{ alignContent: "center" }}>
                    <PiGithubLogo className='text-white/50 hover:text-white mx-auto group-hover:text-black text-lg' />
                  </Link>
                  <Link
                    href={"/"}
                    className='group hover:bg-white transition w-10 h-10 border border-white/50 rounded'
                    style={{ alignContent: "center" }}>
                    <PiInstagramLogo className='text-white/50 hover:text-white mx-auto group-hover:text-black text-lg' />
                  </Link>
                  <Link
                    href={"/"}
                    className='group hover:bg-white transition w-10 h-10 border border-white/50 rounded'
                    style={{ alignContent: "center" }}>
                    <PiXLogo className='text-white/50 hover:text-white mx-auto group-hover:text-black text-lg' />
                  </Link>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <Link href='/'>
                    <P className='text-xs'>개인정보처리방침</P>
                  </Link>
                  <Link href='/'>
                    <P className='text-xs'>이용약관</P>
                  </Link>
                  {isLogin ? <LogoutButton /> : null}
                </div>
                <P className='text-xs hover:text-white/50'>© 2024 웹툰 완결 알리미. All Rights Reserved.</P>
              </div>
            </div>
          </motion.div> */}
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
