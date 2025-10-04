"use client";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
  roles = [],
}: {
  children: React.ReactNode;
  roles?: string[];
}) {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (
      roles.length &&
      !roles.includes((user.userInfo as any)?.roles as any)
    ) {
      router.replace("/unauthorized");
    }
  }, [user, roles, router]);

  return <>{children}</>;
}
