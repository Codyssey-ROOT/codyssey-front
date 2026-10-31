import type { Preview } from "@storybook/nextjs-vite";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // `parameters: { mobile: true }` renders the story in a 375px frame, the width of the Figma screens.
    (Story, { parameters }) =>
      parameters.mobile ? (
        <div className="w-93.75 bg-white">
          <Story />
        </div>
      ) : (
        <Story />
      ),
  ],
};

export default preview;
