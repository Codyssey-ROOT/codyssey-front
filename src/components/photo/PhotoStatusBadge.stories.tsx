import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PhotoStatusBadge } from "./PhotoStatusBadge";

const meta = {
  title: "Photo/PhotoStatusBadge",
  component: PhotoStatusBadge,
  argTypes: {
    status: { control: "inline-radio", options: ["inProgress", "vulnerable", "safe"] },
  },
} satisfies Meta<typeof PhotoStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = { args: { status: "inProgress" } };

export const Vulnerable: Story = { args: { status: "vulnerable" } };

export const Safe: Story = { args: { status: "safe" } };
