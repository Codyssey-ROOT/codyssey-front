"use client";

import { getKakaoLoginUrl } from "@/apis/auth/api";
import { KakaoLoginButton } from "@/components/home/KakaoLoginButton";
import { OnboardingCarousel } from "@/components/onboarding/OnboardingCarousel";
import { useToast } from "@/hooks/common/useToast";
import { API_BASE_URL } from "@/lib/api/http-client";

const LandingPage = () => {
  const { showToast } = useToast();

  const handleLogin = () => {
    // Without the backend address the request would hit this Next server and 404.
    if (!API_BASE_URL) {
      showToast("로그인 서버 주소가 설정되지 않았어요");
      return;
    }
    window.location.href = getKakaoLoginUrl();
  };

  return (
    <main className="flex h-dvh flex-col">
      <OnboardingCarousel />
      {/* Stays put while the slides move. */}
      <div className="px-4 pt-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <KakaoLoginButton onClick={handleLogin} />
      </div>
    </main>
  );
};

export default LandingPage;
