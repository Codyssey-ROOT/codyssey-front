"use client";

import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { BottomCTA } from "@/components/common/BottomCTA";
import { Button } from "@/components/common/Button";
import { SERVICE_NAME } from "@/const/service";
import { usePhotoDraftStore } from "@/store/photo-draft";

const PhotoCompletePage = () => {
  const router = useRouter();
  const resetDraft = usePhotoDraftStore((state) => state.reset);

  useEffect(() => {
    resetDraft();
  }, [resetDraft]);

  return (
    <div className="flex h-dvh flex-col">
      <main className="flex flex-1 flex-col items-center justify-center gap-5 px-4 text-center">
        <CircleCheck aria-hidden className="size-16 text-primary" strokeWidth={1.5} />
        <div className="flex flex-col gap-2">
          <h1 className="text-h2 text-fg-title">등록 신청이 완료됐어요</h1>
          <p className="text-body-3 leading-relaxed text-fg-secondary-2">
            {SERVICE_NAME}가 사진 속 위험 요소를 점검하고 있어요
            <br />
            점검이 끝나면 알려드릴게요
          </p>
        </div>
      </main>

      <BottomCTA>
        <Button variant="blue" isFullWidth onClick={() => router.replace("/home")}>
          홈으로 가기
        </Button>
      </BottomCTA>
    </div>
  );
};

export default PhotoCompletePage;
