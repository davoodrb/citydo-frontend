// components
import { Header, Footer } from "@/components/Layout";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
