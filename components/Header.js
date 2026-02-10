"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "@/styles/components/header.scss";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  useEffect(() => {
    function onPointerDown(e) {
      if (!isOpen) return;
      const panel = panelRef.current;
      const btn = toggleBtnRef.current;
      if (!panel || !btn) return;

      const clickedInsidePanel = panel.contains(e.target);
      const clickedToggle = btn.contains(e.target);
      if (!clickedInsidePanel && !clickedToggle) close();
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e) {
      if (!isOpen) return;
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // const navLinks = [
  //   { href: "/", label: "Accueil" },
  //   { href: "/books", label: "Livres" },
  //   { href: "/about", label: "À propos" },
  // ];

  return (
    <header className="nav">
      <div className="nav__bar">
        <Link className="nav__brand" href="/" onClick={close}>
          <Image
            src="/image/Logo/logo-nav.png"
            alt="Logo"
            width="130"
            height="50"
          />
        </Link>

        {/* Burger (mobile) */}
        <button
          ref={toggleBtnRef}
          type="button"
          className="nav__toggle"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="nav-panel"
          onClick={toggle}
        >
          <span className="nav__toggle-icon" aria-hidden="true">
            <span />
          </span>
        </button>

        {/* Panel */}
        <div
          id="nav-panel"
          ref={panelRef}
          className={`nav__panel ${isOpen ? "nav__panel--open" : ""}`}
        >
          {/* <ul className="nav__list">
            {navLinks.map((l) => (
              <li key={l.href} className="nav__item">
                <Link className="nav__link" href={l.href} onClick={close}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul> */}

          <div className="nav__actions">
            <Link className="nav__cta" href="/login" onClick={close}>
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </header>

  );
}





