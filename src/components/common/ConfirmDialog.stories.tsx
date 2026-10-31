import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ConfirmDialog } from "./ConfirmDialog";

const meta = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  parameters: { mobile: true },
  args: {
    open: true,
    onOpenChange: fn(),
    onConfirm: fn(),
    title: "사진을 삭제할까요?",
    description: "삭제한 사진은 되돌릴 수 없어요",
    confirmLabel: "삭제",
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Confirming: Story = { args: { isConfirming: true } };
