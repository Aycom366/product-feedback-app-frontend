import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: "600px",
  md: "770px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
});

export const theme = extendTheme({
  components: { Button: { baseStyle: { _focus: { boxShadow: "none" } } } },
  breakpoints,
  colors: {
    purple: {
      100: "#AD1FEA",
      200: "#C75AF6",
    },
    blue: {
      100: "#4661E6",
      200: "#62BCFA",
    },
    red: {
      100: "#D73737",
    },
    orange: {
      100: "#F49F85",
    },
    white: {
      100: "#fff",
      200: "#F7F8FD",
      300: "#F2F4FF",
      400: "#f2f4fe",
      500: "#CDD2EE",
      600: "#CFD7FF",
    },
    black: {
      200: "#3A4374",
      300: "#647196",
      400: "#373f68",
      500: "#8C92B3",
    },
  },
});
