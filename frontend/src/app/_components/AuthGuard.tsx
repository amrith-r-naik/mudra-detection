// components/AuthGuard.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin"); // Redirect to sign-in page
    }
  }, [status, router]);

  if (status === "loading")
    return <p className="mt-10 text-center">Loading...</p>;

  return <>{children}</>;
}
