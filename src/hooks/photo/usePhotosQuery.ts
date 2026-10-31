import {
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deletePhoto,
  fetchPhoto,
  fetchPhotos,
  fetchPhotoStatuses,
  requestPhotoRecheck,
} from "@/apis/photo/api";
import { photoKeys } from "@/apis/photo/keys";
import { uploadPhoto } from "@/apis/photo/upload";

// Both lists come from one request; each caller selects its own.
export const usePhotosByStatusQuery = (status: "inProgress" | "vulnerable") => {
  return useQuery({
    queryKey: photoKeys.statuses(),
    queryFn: fetchPhotoStatuses,
    select: (data) => data[status],
  });
};

export const usePhotosInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: photoKeys.infinite(),
    queryFn: ({ pageParam }) => fetchPhotos({ cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    select: (data) => data.pages.flatMap((page) => page.photos),
  });
};

const photoQueryOptions = (id: string) =>
  queryOptions({
    queryKey: photoKeys.detail(id),
    queryFn: () => fetchPhoto(id),
  });

export const usePhotoQuery = (id: string) => {
  return useQuery(photoQueryOptions(id));
};

// Loads a photo before navigating; the result is cached for the detail page.
export const useFetchPhoto = () => {
  const queryClient = useQueryClient();
  return (id: string) => queryClient.fetchQuery(photoQueryOptions(id));
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

export const useUploadPhotoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPhoto,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: photoKeys.lists() }),
  });
};
