import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { fetchPhotos, fetchPhotosByStatus } from "@/apis/photo/api";
import { photoKeys } from "@/apis/photo/keys";
import type { PhotoStatus } from "@/types/photo";

export const usePhotosByStatusQuery = (status: PhotoStatus) => {
  return useQuery({
    queryKey: photoKeys.byStatus(status),
    queryFn: () => fetchPhotosByStatus(status),
  });
};

export const usePhotosInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: photoKeys.infinite(),
    queryFn: ({ pageParam }) => fetchPhotos({ cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    select: (data) => data.pages.flatMap((page) => page.photos),
  });
};
