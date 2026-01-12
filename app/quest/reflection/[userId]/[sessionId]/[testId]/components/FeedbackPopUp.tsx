'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Frown, Meh, Smile, Laugh, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

interface FeedbackPopupProps {
  open: boolean;
  onClose: () => void;
  onDismiss?: (hasInteracted: boolean) => void;
  onFeedbackSubmit?: () => void;
  sessionId?: string;
  testId?: string;
  userId?: string;
}

const ratings = [
  { value: 1, label: 'Terrible', icon: Frown },
  { value: 2, label: 'Bad', icon: Frown },
  { value: 3, label: 'Okay', icon: Meh },
  { value: 4, label: 'Good', icon: Smile },
  { value: 5, label: 'Amazing', icon: Laugh },
];

export const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
  open,
  onClose,
  onDismiss,
  onFeedbackSubmit,
  sessionId,
  testId,
  userId
}) => {
  const [rating, setRating] = useState<number | null>(4);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [contactConsent, setContactConsent] = useState(true);
  const [researchConsent, setResearchConsent] = useState(false);

  const handleSubmit = async () => {
    if (rating === null) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      const requestData = {
        user_id: userId || null,
        testId: testId || null,
        feedback: feedback.trim() || null,
        rating: rating,
        metadata: {
          contactConsent,
          researchConsent
        }
      };

      const response = await axios.post('/api/feedback/submit', requestData);

      if (response.status >= 200 && response.status < 300) {
        setShowThankYou(true);
        if (onFeedbackSubmit) onFeedbackSubmit();

        setTimeout(() => {
          setShowThankYou(false);
          setRating(4);
          setFeedback("");
          onClose();
        }, 2500);
      } else {
        toast.error(response.data?.message || 'Failed to submit feedback');
      }
    } catch (error: any) {
      console.error('Failed to submit feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (onDismiss) onDismiss(true);
    setRating(4);
    setFeedback("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4 font-gilroy-regular">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="bg-white rounded-[1.2rem] p-6 max-w-[560px] w-full relative shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100"
          >
            {showThankYou ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-6" />
                <h3 className="text-2xl font-gilroy-bold text-slate-900 mb-2 text-center">
                  Feedback Received!
                </h3>
                <p className="text-slate-500 text-center text-lg">
                  Thank you for helping us grow.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-[28px] font-gilroy-bold text-slate-900 mb-4 tracking-tight">
                  Give feedback
                </h2>

                <p className="text-slate-700 text-lg mb-8 leading-relaxed">
                  Did we expand your perspective?
                </p>

                {/* Rating Grid */}
                <div className="grid grid-cols-5 gap-3 mb-10">
                  {ratings.map((item) => {
                    const Icon = item.icon;
                    const isSelected = rating === item.value;
                    return (
                      <button
                        key={item.value}
                        onClick={() => setRating(item.value)}
                        className={`flex flex-col items-center justify-center py-5 transition-all duration-200 border rounded-lg group ${isSelected
                          ? 'bg-white border-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.15)] ring-2 ring-blue-500/10'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                      >
                        <Icon className={`h-8 w-8 mb-3 transition-colors ${isSelected ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-500'
                          }`} />
                        <span className={`text-sm font-gilroy-medium ${isSelected ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-500'
                          }`}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Input */}
                <div className="mb-6">
                  <label className="block text-[15px] font-gilroy-semibold text-slate-900 mb-3">
                    What are the main reasons for your rating?
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full h-32 p-4 bg-white border border-slate-200 rounded-lg resize-none font-gilroy-regular text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-800"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-10 py-3.5 bg-blue-400 hover:bg-blue-500 text-white rounded-[0.5rem] font-gilroy-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 min-w-[140px]"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-10 py-3.5 bg-gray-50 hover:bg-slate-50 text-slate-500 rounded-[0.5rem] font-gilroy-semibold text-lg transition-all border border-transparent"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
