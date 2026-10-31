import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { PageHeader } from "./PageHeader";

const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: { mobile: true },
  args: { title: "Text", onBack: fn() },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Page Name */
export const Default: Story = {};
export const WithoutBack: Story = { args: { onBack: undefined } };
/** Onboarding header */
export const WithAction: Story = {
  args: { title: undefined, onBack: undefined, action: "건너뛰기" },
};
