import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PhotoProtectionResult } from "./PhotoProtectionResult";

const meta = {
  title: "Photo/PhotoProtectionResult",
  component: PhotoProtectionResult,
  parameters: { mobile: true },
  argTypes: { status: { control: "inline-radio", options: ["safe", "vulnerable"] } },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PhotoProtectionResult>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 보호됨 */
export const Safe: Story = { args: { status: "safe" } };

/** 취약점 발견 */
export const Vulnerable: Story = { args: { status: "vulnerable" } };
