import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      filter: {
        "drop-shadow": "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.05))",
      },
      transitionTimingFunction: {
        "custom-bezier": "cubic-bezier(1,0.63,0.25,1.5)",
      },
    },
    colors: {
      lightestGrey: "#E4E4E7",
      lighterGrey: "#71717A",
      black: "#000",
      "text-dark": "#27272A",
      white: "#fff",
      dark: "#18181B",
      purple: "#F0ABFC",
      highlightGreen: "#BBF7D0",
      grey: "#F4F4F5",
      bgPrimary: "#FAFAFA",
    },
    boxShadow: {
      cardShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
      buttonShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    },
  },
  plugins: [],
} satisfies Config;
