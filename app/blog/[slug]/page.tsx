import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase-admin';
import BlogPostClient from './BlogPostClient';
import Navigation from '@/app/website-navigation/components/Navigation';
import Footer from '@/app/website-navigation/components/Footer';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  category: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  image_key: string | null;
  meta_description?: string | null;
  meta_keywords?: string[] | null;
  slug?: string | null;
  seo_title?: string | null;
  excerpt?: string | null;
  featured_image_alt?: string | null;
  social_image_key?: string | null;
  reading_time?: number | null;
};

type Props = {
  params: Promise<{ slug: string }>;
};

// Fetch blog post data (server-side)
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) return null;
    return data as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Helper function to get the full image URL for Open Graph
async function getImageUrl(imageKey: string | null): Promise<string> {
  if (!imageKey) {
    return 'https://fraterny.com/og-blog.jpg'; // Default fallback image
  }

  try {
    // Fetch the image data from the database to get the storage path
    const { data, error } = await supabaseAdmin
      .from('website_images')
      .select('storage_path')
      .eq('key', imageKey)
      .maybeSingle();

    if (error || !data || !data.storage_path) {
      console.error(`Error fetching image for key ${imageKey}:`, error);
      return 'https://fraterny.com/og-blog.jpg';
    }

    // Get the public URL from Supabase Storage
    const { data: urlData } = supabaseAdmin.storage
      .from('website-images')
      .getPublicUrl(data.storage_path);

    return urlData.publicUrl || 'https://fraterny.com/og-blog.jpg';
  } catch (err) {
    console.error('Error generating image URL:', err);
    return 'https://fraterny.com/og-blog.jpg';
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | FRAT Blog',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  const title = post.seo_title || post.title;
  const description = post.meta_description || post.excerpt || post.title;
  const keywords = post.meta_keywords || post.tags || [];

  // Get the proper image URL from Supabase Storage
  const imageKey = post.social_image_key || post.image_key;
  const imageUrl = await getImageUrl(imageKey);

  return {
    title: `${title} | FRAT Blog`,
    description,
    keywords,
    authors: [{ name: 'FRAT Team' }],

    openGraph: {
      title,
      description,
      url: `https://fraterny.com/blog/${post.slug}`,
      siteName: 'Fraterny',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ['FRAT Team'],
      tags: post.tags || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featured_image_alt || post.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@fratapp',
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://fraterny.com/blog/${post.slug}`,
    },
  };
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('slug')
      .eq('published', true);

    if (error || !data) return [];

    return data
      .filter((post) => post.slug)
      .map((post) => ({
        slug: post.slug!,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Server Component
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Serialize the post data to plain object for client component
  const serializedPost = JSON.parse(JSON.stringify(post));

  return (
    <div>
      <Navigation />
      <BlogPostClient post={serializedPost} />
      <Footer />
    </div>
  );
}
