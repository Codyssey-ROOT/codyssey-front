export type Rotation = 0 | 90 | 180 | 270;

export interface ImageEdit {
  rotation: Rotation;
  isFlipped: boolean;
}

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MAX_OUTPUT_EDGE = 4096;

export const loadImage = (file: File): Promise<HTMLImageElement> => {
  const url = URL.createObjectURL(file);
  const image = new Image();

  return new Promise<HTMLImageElement>((resolve, reject) => {
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener("error", () => reject(new Error("이미지를 불러올 수 없어요")), {
      once: true,
    });
    image.src = url;
  }).finally(() => URL.revokeObjectURL(url));
};

const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width);
  canvas.height = Math.round(height);

  const context = canvas.getContext("2d");
  if (!context) throw new Error("이미지를 편집할 수 없는 환경이에요");

  return { canvas, context };
};

export const renderRotatedImage = (
  image: HTMLImageElement,
  { rotation, isFlipped }: ImageEdit,
  maxEdge = MAX_OUTPUT_EDGE,
) => {
  const isSideways = rotation === 90 || rotation === 270;
  const rotatedWidth = isSideways ? image.naturalHeight : image.naturalWidth;
  const rotatedHeight = isSideways ? image.naturalWidth : image.naturalHeight;
  const scale = Math.min(1, maxEdge / Math.max(rotatedWidth, rotatedHeight));

  const rotated = createCanvas(rotatedWidth * scale, rotatedHeight * scale);
  rotated.context.translate(rotated.canvas.width / 2, rotated.canvas.height / 2);
  rotated.context.rotate((rotation * Math.PI) / 180);
  rotated.context.scale(isFlipped ? -scale : scale, scale);
  rotated.context.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
  return rotated.canvas;
};

export const cropCanvas = (source: HTMLCanvasElement, crop: CropRect) => {
  const cropped = createCanvas(crop.width, crop.height);
  cropped.context.drawImage(
    source,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    cropped.canvas.width,
    cropped.canvas.height,
  );
  return cropped.canvas;
};

export const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("이미지를 저장하지 못했어요"))),
      "image/jpeg",
      0.92,
    );
  });
