'use client'

import { cn } from '@lib/utils'
import { useSideMenuToggle } from '@store/sidemenu'
import { MenuIcon } from 'lucide-react'

interface SideMenuToggleBtnProps {
    showText?: boolean
    className?: string
}

export default function SideMenuToggleBtn({ showText = true, className }: SideMenuToggleBtnProps) {
    const { onChange, toggle } = useSideMenuToggle()
    const onClick = () => {
        onChange(!toggle)
    }

    return (
        <div className="group p-1 flex flex-col gap-0.5">
            <button onClick={onClick} className="p-0">
                <MenuIcon className={cn('group-hover:text-black text-black/70 transition mx-auto', className)} />
            </button>
            {showText && (
                <p className="text-xs group-hover:text-black text-black/70 transition text-center leading-none">메뉴</p>
            )}
        </div>
    )
}
