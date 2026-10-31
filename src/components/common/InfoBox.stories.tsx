import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InfoBox } from "./InfoBox";

const meta = {
  title: "Components/InfoBox",
  component: InfoBox,
  parameters: { mobile: true },
  args: { children: "Text" },
  argTypes: { variant: { control: "inline-radio", options: ["note", "summary"] } },
  render: (args) => (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-h4 text-fg-title">Text</p>
      <InfoBox {...args} />
    </div>
  ),
} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Summary: Story = {
  args: {
    variant: "summary",
    title: "사진 보호가 완료되었어요",
    children: (
      <>
        얼굴 모델링이 완료되었어요.
        <br />
        DeepFence가 다음과 같은 정보를 보호했어요.
      </>
    ),
  },
};
