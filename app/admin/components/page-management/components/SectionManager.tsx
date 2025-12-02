'use client';

import { useState, useEffect } from 'react';
import { Page, PageSection, PageSectionImage, SectionFormValues } from '@/app/admin/components/page-management/types';
import SectionForm from '@/app/admin/components/page-management/components/SectionForm';
import SectionCard from '@/app/admin/components/page-management/components/SectionCard';
import ImagePickerModal from '@/app/admin/components/page-management/components/ImagePickerModal';

interface SectionManagerProps {
    page: Page;
    onBack: () => void;
}

const SectionManager = ({ page, onBack }: SectionManagerProps) => {
    const [sections, setSections] = useState<PageSection[]>([]);
    const [sectionImages, setSectionImages] = useState<Record<string, PageSectionImage[]>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [showSectionForm, setShowSectionForm] = useState(false);
    const [editingSection, setEditingSection] = useState<PageSection | null>(null);
    const [selectedSection, setSelectedSection] = useState<PageSection | null>(null);
    const [showImagePicker, setShowImagePicker] = useState(false);

    const [sectionFormValues, setSectionFormValues] = useState<SectionFormValues>({
        section_key: '',
        name: '',
        allowed_images: 1
    });

    useEffect(() => {
        fetchSections();
    }, [page.id]);

    const fetchSections = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/admin/page-sections?pageId=${page.id}`);
            const result = await response.json();

            if (result.success) {
                setSections(result.data);
                // Fetch images for each section
                for (const section of result.data) {
                    fetchSectionImages(section.id);
                }
            }
        } catch (error) {
            console.error('Error fetching sections:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSectionImages = async (sectionId: string) => {
        try {
            const response = await fetch(`/api/admin/page-section-images?sectionId=${sectionId}`);
            const result = await response.json();

            if (result.success) {
                setSectionImages(prev => ({
                    ...prev,
                    [sectionId]: result.data
                }));
            }
        } catch (error) {
            console.error('Error fetching section images:', error);
        }
    };

    const handleNewSection = () => {
        setSectionFormValues({
            section_key: '',
            name: '',
            allowed_images: 1
        });
        setEditingSection(null);
        setShowSectionForm(true);
    };

    const handleEditSection = (section: PageSection) => {
        setSectionFormValues({
            section_key: section.section_key,
            name: section.name,
            allowed_images: section.allowed_images
        });
        setEditingSection(section);
        setShowSectionForm(true);
    };

    const handleDeleteSection = async (sectionId: string) => {
        if (!confirm('Are you sure you want to delete this section? All image mappings will also be deleted.')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/page-sections?id=${sectionId}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                fetchSections();
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleSectionFormSuccess = async () => {
        await fetchSections();
        setShowSectionForm(false);
    };

    const handleManageImages = (section: PageSection) => {
        setSelectedSection(section);
        setShowImagePicker(true);
    };

    const handleImagePickerSuccess = () => {
        if (selectedSection) {
            fetchSectionImages(selectedSection.id);
        }
        setShowImagePicker(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Loading sections...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-6 bg-white shadow rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Sections for: {page.name}
                            </h2>
                            <p className="text-sm text-gray-500 font-mono">{page.slug}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleNewSection}
                        className="px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90 transition-colors font-medium"
                    >
                        + New Section
                    </button>
                </div>
            </div>

            {/* Section Form */}
            {showSectionForm && (
                <div className="mb-6">
                    <SectionForm
                        pageId={page.id}
                        editingSection={editingSection}
                        formValues={sectionFormValues}
                        setFormValues={setSectionFormValues}
                        onSuccess={handleSectionFormSuccess}
                        onCancel={() => setShowSectionForm(false)}
                    />
                </div>
            )}

            {/* Sections Grid */}
            {sections.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <svg
                            className="mx-auto h-12 w-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No sections yet</h3>
                    <p className="text-gray-500">Create sections to organize images on this page.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sections.map((section) => (
                        <SectionCard
                            key={section.id}
                            section={section}
                            images={sectionImages[section.id] || []}
                            onEdit={() => handleEditSection(section)}
                            onDelete={() => handleDeleteSection(section.id)}
                            onManageImages={() => handleManageImages(section)}
                        />
                    ))}
                </div>
            )}

            {/* Image Picker Modal */}
            {showImagePicker && selectedSection && (
                <ImagePickerModal
                    section={selectedSection}
                    currentImages={sectionImages[selectedSection.id] || []}
                    onClose={() => setShowImagePicker(false)}
                    onSuccess={handleImagePickerSuccess}
                />
            )}
        </div>
    );
};

export default SectionManager;
