'use client';

import { useRouter } from 'next/navigation';

export default function BackButton({ label = '← Retour', style }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      style={{
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        ...style,
      }}
    >
      {label}
    </button>
  );
}
