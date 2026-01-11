import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Samadhan Setu - Smart Civic Intelligence',
  description: 'AI-powered civic complaint dashboard for municipal authorities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
