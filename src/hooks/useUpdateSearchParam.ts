import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useUpdateSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    (role: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(role, value);

      if (role !== "page") {
        params.set("page", "1");
      }

      if (role === "days" || role === "platforms") {
        params.delete("title");
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const resetSearchParams = useCallback(() => {
    router.push("/");
  }, [router]);

  return { updateSearchParams, resetSearchParams };
}
