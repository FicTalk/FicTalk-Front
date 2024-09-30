"use client";

import { GoogleLoginButton, KakaoLoginBtn } from "@/components/btn/loginBtn";

export default function Login() {
	return (
		<main className="flex-1 bg-white max-w-[600px] overflow-hidden" style={{ alignContent: "center" }}>
			<div className="transform -translate-y-1/2">
				<p className="text-center text-4xl text-black font-bold">TOONS.</p>
				<p className="text-center text-black/50">툰즈에 오신 것을 환영합니다👏</p>
				<div className="mt-5 flex flex-col gap-2">
					<div className="mx-auto">
						<GoogleLoginButton />
					</div>
					<KakaoLoginBtn />
				</div>
			</div>
		</main>
	);
}
