import Link from "next/link";

import { buttonVariants } from "@/components/common/Button";
import { ErrorState } from "@/components/common/ErrorState";

const NotFound = () => {
  return (
    <ErrorState
      className="min-h-dvh px-4"
      title="페이지를 찾을 수 없어요"
      description="주소가 바뀌었거나 삭제된 페이지예요"
      action={
        <Link href="/home" className={buttonVariants({ variant: "blue", className: "h-11" })}>
          홈으로 가기
        </Link>
      }
    />
  );
};

export default NotFound;
