import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Filter, Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogFilterProps {
  categories: string[];
  tags: string[];
  selectedCategory: string | null;
  selectedTag: string | null;
  onSelectCategory: (category: string | null) => void;
  onSelectTag: (tag: string | null) => void;
  onSearch: (query: string) => void;
  showOnlyFilters?: boolean;
  compact?: boolean;
}

const BlogFilter: React.FC<BlogFilterProps> = ({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onSelectCategory,
  onSelectTag,
  onSearch,
  showOnlyFilters = false,
  compact = false
}) => {
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const slideFromLeft = {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: delay * 0.1,
        ease: [0.42, 0, 0.58, 1] as const
      }
    })
  };

  // If showing only filters and there are none, return null
  if (showOnlyFilters && categories.length === 0 && tags.length === 0) {
    return null;
  }

  // If NOT showing only filters, render only the search bar
  if (!showOnlyFilters) {
    return (
      <motion.div
        className="bg-white rounded-lg lg:p-6 sm:p-0"
        variants={slideFromLeft}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        {/* Search Section */}
        <motion.div
          variants={slideFromLeft}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-navy" />
            <h2 className="text-xl font-gilroy-semibold text-navy">Search Posts</h2>
          </div>
          <Input
            type="search"
            placeholder="Search blog posts..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full font-gilroy-regular py-6"
          />
        </motion.div>
      </motion.div>
    );
  }

  // Render only filters (categories and tags) when showOnlyFilters is true
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm ${compact ? 'p-4 space-y-4' : 'p-6 space-y-6'}`}
      variants={slideFromLeft}
      custom={0}
      initial="hidden"
      animate="visible"
    >
      {/* Categories Section */}
      {categories.length > 0 && (
        <motion.div
          variants={slideFromLeft}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          <div className={`flex items-center ${compact ? 'gap-1.5 mb-2' : 'gap-2 mb-4'}`}>
            <Filter className={compact ? 'h-4 w-4 text-navy' : 'h-5 w-5 text-navy'} />
            <h2 className={`font-gilroy-semibold text-navy ${compact ? 'text-base' : 'text-xl'}`}>Filter by Category</h2>
          </div>

          <div className={`flex flex-wrap ${compact ? 'gap-2' : 'gap-3'}`}>
            <motion.button
              className={`rounded-full font-gilroy-regular transition-colors duration-200 ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} ${!selectedCategory
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              onClick={() => onSelectCategory(null)}
              variants={slideFromLeft}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              All Categories
            </motion.button>

            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`rounded-full font-gilroy-regular transition-colors duration-200 ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} ${selectedCategory === category
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => onSelectCategory(category)}
                variants={slideFromLeft}
                custom={3 + index}
                initial="hidden"
                animate="visible"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tags Section */}
      {tags.length > 0 && (
        <motion.div
          className={categories.length > 0 ? (compact ? "pt-4 border-t border-gray-200" : "pt-6 border-t border-gray-200") : ""}
          variants={slideFromLeft}
          custom={3 + categories.length}
          initial="hidden"
          animate="visible"
        >
          <div className={`flex items-center ${compact ? 'gap-1.5 mb-2' : 'gap-2 mb-4'}`}>
            <Tag className={compact ? 'h-4 w-4 text-black' : 'h-5 w-5 text-black'} />
            <h2 className={`font-gilroy-semibold text-navy ${compact ? 'text-base' : 'text-xl'}`}>Filter by Tags</h2>
          </div>

          {/* Button Grid for all tags */}
          <div className="flex flex-wrap gap-2">
            <motion.button
              className={`inline-flex items-center rounded-full font-medium transition-colors duration-200 ${compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'} ${!selectedTag
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              onClick={() => onSelectTag(null)}
              variants={slideFromLeft}
              custom={4 + categories.length}
              initial="hidden"
              animate="visible"
            >
              All Tags
            </motion.button>

            {tags.map((tag, index) => (
              <motion.button
                key={tag}
                className={`inline-flex items-center rounded-full font-medium transition-colors duration-200 font-gilroy-regular ${compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'} ${selectedTag === tag
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => onSelectTag(tag)}
                variants={slideFromLeft}
                custom={5 + categories.length + index}
                initial="hidden"
                animate="visible"
              >
                <Tag size={compact ? 12 : 14} className={compact ? 'mr-1' : 'mr-1.5'} />
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BlogFilter;
