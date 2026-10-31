import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { KakaoLoginButton } from "./KakaoLoginButton";

const meta = {
  title: "Home/KakaoLoginButton",
  component: KakaoLoginButton,
  parameters: { mobile: true },
  args: { onClick: fn() },
  render: (args) => (
    <div className="p-4">
      <KakaoLoginButton {...args} />
    </div>
  ),
} satisfies Meta<typeof KakaoLoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
