"use client";

import { useRouter } from "next/navigation";
import { Book, FilePen, Home, MenuIcon, User } from "lucide-react";
import Link from "next/link";
import { useSideMenuToggle } from "@/store/sidemenu";
import { useCookie, useRevalidationCookie } from "@/hooks/useAuth";
import { toast } from "sonner";
import { TriggerWithoutArgs } from "swr/mutation";

interface Props {
  data: boolean;
  error: boolean;
  isLoading: boolean;
  trigger: TriggerWithoutArgs<any, any, "/api/cookie", never>;
  isMutating: boolean;
}

const IsUser = ({ data, error, isLoading, trigger, isMutating }: Props) => {
  const router = useRouter();
  if (isLoading)
    return (
      <button disabled className='group p-1 flex flex-col gap-0.5'>
        <User className='group-hover:text-black text-black/70 transition mx-auto' />
        <p className='text-xs group-hover:text-black text-black/70 transition text-center'>내정보</p>
      </button>
    );
  if (error) {
    return (
      <button disabled className='group p-1 flex flex-col gap-0.5'>
        <User className='group-hover:text-black text-black/70 transition mx-auto' />
        <p className='text-xs group-hover:text-black text-black/70 transition text-center'>내정보</p>
      </button>
    );
  }

  return data ? (
    <button
      disabled={isMutating}
      onClick={() => {
        trigger();
        router.push("/profile");
      }}
      className='group p-1 flex flex-col gap-0.5'>
      <User className='group-hover:text-black text-black/70 transition mx-auto' />
      <p className='text-xs group-hover:text-black text-black/70 transition text-center'>내정보</p>
    </button>
  ) : (
    <Link href='/login' className='group p-1 flex flex-col gap-0.5'>
      <User className='group-hover:text-black text-black/70 transition mx-auto' />
      <p className='text-xs group-hover:text-black text-black/70 transition text-center'>내정보</p>
    </Link>
  );
};

const CreatePostBtn = ({ data, error, isLoading, trigger, isMutating }: Props) => {
  const router = useRouter();

  if (isLoading)
    return (
      <button disabled className='group p-1 flex flex-col gap-0.5'>
        <FilePen className='group-hover:text-black text-black/70 transition mx-auto' />
        <p className='text-xs group-hover:text-black text-black/70 transition text-center'>글쓰기</p>
      </button>
    );
  if (error)
    return (
      <button
        onClick={() => toast.error("에러가 발생했습니다.", { duration: 2000 })}
        className='group p-1 flex flex-col gap-0.5'>
        <FilePen className='group-hover:text-black text-black/70 transition mx-auto' />
        <p className='text-xs group-hover:text-black text-black/70 transition text-center'>글쓰기</p>
      </button>
    );

  return data ? (
    <button
      disabled={isMutating}
      onClick={() => {
        trigger();
        router.push("/posts/create");
      }}
      className='group p-1 flex flex-col gap-0.5'>
      <FilePen className='group-hover:text-black text-black/70 transition mx-auto' />
      <p className='text-xs group-hover:text-black text-black/70 transition text-center'>글쓰기</p>
    </button>
  ) : (
    <button
      onClick={() => toast.error("로그인이 필요한 서비스입니다.", { duration: 2000 })}
      className='group p-1 flex flex-col gap-0.5'>
      <FilePen className='group-hover:text-black text-black/70 transition mx-auto' />
      <p className='text-xs group-hover:text-black text-black/70 transition text-center'>글쓰기</p>
    </button>
  );
};

export default function GNB() {
  const { onChange, toggle } = useSideMenuToggle();

  const { data, error, isLoading } = useCookie();
  const { trigger, isMutating } = useRevalidationCookie();

  const onClick = () => {
    onChange(!toggle);
  };
  return (
    <header className='fixed z-20 w-full max-w-[600px] bottom-0 bg-white border-t'>
      <nav className='px-5 py-3 flex justify-between'>
        <Link href='/' className='group p-1 flex flex-col gap-0.5'>
          <Home className='group-hover:text-black text-black/70 transition mx-auto' />
          <p className='text-xs group-hover:text-black text-black/70 transition text-center'>홈</p>
        </Link>
        <div className='group p-1 flex flex-col gap-0.5'>
          <button onClick={onClick} className='p-0'>
            <MenuIcon className='group-hover:text-black text-black/70 transition mx-auto' />
          </button>
          <p className='text-xs group-hover:text-black text-black/70 transition text-center leading-none'>메뉴</p>
        </div>
        <IsUser data={data} isLoading={isLoading} error={error} trigger={trigger} isMutating={isMutating} />
        <Link href='/webtoons' className='group p-1 flex flex-col gap-0.5'>
          <Book className='group-hover:text-black text-black/70 transition mx-auto' />
          <p className='text-xs group-hover:text-black text-black/70 transition text-center'>웹툰</p>
        </Link>
        <CreatePostBtn data={data} isLoading={isLoading} error={error} trigger={trigger} isMutating={isMutating} />
      </nav>
    </header>
  );
}
