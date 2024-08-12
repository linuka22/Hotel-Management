'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Loading from '@/components/loading/Loading';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, 1000); // Ensure loading is displayed for at least 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {loading && <Loading />}
        {showContent && children}
        <Footer/>
      </body>
    </html>
  );
}
