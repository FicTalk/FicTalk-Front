"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const FormSchema = z.object({
  title: z.string(),
});

export function SearchWebtoon() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const p = searchParams.get("platforms");
  const d = searchParams.get("days");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    form.reset();
    params.delete("title");
  }, [p, d]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const params = new URLSearchParams(searchParams);

    params.set("title", data.title);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  const onClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("title");
    form.reset();
    router.push(`?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6 relative'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input spellCheck='false' placeholder='웹툰 제목' {...field} className='pl-10 text-base' />
              </FormControl>
            </FormItem>
          )}
        />
        <div
          className='absolute bottom-0 left-0 transform bg-transparent h-full aspect-square'
          style={{ alignContent: "center" }}>
          <MagnifyingGlassIcon className='text-black mx-auto' />
        </div>
        <button
          type='button'
          onClick={onClear}
          className='absolute bottom-0 right-0 transform bg-transparent h-full aspect-square'>
          <Cross2Icon className='mx-auto' />
        </button>
      </form>
    </Form>
  );
}
