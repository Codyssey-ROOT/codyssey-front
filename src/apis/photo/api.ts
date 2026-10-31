import type { FetchPhotosRequest, PhotoDto, PhotoPageDto, PhotoStatus } from "@/types/photo";
import {
  deleteMockPhoto,
  getMockPhotos,
  setMockPhotoStatus,
  waitForMockNetwork,
} from "./mock-photos";

const PAGE_SIZE = 10;

// TODO: 사진 API가 나오면 http-client 호출로 교체
export const fetchPhotosByStatus = async (status: PhotoStatus): Promise<PhotoDto[]> => {
  await waitForMockNetwork();
  return getMockPhotos().filter((photo) => photo.status === status);
};

export const fetchPhotos = async ({ cursor = 0 }: FetchPhotosRequest): Promise<PhotoPageDto> => {
  await waitForMockNetwork();
  const photos = getMockPhotos();
  const nextCursor = cursor + PAGE_SIZE;

  return {
    photos: photos.slice(cursor, nextCursor),
    nextCursor: nextCursor < photos.length ? nextCursor : null,
  };
};

export const fetchPhoto = async (id: string): Promise<PhotoDto> => {
  await waitForMockNetwork();
  const photo = getMockPhotos().find((item) => item.id === id);
  if (!photo) throw new Error("사진을 찾을 수 없어요");
  return photo;
};

export const deletePhoto = async (id: string): Promise<void> => {
  await waitForMockNetwork();
  deleteMockPhoto(id);
};

// Sends the photo back to review; it shows up as 모델링 진행중 until the check finishes.
export const requestPhotoRecheck = async (id: string): Promise<void> => {
  await waitForMockNetwork();
  setMockPhotoStatus(id, "inProgress");
};
