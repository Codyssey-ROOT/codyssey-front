import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PhotoAddMenu } from "./PhotoAddMenu";

const meta = {
  title: "Home/PhotoAddMenu",
  component: PhotoAddMenu,
  parameters: { mobile: true },
  args: { onSelectPhoto: fn() },
  decorators: [
    (Story) => (
      <div className="relative h-150">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PhotoAddMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenAndClose: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "사진 추가" }));
    const closeButton = canvas.getByRole("button", { name: "사진 추가 메뉴 닫기" });
    await expect(closeButton).toHaveAttribute("aria-expanded", "true");

    const dim = canvasElement.querySelector<HTMLElement>("[aria-hidden][data-open]");
    await expect(dim).not.toBeNull();
    if (dim) await userEvent.click(dim);
    await expect(canvas.getByRole("button", { name: "사진 추가" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  },
};
