import { AuthProvider } from '../context/AuthContext';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; // Import Google Fonts
import './globals.css';

// Load Inter font with fallback
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Ensures text remains visible during font loading
});

// Load Roboto Mono font with fallback
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap', // Ensures text remains visible during font loading
});

export const metadata: Metadata = {
  title: 'Ariba Minch University',
  description: 'Faculty Management',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable}`}
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif', // Fallback to system-ui if Inter fails
        }}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}