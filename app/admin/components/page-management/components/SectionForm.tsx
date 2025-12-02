import { useState } from 'react';
import { PageSection, SectionFormValues } from '@/app/admin/components/page-management/types';

interface SectionFormProps {
    pageId: string;
    editingSection: PageSection | null;
    formValues: SectionFormValues;
    setFormValues: (values: SectionFormValues) => void;
    onSuccess: () => void;
    onCancel: () => void;
}

// Helper function to generate section_key from name
const generateSectionKey = (name: string): string => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s-]+/g, '_') // Replace spaces and hyphens with underscores
        .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores
};

const SectionForm = ({
    pageId,
    editingSection,
    formValues,
    setFormValues,
    onSuccess,
    onCancel,
}: SectionFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isKeyManuallyEdited, setIsKeyManuallyEdited] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        const newFormValues = { ...formValues, name: newName };

        // Auto-generate section_key only if it hasn't been manually edited
        if (!isKeyManuallyEdited || !formValues.section_key) {
            newFormValues.section_key = generateSectionKey(newName);
        }

        setFormValues(newFormValues);
    };

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, section_key: e.target.value });
        setIsKeyManuallyEdited(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const url = '/api/admin/page-sections';
            const method = editingSection ? 'PUT' : 'POST';
            const body = editingSection
                ? { id: editingSection.id, ...formValues }
                : { page_id: pageId, ...formValues };

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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingSection ? 'Edit Section' : 'Create New Section'}
            </h3>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formValues.name}
                        onChange={handleNameChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                        placeholder="e.g., Top Main Banner"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Admin-friendly name for this section
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Key <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formValues.section_key}
                        onChange={handleKeyChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent font-mono text-sm"
                        placeholder="e.g., hero_banner"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Auto-generated from name, but you can edit it (use snake_case)
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Images Allowed <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={formValues.allowed_images}
                        onChange={(e) => setFormValues({ ...formValues, allowed_images: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Maximum number of images that can be assigned to this section
                    </p>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isSubmitting ? 'Saving...' : editingSection ? 'Update Section' : 'Create Section'}
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

export default SectionForm;
