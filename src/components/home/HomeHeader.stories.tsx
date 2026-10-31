import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { HomeHeader } from "./HomeHeader";

const meta = {
  title: "Home/HomeHeader",
  component: HomeHeader,
  parameters: { mobile: true, nextjs: { appDirectory: true } },
  args: { onNotificationClick: fn() },
} satisfies Meta<typeof HomeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HasNotification: Story = {
  args: { hasNotification: true },
};
