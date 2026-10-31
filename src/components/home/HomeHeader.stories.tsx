import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HomeHeader } from "./HomeHeader";

const meta = {
  title: "Home/HomeHeader",
  component: HomeHeader,
  parameters: { mobile: true, nextjs: { appDirectory: true } },
} satisfies Meta<typeof HomeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HasNotification: Story = {
  args: { hasNotification: true },
};
