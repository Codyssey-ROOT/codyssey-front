"use client";

import { KakaoLoginButton } from "@/components/home/KakaoLoginButton";
import { OnboardingCarousel } from "@/components/onboarding/OnboardingCarousel";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const handleLogin = () => {
  // window.location.href = `${API_BASE_URL}/auth/kakao/authorize`;
  // todo: 임시 홈 화면 이동
  window.location.href = "/home";
};

const LandingPage = () => {
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
