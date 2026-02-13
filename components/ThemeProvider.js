
"use client"

import { useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.body.className = stored;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Mode sombre" : "☀️ Mode clair"}
      </button>
      {children}
    </>
  );
};

export default ThemeProvider;