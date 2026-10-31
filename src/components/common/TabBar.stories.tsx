import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { House, LayoutGrid, User } from "lucide-react";
import { TabBar } from "./TabBar";

const meta = {
  title: "Components/TabBar",
  component: TabBar,
  parameters: { mobile: true },
  args: {
    items: [
      { href: "/", label: "홈", icon: <House aria-hidden strokeWidth={1.5} /> },
      { href: "/storage", label: "보관함", icon: <LayoutGrid aria-hidden strokeWidth={1.5} /> },
      { href: "/me", label: "내 정보", icon: <User aria-hidden strokeWidth={1.5} /> },
    ],
    activeHref: "/",
  },
  argTypes: {
    activeHref: { control: "inline-radio", options: ["/", "/storage", "/me"] },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Tab */
export const Default: Story = {};
