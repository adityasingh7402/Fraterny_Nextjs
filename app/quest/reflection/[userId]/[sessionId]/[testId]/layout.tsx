// layout.tsx
import { Metadata } from 'next';

type Props = {
  params: {
    userId: string;
    sessionId: string;
    testId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Psyche File Preview | Quest Psychological File',
    description: 'View your Psyche Intelligence File uniquely designed for clarity and self understanding.',

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

    // Social media preview images
    openGraph: {
      title: 'Psyche File Preview',
      description: 'View your Psyche Intelligence File',
      type: 'website',
      images: [
        {
          url: '/og-image.png', // Create this as 1200x630 PNG
          width: 1200,
          height: 630,
          alt: 'Quest Results',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Psyche File Preview',
      description: 'View your Psyche Intelligence File',
      images: ['/twitter-image.png'], // Can be same as og-image.png
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function QuestResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {children}
    </div>
  );
}
