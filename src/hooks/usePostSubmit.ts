// hooks/usePostSubmit.ts
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { usePostContent, usePostTitle, usePostType } from "@/store/posts";

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "제목을 입력해주세요" }),
  contentType: z.enum(["GENERAL", "WEBTOON"]),
  content: z.string().trim().min(1, { message: "내용을 입력해주세요" }),
});

type FormData = z.infer<typeof formSchema>;

export const usePostSubmit = (postId?: string) => {
  const postPost = async (url: string, { arg }: { arg: { post: FormData } }) => {
    const response = await fetch("/api/post?boardId=1", {
      method: "POST",
      body: JSON.stringify(arg.post),
    });
    return response.json();
  };

  const putPost = async (url: string, { arg }: { arg: { post: FormData } }) => {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify(arg.post),
    });
    return response.json();
  };

  const router = useRouter();
  const path = usePathname();
  const { trigger, isMutating } = useSWRMutation(
    "/api/post",
    path.split("/").at(-1) === "edit" ? () => putPost(key) : postPost
  );
  const { setTitle } = usePostTitle();
  const { setContent } = usePostContent();
  const { setContentType } = usePostType();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      contentType: "GENERAL",
      content: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const result = formSchema.safeParse(values);
    if (!result.success) {
      let errorMessages: string[] = [];
      result.error.issues.forEach((issue) => {
        form.setError(issue.path[0] as keyof FormData, {
          type: "manual",
          message: issue.message,
        });
        errorMessages.push(issue.message);
      });
      toast.error(errorMessages[0], {
        duration: 1500,
      });
      return;
    }
    try {
      await trigger({ post: result.data });
      toast.success("글쓰기에 성공하셨습니다", {
        duration: 1500,
      });
      router.push("/posts");
    } catch (error) {
      toast.error("글쓰기에 실패했습니다.", {
        duration: 1500,
      });
    }
  };

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      form.setValue(field, value as any, { shouldValidate: true });
      if (field === "title") setTitle(value);
      if (field === "content") setContent(value);
      if (field === "contentType") setContentType(value as "GENERAL" | "WEBTOON");
    },
    [form, setTitle, setContent, setContentType]
  );

  return { form, onSubmit, isMutating, updateField };
};
