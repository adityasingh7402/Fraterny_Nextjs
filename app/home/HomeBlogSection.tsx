"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    reading_time?: number;
    image_key?: string;
    social_image_key?: string;
    created_at: string;
    category?: string;
    imageUrl?: string;
}

function HomeBlogSection() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch('/api/public/home-blogs');
                
                if (response.ok) {
                    const { posts } = await response.json();
                    if (posts && posts.length > 0) {
                        // Limit to 6 posts for the layout (1 featured + 5 smaller)
                        setPosts(posts.slice(0, 6));
                    }
                } else {
                    console.error('Failed to fetch blogs:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className='container mx-auto px-4 sm:px-6 md:px-8'>
                <div className='flex flex-col items-center justify-center py-20'>
                    <p className='text-muted-foreground'>Loading blogs...</p>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return null;
    }

    const featuredPost = posts[0];
    const smallerPosts = posts.slice(1, 4);

    return (
        <div className='container mx-auto px-4 sm:px-6 md:px-8 py-20 sm:py-24'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center pb-8 sm:pb-12 gap-4'>
                <h2 
                    className="text-5xl sm:text-6xl md:text-7xl font-gilroy-semibold text-neutral-500 tracking-tight"
                >
                    Fresh Insights and ideas. { " " }<br /><span className="text-neutral-900">from Fraterny</span>
                </h2>
                <Link
                    href="/blog"
                    className='flex flex-row gap-5 items-center justify-center px-7 py-3 mt-8 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'
                >
                    View All Posts
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            <div className='p-3 sm:p-4 border rounded-3xl shadow-lg bg-accent/50 backdrop-blur-sm'>
                <div className='flex flex-col lg:flex-row justify-between gap-4 lg:gap-6'>
                    {/* Featured Post */}
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <Link href={`/blog/${featuredPost.slug}`} className='group'>
                            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 w-full gap-2'>
                                <div className='flex flex-row items-center gap-2'>
                                    {/* {featuredPost.category && (
                                        <h2 className='text-base sm:text-lg lg:text-xl text-primary font-semibold'>
                                            {featuredPost.category}
                                        </h2>
                                    )} */}
                                    <p className='text-muted-foreground text-base sm:text-lg lg:text-xl font-gilroy-regular'>
                                        {formatDate(featuredPost.created_at)}
                                    </p>
                                </div>

                                {featuredPost.reading_time && (
                                    <div className='flex flex-row items-center'>
                                        <p className='text-muted-foreground text-base sm:text-lg lg:text-xl font-gilroy-bold'>
                                            {featuredPost.reading_time} min read
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            <h1 className='text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 text-foreground group-hover:text-primary transition-colors font-gilroy-bold'>
                                {featuredPost.title}
                            </h1>
                            
                            {featuredPost.excerpt && (
                                <p className='text-base sm:text-lg text-muted-foreground mb-4 line-clamp-2 font-gilroy-semibold'>
                                    {featuredPost.excerpt}
                                </p>
                            )}
                            
                            <div className='rounded-2xl sm:rounded-3xl p-2 bg-background border border-border overflow-hidden'>
                                <img
                                    src={featuredPost.imageUrl || 'https://fraterny.com/og-blog.jpg'}
                                    alt={featuredPost.title}
                                    className='w-full h-auto rounded-[12px] sm:rounded-[16px] transition-transform duration-500'
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Smaller Posts */}
                    <div className='flex flex-col w-full lg:w-1/2 gap-4 sm:gap-6'>
                        {smallerPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className='group'>
                                <div className='flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4'>
                                    <div className='rounded-2xl sm:rounded-3xl p-2 bg-background border border-border w-full sm:w-1/2 order-2 sm:order-1 overflow-hidden'>
                                        <img
                                            src={post.imageUrl || 'https://fraterny.com/og-blog.jpg'}
                                            alt={post.title}
                                            className='w-full h-auto rounded-[12px] sm:rounded-[16px] transition-transform duration-500'
                                        />
                                    </div>
                                    
                                    <div className='w-full sm:w-2/3 flex flex-col order-1 sm:order-2'>
                                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 w-full gap-1 sm:gap-2'>
                                            <div className='flex flex-row items-center gap-2'>
                                                {/* {post.category && (
                                                    <h2 className='text-sm sm:text-base lg:text-lg text-primary font-semibold'>
                                                        {post.category}
                                                    </h2>
                                                )} */}
                                                <p className='text-muted-foreground text-sm sm:text-base lg:text-lg font-gilroy-regular'>
                                                    {formatDate(post.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <h3 className='text-lg sm:text-xl lg:text-2xl mb-2 text-foreground group-hover:text-primary transition-colors font-gilroy-bold line-clamp-2'>
                                            {post.title}
                                        </h3>
                                        
                                        {post.excerpt && (
                                            <p className='text-sm sm:text-base text-muted-foreground font-gilroy-semibold mb-2 line-clamp-2'>
                                                {post.excerpt}
                                            </p>
                                        )}
                                        
                                        {post.reading_time && (
                                            <p className='text-xs sm:text-sm text-muted-foreground'>
                                                {post.reading_time} min read
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeBlogSection;