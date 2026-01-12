import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,f
  userScalable: false,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
};

export const metadata: Metadata = {
  title: 'Quest | Fraterny',
  description: 'Unique. Accurate. Secure. Quest decodes the deeper psychological insights hidden in your words to reveal the patterns that quietly drive your life.',
  keywords: ['psychological file',
    'personal dossier',
    'identity blueprint',
    'self-knowledge',
    'introspection',
    'aesthetic psychology',
    'behavior patterns',
    'personal archetypes',
    'Fraterny Quest'],
  authors: [{ name: 'Fraterny' }],
  creator: 'Fraterny',
  publisher: 'Fraterny',
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
  alternates: {
    canonical: 'https://fraterny.com/quest',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fraterny.com/quest',
    title: 'Quest | Fraterny',
    description: 'Unique. Accurate. Secure. Quest decodes the deeper psychological insights hidden in your words to reveal the patterns that quietly drive your life.',
    siteName: 'Fraterny',
    images: [
      {
        url: 'https://fraterny.com/Questfavicon.ico',
        width: 1200,
        height: 630,
        alt: 'Quest — Own Your Psychology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quest | Fraterny',
    description: 'Unique. Accurate. Secure. Quest decodes the deeper psychological insights hidden in your words to reveal the patterns that quietly drive your life.',
    images: ['https://fraterny.com/Questfavicon.ico'],
    creator: '@frat_erny',
  },
  icons: {
    icon: [
      { url: '/VectorW.svg' },
      { url: '/VectorW.svg', type: 'image/svg+xml', sizes: '32x32' },
    ],
    apple: [
      { url: '/VectorW.svg' },
    ],
    shortcut: '/VectorW.svg',
  },
};
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fraterny — Quest',
  description: 'Unique. Accurate. Secure. Quest decodes the deeper psychological insights hidden in your words to reveal the patterns that quietly drive your life.',
  url: 'https://fraterny.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://fraterny.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  sameAs: [
    'https://x.com/frat_erny',
    'https://linkedin.com/company/fraterny',
    'https://www.instagram.com/quest.fraterny/',
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fraterny',
  description: 'Fraterny — Quest',
  url: 'https://fraterny.com',
  logo: 'https://www.fraterny.com/og-image2.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@fraterny.com',
    contactType: 'Support Service',
  },
  sameAs: [
    'https://x.com/frat_erny',
    'https://linkedin.com/company/fraterny',
    'https://www.instagram.com/quest.fraterny/',
  ],
};

export default function Questlandinglayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen w-full'>
      <Script
        id="website-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {children}
    </div>
  );
}
