'use client'

import { useRouter } from 'next/navigation'
import { Book, FilePen, Home, User } from 'lucide-react'
import Link from 'next/link'
import { useCookie, useRevalidationCookie } from '@hooks/useAuth'
import { toast } from 'sonner'
import { TriggerWithoutArgs } from 'swr/mutation'
import SideMenuToggleBtn from './btn/sideMenuToggleBtn'

interface Props {
    data: boolean
    error: boolean
    isLoading: boolean
    trigger: TriggerWithoutArgs<any, any, '/api/cookie', never>
    isMutating: boolean
}

const IsUser = ({ data, error, isLoading, trigger, isMutating }: Props) => {
    const router = useRouter()
    if (isLoading)
        return (
            <button disabled className="group p-1 flex flex-col gap-0.5">
                <User className="group-hover:text-black text-black/70 transition mx-auto" />
                <p className="text-xs group-hover:text-black text-black/70 transition text-center">내정보</p>
            </button>
        )
    if (error) {
        return (
            <button disabled className="group p-1 flex flex-col gap-0.5">
                <User className="group-hover:text-black text-black/70 transition mx-auto" />
                <p className="text-xs group-hover:text-black text-black/70 transition text-center">내정보</p>
            </button>
        )
    }

    return data ? (
        <button
            disabled={isMutating}
            onClick={() => {
                trigger()
                router.push('/profile')
            }}
            className="group p-1 flex flex-col gap-0.5"
        >
            <User className="group-hover:text-black text-black/70 transition mx-auto" />
            <p className="text-xs group-hover:text-black text-black/70 transition text-center">내정보</p>
        </button>
    ) : (
        <Link href="/login" className="group p-1 flex flex-col gap-0.5">
            <User className="group-hover:text-black text-black/70 transition mx-auto" />
            <p className="text-xs group-hover:text-black text-black/70 transition text-center">내정보</p>
        </Link>
    )
}

const HomeBtn = () => {
    return (
        <Link href="/" className="group p-1 flex flex-col gap-0.5">
            <Home className="group-hover:text-black text-black/70 transition mx-auto" />
            <p className="text-xs group-hover:text-black text-black/70 transition text-center">홈</p>
        </Link>
    )
}

const CreatePostBtn = ({ data, error, isLoading, trigger, isMutating }: Props) => {
    const router = useRouter()

    if (isLoading)
        return (
            <button disabled className="group p-1 flex flex-col gap-0.5">
                <FilePen className="group-hover:text-black text-black/70 transition mx-auto" />
                <p className="text-xs group-hover:text-black text-black/70 transition text-center">글쓰기</p>
            </button>
        )
    if (error)
        return (
            <button
                onClick={() => toast.error('에러가 발생했습니다.', { duration: 2000 })}
                className="group p-1 flex flex-col gap-0.5"
            >
                <FilePen className="group-hover:text-black text-black/70 transition mx-auto" />
                <p className="text-xs group-hover:text-black text-black/70 transition text-center">글쓰기</p>
            </button>
        )

    return data ? (
        <button
            disabled={isMutating}
            onClick={() => {
                trigger()
                router.push('/posts/create')
            }}
            className="group p-1 flex flex-col gap-0.5"
        >
            <FilePen className="group-hover:text-black text-black/70 transition mx-auto" />
            <p className="text-xs group-hover:text-black text-black/70 transition text-center">글쓰기</p>
        </button>
    ) : (
        <button
            onClick={() => toast.error('로그인이 필요한 서비스입니다.', { duration: 2000 })}
            className="group p-1 flex flex-col gap-0.5"
        >
            <FilePen className="group-hover:text-black text-black/70 transition mx-auto" />
            <p className="text-xs group-hover:text-black text-black/70 transition text-center">글쓰기</p>
        </button>
    )
}

const WebtoonBtn = () => {
    return (
        <Link href="/webtoons" className="group p-1 flex flex-col gap-0.5">
            <Book className="group-hover:text-black text-black/70 transition mx-auto" />
            <p className="text-xs group-hover:text-black text-black/70 transition text-center">웹툰</p>
        </Link>
    )
}

export default function GNB() {
    const { data, error, isLoading } = useCookie()
    const { trigger, isMutating } = useRevalidationCookie()

    return (
        <header className="fixed z-20 w-full max-w-[600px] bottom-0 bg-white border-t">
            <nav className="px-5 py-1.5 flex justify-between">
                <HomeBtn />
                <WebtoonBtn />
                <IsUser data={data} isLoading={isLoading} error={error} trigger={trigger} isMutating={isMutating} />
                <CreatePostBtn
                    data={data}
                    isLoading={isLoading}
                    error={error}
                    trigger={trigger}
                    isMutating={isMutating}
                />
                <SideMenuToggleBtn />
            </nav>
        </header>
    )
}
