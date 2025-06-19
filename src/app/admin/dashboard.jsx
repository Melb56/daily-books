'use client'

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Admin from '@/src/components/AdminHome';

export default function dashboard() {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
        router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") return <p>Chargement...</p>;


  return (
    <div>
      <Admin session={session} />
      <button onClick={() => signOut({ callbackUrl: '/' })}>
        Déconnexion
      </button>
    </div>

    
  )
}
