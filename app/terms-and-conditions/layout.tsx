import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Terms and Conditions - Fraterny',
  description: 'Read Fraterny\'s terms and conditions to understand the rules and guidelines for using our services, retreats, and platform.',
  keywords: ['terms and conditions', 'terms of service', 'user agreement', 'legal terms', 'Fraterny'],
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
    canonical: 'https://fraterny.com/terms-and-conditions',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fraterny.com/terms-and-conditions',
    title: 'Terms and Conditions - Fraterny',
    description: 'Understand the rules and guidelines for using Fraterny services and platform.',
    siteName: 'Fraterny',
    images: [
      {
        url: 'https://fraterny.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fraterny Terms and Conditions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions - Fraterny',
    description: 'Understand the rules and guidelines for using Fraterny services.',
    images: ['https://fraterny.com/og-image.png'],
    creator: '@frat_erny',
  },
};
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Quest — Open-ended Introspection',
  description: 'Private prompt flow that composes a personal fragment from the user’s written answers',
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
  name: 'Quest — Open-ended Introspection',
  description: 'Private prompt flow that composes a personal fragment from the user’s written answers',
  url: 'https://fraterny.com',
  logo: 'https://fraterny.com/favicon-32x32.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@fraterny.com',
    contactType: 'Customer Service',
  },
  sameAs: [
    'https://x.com/frat_erny',
    'https://linkedin.com/company/fraterny',
    'https://www.instagram.com/quest.fraterny/',
  ],
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Script
        id="website-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {children}
    </div>
  );
}
