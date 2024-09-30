"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback, useState } from "react";

const FormSchema = z.object({
	title: z.string(),
});

const debounce = (callback: (...args: any[]) => void, delay: number) => {
	let timerId: NodeJS.Timeout;
	return (...args: any[]) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};

export function SearchWebtoon() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [_, setDebouncedTitle] = useState(searchParams.get("title") || "");

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: searchParams.get("title") || "",
		},
	});

	const onSubmit = useCallback(
		(data: z.infer<typeof FormSchema>) => {
			const params = new URLSearchParams(searchParams);
			params.set("title", data.title);
			params.set("page", "1");
			router.push(`?${params.toString()}`, { scroll: false });
		},
		[searchParams, router],
	);

	const debouncedSubmit = useCallback(
		debounce((value: string) => {
			setDebouncedTitle(value);
			onSubmit({ title: value });
		}, 500),
		[onSubmit],
	);

	const onClear = useCallback(() => {
		const params = new URLSearchParams(searchParams);
		params.delete("title");
		form.reset({ title: "" });
		setDebouncedTitle("");
		router.push(`?${params.toString()}`, { scroll: false });
	}, [searchParams, router, form]);

	useEffect(() => {
		const title = searchParams.get("title");
		if (title !== form.getValues("title")) {
			form.setValue("title", title || "");
			setDebouncedTitle(title || "");
		}
	}, [searchParams.get("platforms"), searchParams.get("days")]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 relative">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									spellCheck="false"
									placeholder="웹툰 제목"
									{...field}
									className="pl-10 text-base"
									onChange={(e) => {
										field.onChange(e);
										debouncedSubmit(e.target.value);
									}}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="absolute bottom-0 left-0 transform bg-transparent h-full aspect-square" style={{ alignContent: "center" }}>
					<MagnifyingGlassIcon className="text-black mx-auto" />
				</div>
				<button type="button" onClick={onClear} className="absolute bottom-0 right-0 transform bg-transparent h-full aspect-square">
					<Cross2Icon className="mx-auto" />
				</button>
			</form>
		</Form>
	);
}
