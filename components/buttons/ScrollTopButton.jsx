"use client";

import { useEffect, useState } from "react";
import "@/styles/components/buttons/scrolltopbutton.scss"

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="scrolltop-button"
      aria-label="Remonter en haut"
    >
      <svg className="scroll-button__arrow" width="16" height="16" viewBox="0 0 24 24">
        <polyline points="6 15 12 9 18 15" stroke="currentColor" fill="none" strokeWidth="2"/>
      </svg>
    </button>
  );
}
