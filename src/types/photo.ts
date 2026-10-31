export type PhotoStatus = "inProgress" | "vulnerable" | "safe";

export interface PhotoDto {
  id: string;
  imageUrl?: string;
  /** The protected version shown on the detail page's "필터링 후" tab. */
  filteredImageUrl?: string;
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
