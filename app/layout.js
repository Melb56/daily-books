import "../styles/globals.scss";
import { Inter } from 'next/font/google';
// import ThemeProvider from 'components/ThemeProvider';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Toaster } from 'react-hot-toast';



const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Daily Books',
  description: 'Blog avec Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        {/* <ThemeProvider> */}
          <Header />
          <main className="min-h-screen px-4 py-6">
            <Toaster position="top-right" />
            {children}
          </main>
          <Footer />
         
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}