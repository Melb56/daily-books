'use client';
import Link from 'next/link';
// import ThemeToggle from './ThemeToggle';


export default function Header() {
 

  return (
    <header className="">
      <Link href="/">
        <h1 className="">Daily Books</h1>
      </Link>
      <div className="">
        <Link href="/login">Se connecter</Link>
        {/* <Link href="/admin">Admin</Link>  */}
        
        {/* <ThemeToggle /> */}
      </div>
    </header>
    
  );
}