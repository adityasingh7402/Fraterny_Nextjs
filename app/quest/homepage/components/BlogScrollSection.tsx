'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
        console.log('Fetched blog posts:', data.posts);
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
    <section className="py-12 md:py-20 px-4 bg-white overflow-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-16">
        <div className="text-gray-500 uppercase tracking-widest text-xl font-gilroy-bold mb-4">What Mask are you wearing?</div>
        <h2 className="text-xl md:text-3xl mb-1 font-gilroy-semibold">You don’t wear one face. You wear three. Shaped by where you are, who you're with, and where you're headed.</h2>
        <p className="text-lg text-neutral-700 mb-8 leading-relaxed font-gilroy-medium hidden md:block">
            The system breaks the landscape of behavior into six clusters. Each cluster contains 5 to 6 Masks - distinct archetypes with their own rules, instincts, and decision styles.
        </p>
        <div className="mb-8">
          <Link href="/quest/quest-mode">
            <button className='px-7 py-3 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-xl'>Enter Quest Mode</button>
          </Link>
        </div>
      </div>

      {/* Top Row - Left to Right (Faster, Wider) */}
      <div className="mb-4 md:mb-8">
        <motion.div
          className="flex gap-3 md:gap-6"
          animate={{
            x: [0, -1800],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {topRow.map((post, index) => (
            <div
              key={`top-${index}`}
              className="relative bg-neutral-900 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative w-[420px] md:w-[480px] rounded-2xl overflow-hidden shadow-2xl bg-neutral-700 aspect-video">
                    <Image
                    src={post.imageUrl}
                    alt="Feature Image"
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 p-1 rounded-[12px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                    
                </div>
                
              
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
              </Link>
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
              className="relative bg-neutral-900 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300">

              <Link href={`/blog/${post.slug}`}>
                <div className="relative w-[420px] md:w-[480px] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 aspect-video">
                    <Image
                    src={post.imageUrl}
                    alt="Feature Image"
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 p-1 rounded-[12px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                </div>
              
              
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
                </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogScrollSection;