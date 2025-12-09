'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle, Loader2, X, CheckSquare, Square } from 'lucide-react';

interface OrphanedImage {
    id: string;
    key: string;
    storage_path: string;
    alt_text?: string;
    description?: string;
    created_at: string;
}

interface OrphanedImagesStats {
    orphanedImages: OrphanedImage[];
    totalOrphaned: number;
    totalImages: number;
    referencedCount: number;
}

export default function UnwantedImagesButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [orphanedImages, setOrphanedImages] = useState<OrphanedImage[]>([]);
    const [stats, setStats] = useState<OrphanedImagesStats | null>(null);
    const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const fetchOrphanedImages = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/admin/media/orphaned');
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to fetch orphaned images');
            }
            const data: OrphanedImagesStats = await response.json();
            setOrphanedImages(data.orphanedImages);
            setStats(data);
            setIsModalOpen(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            console.error('Error fetching orphaned images:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedImages.size === 0) {
            setError('Please select at least one image to delete');
            return;
        }

        if (!confirm(`Are you sure you want to delete ${selectedImages.size} image(s)? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Map selected IDs back to image objects to get their paths
            const filesToDelete = orphanedImages
                .filter(img => selectedImages.has(img.id))
                .map(img => ({ id: img.id, path: img.storage_path }));

            const response = await fetch('/api/admin/media/orphaned', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ files: filesToDelete }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete images');
            }

            const result = await response.json();

            setSuccessMessage(
                `Successfully deleted ${result.deletedCount} image(s).${result.failedCount > 0 ? ` Failed to delete ${result.failedCount} image(s).` : ''
                }`
            );

            // Refresh the orphaned images list
            setSelectedImages(new Set());
            await fetchOrphanedImages();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete images');
            console.error('Error deleting images:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    const toggleImageSelection = (imageId: string) => {
        const newSelection = new Set(selectedImages);
        if (newSelection.has(imageId)) {
            newSelection.delete(imageId);
        } else {
            newSelection.add(imageId);
        }
        setSelectedImages(newSelection);
    };

    const toggleSelectAll = () => {
        if (selectedImages.size === orphanedImages.length) {
            setSelectedImages(new Set());
        } else {
            setSelectedImages(new Set(orphanedImages.map(img => img.id)));
        }
    };

    const getImageUrl = (storagePath: string) => {
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/website-images/${storagePath}`;
    };

    return (
        <>
            {/* Unwanted Images Button */}
            <button
                onClick={fetchOrphanedImages}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-amber-600 text-sm font-medium rounded-md text-amber-700 bg-amber-50 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                    </>
                ) : (
                    <>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Unwanted Images
                    </>
                )}
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div
                            className="fixed inset-0 bg-black/50 z-[9998]"
                            onClick={() => setIsModalOpen(false)}
                        />

                        {/* Modal panel */}
                        <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transform bg-white shadow-xl rounded-lg relative z-[9999]">
                            {/* Header */}
                            <div className="bg-white text-black px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <AlertTriangle className="w-6 h-6 text-black mr-3" />
                                        <h3 className="text-xl font-semibold text-black">
                                            Unwanted Images
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-black hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Stats */}
                            {stats && (
                                <div className="bg-gray-50 px-6 py-4 border-b">
                                    <div className="grid grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-600">Total Images:</span>
                                            <span className="ml-2 font-semibold text-gray-900">{stats.totalImages}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Referenced:</span>
                                            <span className="ml-2 font-semibold text-green-600">{stats.referencedCount}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Unwanted:</span>
                                            <span className="ml-2 font-semibold text-amber-600">{stats.totalOrphaned}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Selected:</span>
                                            <span className="ml-2 font-semibold text-blue-600">{selectedImages.size}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Messages */}
                            {error && (
                                <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            )}
                            {successMessage && (
                                <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                    <p className="text-sm text-green-800">{successMessage}</p>
                                </div>
                            )}

                            {/* Content */}
                            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                                {orphanedImages.length === 0 ? (
                                    <div className="text-center py-12">
                                        <AlertTriangle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                                            No Unwanted Images Found
                                        </h4>
                                        <p className="text-gray-600">
                                            All images in your storage are properly referenced in your database.
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        {/* Select All */}
                                        <div className="mb-4 flex items-center justify-between border-b pb-3">
                                            <button
                                                onClick={toggleSelectAll}
                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                            >
                                                {selectedImages.size === orphanedImages.length ? (
                                                    <CheckSquare className="w-5 h-5 mr-2 text-blue-600" />
                                                ) : (
                                                    <Square className="w-5 h-5 mr-2" />
                                                )}
                                                {selectedImages.size === orphanedImages.length ? 'Deselect All' : 'Select All'}
                                            </button>
                                            <p className="text-sm text-gray-600">
                                                {orphanedImages.length} unwanted image{orphanedImages.length !== 1 ? 's' : ''} found
                                            </p>
                                        </div>

                                        {/* Image Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {orphanedImages.map((image) => (
                                                <div
                                                    key={image.id}
                                                    className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedImages.has(image.id)
                                                        ? 'border-blue-500 ring-2 ring-blue-200'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    onClick={() => toggleImageSelection(image.id)}
                                                >
                                                    {/* Selection Checkbox */}
                                                    <div className="absolute top-2 left-2 z-10">
                                                        <div className={`w-6 h-6 rounded flex items-center justify-center ${selectedImages.has(image.id)
                                                            ? 'bg-blue-600'
                                                            : 'bg-white border-2 border-gray-300'
                                                            }`}>
                                                            {selectedImages.has(image.id) && (
                                                                <CheckSquare className="w-4 h-4 text-white" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Image */}
                                                    <div className="aspect-square bg-gray-100 relative">
                                                        <img
                                                            src={getImageUrl(image.storage_path)}
                                                            alt={image.alt_text || image.key}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div className="p-2 bg-white">
                                                        <p className="text-xs font-medium text-gray-900 truncate" title={image.key}>
                                                            {image.key}
                                                        </p>
                                                        {image.description && (
                                                            <p className="text-xs text-gray-500 truncate" title={image.description}>
                                                                {image.description}
                                                            </p>
                                                        )}
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {new Date(image.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {orphanedImages.length > 0 && (
                                <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        {selectedImages.size > 0 ? (
                                            <span>
                                                {selectedImages.size} image{selectedImages.size !== 1 ? 's' : ''} selected
                                            </span>
                                        ) : (
                                            <span>No images selected</span>
                                        )}
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDeleteSelected}
                                            disabled={selectedImages.size === 0 || isDeleting}
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isDeleting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete Selected ({selectedImages.size})
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}