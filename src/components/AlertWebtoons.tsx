'use client'
import { useAlertWebtoons, useDeleteAlertWebtoon } from '@hooks/useAlertWebtoon'
import { DayOfWeek, getDayInKorean } from '@lib/strings'
import { cn } from '@lib/utils'
import { ReactNode } from 'react'
import { PiEyesFill } from 'react-icons/pi'
import PlatformBadge from './PlatformBadge'
import { toast } from 'sonner'

interface Props {
    id: number
    webtoon: {
        id: number
        title: string
        dayOfWeek: string
        thumbnailUrl: string
        platform: string
    }
}

const DisableText = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <p className={cn('text-xs text-black/50', className)}>{children}</p>
}

const Text = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <p className={cn('text-sm text-black', className)}>{children}</p>
}

export default function AlertWebtoons() {
    const { data, isLoading, error } = useAlertWebtoons()
    const { trigger, isMutating } = useDeleteAlertWebtoon()

    const onClick = (webtoonId: number) => {
        trigger({ webtoonId }).then(() => toast.success('알람 제거가 완료되었습니다', { duration: 1500 }))
    }

    if (isLoading) return <></>
    if (error) return <></>

    return data?.length ? (
        data.map((item: Props) => (
            <li key={item.id} className="border-b last:border-none p-2 flex justify-between items-center gap-5">
                <div className="flex gap-1 items-center w-1/2 truncate">
                    <img
                        alt={item.webtoon.title}
                        src={item.webtoon.thumbnailUrl}
                        className="w-12 aspect-[3/4] bg-black rounded-md object-cover"
                    />
                    <Text className="truncate">{item.webtoon.title}</Text>
                </div>
                <div className="w-1/2 flex justify-between items-center">
                    <div>
                        <DisableText className="text-center">
                            {getDayInKorean(item.webtoon.dayOfWeek as DayOfWeek)}요일
                        </DisableText>
                        <PlatformBadge platform={item.webtoon.platform} />
                    </div>
                    <button
                        disabled={isMutating}
                        onClick={() => onClick(item.id)}
                        className="text-xs rounded-md py-1.5 p-2 text-black/50 bg-black/10 hover:text-white hover:bg-black transition"
                    >
                        알람 제거
                    </button>
                </div>
            </li>
        ))
    ) : (
        <div style={{ alignContent: 'center' }} className="p-10 text-center">
            <PiEyesFill className="text-black/50 text-xl mx-auto" />
            <DisableText>등록된 웹툰이 없습니다.</DisableText>
        </div>
    )
}
