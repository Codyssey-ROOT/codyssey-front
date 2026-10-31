import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageIndicator } from "./PageIndicator";

const meta = {
  title: "Components/PageIndicator",
  component: PageIndicator,
  args: { total: 3, current: 0 },
} satisfies Meta<typeof PageIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {};

export const Last: Story = { args: { current: 2 } };
