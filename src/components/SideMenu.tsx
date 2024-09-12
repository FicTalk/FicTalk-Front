"use client";

import { useSideMenuToggle } from "@/store/sidemenu";
import { PiGithubLogo, PiInstagramLogo, PiX, PiXLogo } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const P = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <p className={cn("text-white/50 hover:text-white text-sm font-light", className)}>{children}</p>;
};

export default function SideMenu() {
  const { toggle, onChange } = useSideMenuToggle();
  const ref = useRef<HTMLDivElement>(null);

  const modalOutSideClick = (e: any) => {
    if (ref.current === e.target) {
      onChange(false);
    }
  };

  return (
    <AnimatePresence>
      {toggle ? (
        <motion.aside
          ref={ref}
          onClick={(e) => modalOutSideClick(e)}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed z-50 flex flex-col w-full h-full bg-black/20 max-w-[600px] overflow-hidden'>
          <motion.div
            initial={{ translateX: "-100%" }}
            animate={{ translateX: 0, transition: { type: "tween", ease: "easeInOut" } }}
            exit={{ translateX: "-100%", transition: { type: "tween", ease: "easeInOut" } }}
            className='relative z-10 h-fit w-2/3 p-2 flex-1 bg-black flex flex-col justify-between'>
            <div className='flex flex-col gap-20'>
              <div className='flex justify-between'>
                <P className='text-lg text-white font-bold'>TOONS</P>
                <button onClick={() => onChange(false)}>
                  <PiX className='text-white text-lg' />
                </button>
              </div>
              <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-1.5'>
                  <P className='text-xs text-white/30 hover:text-white/30'>LOGIN</P>
                  <Link href={"/"}>
                    <P>로그인</P>
                  </Link>
                </div>
                <div className='flex flex-col gap-1.5'>
                  <P className='text-xs text-white/30 hover:text-white/30'>MENU</P>
                  <Link href={"/"}>
                    <P>웹툰</P>
                  </Link>
                  <Link href={"/"}>
                    <P>내정보</P> {/** 로그인이 되었을 땐 내정보 로그아웃 됬을 땐 내정보 */}
                  </Link>
                  <Link href={"/"}>
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
                </div>
                <P className='text-xs'>© 2024 웹툰 완결 알리미. All Rights Reserved.</P>
              </div>
            </div>
          </motion.div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
