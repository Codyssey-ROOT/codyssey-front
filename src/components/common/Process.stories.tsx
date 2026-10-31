import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Process } from "./Process";

const meta = {
  title: "Components/Process",
  component: Process,
  args: { children: "Text" },
} satisfies Meta<typeof Process>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
