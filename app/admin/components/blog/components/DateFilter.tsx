'use client';

import { useState, useEffect } from 'react';
import { Calendar, X, Filter } from 'lucide-react';

interface DateFilterProps {
    onFilterChange: (startDate: string | null, endDate: string | null) => void;
    showTodayIndicator?: boolean;
    isOpen: boolean;
    onClose: () => void;
}

const DateFilter = ({ onFilterChange, showTodayIndicator = false, isOpen, onClose }: DateFilterProps) => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isActive, setIsActive] = useState(false);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleApply = () => {
        if (startDate || endDate) {
            onFilterChange(startDate || null, endDate || null);
            setIsActive(true);
            onClose();
        }
    };

    const handleClear = () => {
        setStartDate('');
        setEndDate('');
        onFilterChange(null, null);
        setIsActive(false);
        onClose();
    };

    const handlePreset = (days: number) => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);

        const startStr = start.toISOString().split('T')[0];
        const endStr = end.toISOString().split('T')[0];

        setStartDate(startStr);
        setEndDate(endStr);
        onFilterChange(startStr, endStr);
        setIsActive(true);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-in fade-in slide-in-from-top-4 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar size={20} className="text-navy" />
                            <h3 className="text-lg font-semibold text-gray-900">Date Filter</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    {showTodayIndicator && !isActive && (
                        <div className="mb-4 px-3 py-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                            📅 Showing today's drafts only
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Quick Presets */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quick Select
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handlePreset(7)}
                                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                >
                                    Last 7 days
                                </button>
                                <button
                                    onClick={() => handlePreset(30)}
                                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                >
                                    Last 30 days
                                </button>
                                <button
                                    onClick={() => handlePreset(90)}
                                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                >
                                    Last 90 days
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-white text-gray-500">Or custom range</span>
                            </div>
                        </div>

                        {/* Custom Date Range */}
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-navy focus:border-navy"
                                />
                            </div>

                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-navy focus:border-navy"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleClear}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                Clear Filter
                            </button>
                            <button
                                onClick={handleApply}
                                disabled={!startDate && !endDate}
                                className="flex-1 px-4 py-2 bg-navy text-white rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateFilter;
