import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InfoBox } from "./InfoBox";

const meta = {
  title: "Components/InfoBox",
  component: InfoBox,
  parameters: { mobile: true },
  args: { children: "Text" },
  render: (args) => (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-h4 text-fg-title">Text</p>
      <InfoBox {...args} />
    </div>
  ),
} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Text List/Text_information */
export const Default: Story = {};
