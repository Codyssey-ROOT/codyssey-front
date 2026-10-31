import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Text" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "blue"] },
    isFullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Flexable Button */
export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
/** Onboarding "다음" button */
export const Blue: Story = { args: { variant: "blue", children: "다음" } };
export const Disabled: Story = { args: { disabled: true } };

/** Figma: Button (full width) */
export const FullWidth: Story = {
  args: { isFullWidth: true },
  parameters: { mobile: true },
  render: (args) => (
    <div className="p-4">
      <Button {...args} />
    </div>
  ),
};
