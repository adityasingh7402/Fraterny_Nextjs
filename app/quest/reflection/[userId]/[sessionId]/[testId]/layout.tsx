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
    title: 'Your Quest Results | Personality Assessment',
    description: 'View your personalized Quest assessment results with detailed insights into your personality, strengths, and recommendations.',

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

    // Social media preview images
    openGraph: {
      title: 'Quest Assessment Results',
      description: 'Discover your personalized personality insights',
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
      title: 'Quest Assessment Results',
      description: 'Discover your personalized personality insights',
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