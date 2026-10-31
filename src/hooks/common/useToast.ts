import { useCallback, useEffect, useRef, useState } from "react";

const TOAST_DURATION_MS = 2000;

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showToast = useCallback((nextMessage: string) => {
    clearTimeout(timerRef.current);
    setMessage(nextMessage);
    timerRef.current = setTimeout(() => setMessage(null), TOAST_DURATION_MS);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { message, showToast };
};
