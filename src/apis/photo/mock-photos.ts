import type { PhotoDto, PhotoStatus } from "@/types/photo";

const MOCK_SCENARIOS = {
  mixed: ["inProgress", "vulnerable", "safe", "vulnerable", ...Array<PhotoStatus>(26).fill("safe")],
  vulnerable: ["vulnerable", "safe", "vulnerable"],
  inProgress: ["inProgress", "safe", "safe"],
  safe: ["safe", "safe", "safe"],
  empty: [],
} satisfies Record<string, PhotoStatus[]>;

type MockScenario = keyof typeof MOCK_SCENARIOS;

const DAY_MS = 24 * 60 * 60 * 1000;
const MOCK_BASE_TIME = Date.UTC(2026, 9, 31);

const isMockScenario = (value: string | null): value is MockScenario =>
  value !== null && value in MOCK_SCENARIOS;

const getMockScenario = (): MockScenario => {
  const scenario = new URLSearchParams(window.location.search).get("mock");
  return isMockScenario(scenario) ? scenario : "mixed";
};

export const getMockPhotos = (): PhotoDto[] =>
  MOCK_SCENARIOS[getMockScenario()].map((status, index) => ({
    id: `mock-${index}`,
    // TODO: 랜덤 목업 데이터 호출 부분, 제거 필요
    imageUrl: `https://picsum.photos/seed/deepfence-${index}/600/600`,
    status,
    createdAt: new Date(MOCK_BASE_TIME - index * DAY_MS).toISOString(),
  }));

export const waitForMockNetwork = () => new Promise((resolve) => setTimeout(resolve, 300));
