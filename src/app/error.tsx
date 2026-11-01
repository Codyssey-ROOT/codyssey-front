"use client";

import Link from "next/link";
import { useEffect } from "react";

import { buttonVariants } from "@/components/common/Button";
import { ErrorState } from "@/components/common/ErrorState";

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Catches render errors in any route below the root layout.
const RouteError = ({ error, reset }: RouteErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      className="min-h-dvh px-4"
      onRetry={reset}
      action={
        <Link href="/home" className={buttonVariants({ variant: "blue", className: "h-11" })}>
          홈으로 가기
        </Link>
      }
    />
  );
};

export default RouteError;
