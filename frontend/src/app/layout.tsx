import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Hitesh Thacker | Full-Stack Developer & CSE Student',
  description:
    'Portfolio of Hitesh Thacker, a Computer Science & Engineering student specializing in full-stack web applications, scalable backends, and modern frontend systems.',
  keywords: [
    'Hitesh Thacker',
    'Full-Stack Developer',
    'Software Engineer',
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'MongoDB',
    'Portfolio',
  ],
  authors: [{ name: 'Hitesh Thacker' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 flex flex-col min-h-screen selection:bg-blue-500/30 selection:text-blue-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
