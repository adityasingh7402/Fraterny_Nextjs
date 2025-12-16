'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { Twitter, Facebook, Linkedin, Link as LinkIcon, Share2, Tag, ArrowLeft, Clock, X } from 'lucide-react';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import CommentSection from '../components/CommentSection';
import NewsletterSignup from '../components/NewsletterSignup';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  post: BlogPost;
};

export default function BlogPostClient({ post }: Props) {
  const [shareUrl, setShareUrl] = useState('');
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Set the share URL after component mounts on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isLightboxOpen]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  // Fetch related posts by tags
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      // If a specific tag is selected, use that; otherwise use post's tags
      const tagsToFilter = selectedTagFilter ? [selectedTagFilter] : post.tags;

      if (!tagsToFilter || tagsToFilter.length === 0) return;

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .overlaps('tags', tagsToFilter)
          .neq('id', post.id)
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) throw error;
        if (data) setRelatedPosts(data as BlogPost[]);
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };

    fetchRelatedPosts();
  }, [post.tags, post.id, selectedTagFilter]);

  // Fetch all available tags
  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('tags')
          .eq('published', true);

        if (error) throw error;

        if (data) {
          // Extract and flatten all tags, then get unique values
          const tagsSet = new Set<string>();
          data.forEach((post) => {
            if (post.tags && Array.isArray(post.tags)) {
              post.tags.forEach((tag: string) => tagsSet.add(tag));
            }
          });
          setAllTags(Array.from(tagsSet).sort());
        }
      } catch (err) {
        console.error('Error fetching all tags:', err);
      }
    };

    fetchAllTags();
  }, []);

  const sanitizeContent = (htmlContent: string): string => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return htmlContent;
    }

    let cleaned = htmlContent.replace(/\s*data-start="[^"]*"/g, '');
    cleaned = cleaned.replace(/\s*data-end="[^"]*"/g, '');

    const textarea = document.createElement('textarea');
    textarea.innerHTML = cleaned;
    cleaned = textarea.value;

    const sanitized = DOMPurify.sanitize(cleaned, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'hr', 'span', 'div', 'img', 'iframe'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen']
    });

    return sanitized;
  };

  const handleShare = (platform: string) => {
    if (typeof window === 'undefined') return;

    let url = '';
    const text = `Check out this article: ${post.title}`;

    // Copy link to clipboard for all platforms
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl).catch(err => {
        console.error('Failed to copy link:', err);
      });
    }

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        toast.success("Link copied! The article link has been copied to your clipboard.");
        return;
    }

    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      <article className="relative">
        {/* Hero Section */}
        <div className="pt-20 pb-32 lg:pt-24 lg:pb-48 px-4 sm:px-6 relative overflow-hidden" style={{ backgroundColor: '#0a1a2e' }}>
          <div className="absolute inset-0 opacity-90 pointer-events-none" style={{ background: 'linear-gradient(to bottom right, rgba(10, 26, 46, 0.95), rgba(10, 26, 46, 1))' }} />

          {/* Back button */}
          <div className="max-w-4xl mx-auto mb-8 relative z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-gilroy-bold text-white leading-tight tracking-tight mb-6 text-balance">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="max-w-xl mx-auto text-base text-white/70 font-gilroy-regular leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-20 lg:-mt-32 relative z-20 mb-16">
          {post.image_key && (
            <div
              className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-200 bg-gray-100 cursor-pointer group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <ResponsiveImage
                dynamicKey={post.image_key}
                alt={post.featured_image_alt || post.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="eager"
                priority={true}
                seoEnhanced={true}
              />
              {/* Click to view indicator - only show when lightbox is closed */}
              {!isLightboxOpen && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-gilroy-semibold bg-black/50 px-4 py-2 rounded-full">
                    Click to view full size
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex items-start">
          {/* Sticky Social Sidebar (Desktop) */}
          <div className="hidden lg:flex flex-col gap-4 sticky top-32 w-16 mr-8 items-center h-fit">
            <span className="text-xs font-semibold text-gray-500 rotate-90 whitespace-nowrap mb-8 w-4 tracking-wider">
              SHARE
            </span>
            <button
              onClick={() => handleShare('twitter')}
              className="p-3 rounded-full bg-white hover:bg-[#1DA1F2] hover:text-white transition-all text-gray-600 shadow-md border border-gray-200"
            >
              <Twitter size={18} />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-3 rounded-full bg-white hover:bg-[#1877F2] hover:text-white transition-all text-gray-600 shadow-md border border-gray-200"
            >
              <Facebook size={18} />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-3 rounded-full bg-white hover:bg-blue-700 hover:text-white transition-all text-gray-600 shadow-md border border-gray-200"
            >
              <Linkedin size={18} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="p-3 rounded-full bg-white hover:bg-[#1877F2] hover:text-white transition-all text-gray-600 shadow-md border border-gray-200"
            >
              <LinkIcon size={18} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full max-w-5xl mx-auto">
            {/* Mobile Share Bar */}
            <div className="lg:hidden flex items-center justify-between py-6 border-y border-gray-200 mb-8">
              <span className="text-sm font-gilroy-semibold text-navy flex items-center gap-2">
                <Share2 size={16} /> Share this article
              </span>
              <div className="flex gap-2">
                <button onClick={() => handleShare('twitter')} className="p-2 text-gray-600 hover:text-navy transition-colors">
                  <Twitter size={18} />
                </button>
                <button onClick={() => handleShare('facebook')} className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Facebook size={18} />
                </button>
                <button onClick={() => handleShare('linkedin')} className="p-2 text-gray-600 hover:text-blue-700 transition-colors">
                  <Linkedin size={18} />
                </button>
                <button onClick={() => handleShare('copy')} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <LinkIcon size={18} />
                </button>
              </div>
            </div>

            {/* Typography Content */}
            <div className="prose prose-lg max-w-none text-navy font-gilroy-regular
              [&>h1]:text-[2rem] [&>h1]:font-gilroy-bold [&>h1]:text-navy [&>h1]:mt-12 [&>h1]:mb-6 [&>h1]:leading-tight
              [&>h2]:text-2xl [&>h2]:font-gilroy-bold [&>h2]:text-navy [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-gray-200 [&>h2]:pb-3
              [&>h3]:text-xl [&>h3]:font-gilroy-semibold [&>h3]:text-navy [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:leading-relaxed [&>p]:text-gray-700 [&>p]:mb-6 [&>p]:font-gilroy-regular
              [&>blockquote]:border-l-4 [&>blockquote]:border-navy [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:my-8 [&>blockquote]:bg-gray-50 [&>blockquote]:py-4 [&>blockquote]:pr-6 [&>blockquote]:rounded-r-lg [&>blockquote]:font-gilroy-regular
              [&>ul]:my-6 [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-6
              [&>ul>li]:text-gray-700 [&>ul>li]:leading-relaxed [&>ul>li]:font-gilroy-regular
              [&>ol]:my-6 [&>ol]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6
              [&>ol>li]:text-gray-700 [&>ol>li]:leading-relaxed [&>ol>li]:font-gilroy-regular
              [&>a]:text-navy [&>a]:underline [&>a]:underline-offset-4 hover:[&>a]:text-navy/80 [&>a]:font-gilroy-regular
              [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
              [&>pre]:bg-gray-100 [&>pre]:rounded-xl [&>pre]:p-6 [&>pre]:overflow-x-auto
            ">
              {parse(sanitizeContent(post.content))}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-gilroy-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-default"
                    >
                      <Tag size={14} className="mr-2 text-navy" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-gilroy-bold text-navy mb-8">Discussion</h3>
              <CommentSection postId={post.id} />
            </div>
          </div>

          {/* Right Sidebar - Related Posts (Desktop Only) */}
          <div className="hidden lg:block w-80 ml-8">
            <div className="sticky top-32 space-y-6">
              {/* Related Posts Section */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-gilroy-bold text-navy flex items-center gap-2">
                      <Tag size={18} className="text-navy" />
                      {selectedTagFilter ? `Posts tagged: ${selectedTagFilter}` : 'Related Posts'}
                    </h3>
                    {selectedTagFilter && (
                      <button
                        onClick={() => setSelectedTagFilter(null)}
                        className="text-xs font-gilroy-medium text-gray-500 hover:text-navy transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="group block"
                      >
                        <article className="space-y-2">
                          {relatedPost.image_key && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                              <ResponsiveImage
                                dynamicKey={relatedPost.image_key}
                                alt={relatedPost.featured_image_alt || relatedPost.title}
                                sizes="300px"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <h4 className="font-gilroy-semibold text-navy text-sm leading-snug group-hover:text-navy/80 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          {relatedPost.reading_time && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 font-gilroy-regular">
                              <Clock size={12} />
                              {relatedPost.reading_time} min read
                            </div>
                          )}
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Browse All Tags Section */}
              {allTags.length > 0 && (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                  <h3 className="text-sm font-gilroy-bold text-navy mb-3 uppercase tracking-wide">
                    Browse by Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTagFilter(tag === selectedTagFilter ? null : tag)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-gilroy-medium transition-colors cursor-pointer ${tag === selectedTagFilter
                          ? 'bg-navy text-white border border-navy'
                          : post.tags?.includes(tag)
                            ? 'bg-gray-200 text-navy border border-gray-300'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-navy hover:text-navy'
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Newsletter Section */}
      <div className="mt-24 w-full bg-gray-50 border-t border-gray-200 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-gilroy-bold text-navy mb-4">Stay Inspired</h3>
          <p className="text-gray-700 font-gilroy-regular mb-8">Join our community to receive curated mental models and insights directly to your inbox.</p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {isLightboxOpen && post.image_key && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:rotate-90 backdrop-blur-md border border-white/20"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Image Container */}
          <div
            className="relative w-full h-screen flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
              <ResponsiveImage
                dynamicKey={post.image_key}
                alt={post.featured_image_alt || post.title}
                sizes="100vw"
                className="max-w-full max-h-screen w-auto h-auto object-contain rounded-lg shadow-2xl"
                loading="eager"
                priority={true}
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-gilroy-regular">
            Press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 font-gilroy-semibold">ESC</kbd> or click outside to close
          </div>
        </div>
      )}
    </div>
  );
}
