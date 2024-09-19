"use client";

import { useRouter } from "next/navigation";
import { PiCaretLeftLight } from "react-icons/pi";

export default function BackForward() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <PiCaretLeftLight />
    </button>
  );
}
