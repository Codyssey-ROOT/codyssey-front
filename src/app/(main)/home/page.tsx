"use client";

import { useRouter } from "next/navigation";

import logo from "@/assets/images/logo.svg";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { PhotoAddMenu } from "@/components/home/PhotoAddMenu";
import { PhotoSection } from "@/components/home/PhotoSection";
import { RiskSummaryCard } from "@/components/home/RiskSummaryCard";
import { SERVICE_NAME } from "@/const/service";
import { useInfiniteScroll } from "@/hooks/common/useInfiniteScroll";
import { useToast } from "@/hooks/common/useToast";
import {
  useFetchPhoto,
  usePhotosByStatusQuery,
  usePhotosInfiniteQuery,
} from "@/hooks/photo/usePhotosQuery";
import type { PhotoDto, PhotoStatus } from "@/types/photo";

const HomePage = () => {
  const router = useRouter();
  const inProgressQuery = usePhotosByStatusQuery("inProgress");
  const vulnerableQuery = usePhotosByStatusQuery("vulnerable");
  const allQuery = usePhotosInfiniteQuery();
  const { showToast } = useToast();
  const fetchPhoto = useFetchPhoto();

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = allQuery;
  const loadMoreRef = useInfiniteScroll(
    () => void fetchNextPage(),
    hasNextPage && !isFetchingNextPage,
  );

  const inProgressPhotos = inProgressQuery.data ?? [];
  const vulnerablePhotos = vulnerableQuery.data ?? [];
  // The full list carries no status, so take it from the in-progress / vulnerable lists.
  const statusById = new Map<string, PhotoStatus>(
    [...inProgressPhotos, ...vulnerablePhotos].map((photo) => [photo.id, photo.status]),
  );
  const allPhotos = (allQuery.data ?? []).map((photo) => ({
    ...photo,
    status: statusById.get(photo.id) ?? photo.status,
  }));

  const isLoading = inProgressQuery.isPending || vulnerableQuery.isPending || allQuery.isPending;
  const isError = inProgressQuery.isError || vulnerableQuery.isError || allQuery.isError;

  const handleRetry = () => {
    void inProgressQuery.refetch();
    void vulnerableQuery.refetch();
    void allQuery.refetch();
  };

  const handlePhotoClick = async (photo: PhotoDto) => {
    if (photo.status === "inProgress") {
      showToast("모델링이 끝나면 확인할 수 있어요");
      return;
    }
    try {
      const detail = await fetchPhoto(photo.id);
      // Without the protected version there is nothing to compare on the detail page.
      if (!detail.filteredImageUrl) {
        showToast("보호 처리된 사진이 아직 없어요");
        return;
      }
      router.push(`/photo/${photo.id}`);
    } catch {
      showToast("사진 정보를 불러오지 못했어요");
    }
  };

  const renderContent = () => {
    if (isLoading) return <LoadingState />;

    if (isError) return <ErrorState title="사진을 불러오지 못했어요" onRetry={handleRetry} />;

    if (allPhotos.length === 0) {
      return (
        <EmptyState
          image={logo}
          title="아직 지킨 사진이 없어요"
          description={
            <>
              사진을 등록하면 {SERVICE_NAME}가
              <br />
              위험 요소를 찾아 알려드릴게요
            </>
          }
          className="flex-1 justify-center"
        />
      );
    }

    return (
      <div className="flex flex-col gap-6">
        <RiskSummaryCard vulnerableCount={vulnerablePhotos.length} />
        {inProgressPhotos.length > 0 && (
          <PhotoSection
            title="모델링 진행중"
            photos={inProgressPhotos}
            onPhotoClick={handlePhotoClick}
          />
        )}
        {vulnerablePhotos.length > 0 && (
          <PhotoSection
            title="취약점 발생"
            photos={vulnerablePhotos}
            onPhotoClick={handlePhotoClick}
          />
        )}
        <PhotoSection
          title="전체 목록"
          photos={allPhotos}
          onPhotoClick={handlePhotoClick}
          footer={<div ref={loadMoreRef} aria-hidden className="h-px" />}
        />
      </div>
    );
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <main className="flex flex-1 flex-col overflow-y-auto px-4 pt-2 pb-24">
        {renderContent()}
      </main>
      <PhotoAddMenu />
    </div>
  );
};

export default HomePage;
