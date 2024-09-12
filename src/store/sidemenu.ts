import { create } from "zustand";

interface toggle {
  toggle: boolean;
  onChange: (val: boolean) => void;
}

export const useSideMenuToggle = create<toggle>()((set) => ({
  toggle: false,
  onChange: (val) => set({ toggle: val }),
}));
