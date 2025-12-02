import Image from 'next/image';
import { PageSection, PageSectionImage } from '@/app/admin/components/page-management/types';
import { supabase } from '@/lib/supabase';

interface SectionCardProps {
    section: PageSection;
    images: PageSectionImage[];
    onEdit: () => void;
    onDelete: () => void;
    onManageImages: () => void;
}

const SectionCard = ({
    section,
    images,
    onEdit,
    onDelete,
    onManageImages,
}: SectionCardProps) => {
    const imageCount = images.length;
    const percentage = (imageCount / section.allowed_images) * 100;

    // Helper function to get full image URL from storage path
    const getImageUrl = (path: string) => {
        if (!path) return ''; // Return empty string instead
        const { data } = supabase.storage
            .from('website-images')
            .getPublicUrl(path);
        return data.publicUrl;
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="font-semibold text-gray-900">{section.name}</h3>
                        <p className="text-xs text-gray-500 font-mono mt-1">{section.section_key}</p>
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={onEdit}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="Edit section"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Delete section"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Image Count Progress */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${imageCount >= section.allowed_images
                                ? 'bg-green-500'
                                : imageCount > 0
                                    ? 'bg-blue-500'
                                    : 'bg-gray-300'
                                }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                    </div>
                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                        {imageCount} / {section.allowed_images}
                    </span>
                </div>
            </div>

            {/* Image Preview Grid */}
            <div className="p-4">
                {images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        {images.slice(0, 4).map((img, index) => (
                            <div
                                key={img.id}
                                className="relative aspect-video bg-gray-100 rounded overflow-hidden"
                            >
                                {img.website_images && img.website_images.storage_path && (
                                    <Image
                                        src={getImageUrl(img.website_images.storage_path)}
                                        alt={img.website_images.alt_text || 'Section image'}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        unoptimized
                                    />
                                )}
                                {index === 3 && images.length > 4 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white font-semibold">
                                            +{images.length - 4}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        No images assigned
                    </div>
                )}

                <button
                    onClick={onManageImages}
                    className="w-full px-3 py-2 bg-navy text-white rounded-md hover:bg-navy/90 transition-colors font-medium text-sm"
                >
                    Manage Images
                </button>
            </div >
        </div >
    );
};

export default SectionCard;
