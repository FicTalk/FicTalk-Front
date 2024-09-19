import { create } from "zustand";

interface totalPage {
  total: number;
  change: (val: number | undefined) => void;
}

export const usePageTotal = create<totalPage>()((set) => ({
  total: 0,
  change: (val) => set({ total: val }),
}));

interface PostDTO {
  title: string;
  contentType: "GENERAL" | "WEBTOON";
  content: string;
  contentId?: number;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setContentType: (contentType: "WEBTOON" | "GENERAL") => void;
  reset: () => void;
}

export const usePostContent = create<Pick<PostDTO, "content" | "setContent" | "reset">>()((set) => ({
  content: "",
  setContent: (content) => set({ content }),
  reset: () => set({ content: "" }),
}));

export const usePostTitle = create<Pick<PostDTO, "title" | "setTitle" | "reset">>()((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
  reset: () => set({ title: "" }),
}));

export const usePostType = create<Pick<PostDTO, "contentType" | "setContentType" | "reset">>()((set) => ({
  contentType: "GENERAL",
  setContentType: (contentType) => set({ contentType }),
  reset: () => set({ contentType: "GENERAL" }),
}));
