'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  reading_time: number | null;
  imageUrl: string;
  category: string;
  created_at: string;
}

const BlogScrollSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/public/quest-blogs');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">Loading posts...</p>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return null;
  }

  // Split posts into two rows
  const midPoint = Math.ceil(posts.length / 2);
  
  // Triple each row for seamless infinite scroll
  const topRow = [
    ...posts.slice(0, midPoint),
    ...posts.slice(0, midPoint),
    ...posts.slice(0, midPoint)
  ];
  
  const bottomRow = [
    ...posts.slice(midPoint),
    ...posts.slice(midPoint),
    ...posts.slice(midPoint)
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white overflow-hidden 
      [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]
      [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-16">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-gilroy-bold text-center mb-3 md:mb-4 leading-tight">
          Quest <span className="text-neutral-500">Insights</span>
        </h2>
        <p className="text-center text-gray-600 text-sm md:text-base font-gilroy-regular">
          Explore personality archetypes and behavioral psychology
        </p>
      </div>

      {/* Top Row - Left to Right (Faster, Wider) */}
      <div className="mb-4 md:mb-8">
        <motion.div
          className="flex gap-3 md:gap-6"
          animate={{
            x: [0, -2400],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {topRow.map((post, index) => (
            <div
              key={`top-${index}`}
              className="relative bg-neutral-900 rounded-lg md:rounded-xl overflow-hidden w-[420px] md:w-[480px] aspect-[4/5] flex-shrink-0 group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <Image
                src={post.imageUrl}
                fill
                sizes="(max-width: 768px) 420px, 480px"
                quality={85}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                alt={post.title}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-gilroy-semibold text-white mb-3">
                  {post.category}
                </span>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-gilroy-bold text-white leading-tight line-clamp-2">
                  {post.title}
                </h3>
                
                {/* Reading Time */}
                {post.reading_time && (
                  <p className="text-xs md:text-sm text-white/80 mt-2 font-gilroy-regular">
                    {post.reading_time} min read
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Row - Right to Left (Slower, Narrower) */}
      <div>
        <motion.div
          className="flex gap-3 md:gap-6"
          animate={{
            x: [-2200, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 65,
              ease: "linear",
            },
          }}
        >
          {bottomRow.map((post, index) => (
            <div
              key={`bottom-${index}`}
              className="relative bg-neutral-900 rounded-lg md:rounded-xl overflow-hidden w-[380px] md:w-[440px] aspect-[4/5] flex-shrink-0 group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <Image
                src={post.imageUrl}
                fill
                sizes="(max-width: 768px) 380px, 440px"
                quality={85}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                alt={post.title}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-gilroy-semibold text-white mb-3">
                  {post.category}
                </span>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-gilroy-bold text-white leading-tight line-clamp-2">
                  {post.title}
                </h3>
                
                {/* Reading Time */}
                {post.reading_time && (
                  <p className="text-xs md:text-sm text-white/80 mt-2 font-gilroy-regular">
                    {post.reading_time} min read
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogScrollSection;