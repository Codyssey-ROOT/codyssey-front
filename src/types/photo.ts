export type PhotoStatus = "inProgress" | "vulnerable" | "safe";

export interface PhotoDto {
  id: string;
  imageUrl?: string;
  status: PhotoStatus;
  createdAt: string;
}

export interface FetchPhotosRequest {
  cursor?: number;
}

export interface PhotoPageDto {
  photos: PhotoDto[];
  nextCursor: number | null;
}
