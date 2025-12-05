import type { Metadata } from 'next';
import ClientProviders from './ClientProviders';

export const metadata: Metadata = {
  title: 'Blog | Fraterny - Insights on Personal Growth & Development',
  description: 'Explore articles on psychology, personal development, and growth insights from the Fraterny community.',
  keywords: ['blog', 'personal development', 'personality assessment', 'growth', 'Fraterny', 'self-improvement'],

  applicationName: 'Fraterny',
  authors: [{ name: 'Fraterny Team' }],
  creator: 'Fraterny',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: 'https://fraterny.com/blog',
  },

  openGraph: {
    title: 'Fraterny Blog - Personal Growth & Development',
    description: 'Explore insights on psychology, growth, and self-improvement',
    url: 'https://fraterny.com/blog',
    siteName: 'Fraterny',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://fraterny.com/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Fraterny Blog',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Fraterny Blog - Personal Growth & Development',
    description: 'Explore insights on psychology, growth, and self-improvement',
    creator: '@fratapp',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientProviders>{children}</ClientProviders>;
}
