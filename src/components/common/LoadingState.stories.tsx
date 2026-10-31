import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LoadingState } from "./LoadingState";

const meta = {
  title: "Components/LoadingState",
  component: LoadingState,
  parameters: { mobile: true },
  decorators: [
    (Story) => (
      <div className="flex h-100 flex-col">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = { args: { label: "사진을 저장하는 중이에요" } };
