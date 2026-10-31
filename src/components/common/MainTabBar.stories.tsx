import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MainTabBar } from "./MainTabBar";

const meta = {
  title: "Components/MainTabBar",
  component: MainTabBar,
  parameters: { mobile: true, nextjs: { appDirectory: true, navigation: { pathname: "/home" } } },
} satisfies Meta<typeof MainTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {};

export const Storage: Story = {
  parameters: { nextjs: { navigation: { pathname: "/storage" } } },
};

export const MyPage: Story = {
  parameters: { nextjs: { navigation: { pathname: "/myPage" } } },
};
