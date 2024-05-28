"use client";
import { Cairo } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { useLocale } from "next-intl";
import { getAppLanguage } from "@/shared/constants/languageVar";

const cairo = Cairo({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
const getLocale = () => {
  const isRTL =
    getAppLanguage() === "ar" || getAppLanguage() === "fa" ? true : false;
  return isRTL;
};

const theme = createTheme({
  direction: getLocale() ? "rtl" : "ltr",
  typography: {
    fontFamily: cairo.style.fontFamily,
  },

  palette: {
    common: {
      black: "#212121",
      white: "#ffffff",
    },
    primary: {
      main: "#8C4A7E",
      light: "#8C4E7E80",
    },
    background: {
      default: "#F5F5F5",
    },
  },
});

export default theme;
