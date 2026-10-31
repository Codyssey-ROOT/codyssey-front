"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import type { ReactNode } from "react";

import { Button } from "./Button";

// Asks before an action that can't be undone. Focus moves into the dialog and Esc cancels.
type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isConfirming?: boolean;
};

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = "취소",
  onConfirm,
  isConfirming = false,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <AlertDialog.Popup className="fixed inset-x-6 top-1/2 z-50 mx-auto flex max-w-sm -translate-y-1/2 flex-col gap-6 rounded-20 bg-white p-6 shadow-floating transition-all data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <div className="flex flex-col gap-2 text-center">
            <AlertDialog.Title className="text-h3 text-fg-title">{title}</AlertDialog.Title>
            {description && (
              <AlertDialog.Description className="text-body-6 leading-relaxed text-fg-secondary-2">
                {description}
              </AlertDialog.Description>
            )}
          </div>
          <div className="flex gap-2">
            <AlertDialog.Close
              render={<Button variant="secondary" className="flex-1" disabled={isConfirming} />}
            >
              {cancelLabel}
            </AlertDialog.Close>
            <Button variant="danger" className="flex-1" disabled={isConfirming} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export { ConfirmDialog, type ConfirmDialogProps };
