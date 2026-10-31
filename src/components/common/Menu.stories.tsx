import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Menu } from "./Menu";

const meta = {
  title: "Components/Menu",
  component: Menu,
  parameters: { mobile: true },
  args: {
    items: [
      { value: "recent", label: "최근" },
      { value: "danger", label: "위험" },
    ],
    defaultValue: "recent",
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const tab = within(canvasElement).getByRole("tab", { name: "위험" });
    await userEvent.click(tab);
    await expect(tab).toHaveAttribute("aria-selected", "true");
  },
};
