import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { X } from "lucide-react";
import { FloatingButton } from "./FloatingButton";

const meta = {
  title: "Components/FloatingButton",
  component: FloatingButton,
  args: { "aria-label": "사진 추가" },
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Close: Story = {
  args: { "aria-label": "닫기", children: <X aria-hidden /> },
};
