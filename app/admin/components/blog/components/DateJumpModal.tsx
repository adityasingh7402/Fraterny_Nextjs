'use client';

import { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

interface DateJumpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDateSelect: (date: string) => void;
    currentDate: string;
}

const DateJumpModal = ({
    isOpen,
    onClose,
    onDateSelect,
    currentDate,
}: DateJumpModalProps) => {
    const [selectedDate, setSelectedDate] = useState<string>(currentDate);

    useEffect(() => {
        setSelectedDate(currentDate);
    }, [currentDate]);

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

    const handleQuickSelect = (daysAgo: number) => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        const dateStr = date.toISOString().split('T')[0];
        onDateSelect(dateStr);
    };

    const handleCustomDateSelect = () => {
        if (selectedDate) {
            onDateSelect(selectedDate);
        }
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
                            <h3 className="text-lg font-semibold text-gray-900">
                                Jump to Date
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Quick Select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quick Select
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handleQuickSelect(0)}
                                    className="px-4 py-2 text-sm bg-navy text-white hover:bg-opacity-90 rounded-md transition-colors"
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => handleQuickSelect(1)}
                                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                >
                                    Yesterday
                                </button>
                                <button
                                    onClick={() => handleQuickSelect(7)}
                                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                >
                                    Last Week
                                </button>
                                <button
                                    onClick={() => handleQuickSelect(30)}
                                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                >
                                    Last Month
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-white text-gray-500">
                                    Or pick a custom date
                                </span>
                            </div>
                        </div>

                        {/* Custom Date Picker */}
                        <div>
                            <label
                                htmlFor="customDate"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Select Date
                            </label>
                            <input
                                type="date"
                                id="customDate"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-navy focus:border-navy"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCustomDateSelect}
                                disabled={!selectedDate}
                                className="flex-1 px-4 py-2 bg-navy text-white rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                            >
                                Go to Date
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateJumpModal;
