"use client";

import Image from "next/image";

import logo from "@/assets/images/logo.svg";
import { KakaoLoginButton } from "@/components/home/KakaoLoginButton";
import { SERVICE_NAME } from "@/const/service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const handleLogin = () => {
  window.location.href = `${API_BASE_URL}/auth/kakao/authorize`;
};

const LandingPage = () => {
  return (
    <main className="flex min-h-dvh flex-col px-4">
      <section className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
        <Image
          src={logo}
          alt={`${SERVICE_NAME} 로고`}
          className="size-80 object-contain antialiased image-render-auto"
          priority
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-h1 text-fg-title">{SERVICE_NAME}</h1>
          <p className="text-body-3 text-fg-primary">
            올리기 전에 {SERVICE_NAME}가 먼저 살펴볼게요
          </p>
        </div>
      </section>
      <div className="flex flex-col gap-4 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <KakaoLoginButton onClick={handleLogin} />
        <div className="mx-auto flex w-fit flex-col gap-2 text-body-7 text-fg-primary">
          <p>시작하면 이용약관 및 개인정보처리방침에 동의하게 돼요.</p>
          <p>사진은 기기 안에서만 분석되고 서버에 저장되지 않아요.</p>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
