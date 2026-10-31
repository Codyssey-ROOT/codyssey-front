import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImageCard } from "./ImageCard";

const meta = {
  title: "Components/ImageCard",
  component: ImageCard,
  args: { alt: "", status: "inProgress" },
  argTypes: {
    status: { control: "inline-radio", options: ["inProgress", "vulnerable", "safe"] },
  },
  decorators: [
    (Story) => (
      <div className="w-40">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};

export const Vulnerable: Story = { args: { status: "vulnerable" } };

export const Safe: Story = { args: { status: "safe" } };
