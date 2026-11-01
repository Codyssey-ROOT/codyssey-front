"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type UIEvent } from "react";

import logo from "@/assets/images/logo.svg";
import deepfakeShield from "@/assets/images/onboarding/deepfake-shield.svg";
import ongoingAlert from "@/assets/images/onboarding/ongoing-alert.svg";
import privacyBlur from "@/assets/images/onboarding/privacy-blur.svg";
import { PageIndicator } from "@/components/common/PageIndicator";
import { SERVICE_NAME } from "@/const/service";
import { cn } from "@/utils/cn";

interface FeatureSlide {
  badge: string;
  title: string[];
  description: string[];
  /** Without one, a gray placeholder box is shown. */
  illustration?: StaticImageData;
}

const FEATURE_SLIDES: FeatureSlide[] = [
  {
    badge: "01 · 딥페이크 방지",
    title: ["딥페이크로부터", "내 얼굴을 지켜요"],
    description: ["눈에 보이지 않는 보호 노이즈를 입혀", "AI가 얼굴을 합성하지 못하게 해요"],
    illustration: deepfakeShield,
  },
  {
    badge: "02 · 개인정보 블러",
    title: ["사진 속 개인정보를", "자동으로 가려요"],
    description: ["번호판, 신분증, 간판처럼", "나를 알 수 있는 단서를 찾아 블러 처리해요"],
    illustration: privacyBlur,
  },
  {
    badge: "03 · 지속적인 관리",
    title: ["새로운 취약점을", "발견하면 알려드려요"],
    description: ["기술의 발전으로 기존 사진이 위협받으면", "보호할 수 있도록 안내를 드려요"],
    illustration: ongoingAlert,
  },
];

const SLIDE_COUNT = FEATURE_SLIDES.length + 1;

const SLIDE_CLASS_NAME =
  "flex w-full shrink-0 snap-center flex-col items-center gap-12 px-4 pt-28 text-center";
const VISUAL_CLASS_NAME = "flex size-56 items-end justify-center";

const Lines = ({ lines }: { lines: string[] }) =>
  lines.map((line, index) => (
    <span key={line}>
      {index > 0 && <br />}
      {line}
    </span>
  ));

// Swipeable with native scroll snapping; the dots follow the scroll position.
export const OnboardingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth } = event.currentTarget;
    setCurrentIndex(Math.round(scrollLeft / clientWidth));
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        aria-roledescription="carousel"
        aria-label={`${SERVICE_NAME} 소개`}
        onScroll={handleScroll}
        className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <section
          aria-roledescription="slide"
          aria-label={`1 / ${SLIDE_COUNT}`}
          className={SLIDE_CLASS_NAME}
        >
          <div className={VISUAL_CLASS_NAME}>
            <Image src={logo} alt="" className="w-full object-contain" priority />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-h1 text-fg-title">{SERVICE_NAME}</h1>
            <p className="text-body-6 text-fg-primary">
              올리기 전에 {SERVICE_NAME}가 먼저 살펴볼게요
            </p>
          </div>
        </section>

        {FEATURE_SLIDES.map(({ badge, title, description, illustration }, index) => (
          <section
            key={badge}
            aria-roledescription="slide"
            aria-label={`${index + 2} / ${SLIDE_COUNT}`}
            className={SLIDE_CLASS_NAME}
          >
            <div className={cn(VISUAL_CLASS_NAME, !illustration && "rounded-20 bg-surface-1")}>
              {illustration && <Image src={illustration} alt="" className="size-full" />}
            </div>
            <div className="flex flex-col items-center gap-4">
              <span className="rounded-full bg-primary-light px-3 py-1 text-body-6 text-primary-dark">
                {badge}
              </span>
              <h2 className="text-h2 font-bold text-fg-title">
                <Lines lines={title} />
              </h2>
              <p className="text-body-7 leading-relaxed text-fg-primary">
                <Lines lines={description} />
              </p>
            </div>
          </section>
        ))}
      </div>

      <PageIndicator total={SLIDE_COUNT} current={currentIndex} />
    </div>
  );
};
