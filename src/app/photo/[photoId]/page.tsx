import { Suspense } from "react";

import { PhotoDetail } from "@/components/photo/PhotoDetail";

const PhotoDetailPage = () => {
  return (
    <Suspense>
      <PhotoDetail />
    </Suspense>
  );
};

export default PhotoDetailPage;
