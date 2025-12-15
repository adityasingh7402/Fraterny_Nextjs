import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

export type BlogPost = {
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

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
  const baseDelay = index * 0.2;

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: baseDelay + (i * 0.1),
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as any
      }
    })
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: baseDelay + 0.1,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as any
      }
    }
  };

  return (
    <motion.div
      className="group flex flex-col h-full"
      whileHover={{
        y: -5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay: baseDelay,
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1] as any
        }
      }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col h-full"
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[16/9] overflow-hidden mb-4">
          {post.image_key ? (
            <motion.div
              className="w-full h-full bg-gray-200"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              <ResponsiveImage
                dynamicKey={post.image_key}
                alt={post.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                loading="lazy"
              />
            </motion.div>
          ) : (
            <motion.div
              className="w-full h-full bg-linear-to-br from-blue-100 to-purple-100"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1">
          {/* Tag Label */}
          {post.tags && post.tags.length > 0 && (
            <motion.p
              className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              style={{ fontFamily: 'Gilroy, sans-serif' }}
            >
              {post.tags[0]}
            </motion.p>
          )}

          {/* Title */}
          <motion.h2
            className="text-xl font-bold text-gray-900 mb-3 line-clamp-2"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}
          >
            {post.title}
          </motion.h2>

          {/* Footer with Date */}
          <motion.div
            className="flex items-center gap-2 text-sm text-gray-500"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            <span className="font-medium" style={{ fontFamily: 'Gilroy, sans-serif' }}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }).toUpperCase()}
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
