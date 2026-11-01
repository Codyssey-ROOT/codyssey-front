import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import logo from "@/assets/images/logo.svg";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { mobile: true },
  args: {
    image: logo,
    title: "아직 지킨 사진이 없어요",
    description: (
      <>
        사진을 등록하면 DeepFence가
        <br />
        위험 요소를 찾아 알려드릴게요
      </>
    ),
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: { description: undefined },
};
