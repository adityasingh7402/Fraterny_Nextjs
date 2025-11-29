'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { toast } from 'sonner';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import BlogPreviewModal from './BlogPreviewModal';
import { BlogPost } from '../types';

interface TimelineViewProps {
    blogPosts: BlogPost[];
    isLoading: boolean;
    error: Error | unknown | null;
    onEdit: (post: BlogPost) => void;
    refetch: () => void;
    selectedDate: string;
    onDateChange: (date: string) => void;
}

// Time slots configuration
const TIME_SLOTS = [
    { label: '10:00 AM', hour: 10, startHour: 0, endHour: 12 },
    { label: '2:00 PM', hour: 14, startHour: 12, endHour: 18 },
    { label: '6:00 PM', hour: 18, startHour: 18, endHour: 22 },
    { label: '10:00 PM', hour: 22, startHour: 22, endHour: 24 },
];

const TimelineView = ({
    blogPosts,
    isLoading,
    error,
    onEdit,
    refetch,
    selectedDate,
    onDateChange,
}: TimelineViewProps) => {
    const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handlePreview = (post: BlogPost) => {
        setPreviewPost(post);
        setIsPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
        setTimeout(() => setPreviewPost(null), 300);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const response = await fetch(`/api/admin/blog?id=${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (!result.success) throw new Error(result.error);

            await refetch();
            toast.success('Blog post deleted successfully');
        } catch (error) {
            console.error('Error deleting blog post:', error);
            toast.error('Failed to delete blog post');
        }
    };

    const handleTogglePublish = async (post: BlogPost) => {
        const newStatus = !post.published;
        const actionText = newStatus ? 'publish' : 'unpublish';

        try {
            const response = await fetch('/api/admin/blog', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    category: post.category,
                    tags: post.tags,
                    published: newStatus,
                    image_key: post.image_key,
                    meta_description: post.meta_description,
                    meta_keywords: post.meta_keywords,
                    slug: post.slug,
                    seo_title: post.seo_title,
                    excerpt: post.excerpt,
                    featured_image_alt: post.featured_image_alt,
                    social_image_key: post.social_image_key,
                    reading_time: post.reading_time,
                }),
            });
            const result = await response.json();

            if (!result.success) throw new Error(result.error);

            await refetch();
            toast.success(`Blog post ${actionText}ed successfully`);
        } catch (error) {
            console.error(`Error ${actionText}ing blog post:`, error);
            toast.error(`Failed to ${actionText} blog post`);
        }
    };

    // Parse PostgreSQL array format tags
    const parseTags = (tags: any): string[] => {
        if (Array.isArray(tags)) return tags;
        if (!tags) return [];
        if (typeof tags === 'string') {
            const cleaned = tags.replace(/^{|}$/g, '');
            if (!cleaned) return [];
            return cleaned.match(/(?:[^,"]+|"[^"]*")+/g)?.map(s => s.replace(/^"|"$/g, '').trim()) || [];
        }
        return [];
    };

    // Group blogs by time slot based on created_at
    const groupBlogsByTimeSlot = () => {
        const grouped: { [key: string]: BlogPost[] } = {};

        TIME_SLOTS.forEach(slot => {
            grouped[slot.label] = [];
        });

        blogPosts.forEach(post => {
            const postDate = new Date(post.created_at);
            const postHour = postDate.getHours();

            const slot = TIME_SLOTS.find(
                s => postHour >= s.startHour && postHour < s.endHour
            );

            if (slot) {
                grouped[slot.label].push(post);
            }
        });

        return grouped;
    };

    // Navigate to previous/next date
    const navigateDate = (direction: 'prev' | 'next') => {
        const currentDate = new Date(selectedDate);
        if (direction === 'prev') {
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        onDateChange(currentDate.toISOString().split('T')[0]);
    };

    // Generate date pagination items
    const getDatePaginationItems = () => {
        const items: string[] = [];
        const currentDate = new Date(selectedDate);

        for (let i = 3; i > 0; i--) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            items.push(date.toISOString().split('T')[0]);
        }

        items.push(selectedDate);

        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        items.push(nextDate.toISOString().split('T')[0]);

        return items;
    };

    const formatDateDisplay = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const compareDate = new Date(dateStr);
        compareDate.setHours(0, 0, 0, 0);

        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(/ /g, ' ');

        if (compareDate.getTime() === today.getTime()) {
            return `Today - ${formattedDate}`;
        }

        return formattedDate;
    };


    const formatPaginationDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.getDate();
    };

    const groupedBlogs = groupBlogsByTimeSlot();
    const paginationItems = getDatePaginationItems();

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Date Header */}
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-navy text-start">
                    {formatDateDisplay(selectedDate)}
                </h2>
            </div>

            {/* Timeline Content */}
            <div className="divide-y divide-gray-200">
                {isLoading ? (
                    <div className="p-12 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
                        Loading blog posts...
                    </div>
                ) : error ? (
                    <div className="p-12 text-center text-red-600">
                        Failed to load blog posts
                    </div>
                ) : (
                    TIME_SLOTS.map(slot => {
                        const slotBlogs = groupedBlogs[slot.label];
                        const hasMinimum = slotBlogs.length >= 5;

                        return (
                            <div key={slot.label} className="p-6">
                                {/* Time Slot Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="text-navy" size={24} />
                                    <h3 className="text-xl font-semibold text-navy">
                                        {slot.label}
                                    </h3>
                                    <span
                                        className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${hasMinimum
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'
                                            }`}
                                    >
                                        {slotBlogs.length} {slotBlogs.length === 1 ? 'blog' : 'blogs'}
                                        {!hasMinimum && ' (min 5 recommended)'}
                                    </span>
                                </div>

                                {/* Blog Posts - 2 Column Grid */}
                                {slotBlogs.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
                                        No blogs in this time slot
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {slotBlogs.map(post => {
                                            const postTags = parseTags(post.tags);

                                            // Check if post was updated (more than 1 minute difference)
                                            const createdTime = new Date(post.created_at).getTime();
                                            const updatedTime = new Date(post.updated_at).getTime();
                                            const wasUpdated = Math.abs(updatedTime - createdTime) > 60000;

                                            return (
                                                <div
                                                    key={post.id}
                                                    className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                                                >
                                                    {/* Thumbnail */}
                                                    {post.image_key ? (
                                                        <div className="w-full h-32 rounded overflow-hidden bg-gray-200 mb-3">
                                                            <ResponsiveImage
                                                                dynamicKey={post.image_key}
                                                                alt={post.title}
                                                                sizes="small"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-32 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-sm mb-3">
                                                            No image
                                                        </div>
                                                    )}

                                                    {/* Content */}
                                                    <div className="flex-grow">
                                                        <h4 className="text-base font-medium text-gray-900 line-clamp-2 mb-2">
                                                            {post.title}
                                                        </h4>

                                                        {/* Category */}
                                                        {post.category && (
                                                            <div className="mb-2">
                                                                <span className="px-2 py-0.5 bg-navy bg-opacity-10 text-navy text-xs rounded">
                                                                    {post.category}
                                                                </span>
                                                            </div>
                                                        )}

                                                        {/* Timestamps - Created and Updated */}
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 flex-wrap">
                                                            <span className="flex items-center gap-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <circle cx="12" cy="12" r="10"></circle>
                                                                    <polyline points="12 6 12 12 16 14"></polyline>
                                                                </svg>
                                                                {new Date(post.created_at).toLocaleTimeString('en-US', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                })}
                                                            </span>

                                                            {/* Show updated time if different from created time */}
                                                            {wasUpdated && (
                                                                <>
                                                                    <span className="text-gray-300">•</span>
                                                                    <span className="flex items-center gap-1 text-orange-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                            <polyline points="23 4 23 10 17 10"></polyline>
                                                                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                                                                        </svg>
                                                                        Updated: {new Date(post.updated_at).toLocaleTimeString('en-US', {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                        })}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Tags */}
                                                        {postTags.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mb-3">
                                                                {postTags.map((tag, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-300">
                                                        <button
                                                            onClick={() => handlePreview(post)}
                                                            className="text-xs text-blue-600 hover:underline"
                                                        >
                                                            Preview
                                                        </button>
                                                        <span className="text-gray-300">•</span>
                                                        <button
                                                            onClick={() => handleTogglePublish(post)}
                                                            className={`text-xs ${post.published ? 'text-orange-600' : 'text-green-600'
                                                                } hover:underline`}
                                                        >
                                                            {post.published ? 'Unpublish' : 'Publish'}
                                                        </button>
                                                        <span className="text-gray-300">•</span>
                                                        <button
                                                            onClick={() => onEdit(post)}
                                                            className="text-xs text-navy hover:underline"
                                                        >
                                                            Edit
                                                        </button>
                                                        <span className="text-gray-300">•</span>
                                                        <button
                                                            onClick={() => handleDelete(post.id)}
                                                            className="text-xs text-red-600 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Date Pagination */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => navigateDate('prev')}
                        className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                        aria-label="Previous day"
                    >
                        <ChevronLeft size={20} className="text-gray-600" />
                    </button>

                    {paginationItems.map((dateStr) => {
                        const isActive = dateStr === selectedDate;
                        const isToday =
                            dateStr === new Date().toISOString().split('T')[0];

                        return (
                            <button
                                key={dateStr}
                                onClick={() => onDateChange(dateStr)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                    ? 'bg-navy text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                    }`}
                            >
                                {isToday && !isActive ? (
                                    <span className="flex flex-col items-center">
                                        <span className="text-xs text-gray-500">Today</span>
                                        <span>{formatPaginationDate(dateStr)}</span>
                                    </span>
                                ) : (
                                    formatPaginationDate(dateStr)
                                )}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => navigateDate('next')}
                        className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                        aria-label="Next day"
                    >
                        <ChevronRight size={20} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Preview Modal */}
            {previewPost && (
                <BlogPreviewModal
                    post={previewPost}
                    isOpen={isPreviewOpen}
                    onClose={handleClosePreview}
                />
            )}
        </div>
    );
};

export default TimelineView;
