import type { Metadata } from 'next';
import Script  from 'next/script';

export const metadata: Metadata = {
  title: "Fratvilla - Mind Reset Retreats",
  description: "Condensing lifelong memories, lessons and friendships in 1 week",
  keywords: "Fraterny,Fratvilla,luxury,retreats,psychology",
  
  authors: [{ name: "Fraterny" }],
  creator: "Fraterny",
  publisher: "Fraterny",
  
  metadataBase: new URL('https://fraterny.com'), // Replace with your actual domain
  
  alternates: {
    canonical: '/',
  },
  
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
    title: "Fraterny - Mind Reset Retreats",
    description: "Condensing lifelong memories, lessons and friendships in 1 week.",
    type: "website",
    locale: "en_US",
    url: '/',
    siteName: "Fraterny",
    images: [
      {
        url: '/favicon-32x32.png', // Place your OG image in public folder
        width: 1200,
        height: 630,
        alt: 'Fraterny -  Mind Reset Retreats',
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Fraterny -  Mind Reset Retreats",
    description: "Condensing lifelong memories, lessons and friendships in 1 week.",
    images: ['/favicon-32x32.png'], // Place your Twitter image in public folder
    creator: '@fraterny', // Add your Twitter handle
  },
  
  verification: {
    google: 'your-google-verification-code', // Add after verifying in Google Search Console
    // yandex: 'your-yandex-verification-code',
    // other: 'your-other-verification-code',
  },
  
  icons: {
    icon: [
      { url: '/favicon-32x32.png' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/favicon-32x32.png' },
    ],
    shortcut: '/favicon.ico',
  },
  
  manifest: '/manifest.json',
};

export default function QuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fraterny',
    description: 'Condensing lifelong memories, lessons and friendships in 1 week.',
    url: 'https://fraterny.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://fraterny.in/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://x.com/frat_erny',
      'https://linkedin.com/company/fraterny',
      'https://www.instagram.com/fratvilla/',
    ],
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fraterny',
    description: 'Social Network for Developers',
    url: 'https://fraterny.com',
    logo: 'https://www.fraterny.com/og-image.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@fraterny.com',
      contactType: 'Fraterny Support',
    },
    sameAs: [
      'https://x.com/frat_erny',
      'https://linkedin.com/company/fraterny',
      'https://www.instagram.com/fratvilla/',
    ],
  };
  return (
      <div className=''>
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
