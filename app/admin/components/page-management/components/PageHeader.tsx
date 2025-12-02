interface PageHeaderProps {
    onNewPageClick: () => void;
}

const PageHeader = ({ onNewPageClick }: PageHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Page Management</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Manage pages, sections, and assign images to different sections
                </p>
            </div>
            <button
                onClick={onNewPageClick}
                className="px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90 transition-colors font-medium"
            >
                + New Page
            </button>
        </div>
    );
};

export default PageHeader;
