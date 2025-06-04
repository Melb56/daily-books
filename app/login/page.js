'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Erreur de connexion');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Connexion</h2>
      <label>Email :</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>Mot de passe :</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Se connecter</button>
    </form>
  );
}