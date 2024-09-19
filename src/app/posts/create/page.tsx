// PostCreatePage.tsx
"use client";

import React, { useEffect, useMemo } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePostSubmit } from "@/hooks/usePostSubmit";
import { Control } from "react-hook-form";
type TitleInputProps = {
  control: Control<any>;
  updateField: (field: "title", value: string) => void;
};

const firstTag = [
  { label: "일반", value: "GENERAL" },
  { label: "기타", value: "OTHER" },
];

type QuillInputProps = {
  control: Control<any>;
  updateField: (field: "content", value: string) => void;
};

const QuillInput: React.FC<QuillInputProps> = ({ updateField }) => {
  const { quill, quillRef } = useQuill({
    modules: { toolbar: false },
    formats: null,
    placeholder: "공유하고 싶은 내용을 입력해주세요",
  });

  useEffect(() => {
    if (quill) {
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

type ContentTypeInputProps = {
  control: Control<any>;
  updateField: (field: "contentType", value: string) => void;
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

const PostCreatePage: React.FC = () => {
  const { form, onSubmit, updateField } = usePostSubmit();

  const formFields = useMemo(
    () => (
      <div className='flex space-x-4'>
        <ContentTypeInput control={form.control} updateField={updateField} />
        <TitleInput control={form.control} updateField={updateField} />
      </div>
    ),
    [form.control, updateField]
  );

  return (
    <div className='p-2 flex-1 flex flex-col'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 flex flex-col flex-1'>
          {formFields}
          <QuillInput control={form.control} updateField={updateField} />
        </form>
      </Form>
    </div>
  );
};

export default PostCreatePage;
