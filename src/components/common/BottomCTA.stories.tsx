import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BottomCTA } from "./BottomCTA";
import { Button } from "./Button";

const meta = {
  title: "Components/BottomCTA",
  component: BottomCTA,
  parameters: { mobile: true },
} satisfies Meta<typeof BottomCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: CTA / Bottom Button */
export const Single: Story = {
  args: {
    children: <Button isFullWidth>Text</Button>,
  },
};

/** Figma: 2 CTA / Bottom 2 Button */
export const Double: Story = {
  args: {
    children: (
      <>
        <Button variant="secondary" className="flex-1">
          Text
        </Button>
        <Button className="flex-2">Text</Button>
      </>
    ),
  },
};
