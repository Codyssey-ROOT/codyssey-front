import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationCard } from "./NotificationCard";

const meta = {
  title: "Notification/NotificationCard",
  component: NotificationCard,
  parameters: { mobile: true },
  args: { title: "사진 처리 완료", message: "요청하신 사진이 보호가 완료되었습니다." },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultiLine: Story = {
  args: {
    title: "취약점 발견",
    message: "새로운 취약점이 발견되었습니다.\n취약한 사진들을 확인하세요.",
  },
};
