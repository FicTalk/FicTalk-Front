import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <main className='p-3 flex flex-col flex-1 gap-1 pb-[80px]'>{children}</main>;
}
