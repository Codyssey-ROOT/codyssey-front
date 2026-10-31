"use client";

import { FlipHorizontal, RotateCw, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

import { BottomCTA } from "@/components/common/BottomCTA";
import { Button } from "@/components/common/Button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { PageHeader } from "@/components/common/PageHeader";
import { usePhotoEditor } from "@/hooks/photo/usePhotoEditor";
import { useUploadPhotoMutation } from "@/hooks/photo/usePhotosQuery";
import { usePhotoDraftStore } from "@/store/photo-draft";

const PhotoEditPage = () => {
  const router = useRouter();
  const originalFile = usePhotoDraftStore((state) => state.originalFile);
  const resetDraft = usePhotoDraftStore((state) => state.reset);
  const {
    edit,
    preview,
    crop,
    zoom,
    errorMessage,
    setCrop,
    setZoom,
    setCropArea,
    rotate,
    flip,
    reset,
    exportBlob,
  } = usePhotoEditor(originalFile);
  const uploadPhotoMutation = useUploadPhotoMutation();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  useEffect(() => {
    if (!originalFile) router.replace("/home");
  }, [originalFile, router]);

  const handleSubmit = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const blob = await exportBlob();
      if (!blob) return;
      await uploadPhotoMutation.mutateAsync(blob);
      router.replace("/photo/complete");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "사진을 저장하지 못했어요");
    } finally {
      setIsSaving(false);
    }
  };

  // Clears the photo so coming back (e.g. browser forward) does not reopen it.
  const handleLeave = () => {
    resetDraft();
    router.back();
  };

  const message = errorMessage ?? saveError;

  return (
    <div className="flex h-dvh flex-col bg-black text-white">
      <PageHeader
        tone="dark"
        title="사진 편집"
        onBack={() => setIsLeaveDialogOpen(true)}
        action={
          <button type="button" onClick={reset}>
            초기화
          </button>
        }
      />

      <main className="flex min-h-0 flex-1 flex-col gap-10 pt-6 pb-8">
        <div className="relative mx-4 flex min-h-0 flex-1 items-center justify-center">
          {preview && (
            <Cropper
              image={preview.url}
              crop={crop}
              zoom={zoom}
              aspect={1}
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_area, areaPixels) => setCropArea(areaPixels)}
              mediaProps={{ alt: "편집 중인 사진" }}
              classes={{ cropAreaClassName: "photo-crop-area" }}
            />
          )}
          {message && (
            <p role="alert" className="text-center text-body-3 text-fg-disable">
              {message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="flex h-7 items-center rounded-full bg-white px-3 text-body-2 text-fg-title">
            1:1
          </span>
          <div className="flex gap-7">
            <button
              type="button"
              aria-label="좌우 반전"
              aria-pressed={edit.isFlipped}
              onClick={flip}
              className="flex size-10 items-center justify-center"
            >
              <FlipHorizontal aria-hidden className="size-6 cursor-pointer" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="90도 회전"
              onClick={rotate}
              className="flex size-10 items-center justify-center"
            >
              <RotateCw aria-hidden className="size-6 cursor-pointer" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </main>

      <BottomCTA className="bg-black">
        <Button
          variant="blue"
          isFullWidth
          className="h-14 cursor-pointer"
          disabled={!preview || isSaving}
          onClick={handleSubmit}
        >
          <ShieldCheck aria-hidden />
          등록하고 안전 점검 하기
        </Button>
      </BottomCTA>
      <ConfirmDialog
        open={isLeaveDialogOpen}
        onOpenChange={setIsLeaveDialogOpen}
        title="편집을 그만둘까요?"
        description="지금까지 편집한 내용은 저장되지 않아요"
        confirmLabel="그만두기"
        cancelLabel="계속 편집"
        onConfirm={handleLeave}
      />
    </div>
  );
};

export default PhotoEditPage;
