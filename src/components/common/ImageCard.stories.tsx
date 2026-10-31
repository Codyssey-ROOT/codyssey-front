import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TriangleAlert } from "lucide-react";
import { Badge } from "./Badge";
import { ImageCard } from "./ImageCard";

const meta = {
  title: "Components/ImageCard",
  component: ImageCard,
  args: { alt: "", title: "Title", date: "00.00.00" },
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

/** Figma: Image */
export const WithBadge: Story = {
  args: {
    badge: (
      <Badge variant="danger">
        <TriangleAlert aria-hidden />
        3건
      </Badge>
    ),
  },
};
export const Plain: Story = {};
