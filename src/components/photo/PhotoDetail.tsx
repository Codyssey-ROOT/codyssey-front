"use client";

import { Download, Share } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { BottomCTA } from "@/components/common/BottomCTA";
import { Button } from "@/components/common/Button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { Menu } from "@/components/common/Menu";
import { PageHeader } from "@/components/common/PageHeader";
import { PhotoProtectionResult } from "./PhotoProtectionResult";
import { useToast } from "@/hooks/common/useToast";
import {
  useDeletePhotoMutation,
  usePhotoQuery,
  useRecheckPhotoMutation,
} from "@/hooks/photo/usePhotosQuery";

const FILTER_TABS = [
  { value: "before", label: "필터링 전" },
  { value: "after", label: "필터링 후" },
];

export const PhotoDetail = () => {
  const router = useRouter();
  const { photoId } = useParams<{ photoId: string }>();
  const { data: photo, isPending, isError, refetch } = usePhotoQuery(photoId);
  const [filterTab, setFilterTab] = useState("before");
  const { showToast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deletePhotoMutation = useDeletePhotoMutation();
  const recheckPhotoMutation = useRecheckPhotoMutation();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDelete = () => {
    deletePhotoMutation.mutate(photoId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        showToast("사진을 삭제했어요");
        // Keeps ?mock= so home shows the same mock data minus this photo.
        router.replace(`/home${window.location.search}`);
      },
      onError: () => {
        setIsDeleteDialogOpen(false);
        showToast("사진을 삭제하지 못했어요");
      },
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url });
        return;
      }
      await navigator.clipboard.writeText(url);
      showToast("링크를 복사했어요");
    } catch (error) {
      // Closing the share sheet is not a failure.
      if (error instanceof DOMException && error.name === "AbortError") return;
      showToast("공유하지 못했어요");
    }
  };

  // Saves the protected ("필터링 후") version, which is the one meant to be posted.
  const handleDownload = async () => {
    if (!photo?.filteredImageUrl) return;
    setIsDownloading(true);
    try {
      const response = await fetch(photo.filteredImageUrl);
      if (!response.ok) throw new Error(`download failed: ${response.status}`);
      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `deepfence-${photo.id}.jpg`;
      link.click();
      URL.revokeObjectURL(objectUrl);
      showToast("보호된 사진을 저장했어요");
    } catch {
      showToast("사진을 저장하지 못했어요");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRecheck = () => {
    recheckPhotoMutation.mutate(photoId, {
      onSuccess: () => {
        showToast("재점검을 요청했어요. 끝나면 알려드릴게요");
        router.replace(`/home${window.location.search}`);
      },
      onError: () => showToast("재점검을 요청하지 못했어요"),
    });
  };

  const renderContent = () => {
    if (isPending) return <LoadingState />;

    if (isError) {
      return <ErrorState title="사진을 불러오지 못했어요" onRetry={() => void refetch()} />;
    }

    // Home blocks these, but a direct link can still land here.
    if (photo.status === "inProgress") {
      return <p className="m-auto text-body-3 text-fg-disable">모델링이 끝나면 확인할 수 있어요</p>;
    }

    const imageUrl = filterTab === "after" ? photo.filteredImageUrl : photo.imageUrl;

    return (
      <div className="flex flex-col gap-6">
        <div className="mx-auto w-4/5 rounded-20 bg-white p-4 shadow-card">
          <div className="relative aspect-square overflow-hidden rounded-8 bg-surface-1">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={filterTab === "after" ? "필터링 후 사진" : "필터링 전 사진"}
                fill
                sizes="80vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
        <PhotoProtectionResult status={photo.status} />
      </div>
    );
  };

  const isReady = photo !== undefined && photo.status !== "inProgress";

  return (
    <div className="flex h-dvh flex-col">
      <PageHeader
        title="상세 정보"
        onBack={() => router.back()}
        action={
          <button type="button" disabled={!isReady} onClick={() => setIsDeleteDialogOpen(true)}>
            삭제
          </button>
        }
      />
      <Menu
        items={FILTER_TABS}
        value={filterTab}
        onValueChange={(value) => setFilterTab(String(value))}
        className="px-4"
      />

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-6 pb-4">
        {renderContent()}
      </main>

      <BottomCTA>
        <Button
          variant="secondary"
          aria-label="공유하기"
          className="h-14 w-14 px-0"
          onClick={handleShare}
        >
          <Share aria-hidden />
        </Button>
        <Button
          variant="secondary"
          aria-label="다운로드"
          className="h-14 w-14 px-0"
          disabled={!isReady || isDownloading}
          onClick={handleDownload}
        >
          <Download aria-hidden />
        </Button>
        <Button
          variant="primary"
          isFullWidth
          className="h-14 flex-1"
          disabled={!isReady || recheckPhotoMutation.isPending}
          onClick={handleRecheck}
        >
          재점검
        </Button>
      </BottomCTA>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="사진을 삭제할까요?"
        description="삭제한 사진은 되돌릴 수 없어요"
        confirmLabel="삭제"
        onConfirm={handleDelete}
        isConfirming={deletePhotoMutation.isPending}
      />
    </div>
  );
};
