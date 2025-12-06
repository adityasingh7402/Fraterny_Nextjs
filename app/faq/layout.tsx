import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ | Fraterny',
    description: 'Frequently Asked Questions about Fraterny, our ethos, and the Fraterny experience.',
    keywords: ['Fraterny', 'FAQ', 'Help', 'Questions', 'Support'],
    openGraph: {
        title: 'FAQ | Fraterny',
        description: 'Frequently Asked Questions about Fraterny.',
        url: 'https://fraterny.com/faq',
        siteName: 'Fraterny',
        type: 'website',
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
