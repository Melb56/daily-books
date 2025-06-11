// 'use client';

// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   async function handleSubmit(e) { ///
//     e.preventDefault();
//     const handleSubmit = async (e) => {
//       e.preventDefault();

//     const res = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//       callbackUrl: '/admin',
//     });

//     if (res.ok) {
//       router.push('/admin');
//     } else {
//       alert('Erreur de connexion');
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
//       <h2>Connexion</h2>
//       <label>Email :</label>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <label>Mot de passe :</label>
//       <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       <button type="submit">Se connecter</button>
//     </form>
//   );
// }

'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/admin', 
    });
    if (res?.ok) {
      window.location.href = res.url; // ← redirige manuellement
    } else {
      alert('Échec de la connexion');
      console.error(res);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}
