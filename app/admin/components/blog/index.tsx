'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageHeader from './components/PageHeader';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import DateFilter from './components/DateFilter';
import { BlogFormValues, BlogPost } from './types';

type TabType = 'published' | 'draft';

const AdminBlog = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formValues, setFormValues] = useState<BlogFormValues>({
    title: '',
    content: '',
    category: '',
    tags: [],
    published: true,
    image_key: null,
    meta_description: '',
    meta_keywords: [],
    slug: '',
    seo_title: '',
    excerpt: '',
    featured_image_alt: '',
    social_image_key: null,
    reading_time: 0,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('published');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<{ startDate: string | null; endDate: string | null }>({
    startDate: null,
    endDate: null,
  });

  // Get today's date range for draft default filter
  const getTodayDateRange = () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
    return { startOfDay, endOfDay };
  };

  // Use React Query hook for fetching all blog posts (including unpublished)
  const fetchAdminBlogPosts = async () => {
    let url = '/api/admin/blog';
    const params = new URLSearchParams();

    // For draft tab, apply today's filter by default if no custom filter is set
    if (activeTab === 'draft' && !dateFilter.startDate && !dateFilter.endDate) {
      const { startOfDay } = getTodayDateRange();
      params.append('startDate', startOfDay.split('T')[0]);
      params.append('endDate', new Date().toISOString().split('T')[0]);
    } else if (dateFilter.startDate || dateFilter.endDate) {
      // Apply custom date filter
      if (dateFilter.startDate) params.append('startDate', dateFilter.startDate);
      if (dateFilter.endDate) params.append('endDate', dateFilter.endDate);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const result = await response.json();

    if (!result.success) throw new Error(result.error);
    return result.data as BlogPost[];
  };

  const { data: blogPosts, isLoading, error, refetch } = useQuery({
    queryKey: ['adminBlogPosts', activeTab, dateFilter],
    queryFn: fetchAdminBlogPosts,
  });

  // Scroll to form when it's shown or editing changes
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showForm, editingId]);

  // Reset date filter when switching tabs
  useEffect(() => {
    setDateFilter({ startDate: null, endDate: null });
  }, [activeTab]);

  const handleEdit = (post: BlogPost) => {
    setFormValues({
      title: post.title,
      content: post.content,
      category: post.category || '',
      tags: post.tags || [],
      published: post.published,
      image_key: post.image_key || null,
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords || [],
      slug: post.slug || '',
      seo_title: post.seo_title || '',
      excerpt: post.excerpt || '',
      featured_image_alt: post.featured_image_alt || '',
      social_image_key: post.social_image_key || null,
      reading_time: post.reading_time || 0,
    });
    setEditingId(post.id);
    setShowForm(true);
    // Scroll to form after state update
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleNewPost = () => {
    setFormValues({
      title: '',
      content: '',
      category: '',
      tags: [],
      published: true,
      image_key: null,
      meta_description: '',
      meta_keywords: [],
      slug: '',
      seo_title: '',
      excerpt: '',
      featured_image_alt: '',
      social_image_key: null,
      reading_time: 0,
    });
    setEditingId(null);
    setShowForm(true);
    // Scroll to form after state update
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleFormSuccess = async () => {
    // Refetch admin posts
    await refetch();
    setShowForm(false);
  };

  const handleDateFilterChange = (startDate: string | null, endDate: string | null) => {
    setDateFilter({ startDate, endDate });
  };

  // Filter blog posts based on active tab
  const filteredBlogPosts = blogPosts?.filter(post => {
    if (activeTab === 'published') return post.published === true;
    if (activeTab === 'draft') return post.published === false;
    return true;
  });

  // Check if filter is active
  const isFilterActive = dateFilter.startDate !== null || dateFilter.endDate !== null;

  return (
    <div className="p-8">
      <PageHeader onNewPostClick={handleNewPost} />

      {showForm && (
        <div ref={formRef}>
          <BlogForm
            editingId={editingId}
            formValues={formValues}
            setFormValues={setFormValues}
            setEditingId={setEditingId}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}

      {/* Tabs with Filter Button */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('published')}
                className={`${activeTab === 'published'
                    ? 'border-navy text-navy'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                Published
                {blogPosts && (
                  <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100">
                    {blogPosts.filter(p => p.published).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('draft')}
                className={`${activeTab === 'draft'
                    ? 'border-navy text-navy'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                Draft
                {blogPosts && (
                  <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100">
                    {blogPosts.filter(p => !p.published).length}
                  </span>
                )}
              </button>
            </nav>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isFilterActive
                  ? 'bg-navy text-white hover:bg-opacity-90'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Date Filter
              {isFilterActive && (
                <span className="ml-1 w-2 h-2 bg-white rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <BlogList
        blogPosts={filteredBlogPosts || null}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        refetch={refetch}
      />

      {/* Date Filter Modal */}
      <DateFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleDateFilterChange}
        showTodayIndicator={activeTab === 'draft' && !dateFilter.startDate && !dateFilter.endDate}
      />
    </div>
  );
};

export default AdminBlog;