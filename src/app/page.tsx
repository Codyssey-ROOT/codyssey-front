"use client";

import Image from "next/image";

import { getKakaoLoginUrl } from "@/apis/auth/api";
import logo from "@/assets/images/logo.svg";
import { KakaoLoginButton } from "@/components/home/KakaoLoginButton";
import { OnboardingCarousel } from "@/components/onboarding/OnboardingCarousel";

const handleLogin = () => {
  window.location.href = getKakaoLoginUrl();
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
