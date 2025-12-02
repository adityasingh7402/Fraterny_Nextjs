import { useState } from 'react';
import { toast } from 'sonner';
import { Page } from '@/app/admin/components/page-management/types';
import ConfirmationModal from '@/app/admin/components/page-management/components/ConfirmationModal';

interface PageListProps {
    pages: Page[];
    onEdit: (page: Page) => void;
    onManageSections: (page: Page) => void;
    refetch: () => void;
}

const PageList = ({ pages, onEdit, onManageSections, refetch }: PageListProps) => {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [pageToDelete, setPageToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setPageToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!pageToDelete) return;

        setDeletingId(pageToDelete);
        try {
            const response = await fetch(`/api/admin/pages?id=${pageToDelete}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                toast.success('Page deleted successfully');
                refetch();
            } else {
                toast.error(`Error: ${result.error}`);
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setDeletingId(null);
            setDeleteModalOpen(false);
            setPageToDelete(null);
        }
    };

    if (pages.length === 0) {
        return (
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pages yet</h3>
                <p className="text-gray-500">Get started by creating your first page.</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Page Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Slug
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {pages.map((page) => (
                        <tr key={page.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{page.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 font-mono">{page.slug}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500 line-clamp-2">
                                    {page.description || '-'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    {new Date(page.created_at).toLocaleDateString()}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onManageSections(page)}
                                        className="text-navy hover:text-navy/80 font-medium"
                                    >
                                        Sections
                                    </button>
                                    <button
                                        onClick={() => onEdit(page)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(page.id)}
                                        disabled={deletingId === page.id}
                                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                    >
                                        {deletingId === page.id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Page"
                message="Are you sure you want to delete this page? All sections and image mappings will also be deleted. This action cannot be undone."
                confirmText="Delete"
                isDestructive={true}
                isLoading={!!deletingId}
            />
        </div>
    );
};

export default PageList;
