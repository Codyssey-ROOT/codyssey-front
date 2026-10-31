import { useEffect, useRef } from "react";

export const useInfiniteScroll = (onReachEnd: () => void, isEnabled: boolean) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const onReachEndRef = useRef(onReachEnd);

  useEffect(() => {
    onReachEndRef.current = onReachEnd;
  }, [onReachEnd]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !isEnabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onReachEndRef.current();
      },
      { rootMargin: "200px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isEnabled]);

  return targetRef;
};
