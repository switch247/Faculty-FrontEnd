import { AuthProvider } from '../context/AuthContext';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; // Use standard Google Fonts
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Ariba Minch Univerity',
  description: 'faculity managment',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}