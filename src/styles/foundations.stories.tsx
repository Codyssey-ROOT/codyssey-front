import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Car,
  CreditCard,
  Hash,
  House,
  LayoutGrid,
  LocateFixed,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Smile,
  TriangleAlert,
  User,
  type LucideIcon,
} from "lucide-react";

// Token names mirror globals.css. Utilities: bg-{name}, text-{name}, border-{name}.
const palettes = {
  "Primary / Blue": "primary",
  "Sub1 / Light Blue": "sub1",
} as const;
const steps = [
  "-light",
  "-light-hover",
  "-light-active",
  "",
  "-hover",
  "-active",
  "-dark",
  "-dark-hover",
  "-dark-active",
  "-darker",
];

const groups: Record<string, string[]> = {
  Text: [
    "fg-title",
    "fg-primary",
    "fg-secondary-1",
    "fg-secondary-2",
    "fg-disable",
    "fg-disable-light",
  ],
  Neutral: [
    "white",
    "gray-1",
    "gray-2",
    "gray-3",
    "gray-4",
    "gray-5",
    "gray-6",
    "gray-7",
    "gray-8",
    "black",
  ],
  "BG / Border": ["bg-gray", "bg-normal", "border-1", "border-2", "border-3", "border-4"],
  Surface: [
    "surface-1",
    "surface-2",
    "surface-3",
    "surface-4",
    "surface-5",
    "surface-6",
    "surface-7",
    "background-0",
  ],
  System: ["warning", "success"],
  Brand: [
    "red-background",
    "red-text",
    "yellow-background",
    "yellow-text",
    "blue-background",
    "blue-text",
    "green-background",
    "green-text",
  ],
};

const Swatch = ({ name }: { name: string }) => {
  return (
    <div className="flex w-28 flex-col gap-1">
      <div
        className="h-14 rounded-8 border border-border-1"
        style={{ background: `var(--color-${name})` }}
      />
      <code className="text-body-7 text-fg-secondary-1">{name}</code>
    </div>
  );
};

const typography = [
  ["text-h1", "26 / SemiBold", "페이지 가장 큰 타이틀"],
  ["text-h2", "20 / SemiBold", "컨텐츠 대제목"],
  ["text-h3", "18 / Bold", "헤더 페이지 제목"],
  ["text-h4", "18 / SemiBold", "인풋박스 제목"],
  ["text-body-1", "18 / Medium", "랭킹 카테고리 제목"],
  ["text-body-2", "16 / Medium", "H4 목록 텍스트"],
  ["text-body-3", "15 / Regular", "H1 및 상세정보 / 인풋박스 텍스트"],
  ["text-body-4", "14 / SemiBold", "본문제목"],
  ["text-body-5", "14 / Medium", "본문강조"],
  ["text-body-6", "14 / Regular", "본문 / 프로필 입력 사용자 이름"],
  ["text-body-7", "13 / Regular", "정보 안내 텍스트"],
  ["text-bottom-button", "18 / Medium", "홈탭하기 / 확인버튼"],
  ["text-speech-bubble", "15 / Regular", "말풍선"],
  ["text-menu", "16 / Regular", "하위메뉴 텍스트"],
  ["text-tab", "14 / Regular", "탭 메뉴 텍스트"],
] as const;

// Figma icon set mapped to the closest lucide-react icon.
const icons: [string, LucideIcon][] = [
  ["Home", House],
  ["Storage", LayoutGrid],
  ["Profile", User],
  ["Shield", ShieldCheck],
  ["Warning", TriangleAlert],
  ["Face", Smile],
  ["Car", Car],
  ["Card", CreditCard],
  ["Pin", MapPin],
  ["Hash", Hash],
  ["Chat", MessageSquare],
  ["Location", LocateFixed],
];

const meta = {
  title: "Foundations",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {Object.entries(palettes).map(([title, key]) => (
        <section key={key} className="flex flex-col gap-3">
          <h2 className="text-h2 text-fg-title">{title}</h2>
          <div className="flex flex-wrap gap-3">
            {steps.map((step) => (
              <Swatch key={step} name={`${key}${step}`} />
            ))}
          </div>
        </section>
      ))}
      {Object.entries(groups).map(([title, names]) => (
        <section key={title} className="flex flex-col gap-3">
          <h2 className="text-h2 text-fg-title">{title}</h2>
          <div className="flex flex-wrap gap-3">
            {names.map((name) => (
              <Swatch key={name} name={name} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <table className="w-full max-w-3xl border-collapse">
      <tbody>
        {typography.map(([className, spec, usage]) => (
          <tr key={className} className="border-b border-border-1">
            <td className="py-3 pr-6">
              <span className={className}>{usage}</span>
            </td>
            <td className="py-3 pr-6">
              <code className="text-body-6 text-fg-secondary-1">{className}</code>
            </td>
            <td className="py-3 text-body-6 text-fg-secondary-2">{spec} / 130%</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex gap-6">
      {["rounded-4", "rounded-8", "rounded-16", "rounded-20", "rounded-full"].map((cls) => (
        <div key={cls} className="flex flex-col items-center gap-2">
          <div className={`h-16 ${cls === "rounded-full" ? "w-28" : "w-16"} bg-primary ${cls}`} />
          <code className="text-body-7 text-fg-secondary-1">{cls}</code>
        </div>
      ))}
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {icons.map(([name, Icon]) => (
        <div key={name} className="flex w-20 flex-col items-center gap-2 text-fg-title">
          <Icon aria-hidden className="size-6" strokeWidth={1.5} />
          <code className="text-body-7 text-fg-secondary-1">{name}</code>
        </div>
      ))}
    </div>
  ),
};
