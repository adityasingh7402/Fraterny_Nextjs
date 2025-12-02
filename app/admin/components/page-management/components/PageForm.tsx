import { useState } from 'react';
import { PageFormValues } from '@/app/admin/components/page-management/types';

interface PageFormProps {
    editingId: string | null;
    formValues: PageFormValues;
    setFormValues: (values: PageFormValues) => void;
    onSuccess: () => void;
    onCancel: () => void;
}

// Helper function to generate slug from name
const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

const PageForm = ({
    editingId,
    formValues,
    setFormValues,
    onSuccess,
    onCancel,
}: PageFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        const newFormValues = { ...formValues, name: newName };

        // Auto-generate slug only if it hasn't been manually edited
        if (!isSlugManuallyEdited || !formValues.slug) {
            newFormValues.slug = generateSlug(newName);
        }

        setFormValues(newFormValues);
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, slug: e.target.value });
        setIsSlugManuallyEdited(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const url = '/api/admin/pages';
            const method = editingId ? 'PUT' : 'POST';
            const body = editingId
                ? { id: editingId, ...formValues }
                : formValues;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            if (result.success) {
                onSuccess();
            } else {
                setError(result.error);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingId ? 'Edit Page' : 'Create New Page'}
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Page Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formValues.name}
                        onChange={handleNameChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                        placeholder="e.g., Quest Page"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formValues.slug}
                        onChange={handleSlugChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent font-mono text-sm"
                        placeholder="e.g., /quest or home"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Auto-generated from name, but you can edit it
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={formValues.description}
                        onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                        placeholder="Brief description of this page"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isSubmitting ? 'Saving...' : editingId ? 'Update Page' : 'Create Page'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PageForm;
