import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "TOONS - 로그인",
	description: "웹툰 알람 서비스",
	keywords: "웹툰, 네이버 웹툰, 카카오 웹툰",
	openGraph: {
		description: "웹툰 알람 서비스",
		url: "https://toons.woos.dev/login",
		type: "website",
		siteName: "TOONS",
	},
	twitter: {
		description: "웹툰 알람 서비스",
		site: "https://toons.woos.dev/login",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
