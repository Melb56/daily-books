// 'use client';
// import { useState } from 'react';
// import { signIn } from 'next-auth/react';

// export default function SignupPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   async function handleSubmit(e) {
//     e.preventDefault();
    
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="email" 
//         placeholder="Email" 
//         value={email} 
//         onChange={(e) => setEmail(e.target.value)} 
//         required 
//       />
//       <input 
//         type="password" 
//         placeholder="Mot de passe" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} 
//         required 
//       />
//       <button type="submit">S'inscrire</button>
//     </form>
//   );
// }