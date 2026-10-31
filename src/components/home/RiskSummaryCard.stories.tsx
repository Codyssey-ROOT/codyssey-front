import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RiskSummaryCard } from "./RiskSummaryCard";

const meta = {
  title: "Home/RiskSummaryCard",
  component: RiskSummaryCard,
  parameters: { mobile: true },
  args: { vulnerableCount: 2 },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RiskSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vulnerable: Story = {};

export const AllSafe: Story = { args: { vulnerableCount: 0 } };
