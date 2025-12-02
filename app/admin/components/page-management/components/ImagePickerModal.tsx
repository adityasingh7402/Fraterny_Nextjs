'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PageSection, PageSectionImage } from '@/app/admin/components/page-management/types';
import { supabase } from '@/lib/supabase';
import { Upload } from 'lucide-react';

interface ImagePickerModalProps {
    section: PageSection;
    currentImages: PageSectionImage[];
    onClose: () => void;
    onSuccess: () => void;
}

const ImagePickerModal = ({
    section,
    currentImages,
    onClose,
    onSuccess,
}: ImagePickerModalProps) => {
    const [sectionImages, setSectionImages] = useState<PageSectionImage[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchSectionImages();
    }, []);

    const getImageUrl = (path: string) => {
        if (!path) return '';
        const { data } = supabase.storage
            .from('website-images')
            .getPublicUrl(path);
        return data.publicUrl;
    };

    const fetchSectionImages = async () => {
        try {
            const response = await fetch(`/api/admin/page-section-images?sectionId=${section.id}`);
            const result = await response.json();

            if (result.success) {
                setSectionImages(result.data);
            }
        } catch (error) {
            console.error('Error fetching section images:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const totalFiles = files.length;
            let completed = 0;

            for (const file of Array.from(files)) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${section.section_key}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('website-images')
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const { data: imageData, error: imageError } = await supabase
                    .from('website_images')
                    .insert({
                        key: fileName.replace(`.${fileExt}`, ''),
                        storage_path: fileName,
                        alt_text: file.name.replace(`.${fileExt}`, ''),
                        description: file.name.replace(`.${fileExt}`, ''),
                        category: section.section_key,
                    })
                    .select()
                    .single();

                if (imageError) throw imageError;

                const nextSortOrder = sectionImages.length + completed + 1;
                await supabase
                    .from('page_section_images')
                    .insert({
                        section_id: section.id,
                        image_id: imageData.id,
                        sort_order: nextSortOrder,
                    });

                completed++;
                setUploadProgress(Math.round((completed / totalFiles) * 100));
            }

            await fetchSectionImages();
            alert(`Successfully uploaded ${totalFiles} image(s)!`);
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Error uploading images. Please try again.');
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDeleteImage = async (imageId: string) => {
        if (!confirm('Are you sure you want to delete this image? It will be PERMANENTLY DELETED from storage.')) {
            return;
        }

        try {
            const response = await fetch(`/api/media/delete?id=${imageId}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                await fetchSectionImages();
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Error deleting image. Please try again.');
        }
    };

    const filteredImages = sectionImages.filter(img =>
        img.website_images?.key?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.website_images?.alt_text?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Manage Images: {section.name}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1 font-mono">{section.section_key}</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm font-medium">Images: {sectionImages.length} / {section.allowed_images}</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all"
                                style={{ width: `${Math.min((sectionImages.length / section.allowed_images) * 100, 100)}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading || sectionImages.length >= section.allowed_images}
                            className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90 disabled:opacity-50"
                        >
                            <Upload className="w-4 h-4" />
                            {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload Images'}
                        </button>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="flex-1 px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div>Loading...</div>
                        </div>
                    ) : filteredImages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <Upload className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-gray-400">No images uploaded yet</p>
                            <p className="text-gray-500 text-sm">Click "Upload Images" to add</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredImages.map((sectionImage) => {
                                const image = sectionImage.website_images;
                                if (!image) return null;

                                return (
                                    <div key={sectionImage.id} className="relative aspect-video rounded-lg overflow-hidden border-2 group">
                                        {image.storage_path && (
                                            <Image
                                                src={getImageUrl(image.storage_path)}
                                                alt={image.alt_text || image.key}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteImage(image.id);
                                                }}
                                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors transform hover:scale-110"
                                                title="Delete Image"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-2 pointer-events-none">
                                            <p className="text-white text-xs truncate">{image.key}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t bg-gray-50">
                    <button
                        onClick={() => { onSuccess(); onClose(); }}
                        className="w-full px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImagePickerModal;