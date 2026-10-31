export type PhotoStatus = "inProgress" | "vulnerable" | "safe";

export interface PhotoDto {
  id: string;
  imageUrl?: string;
  /** The protected version shown on the detail page's "필터링 후" tab. */
  filteredImageUrl?: string;
  status: PhotoStatus;
  createdAt?: string;
}

export interface FetchPhotosRequest {
  /** Last imageId of the previous page; omit for the first page. */
  cursor?: number;
}

export interface ImageListItemDto {
  id: number;
  imageUrl: string;
  objectKey: string;
}

export interface ImageListDto {
  images: ImageListItemDto[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface ImageStatusDto {
  processingImages: ImageListItemDto[];
  vulnerableImages: ImageListItemDto[];
}

export interface ImageFileDto {
  id: number;
  objectKey: string;
  getUrl: string;
}

export interface ImageDetailDto {
  imageId: number;
  originalImage: ImageFileDto | null;
  blurredImage: ImageFileDto | null;
  faceShieldImage: ImageFileDto | null;
}

export interface PhotoPageDto {
  photos: PhotoDto[];
  nextCursor: number | null;
}

export interface CreateUploadUrlRequest {
  contentType: string;
  /** Extension without the dot, e.g. "jpg" */
  fileExt: string;
  /** Bytes */
  fileSize: number;
}

export interface UploadUrlDto {
  imageId: number;
  /** Presigned S3 PUT URL */
  uploadUrl: string;
  objectKey: string;
  publicUrl: string;
  contentType: string;
  expiresInSeconds: number;
}

export interface CompleteUploadRequest {
  objectKey: string;
}
