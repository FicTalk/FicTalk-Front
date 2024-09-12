"use client";

import { useSideMenuToggle } from "@/store/sidemenu";
import { PiList } from "react-icons/pi";
export default function SideMenuButton() {
  const { onChange } = useSideMenuToggle();
  const onClick = () => {
    onChange(true);
  };
  return (
    <button onClick={onClick}>
      <PiList className='text-white text-xl' />
    </button>
  );
}
