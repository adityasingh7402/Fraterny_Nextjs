'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogHero from './components/BlogHero';
import BlogFilter from './components/BlogFilter';
import BlogList from './components/BlogList';
import { BlogPost } from './components/BlogCard';
import Navigation from '../website-navigation/components/Navigation';
import Footer from '../website-navigation/components/Footer';

const BlogPage = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const pageSize = 8;

  // Initialize filters from URL parameters
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    const categoryParam = searchParams.get('category');

    if (tagParam) setSelectedTag(tagParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [searchParams]);

  // Fetch blog posts
  const { data: postsData, isLoading: postsLoading, error: postsError, refetch: refetchPosts } = useQuery({
    queryKey: ['blogPosts', selectedCategory, selectedTag, searchQuery, currentPage, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString()
      });
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedTag) params.append('tag', selectedTag);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/public/blog?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: async () => {
      const response = await fetch('/api/public/blog?operation=categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    },
    staleTime: 10 * 60 * 1000,
  });

  // Fetch tags
  const { data: tagsData } = useQuery({
    queryKey: ['blogTags'],
    queryFn: async () => {
      const response = await fetch('/api/public/blog?operation=tags');
      if (!response.ok) throw new Error('Failed to fetch tags');
      return response.json();
    },
    staleTime: 10 * 60 * 1000,
  });

  const posts = postsData?.posts || [];
  const total = postsData?.total || 0;
  const totalPages = Math.ceil(total / pageSize);
  const categories = categoriesData?.categories || [];
  const tags = tagsData?.tags || [];

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTag, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <BlogHero totalPosts={total} />

      <div className="container mx-auto px-6 py-12">
        {/* Desktop Layout: Two Columns (Default) */}
        <div className="hidden sm:grid sm:grid-cols-3 sm:gap-8">
          {/* Left Column: Search + Blog List (Takes 2 columns) */}
          <div className="col-span-2 space-y-8">
            {/* Search Bar */}
            <BlogFilter
              categories={[]}
              tags={[]}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onSelectCategory={setSelectedCategory}
              onSelectTag={setSelectedTag}
              onSearch={setSearchQuery}
            />

            {/* Blog List */}
            <BlogList
              posts={posts}
              isLoading={postsLoading}
              error={postsError}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              setSelectedCategory={setSelectedCategory}
              setSelectedTag={setSelectedTag}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              refetch={refetchPosts}
            />
          </div>

          {/* Right Column: Filters (Takes 1 column) */}
          <div className="col-span-1">
            <BlogFilter
              categories={categories}
              tags={tags}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onSelectCategory={setSelectedCategory}
              onSelectTag={setSelectedTag}
              onSearch={() => { }}
              showOnlyFilters={true}
            />
          </div>
        </div>

        {/* Mobile Layout: Single Column */}
        <div className="sm:hidden space-y-6">
          {/* Upper Div: Search Bar + Filter Button */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
            {/* Search Bar */}
            <BlogFilter
              categories={[]}
              tags={[]}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onSelectCategory={setSelectedCategory}
              onSelectTag={setSelectedTag}
              onSearch={setSearchQuery}
            />

            {/* Filter Button at Bottom Right */}
            <div className="flex justify-end">
              <AnimatePresence mode="wait">
                {!isMobileFilterOpen && (
                  <motion.button
                    key="filter-button"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.15 } }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="h-12 px-6 flex items-center justify-center gap-2 bg-[#0a1a2e] text-white rounded-xl hover:bg-opacity-90 transition-colors duration-200"
                  >
                    <Filter className="h-5 w-5" />
                    <span className="font-gilroy-semibold">Filters</span>
                    {(selectedCategory || selectedTag) && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-1 h-5 w-5 flex items-center justify-center
                                   bg-white text-[#0a1a2e] text-xs font-semibold rounded-full"
                      >
                        !
                      </motion.span>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Filter Panel (Expanded) */}
          <AnimatePresence>
            {isMobileFilterOpen && (
              <motion.div
                key="filter-panel"
                initial={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95,
                  transition: {
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="p-5"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-gilroy-semibold text-[#0a1a2e]">Filters</h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg
                                 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Filter Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <BlogFilter
                      categories={categories}
                      tags={tags}
                      selectedCategory={selectedCategory}
                      selectedTag={selectedTag}
                      onSelectCategory={setSelectedCategory}
                      onSelectTag={setSelectedTag}
                      onSearch={() => { }}
                      showOnlyFilters={true}
                      compact={true}
                    />
                  </motion.div>

                  {/* Apply Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full mt-6 h-11 bg-[#0a1a2e] text-white font-gilroy-semibold
                               rounded-xl hover:bg-opacity-90 transition-colors duration-200"
                  >
                    Apply Filters
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blog List */}
          <BlogList
            posts={posts}
            isLoading={postsLoading}
            error={postsError}
            selectedCategory={selectedCategory}
            selectedTag={selectedTag}
            setSelectedCategory={setSelectedCategory}
            setSelectedTag={setSelectedTag}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            refetch={refetchPosts}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
