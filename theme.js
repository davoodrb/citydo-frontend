"use client";

import { createTheme } from "@mui/material/styles";
import localFont from "next/font/local";

const vazirmatn = localFont({
  src: "./public/fonts/Vazirmatn[wght].ttf",
  display: "swap",
});

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: vazirmatn.style.fontFamily,
  },
});

export default theme;
