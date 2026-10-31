import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MapPin } from "lucide-react";
import { CategoryCard } from "./CategoryCard";

const meta = {
  title: "Components/CategoryCard",
  component: CategoryCard,
  args: { label: "Category", count: "N건" },
  decorators: [
    (Story) => (
      <div className="w-26 p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Category */
export const Default: Story = {};
export const WithIcon: Story = {
  args: { icon: <MapPin aria-hidden />, label: "위치", count: "3건" },
};
