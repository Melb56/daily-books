'use client';

import { useState } from 'react';

export default function ImageUploader({ onUploaded }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.url && data.public_id) {
      onUploaded({ url: data.url, public_id: data.public_id }); 
    } else {
      alert('Erreur lors de l’upload');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p>📤 Upload en cours...</p>}
    </div>
  );
}