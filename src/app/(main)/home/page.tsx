import logo from "@/assets/images/logo.svg";
import { EmptyState } from "@/components/common/EmptyState";
import { PhotoAddMenu } from "@/components/home/PhotoAddMenu";
import { SERVICE_NAME } from "@/const/service";

const HomePage = () => {
  return (
    <>
      <main className="relative flex flex-1 flex-col px-4">
        <EmptyState
          image={logo}
          title="아직 지킨 사진이 없어요"
          description={
            <>
              사진을 등록하면 {SERVICE_NAME}가
              <br />
              위험 요소를 찾아 알려드릴게요
            </>
          }
          className="flex-1 justify-center"
        />
        <PhotoAddMenu />
      </main>
    </>
  );
};

export default HomePage;
