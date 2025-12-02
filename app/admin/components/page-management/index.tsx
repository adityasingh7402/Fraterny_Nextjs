'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '@/app/admin/components/page-management/components/PageHeader';
import PageList from '@/app/admin/components/page-management/components/PageList';
import PageForm from '@/app/admin/components/page-management/components/PageForm';
import SectionManager from '@/app/admin/components/page-management/components/SectionManager';
import { Page, PageFormValues } from '@/app/admin/components/page-management/types';

type TabType = 'pages' | 'sections';

const AdminPageManagement = () => {
    const [activeTab, setActiveTab] = useState<TabType>('pages');
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const [showPageForm, setShowPageForm] = useState<boolean>(false);
    const [editingPageId, setEditingPageId] = useState<string | null>(null);

    const [pageFormValues, setPageFormValues] = useState<PageFormValues>({
        slug: '',
        name: '',
        description: ''
    });

    // Fetch pages
    const fetchPages = async () => {
        const response = await fetch('/api/admin/pages');
        const result = await response.json();
        if (!result.success) throw new Error(result.error);
        return result.data as Page[];
    };

    const {
        data: pages,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['adminPages'],
        queryFn: fetchPages,
    });

    const handleNewPage = () => {
        setPageFormValues({ slug: '', name: '', description: '' });
        setEditingPageId(null);
        setShowPageForm(true);
    };

    const handleEditPage = (page: Page) => {
        setPageFormValues({
            slug: page.slug,
            name: page.name,
            description: page.description || ''
        });
        setEditingPageId(page.id);
        setShowPageForm(true);
    };

    const handlePageFormSuccess = async () => {
        await refetch();
        setShowPageForm(false);
    };

    const handleManageSections = (page: Page) => {
        setSelectedPage(page);
        setActiveTab('sections');
    };

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-600">Loading pages...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-red-600">Error loading pages. Please try again.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <PageHeader onNewPageClick={handleNewPage} />

            {/* Tabs */}
            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('pages')}
                            className={`${activeTab === 'pages'
                                ? 'border-navy text-navy'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            Pages
                            {pages && (
                                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100">
                                    {pages.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('sections')}
                            disabled={!selectedPage}
                            className={`${activeTab === 'sections'
                                ? 'border-navy text-navy'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Sections
                            {selectedPage && <span className="ml-2 text-xs text-gray-500">({selectedPage.name})</span>}
                        </button>
                    </nav>
                </div>
            </div>

            {/* Page Form */}
            {showPageForm && (
                <div className="mb-6">
                    <PageForm
                        editingId={editingPageId}
                        formValues={pageFormValues}
                        setFormValues={setPageFormValues}
                        onSuccess={handlePageFormSuccess}
                        onCancel={() => setShowPageForm(false)}
                    />
                </div>
            )}

            {/* Tab Content */}
            {activeTab === 'pages' && (
                <PageList
                    pages={pages || []}
                    onEdit={handleEditPage}
                    onManageSections={handleManageSections}
                    refetch={refetch}
                />
            )}

            {activeTab === 'sections' && selectedPage && (
                <SectionManager
                    page={selectedPage}
                    onBack={() => {
                        setActiveTab('pages');
                        setSelectedPage(null);
                    }}
                />
            )}
        </div>
    );
};

export default AdminPageManagement;
