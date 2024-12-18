import localFont from "next/font/local";

// material ui
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import Rtl from "./rtlConfig";
//
import NProgressBar from "./nprogress";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import { StationsProvider } from "@/app/contexts/StationsContext";

import theme from "@/theme";
import "./globals.css";

const vazirmatn = localFont({
  src: "../public/fonts/Vazirmatn[wght].ttf",
  display: "swap",
});

export const metadata = {
  title: "سیتی‌دو | زمان‌بندی مترو تهران",
  description: "سیتی دو، محاسبه گر زمان بندی حمل و نقل عمومی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Rtl>
            <StationsProvider>
              <body className={vazirmatn.className}>
                {children}
                <ToastContainer
                  rtl
                  autoClose={3000}
                  limit={3}
                  pauseOnFocusLoss={false}
                  pauseOnHover={false}
                />
                <NProgressBar />
              </body>
            </StationsProvider>
          </Rtl>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
