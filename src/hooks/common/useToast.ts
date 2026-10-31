import { useToastStore } from "@/store/toast";

export const useToast = () => {
  const showToast = useToastStore((state) => state.showToast);
  return { showToast };
};
