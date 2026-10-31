"use client";

import { useToastStore } from "@/store/toast";
import { Toast } from "./Toast";

// Mounted once in the root layout; pages call useToast().showToast.
export const AppToast = () => {
  const message = useToastStore((state) => state.message);
  return <Toast message={message} />;
};
