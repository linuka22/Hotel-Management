'use client'

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { SessionProvider } from 'next-auth/react';
import Provider from '@/components/Provider';


const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
      <body className={inter.className}>
          <main>
            <Navbar />
            {children}
            <Footer />
          </main>
      </body>
      </Provider>
    </html>
  );
}
