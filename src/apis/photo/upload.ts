import { api, HttpError } from "@/lib/api/http-client";
import type { ApiResponse } from "@/types/api";
import type { CompleteUploadRequest, CreateUploadUrlRequest, UploadUrlDto } from "@/types/photo";

const FILE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export const createUploadUrl = async (body: CreateUploadUrlRequest): Promise<UploadUrlDto> => {
  const response = await api.post<ApiResponse<UploadUrlDto>>("/images/presigned-url", { body });
  return response.data;
};

// Goes straight to S3, so no cookies and no http-client (the URL already carries the signature).
export const uploadToS3 = async (uploadUrl: string, file: Blob, contentType: string) => {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
  });
  if (!response.ok) {
    throw new HttpError(response.status, `사진을 올리지 못했어요 (${response.status})`);
  }
};

export const completeUpload = async (body: CompleteUploadRequest): Promise<void> => {
  await api.post<ApiResponse<null>>("/images/complete", { body });
};

// presigned URL 발급 → S3 업로드 → 완료 알림 순서로 사진을 등록한다.
export const uploadPhoto = async (file: Blob): Promise<UploadUrlDto> => {
  const fileExt = FILE_EXTENSIONS[file.type];
  if (!fileExt) throw new Error("지원하지 않는 사진 형식이에요");

  const upload = await createUploadUrl({ contentType: file.type, fileExt, fileSize: file.size });
  await uploadToS3(upload.uploadUrl, file, upload.contentType);
  await completeUpload({ objectKey: upload.objectKey });
  return upload;
};
