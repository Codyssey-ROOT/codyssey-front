import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deletePhoto,
  fetchPhoto,
  fetchPhotos,
  fetchPhotosByStatus,
  requestPhotoRecheck,
} from "@/apis/photo/api";
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

export const usePhotoQuery = (id: string) => {
  return useQuery({
    queryKey: photoKeys.detail(id),
    queryFn: () => fetchPhoto(id),
  });
};

export const useDeletePhotoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePhoto,
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: photoKeys.detail(id) });
      return queryClient.invalidateQueries({ queryKey: photoKeys.lists() });
    },
  });
};

export const useRecheckPhotoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestPhotoRecheck,
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: photoKeys.detail(id) });
      return queryClient.invalidateQueries({ queryKey: photoKeys.lists() });
    },
  });
};
