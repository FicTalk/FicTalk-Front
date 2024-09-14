import { create } from "zustand";

interface totalPage {
  total: number;
  change: (val: number | undefined) => void;
}

export const usePageTotal = create<totalPage>()((set) => ({
  total: 0,
  change: (val) => set({ total: val }),
}));

interface loading {
  isLoading: boolean;
  change: (val: boolean) => void;
}

export const useLoading = create<loading>()((set) => ({
  isLoading: false,
  change: (val) => set({ isLoading: val }),
}));
