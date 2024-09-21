"use client";

import { useSideMenuToggle } from "@/store/sidemenu";
import { PiGithubLogo, PiInstagramLogo, PiXLogo } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

const P = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <p className={cn("text-white/50 text-sm font-base", className)}>{children}</p>;
};

export default function SideMenu() {
  const { toggle, onChange } = useSideMenuToggle();
  const router = useParams();

  useEffect(() => {
    onChange(false);
  }, [router]);

  return (
    <AnimatePresence>
      {toggle ? (
        <motion.aside
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
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
