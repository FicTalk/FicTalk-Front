// PostCreatePage.tsx
"use client";

import React, { useEffect, useMemo } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePostSubmit } from "@/hooks/usePostSubmit";
import { ContentTypeInputProps, QuillInputProps, TitleInputProps } from "@/types/Posts";
import { useDeletePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const firstTag = [
  { label: "일반", value: "GENERAL" },
  { label: "기타", value: "OTHER" },
];

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

const QuillInput: React.FC<QuillInputProps> = ({ updateField, initialValue }) => {
  const { quill, quillRef } = useQuill({
    modules: { toolbar: false },
    formats: null,
    placeholder: "공유하고 싶은 내용을 입력해주세요",
  });

  useEffect(() => {
    if (quill) {
      if (initialValue) {
        quill.clipboard.dangerouslyPasteHTML(initialValue);
      }
      quill.on("text-change", () => {
        updateField("content", quill.root.innerHTML);
      });
    }
  }, [quill, updateField]);

  return <div ref={quillRef} className='h-full flex flex-col flex-1 text-base'></div>;
};

const TitleInput: React.FC<TitleInputProps> = ({ control, updateField }) => {
  return (
    <FormField
      control={control}
      name='title'
      render={({ field, fieldState }) => (
        <FormItem className='flex-[3] space-y-0 text-black/50'>
          <FormLabel className='text-xs'>제목</FormLabel>
          {/* {fieldState.error && <p className='text-red-500 text-xs mt-1'>{fieldState.error.message}</p>} */}
          <FormControl>
            <Input
              className={`w-full ${fieldState.error ? "focus-visible:ring-red-500" : "focus-visible:ring-ring"}`}
              minLength={1}
              placeholder='제목을 입력하세요'
              {...field}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const ContentTypeInput: React.FC<ContentTypeInputProps> = ({ control, updateField }) => {
  return (
    <FormField
      control={control}
      name='contentType'
      render={({ field }) => (
        <FormItem className='flex-1 space-y-0'>
          <FormLabel className='text-xs text-black/50'>태그</FormLabel>
          <Select onValueChange={(value) => updateField("contentType", value)} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder='태그 선택' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {firstTag.map((tag) => (
                <SelectItem key={tag.value} value={tag.value} disabled={tag.value !== "GENERAL"}>
                  {tag.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

const PostCreatePage = ({ initialValues, id }: { initialValues: { title: string; content: string }; id: string }) => {
  const { form, onSubmit, updateField } = usePostSubmit(id);

  const formFields = useMemo(
    () => (
      <div className='flex space-x-4'>
        <ContentTypeInput control={form.control} updateField={updateField} />
        <TitleInput control={form.control} updateField={updateField} />
      </div>
    ),
    [form.control, updateField]
  );

  useEffect(() => {
    if (initialValues) {
      updateField("title", initialValues.title);
    }
  }, []);

  return (
    <div className='p-2 flex-1 flex flex-col'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 flex flex-col flex-1'>
          {formFields}
          <QuillInput control={form.control} updateField={updateField} initialValue={initialValues?.content} />
        </form>
      </Form>
    </div>
  );
};

export const DeleteBtn = ({ id }: { id: string }) => {
  const router = useRouter();
  const { trigger, isMutating } = useDeletePost(id);

  const onClick = async () => {
    await trigger().then(() => {
      router.push("/posts");
      toast.success("성공적으로 삭제되었습니다.", {
        duration: 1500,
        style: { ...toastStyles.base, ...toastStyles.success },
      });
    });
  };

  return (
    <button
      onClick={onClick}
      disabled={isMutating}
      className='h-fit text-black/80 p-1 hover:text-red-500 rounded text-sm'>
      <Trash2 />
    </button>
  );
};

export default PostCreatePage;
