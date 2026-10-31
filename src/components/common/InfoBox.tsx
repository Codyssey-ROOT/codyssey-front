import { Info } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

// Figma: Text List/Text_information
const InfoBox = ({ className, children, ...props }: ComponentProps<"div">) => {
  return (
    <div
      role="note"
      data-slot="info-box"
      className={cn(
        "flex items-center gap-2 rounded-8 bg-primary-light px-3 py-2.5 text-body-6 text-primary",
        className,
      )}
      {...props}
    >
      <Info aria-hidden className="size-4 shrink-0" />
      {children}
    </div>
  );
};

export { InfoBox };
