import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  args: { defaultValue: "b", "aria-label": "옵션" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Radio Button */
export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {["a", "b"].map((value) => (
        <label key={value} className="flex items-center gap-2 text-body-3">
          <Radio value={value} />
          옵션 {value.toUpperCase()}
        </label>
      ))}
    </RadioGroup>
  ),
};
