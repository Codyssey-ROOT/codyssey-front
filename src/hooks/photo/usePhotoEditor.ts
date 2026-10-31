import { useEffect, useMemo, useState } from "react";
import type { Area, Point } from "react-easy-crop";

import {
  canvasToBlob,
  cropCanvas,
  loadImage,
  renderRotatedImage,
  type ImageEdit,
  type Rotation,
} from "@/utils/image";

const INITIAL_EDIT: ImageEdit = { rotation: 0, isFlipped: false };
const INITIAL_CROP: Point = { x: 0, y: 0 };
const PREVIEW_MAX_EDGE = 1080;

export const usePhotoEditor = (file: File | null) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [edit, setEdit] = useState<ImageEdit>(INITIAL_EDIT);
  const [crop, setCrop] = useState<Point>(INITIAL_CROP);
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState<Area | null>(null);

  useEffect(() => {
    if (!file) return;

    let isCancelled = false;
    loadImage(file)
      .then((loaded) => !isCancelled && setImage(loaded))
      .catch((error: Error) => !isCancelled && setErrorMessage(error.message));

    return () => {
      isCancelled = true;
    };
  }, [file]);

  const preview = useMemo(() => {
    if (!image) return null;

    const canvas = renderRotatedImage(image, edit, PREVIEW_MAX_EDGE);
    return { url: canvas.toDataURL("image/jpeg", 0.8), width: canvas.width };
  }, [image, edit]);

  const updateEdit = (next: (prev: ImageEdit) => ImageEdit) => {
    setEdit(next);
    setCrop(INITIAL_CROP);
    setZoom(1);
  };

  const rotate = () =>
    updateEdit((prev) => ({ ...prev, rotation: ((prev.rotation + 90) % 360) as Rotation }));

  const flip = () =>
    updateEdit((prev) => ({
      isFlipped: !prev.isFlipped,
      rotation: ((360 - prev.rotation) % 360) as Rotation,
    }));

  const reset = () => updateEdit(() => INITIAL_EDIT);

  const exportBlob = async (): Promise<Blob | null> => {
    if (!image || !preview || !cropArea) return null;

    const full = renderRotatedImage(image, edit);
    const scale = full.width / preview.width;
    return canvasToBlob(
      cropCanvas(full, {
        x: cropArea.x * scale,
        y: cropArea.y * scale,
        width: cropArea.width * scale,
        height: cropArea.height * scale,
      }),
    );
  };

  return {
    edit,
    preview,
    crop,
    zoom,
    errorMessage,
    setCrop,
    setZoom,
    setCropArea,
    rotate,
    flip,
    reset,
    exportBlob,
  };
};
