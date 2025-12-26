'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { PageSection, PageSectionImage } from '@/app/admin/components/page-management/types';
import { supabase } from '@/lib/supabase';
import { Upload, Pencil, GripHorizontal } from 'lucide-react';
import ConfirmationModal from '@/app/admin/components/page-management/components/ConfirmationModal';
import { motion } from 'framer-motion';

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

    // Drag and Drop State
    const dragItem = useRef<number | null>(null);
    const dragNode = useRef<EventTarget | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [pendingFiles, setPendingFiles] = useState<{ file: File; altText: string; id: string }[]>([]);
    const [isReviewing, setIsReviewing] = useState(false);

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

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
                // Sort by sort_order
                const sorted = result.data.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
                setSectionImages(sorted);
            }
        } catch (error) {
            console.error('Error fetching section images:', error);
            toast.error('Failed to fetch images');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const newFiles = Array.from(files).map(file => ({
            file,
            altText: file.name.split('.')[0],
            id: Math.random().toString(36).substring(7)
        }));

        setPendingFiles(prev => [...prev, ...newFiles]);
        setIsReviewing(true);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUploadFiles = async () => {
        if (pendingFiles.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const totalFiles = pendingFiles.length;
            let completed = 0;

            for (const item of pendingFiles) {
                const { file, altText } = item;
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
                        alt_text: altText,
                        description: altText,
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
            toast.success(`Successfully uploaded ${totalFiles} image(s)!`);
            setPendingFiles([]);
            setIsReviewing(false);
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('Error uploading images. Please try again.');
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const [editingImage, setEditingImage] = useState<{ id: string; altText: string; currentPath: string; key: string } | null>(null);
    const [editFile, setEditFile] = useState<File | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Edit Modal State
    // ... existing delete modal state ...

    // ... existing useEffect ...

    // ... existing getImageUrl ...

    // ... existing fetchSectionImages ...

    // ... existing handleFileSelect ...

    // ... existing handleUploadFiles ...

    const handleEditClick = (image: any) => {
        setEditingImage({
            id: image.id,
            altText: image.alt_text || '',
            currentPath: image.storage_path,
            key: image.key
        });
        setEditFile(null);
    };

    const handleUpdateImage = async () => {
        if (!editingImage) return;
        setIsUpdating(true);

        try {
            let updates: any = {
                alt_text: editingImage.altText,
                description: editingImage.altText
            };

            // If a new file is selected, upload it and update storage_path
            if (editFile) {
                const fileExt = editFile.name.split('.').pop();
                // Create a new key to avoid cache issues
                const newKey = `${section.section_key}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
                const newFileName = `${newKey}.${fileExt}`;

                // 1. Upload new file
                const { error: uploadError } = await supabase.storage
                    .from('website-images')
                    .upload(newFileName, editFile);

                if (uploadError) throw uploadError;

                // 2. Add to updates
                updates.storage_path = newFileName;
                updates.key = newKey; // Update key to reflect new file

                // 3. Delete old file from storage (if exists)
                if (editingImage.currentPath) {
                    await supabase.storage
                        .from('website-images')
                        .remove([editingImage.currentPath]);
                }
            }

            // 4. Update Database Record
            const response = await fetch(`/api/media/${editingImage.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error);

            await fetchSectionImages();
            toast.success('Image updated successfully');
            setEditingImage(null);
            setEditFile(null);

        } catch (error: any) {
            console.error('Error updating image:', error);
            toast.error(error.message || 'Failed to update image');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteClick = (imageId: string) => {
        setImageToDelete(imageId);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!imageToDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/media/delete?id=${imageToDelete}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                await fetchSectionImages();
                toast.success('Image deleted successfully');
            } else {
                toast.error(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Error deleting image. Please try again.');
        } finally {
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setImageToDelete(null);
        }
    };

    const filteredImages = sectionImages.filter(img =>
        img.website_images?.key?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.website_images?.alt_text?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Drag and Drop Handlers ---

    const handleDragStart = (e: React.DragEvent, index: number) => {
        dragItem.current = index;
        dragNode.current = e.target;
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'move';
        // Hide default ghost slightly? Or keep it.
        // e.dataTransfer.setDragImage(new Image(), 0, 0); // Optional: hide ghost if using custom overlay
    };

    const handleDragEnter = (e: React.DragEvent, index: number) => {
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current && currentItem !== null && currentItem !== index) {
            setSectionImages((oldList) => {
                const newList = JSON.parse(JSON.stringify(oldList));
                const draggedItemContent = newList.splice(currentItem, 1)[0];
                newList.splice(index, 0, draggedItemContent);
                dragItem.current = index;
                return newList;
            });
        }
    };

    const handleDragEnd = async () => {
        setIsDragging(false);
        dragItem.current = null;
        dragNode.current = null;

        // Save new order
        try {
            const updates = sectionImages.map((img, index) => ({
                id: img.id,
                sort_order: index + 1
            }));

            await fetch('/api/admin/page-section-images/reorder', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updates }),
            });
        } catch (error) {
            console.error('Failed to save order:', error);
            toast.error('Failed to save order');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
                {editingImage ? (
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Edit Image</h2>
                            <button
                                onClick={() => {
                                    setEditingImage(null);
                                    setEditFile(null);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="w-full">
                            <div className="flex gap-4 items-start p-4 border rounded-lg bg-gray-50 mb-4">
                                <div className="w-24 h-24 relative shrink-0 group">
                                    {/* Preview Image */}
                                    {editFile ? (
                                        <img
                                            src={URL.createObjectURL(editFile)}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <Image
                                            src={getImageUrl(editingImage.currentPath)}
                                            alt={editingImage.altText}
                                            fill
                                            className="object-cover rounded-md"
                                            unoptimized
                                        />
                                    )}
                                    {/* Replace Overlay */}
                                    <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs cursor-pointer rounded-md">
                                        <Upload className="w-6 h-6 mb-1" />
                                        <span>Replace</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) setEditFile(e.target.files[0]);
                                            }}
                                        />
                                    </label>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">File Name</label>
                                        <p className="text-sm text-gray-500 truncate">
                                            {editFile ? editFile.name : editingImage.key}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Alt Text</label>
                                        <input
                                            type="text"
                                            value={editingImage.altText}
                                            onChange={(e) => setEditingImage({ ...editingImage, altText: e.target.value })}
                                            className="w-full bg-white px-3 py-2 border rounded-md text-sm"
                                            placeholder="Image description..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => {
                                        setEditingImage(null);
                                        setEditFile(null);
                                    }}
                                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateImage}
                                    disabled={isUpdating}
                                    className="px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isUpdating ? (
                                        <>
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
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

                        {isReviewing ? (
                            <div className="w-full">
                                <h3 className="text-lg font-medium mb-4">Review Uploads</h3>
                                <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-4">
                                    {pendingFiles.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-start p-4 border rounded-lg bg-gray-50">
                                            <div className="w-24 h-24 relative shrink-0">
                                                {/* Preview Image */}
                                                <img
                                                    src={URL.createObjectURL(item.file)}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">File Name</label>
                                                    <p className="text-sm text-gray-500 truncate">{item.file.name}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Alt Text</label>
                                                    <input
                                                        type="text"
                                                        value={item.altText}
                                                        onChange={(e) => {
                                                            setPendingFiles(files =>
                                                                files.map(f => f.id === item.id ? { ...f, altText: e.target.value } : f)
                                                            );
                                                        }}
                                                        className="w-full px-3 bg-white py-2 border rounded-md text-sm"
                                                        placeholder="Describe this image..."
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setPendingFiles(files => {
                                                        const newFiles = files.filter(f => f.id !== item.id);
                                                        if (newFiles.length === 0) setIsReviewing(false);
                                                        return newFiles;
                                                    });
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => {
                                            setPendingFiles([]);
                                            setIsReviewing(false);
                                        }}
                                        className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUploadFiles}
                                        disabled={isUploading}
                                        className="px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90 disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isUploading ? (
                                            <>
                                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                                Uploading... {uploadProgress}%
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4" />
                                                Upload {pendingFiles.length} Images
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
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
                                        Select Images to Upload
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
                        )}
                    </div>
                )}

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
                            {filteredImages.map((sectionImage, index) => {
                                const image = sectionImage.website_images;
                                if (!image) return null;

                                return (
                                    <motion.div
                                        layout
                                        key={sectionImage.id}
                                        draggable={!searchTerm} // Only drag when not searching
                                        onDragStart={(e) => !searchTerm && handleDragStart(e as any, index)}
                                        onDragEnter={(e) => !searchTerm && isDragging && handleDragEnter(e as any, index)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={`relative aspect-video rounded-lg overflow-hidden border-2 group ${searchTerm ? '' : 'cursor-grab active:cursor-grabbing'}`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {image.storage_path && (
                                            <Image
                                                src={getImageUrl(image.storage_path)}
                                                alt={image.alt_text || image.key}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(image);
                                                }}
                                                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors transform hover:scale-110"
                                                title="Edit Image"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(image.id);
                                                }}
                                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors transform hover:scale-110"
                                                title="Delete Image"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        {/* Grip Handle for visual cue */}
                                        {!searchTerm && (
                                            <div className="absolute top-2 right-2 p-1 bg-black/30 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                <GripHorizontal className="w-4 h-4" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-2 pointer-events-none">
                                            <p className="text-white text-xs truncate">{image.key}</p>
                                        </div>
                                    </motion.div>
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

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Image"
                message="Are you sure you want to delete this image? It will be PERMANENTLY DELETED from storage. This action cannot be undone."
                confirmText="Delete"
                isDestructive={true}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default ImagePickerModal;