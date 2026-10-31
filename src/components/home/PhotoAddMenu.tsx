"use client";

import { Plus } from "lucide-react";
import { useEffect, useRef, type ChangeEvent, useState } from "react";

import { FloatingButton } from "@/components/common/FloatingButton";
import { cn } from "@/utils/cn";

export interface PhotoAddMenuProps {
  onSelectPhoto?: (file: File) => void;
}

const MENU_ITEMS = [
  { label: "앨범에서 고르기", capture: undefined },
  { label: "카메라로 찍기", capture: "environment" },
] as const;

export const PhotoAddMenu = ({ onSelectPhoto }: PhotoAddMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    setIsOpen(false);

    buttonRef.current?.focus();

    if (file) onSelectPhoto?.(file);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-hidden={!isOpen}
        onClick={() => {
          setIsOpen(false);
          buttonRef.current?.focus();
        }}
        className={cn(
          "fixed inset-0 z-40 bg-black/70 opacity-0 backdrop-blur-sm transition-opacity duration-200 pointer-events-none cursor-default border-none outline-none",
          isOpen && "pointer-events-auto opacity-100",
        )}
        aria-label="사진 및 앨범 메뉴용 플로팅 버튼"
      />

      <div className="absolute right-4 bottom-4 z-50 flex flex-col items-end gap-3">
        <div
          id="photo-add-menu"
          role="menu"
          aria-label="사진 추가 선택 항목"
          data-open={isOpen || undefined}
          className="invisible flex translate-y-2 flex-col gap-3 opacity-0 transition-all duration-200 data-open:visible data-open:translate-y-0 data-open:opacity-100"
        >
          {MENU_ITEMS.map(({ label, capture }) => (
            <label
              key={label}
              className="flex h-13 cursor-pointer items-center justify-center rounded-16 bg-white px-5 text-menu text-fg-title shadow-floating focus-within:ring-3 focus-within:ring-ring/50 has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
            >
              {label}
              <input
                type="file"
                accept="image/*"
                capture={capture}
                onChange={handleChange}
                className="sr-only"
                tabIndex={isOpen ? 0 : -1}
              />
            </label>
          ))}
        </div>

        <FloatingButton
          ref={buttonRef}
          aria-label={isOpen ? "사진 추가 메뉴 닫기" : "사진 추가"}
          aria-expanded={isOpen}
          aria-controls="photo-add-menu"
          onClick={handleToggle}
        >
          <Plus
            aria-hidden
            className={cn(
              "transition-transform cursor-pointer duration-200 origin-center",
              isOpen && "rotate-45",
            )}
          />
        </FloatingButton>
      </div>
    </>
  );
};
