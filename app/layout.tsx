import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth/cotexts/AuthContext";
import localFont from 'next/font/local'
import Script from 'next/script'
import { Toaster } from '@/components/ui/sonner';
import { GoogleTagManager } from '@next/third-parties/google'

const gilroyRegular = localFont({
  src: '../public/fonts/gillroy/Gilroy-Regular.ttf',
  variable: '--font-gilroy-regular',
  display: 'swap',
  preload: true,
})

const gilroyBold = localFont({
  src: '../public/fonts/gillroy/Gilroy-Bold.ttf',
  variable: '--font-gilroy-bold',
  display: 'swap',
  preload: true,
})

const gilroySemiBold = localFont({
  src: '../public/fonts/gillroy/Gilroy-SemiBold.ttf',
  variable: '--font-gilroy-semibold',
  display: 'swap',
  preload: true,
})

const gilroyMedium = localFont({
  src: '../public/fonts/gillroy/Gilroy-Medium.ttf',
  variable: '--font-gilroy-medium',
  display: 'swap',
  preload: true,
})

const gilroyExtraBold = localFont({
  src: '../public/fonts/gillroy/Gilroy-ExtraBold.ttf',
  variable: '--font-gilroy-extrabold',
  display: 'swap',
  preload: true,
})

const gilroyBlack = localFont({
  src: '../public/fonts/gillroy/Gilroy-Black.ttf',
  variable: '--font-gilroy-black',
  display: 'swap',
  preload: true,
})

const gilroyLight = localFont({
  src: '../public/fonts/gillroy/Gilroy-Light.ttf',
  variable: '--font-gilroy-light',
  display: 'swap',
  preload: true,
})

const gilroyHeavy = localFont({
  src: '../public/fonts/gillroy/Gilroy-Heavy.ttf',
  variable: '--font-gilroy-heavy',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Fraterny - Experience the Change in You",
  description: "Fraterny offers hyper-personalized identity evolution, mindset reframing and performance truth based on proven psychological frameworks.",
  keywords: "psychology,luxury,transformation,fraterny,quest,fratvilla",

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
    title: "Fraterny - Experience the Change in You",
    description: "Fraterny offers hyper-personalized identity evolution, mindset reframing and performance truth based on proven psychological frameworks.",
    type: "website",
    locale: "en_US",
    url: '/',
    siteName: "Fraterny",
    images: [
      {
        url: '/favicon-32x32.png', // Place your OG image in public folder
        width: 1200,
        height: 630,
        alt: 'Fraterny - Embracer the Growth Mindset',
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fraterny - Experience the Change in You",
    description: "Fraterny offers hyper-personalized identity evolution, mindset reframing and performance truth based on proven psychological frameworks.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fraterny',
    description: 'Fraterny - Experience the Change in You',
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
      'https://www.instagram.com/join.fraterny/',
    ],
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fraterny',
    description: 'Fraterny - Experience the Change in You',
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
      'https://www.instagram.com/join.fraterny/',
    ],
  };



  return (
    <html lang="en" style={{ overscrollBehavior: 'none' }}>
      <head>
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
      </head>
      <body
        style={{ backgroundColor: '#f9fafb', minHeight: '100vh', overscrollBehavior: 'none' }}
        className={`
          bg-gray-50
          ${gilroyRegular.variable}
          ${gilroyBold.variable}
          ${gilroySemiBold.variable}
          ${gilroyMedium.variable}
          ${gilroyExtraBold.variable}
          ${gilroyBlack.variable}
          ${gilroyLight.variable}
          ${gilroyHeavy.variable}
        `}
      >
        <GoogleTagManager gtmId="GTM-MPD3F25K" />

        <div className="">
          <AuthProvider>
            <Toaster position="top-right" />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
