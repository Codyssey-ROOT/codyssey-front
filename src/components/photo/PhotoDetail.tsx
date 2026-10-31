"use client";

import { Share } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { BottomCTA } from "@/components/common/BottomCTA";
import { Button } from "@/components/common/Button";
import { Menu } from "@/components/common/Menu";
import { PageHeader } from "@/components/common/PageHeader";
import { Toast } from "@/components/common/Toast";
import { PhotoProtectionResult } from "./PhotoProtectionResult";
import { useToast } from "@/hooks/common/useToast";
import { usePhotoQuery } from "@/hooks/photo/usePhotosQuery";

const FILTER_TABS = [
  { value: "before", label: "필터링 전" },
  { value: "after", label: "필터링 후" },
];

export const PhotoDetail = () => {
  const router = useRouter();
  const { photoId } = useParams<{ photoId: string }>();
  const { data: photo, isPending, isError } = usePhotoQuery(photoId);
  const [filterTab, setFilterTab] = useState("before");
  const { message, showToast } = useToast();

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

  const renderContent = () => {
    if (isPending) return null;

    if (isError) {
      return (
        <p role="alert" className="m-auto text-body-3 text-fg-disable">
          사진을 불러오지 못했어요
        </p>
      );
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
          // TODO: 삭제 API 연동
          <button type="button" disabled={!isReady}>
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
        {/* TODO: 재점검 API 연동 */}
        <Button variant="primary" isFullWidth className="h-14 flex-1" disabled={!isReady}>
          재점검
        </Button>
      </BottomCTA>
      <Toast message={message} />
    </div>
  );
};
