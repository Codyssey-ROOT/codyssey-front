import { api } from "@/lib/api/http-client";
import type { ApiResponse } from "@/types/api";
import type {
  FetchPhotosRequest,
  ImageDetailDto,
  ImageListDto,
  ImageListItemDto,
  ImageStatusDto,
  PhotoDto,
  PhotoPageDto,
  PhotoStatus,
} from "@/types/photo";

const toPhoto = (image: ImageListItemDto, status: PhotoStatus): PhotoDto => ({
  id: String(image.id),
  imageUrl: image.imageUrl,
  status,
});

export const fetchPhotoStatuses = async (): Promise<
  Record<"inProgress" | "vulnerable", PhotoDto[]>
> => {
  const { data } = await api.get<ApiResponse<ImageStatusDto>>("/images/status");

  return {
    inProgress: data.processingImages.map((image) => toPhoto(image, "inProgress")),
    vulnerable: data.vulnerableImages.map((image) => toPhoto(image, "vulnerable")),
  };
};

export const fetchPhotos = async ({ cursor }: FetchPhotosRequest): Promise<PhotoPageDto> => {
  const { data } = await api.get<ApiResponse<ImageListDto>>("/images", { params: { cursor } });

  return {
    // The list has no status; home overrides it from the status lists.
    photos: data.images.map((image) => toPhoto(image, "safe")),
    nextCursor: data.hasNext ? data.nextCursor : null,
  };
};

// The detail has no status either, so it is looked up in the status lists.
export const fetchPhoto = async (id: string): Promise<PhotoDto> => {
  const [{ data }, statuses] = await Promise.all([
    api.get<ApiResponse<ImageDetailDto>>(`/images/${id}`),
    fetchPhotoStatuses(),
  ]);
  const isInStatus = (photos: PhotoDto[]) => photos.some((photo) => photo.id === id);
  const status: PhotoStatus = isInStatus(statuses.inProgress)
    ? "inProgress"
    : isInStatus(statuses.vulnerable)
      ? "vulnerable"
      : "safe";

  return {
    id,
    imageUrl: data.originalImage?.getUrl,
    filteredImageUrl: data.faceShieldImage?.getUrl ?? data.blurredImage?.getUrl,
    status,
  };
};

// TODO: 사진 삭제 API 연동
export const deletePhoto = async (_id: string): Promise<void> => {
  throw new Error("사진 삭제는 아직 지원하지 않아요");
};

// TODO: 재점검 API 연동
export const requestPhotoRecheck = async (_id: string): Promise<void> => {
  throw new Error("재점검은 아직 지원하지 않아요");
};
