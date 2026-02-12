"use client";

import Link from "next/link";
import clsx from "clsx";
import "@/styles/components/buttons/button.scss";

export default function Button({
  children,
  href,                 
  type = "button",      
  variant = "primary",  
  size = "md",          
  disabled = false,
  onClick,
}) {
  const className = clsx("btn", `btn--${variant}`, `btn--${size}`, disabled && "btn--disabled");

  if (href) {
    return (
      <Link href={href} className={className} aria-disabled={disabled}>
        <span className="btn__label">{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      <span className="btn__label">{children}</span>
    </button>
  );
}
