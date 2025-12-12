import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Know Quest - Understand Your Psychological Journey | Fraterny',
    description: 'Learn about Fraterny Quest - a sophisticated psychological assessment tool that helps you discover your identity, behavioral patterns, and personal archetypes through introspective exploration.',
    keywords: 'fraterny quest, psychological assessment, self-discovery, personal development, identity exploration, behavioral analysis, psychological framework',

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
        canonical: '/know-quest',
    },

    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://fraterny.com/know-quest',
        title: 'Know Quest - Understand Your Psychological Journey | Fraterny',
        description: 'Discover how Fraterny Quest uses proven psychological frameworks to reveal your unique identity patterns and behavioral insights.',
        siteName: 'Fraterny',
        images: [
            {
                url: '/favicon-32x32.png',
                width: 1200,
                height: 630,
                alt: 'Know Quest - Fraterny',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Know Quest - Understand Your Psychological Journey | Fraterny',
        description: 'Discover how Fraterny Quest uses proven psychological frameworks to reveal your unique identity patterns.',
        images: ['/favicon-32x32.png'],
        creator: '@frat_erny',
    },
};

export default function KnowQuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
