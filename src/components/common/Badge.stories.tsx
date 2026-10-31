import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TriangleAlert } from "lucide-react";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "가는중" },
  argTypes: { variant: { control: "inline-radio", options: ["info", "danger"] } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

/** Warning count on the Image thumbnail */
export const Danger: Story = {
  args: {
    variant: "danger",
    children: (
      <>
        <TriangleAlert aria-hidden />
        3건
      </>
    ),
  },
};
