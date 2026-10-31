import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListItem } from "./ListItem";
import { Toggle } from "./Toggle";

const meta = {
  title: "Components/ListItem",
  component: ListItem,
  parameters: { mobile: true },
  args: { title: "Title", description: "Description", thumbnail: <span /> },
  render: (args) => (
    <div className="px-4">
      <ListItem {...args} />
    </div>
  ),
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Card */
export const Card: Story = {};

/** Figma: Switch */
export const WithToggle: Story = {
  args: { trailing: <Toggle aria-label="Title" /> },
};

/** Figma: Text List */
export const TextList: Story = {
  args: { title: "Text", description: undefined, thumbnail: undefined },
  render: (args) => (
    <div className="divide-y divide-border-1 px-4">
      {[true, true, false, false].map((withToggle, index) => (
        <ListItem
          key={index}
          {...args}
          trailing={withToggle ? <Toggle aria-label={`Text ${index + 1}`} /> : undefined}
        />
      ))}
    </div>
  ),
};
