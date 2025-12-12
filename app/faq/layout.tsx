import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions - Fraterny',
    description: 'Find answers to common questions about the Fraterny experience, retreats, application process, and community. Everything you need to know before joining.',
    keywords: ['Fraterny', 'FAQ', 'frequently asked questions', 'help', 'support', 'retreat questions', 'application'],

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

    openGraph: {
        title: 'Frequently Asked Questions - Fraterny',
        description: 'Find answers to common questions about the Fraterny experience, retreats, and community.',
        url: 'https://fraterny.com/faq',
        siteName: 'Fraterny',
        type: 'website',
        images: [
            {
                url: '/favicon-32x32.png',
                width: 1200,
                height: 630,
                alt: 'Fraterny FAQ',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Frequently Asked Questions - Fraterny',
        description: 'Find answers to common questions about the Fraterny experience.',
        images: ['/favicon-32x32.png'],
        creator: '@frat_erny',
    },

    alternates: {
        canonical: 'https://fraterny.com/faq',
    },
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
