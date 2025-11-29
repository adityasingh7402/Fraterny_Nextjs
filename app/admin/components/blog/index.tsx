'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageHeader from './components/PageHeader';
import BlogForm from './components/BlogForm';
import TimelineView from './components/TimelineView';
import DateJumpModal from './components/DateJumpModal';
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
  const [isDateJumpOpen, setIsDateJumpOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Fetch blog posts for the selected date
  const fetchAdminBlogPosts = async () => {
    const url = `/api/admin/blog?date=${selectedDate}`;
    const response = await fetch(url);
    const result = await response.json();

    if (!result.success) throw new Error(result.error);
    return result.data as BlogPost[];
  };

  const { data: blogPosts, isLoading, error, refetch } = useQuery({
    queryKey: ['adminBlogPosts', selectedDate],
    queryFn: fetchAdminBlogPosts,
  });

  // Scroll to form when it's shown or editing changes
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showForm, editingId]);

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
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleFormSuccess = async () => {
    await refetch();
    setShowForm(false);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleDateJump = (date: string) => {
    setSelectedDate(date);
    setIsDateJumpOpen(false);
  };

  // Filter blog posts based on active tab
  const filteredBlogPosts = blogPosts?.filter(post => {
    if (activeTab === 'published') return post.published === true;
    if (activeTab === 'draft') return post.published === false;
    return true;
  });

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

      {/* Tabs with Jump to Date Button */}
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

            {/* Jump to Date Button */}
            <button
              onClick={() => setIsDateJumpOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Jump to Date
            </button>
          </div>
        </div>
      </div>

      {/* Timeline View */}
      <TimelineView
        blogPosts={filteredBlogPosts || []}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        refetch={refetch}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />

      {/* Date Jump Modal */}
      <DateJumpModal
        isOpen={isDateJumpOpen}
        onClose={() => setIsDateJumpOpen(false)}
        onDateSelect={handleDateJump}
        currentDate={selectedDate}
      />
    </div>
  );
};

export default AdminBlog;