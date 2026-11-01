import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";
import { ErrorState } from "./ErrorState";

const meta = {
  title: "Components/ErrorState",
  component: ErrorState,
  parameters: { mobile: true },
  decorators: [
    (Story) => (
      <div className="flex h-100 flex-col px-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRetry: Story = {
  args: { title: "사진을 불러오지 못했어요", onRetry: fn() },
};

export const NotFound: Story = {
  args: {
    title: "페이지를 찾을 수 없어요",
    description: "주소가 바뀌었거나 삭제된 페이지예요",
    action: (
      <Button variant="blue" className="h-11">
        홈으로 가기
      </Button>
    ),
  },
};
