import { extendTheme } from "@chakra-ui/react";
import { themeColors } from "./colors";

const customTheme = {
  ...themeColors,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
};

const theme = extendTheme(customTheme);

export { theme, themeColors };
