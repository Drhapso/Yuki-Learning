import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yuki Learning 🌸 | Plataforma de Japonés JLPT N5 - N1 + SRS',
  description: 'Aprende japonés de forma estructurada con Yuki Learning: gamificación, niveles JLPT (N5 a N1) y Sistema de Repaso Espaciado (SRS).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

