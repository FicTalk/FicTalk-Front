import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import GNB from '@components/GNB'
import { ThemeProvider } from '@components/ThemeProvider'
import SideMenu from '@components/SideMenu'
import GoogleLoginProvider from '@components/GoogleLoginProvier'
import { Toaster } from '@components/ui/sonner'
import { ReactNode } from 'react'

const pretendard = localFont({
    src: '../../public/fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
})

export const metadata: Metadata = {
    title: 'TOONS - 웹툰 알람 서비스',
    description: '웹툰 알람 서비스',
    keywords: '웹툰, 네이버 웹툰, 카카오 웹툰',
    icons: {
        icon: '/favicon.svg',
    },
    openGraph: {
        description: '웹툰 알람 서비스',
        url: 'https://toons.woos.dev',
        type: 'website',
        siteName: 'TOONS',
    },
    twitter: {
        description: '웹툰 알람 서비스',
        site: 'https://toons.woos.dev',
    },
}

/**
 * 다크 모드를 켤려면 default = 'system', enableSystem = true로 설정해주세요.
 *
 * text-disable-1 = text-white/50
 * text-disable-2 = text-white/30
 */

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className={`bg-side ${pretendard.variable} antialiased`}>
                <GoogleLoginProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem={false}
                        disableTransitionOnChange
                    >
                        <div className="relative flex flex-col min-h-screen mx-auto max-w-[600px] min-h-screen bg-background">
                            <SideMenu />
                            {children}
                            <GNB />
                        </div>
                        <Toaster position="top-center" visibleToasts={1} richColors toastOptions={{ duration: 2000 }} />
                    </ThemeProvider>
                </GoogleLoginProvider>
            </body>
        </html>
    )
}
