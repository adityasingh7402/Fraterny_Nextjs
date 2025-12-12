import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affiliates - Partner with Fraterny',
    description: 'Join the Fraterny affiliate program and earn rewards by sharing transformative psychological experiences. Access your dashboard, track performance, and grow with us.',
    keywords: 'fraterny affiliates, affiliate program, partnership, earn rewards, referral program, influencer collaboration',

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
        canonical: '/affiliates',
    },

    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://fraterny.com/affiliates',
        title: 'Affiliates - Partner with Fraterny',
        description: 'Join the Fraterny affiliate program and earn rewards by sharing transformative experiences with your audience.',
        siteName: 'Fraterny',
        images: [
            {
                url: '/favicon-32x32.png',
                width: 1200,
                height: 630,
                alt: 'Fraterny Affiliate Program',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Affiliates - Partner with Fraterny',
        description: 'Join the Fraterny affiliate program and earn rewards by sharing transformative experiences.',
        images: ['/favicon-32x32.png'],
        creator: '@frat_erny',
    },
};

export default function AffiliatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
