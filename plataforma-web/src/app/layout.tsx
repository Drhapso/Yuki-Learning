import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yuki-learning.pages.dev';

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Yuki Learning 🌸 | Plataforma Gratuita de Japonés (JLPT N5 - N1 + SRS)',
    template: '%s | Yuki Learning',
  },
  description:
    'Aprende japonés estructurado y gratuito: currículo interactivo completo desde Hiragana hasta JLPT N1, Repaso Espaciado (SRS), simulador de exámenes oficiales cronometrado con audio nativo y gamificación.',
  applicationName: 'Yuki Learning',
  keywords: [
    'aprender japones gratis',
    'curso de japones online',
    'JLPT N5',
    'JLPT N4',
    'JLPT N3',
    'JLPT N2',
    'JLPT N1',
    'simulador examen JLPT',
    'repaso espaciado japones',
    'SRS japones',
    'kanji n5 n1',
    'hiragana',
    'katakana',
    'Irodori japones',
    'Marugoto',
    'comprension auditiva japones',
    'choukai jlpt',
    'Yuki Learning',
  ],
  authors: [{ name: 'Yuki Learning Team' }],
  creator: 'Yuki Learning',
  publisher: 'Yuki Learning',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Yuki Learning 🌸 | Domina el Japonés con JLPT N5 - N1, SRS y Exámenes Oficiales',
    description:
      'Plataforma educativa de código abierto para hispanohablantes: audio nativo, motor de flashcards SRS y simulador de pruebas oficiales reales.',
    url: SITE_URL,
    siteName: 'Yuki Learning',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yuki Learning 🌸 | Aprende Japonés con JLPT N5 - N1 y SRS',
    description:
      'Plataforma web de código abierto: lecciones interactivas, repaso espaciado y simulacros oficiales de examen JLPT con audio nativo.',
  },
  alternates: {
    canonical: '/',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'Yuki Learning',
      url: SITE_URL,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      inLanguage: ['es', 'ja'],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Plataforma web interactiva para aprender japonés desde cero hasta JLPT N1 con Repaso Espaciado (SRS) y simulador de exámenes.',
    },
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course`,
      name: 'Curso Completo de Japonés: De Cero a JLPT N1 con Repaso Espaciado',
      description:
        'Plan de estudios integral que abarca Hiragana, Katakana, Kanjis oficiales y gramática desde JLPT N5 hasta N1 con simulacros de examen reales.',
      provider: {
        '@type': 'Organization',
        name: 'Yuki Learning',
        url: SITE_URL,
      },
      inLanguage: 'es',
      educationalLevel: ['Beginner', 'Intermediate', 'Advanced'],
      isAccessibleForFree: true,
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Yuki Learning es completamente gratis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, Yuki Learning es una plataforma de código abierto 100% gratuita, sin muros de pago, sin suscripciones obligatorias y sin anuncios publicitarios.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué niveles del examen oficial JLPT cubre la plataforma?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cubre todos los niveles: Módulo 0 (Hiragana y Katakana), JLPT N5, JLPT N4, JLPT N3, JLPT N2 y JLPT N1.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Incluye simulador de examen con audio de escucha real?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, cuenta con un Simulador de Examen Oficial con cronómetro regresivo, audios nativos para Comprensión Auditiva (Choukai), lectura (Dokkai) y conocimiento del idioma, aplicando el baremo oficial de 180 puntos y la regla de corte de 19 puntos por sección.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo funciona el Sistema de Repaso Espaciado (SRS)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El motor SRS utiliza un algoritmo de 9 etapas basado en la curva del olvido de Ebbinghaus para programar revisiones óptimas de kanjis y vocabulario entre 4 horas y 365 días.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
