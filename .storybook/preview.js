// import { configure } from "@storybook/react";
// import "../src/styles/index.scss";

// configure(require.context("../src", true, /\.stories\.tsx$/), module);
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
