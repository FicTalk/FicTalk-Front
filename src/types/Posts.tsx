import { Control } from "react-hook-form";

export interface Pages {
  content: Post[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pabeable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  tag: string | null;
  isLiked: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export type TitleInputProps = {
  control: Control<any>;
  updateField: (field: "title", value: string) => void;
};

export type ContentTypeInputProps = {
  control: Control<any>;
  updateField: (field: "contentType", value: string) => void;
};

export type QuillInputProps = {
  control: Control<any>;
  updateField: (field: "content", value: string) => void;
  initialValue: string;
};

export interface HotPost extends Pick<Post, "id" | "title"> {
  likeCount: number;
}
export interface CreatePost extends Pick<Post, "title" | "content" | "tag"> {}
export interface PutPost extends Pick<Post, "title" | "content" | "tag"> {}
export interface DeletePost extends Pick<Post, "id"> {}
