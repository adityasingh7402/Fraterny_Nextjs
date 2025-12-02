'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

// Type definition based on the API response
type PageSectionImage = {
    id: string;
    section_id: string;
    image_id: string;
    sort_order: number;
    website_images: {
        id: string;
        key: string;
        storage_path: string;
        alt_text: string | null;
        category: string | null;
        width: number | null;
        height: number | null;
    };
    // Added based on new JSX usage
    page_sections?: {
        section_key: string;
    } | null;
};

export default function ImageLoadDemo() {
    // Section Key State
    const [sectionImages, setSectionImages] = useState<PageSectionImage[]>([]);
    const [sectionLoading, setSectionLoading] = useState(false);
    const [sectionError, setSectionError] = useState<string | null>(null);
    const [sectionKey, setSectionKey] = useState('feature_box');

    // Page Slug State
    const [pageImages, setPageImages] = useState<PageSectionImage[]>([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [pageError, setPageError] = useState<string | null>(null);
    const [pageSlug, setPageSlug] = useState('quest-landing');
    const [pageMeta, setPageMeta] = useState<{ pageName: string; totalImages: number } | null>(null);

    const fetchSectionImages = async () => {
        setSectionLoading(true);
        setSectionError(null);
        try {
            const response = await fetch(`/api/admin/page-section-images?sectionKey=${sectionKey}`);
            const result = await response.json();

            if (result.success) {
                setSectionImages(result.data);
            } else {
                setSectionError(result.error || 'Failed to fetch images');
                setSectionImages([]);
            }
        } catch (err) {
            console.error('Error fetching section images:', err);
            setSectionError('An unexpected error occurred');
            setSectionImages([]);
        } finally {
            setSectionLoading(false);
        }
    };

    const fetchPageImages = async () => {
        setPageLoading(true);
        setPageError(null);
        setPageMeta(null);
        try {
            const response = await fetch(`/api/admin/page-images?slug=${pageSlug}`);
            const result = await response.json();

            if (result.success) {
                setPageImages(result.data);
                setPageMeta(result.meta);
            } else {
                setPageError(result.error || 'Failed to fetch page images');
                setPageImages([]);
            }
        } catch (err) {
            console.error('Error fetching page images:', err);
            setPageError('An unexpected error occurred');
            setPageImages([]);
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        fetchSectionImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getImageUrl = (path: string) => {
        if (!path) return '';
        const { data } = supabase.storage
            .from('website-images')
            .getPublicUrl(path);
        return data.publicUrl;
    };

    const renderImageGrid = (images: PageSectionImage[]) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((item) => {
                const img = item.website_images;
                if (!img || !img.storage_path) return null;

                const imageUrl = getImageUrl(img.storage_path);

                return (
                    <div key={item.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className="aspect-video relative bg-gray-100">
                            <Image
                                src={imageUrl}
                                alt={img.alt_text || 'Demo Image'}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={true}
                                unoptimized
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-medium text-gray-900 truncate">{img.key}</p>
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-gray-500">
                                    Sort: {item.sort_order}
                                </p>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                    {item.page_sections?.section_key || 'Unknown Section'}
                                </span>
                            </div>
                            <div className="mt-2 text-xs text-gray-400 font-mono truncate">
                                ID: {img.id}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <h1 className="text-3xl font-bold text-gray-900">Fast Image Loading Demo</h1>

                {/* Section 1: Load by Section Key */}
                <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        </span>
                        Load by Section Key
                    </h2>

                    <div className="flex gap-4 mb-6">
                        <div className="flex-1">
                            <label htmlFor="sectionKey" className="block text-sm font-medium text-gray-700 mb-1">
                                Section Key
                            </label>
                            <input
                                type="text"
                                id="sectionKey"
                                value={sectionKey}
                                onChange={(e) => setSectionKey(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter section key (e.g., feature_box)"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={fetchSectionImages}
                                disabled={sectionLoading}
                                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                            >
                                {sectionLoading ? 'Loading...' : 'Load Section Images'}
                            </button>
                        </div>
                    </div>

                    {sectionLoading ? (
                        <div className="flex items-center gap-2 text-blue-600 py-4">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Fetching images...</span>
                        </div>
                    ) : sectionError ? (
                        <div className="text-red-600 py-4">Error: {sectionError}</div>
                    ) : (
                        <>
                            <div className="text-green-600 mb-4 text-sm font-medium">
                                Found {sectionImages.length} images for section: <span className="font-mono text-gray-700">{sectionKey}</span>
                            </div>
                            {renderImageGrid(sectionImages)}
                        </>
                    )}
                </section>

                {/* Section 2: Load by Page Slug */}
                <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </span>
                        Load by Page Slug
                    </h2>

                    <div className="flex gap-4 mb-6">
                        <div className="flex-1">
                            <label htmlFor="pageSlug" className="block text-sm font-medium text-gray-700 mb-1">
                                Page Slug
                            </label>
                            <input
                                type="text"
                                id="pageSlug"
                                value={pageSlug}
                                onChange={(e) => setPageSlug(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter page slug (e.g., quest-landing)"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={fetchPageImages}
                                disabled={pageLoading}
                                className="px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                            >
                                {pageLoading ? 'Loading...' : 'Load Page Images'}
                            </button>
                        </div>
                    </div>

                    {pageLoading ? (
                        <div className="flex items-center gap-2 text-purple-600 py-4">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Fetching page images...</span>
                        </div>
                    ) : pageError ? (
                        <div className="text-red-600 py-4">Error: {pageError}</div>
                    ) : (
                        <>
                            {pageMeta && (
                                <div className="text-green-600 mb-4 text-sm font-medium">
                                    Found {pageMeta.totalImages} images for page: <span className="font-bold text-gray-800">{pageMeta.pageName}</span> <span className="font-mono text-gray-500">({pageSlug})</span>
                                </div>
                            )}
                            {renderImageGrid(pageImages)}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
