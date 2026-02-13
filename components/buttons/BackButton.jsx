"use client";

import { useRouter } from "next/navigation";
import "@/styles/components/buttons/backbutton.scss"

export default function BackButton({ }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="back-button"
    >
       <span className="back-button__arrow">↩</span>
    </button>
  );
}
