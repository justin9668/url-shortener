import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'URL Shortener',
  description: 'Create shortened URLs with custom aliases',
};

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
