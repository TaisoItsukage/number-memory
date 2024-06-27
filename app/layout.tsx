import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NumberMemory - Challenge Your Memory',
  description: 'Test and improve your number memorization skills with this engaging web app.',
  keywords: ['memory game', 'number memorization', 'brain training', 'cognitive skills'],
  authors: [{ name: 'AI Assisted Developer', url: 'https://twitter.com/ItsukageT' }],
  creator: 'AI Assisted Developer',
  publisher: 'AI Assisted Developer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'NumberMemory - Challenge Your Memory',
    description: 'Test and improve your number memorization skills with this engaging web app.',
    url: 'https://number-memory.vercel.app',
    siteName: 'NumberMemory',
    images: [
      {
        url: 'https://number-memory.vercel.app/share-image.png',
        width: 1200,
        height: 630,
        alt: 'NumberMemory App Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NumberMemory - Challenge Your Memory',
    description: 'Test and improve your number memorization skills with this engaging web app.',
    images: ['https://number-memory.vercel.app/share-image.png'],
    creator: '@ItsukageT',
    // creatorId: '1234567890', // Twitter user ID if available
  },
  category: 'Game',
  other: {
    'x-ai-assisted': 'This project was developed with AI assistance using Claude 3.5 Sonnet',
    'x-experimental': 'This is an experimental project. Code quality and security have not been verified by human developers.',
  },
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
