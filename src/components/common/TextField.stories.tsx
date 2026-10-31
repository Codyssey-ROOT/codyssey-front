import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Copy } from "lucide-react";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: { mobile: true },
  args: { label: "Text", placeholder: "Text" },
  render: (args) => (
    <div className="p-4">
      <TextField {...args} />
    </div>
  ),
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Input Box */
export const Default: Story = {};
export const WithTrailing: Story = {
  args: {
    trailing: (
      <button type="button" aria-label="복사" className="text-fg-secondary-2">
        <Copy aria-hidden className="size-5" />
      </button>
    ),
  },
};
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { "aria-invalid": true, defaultValue: "잘못된 값" } };
