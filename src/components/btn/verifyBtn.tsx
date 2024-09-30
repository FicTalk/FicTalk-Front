"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

const toastStyles = {
	base: {
		color: "white",
		border: 0,
		boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
	},
	success: { backgroundColor: "#3b82f6" },
	warning: { backgroundColor: "#f59e0b" },
	error: { backgroundColor: "#ef4444" },
};

const FormSchema = z.object({
	email: z.string().email("이메일을 입력해주세요").min(2, {
		message: "이메일을 입력해주세요",
	}),
});

export default function VerifyBtn() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await fetch("/api/members/verify", { method: "POST", body: JSON.stringify({ email: data.email }) }).then(() =>
			toast.success("이메일을 확인해주세요.", {
				description: "인증메일이 발송되었어요!",
				duration: 2500,
				style: { ...toastStyles.base, ...toastStyles.success },
			}),
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mt-1 flex w-full items-center w-3/5 gap-2">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="이메일 인증이 필요해요!" {...field} className="py-0.5" />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit" className="py-0.5">
					인증하기
				</Button>
			</form>
		</Form>
	);
}
