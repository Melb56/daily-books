'use client'

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <section className='login'>
      <h2>Se connecter</h2>

      <button className='login__item' onClick={() => signIn("google", { redirectTo: "/admin" })}> Se connecter avec Google</button>

      <div className='login__item'>
          
      </div>
    </section>
  )
}


