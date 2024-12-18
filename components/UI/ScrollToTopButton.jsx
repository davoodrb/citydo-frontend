"use client";

import { useEffect, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 150 ? setIsVisible(true) : setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
  };

  return (
    <button
      className={`fixed bottom-4 left-4 rounded-full p-2 outline-none transition-opacity duration-200 bg-black/30 backdrop-blur-md ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <KeyboardDoubleArrowUpIcon />
    </button>
  );
};

export default ScrollToTopButton;
