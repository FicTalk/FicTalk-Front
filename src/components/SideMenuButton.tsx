"use client";

import { useSideMenuToggle } from "@/store/sidemenu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
export default function SideMenuButton() {
  const { onChange } = useSideMenuToggle();
  const onClick = () => {
    onChange(true);
  };
  return (
    <button onClick={onClick}>
      <HamburgerMenuIcon className='text-white' />
    </button>
  );
}
