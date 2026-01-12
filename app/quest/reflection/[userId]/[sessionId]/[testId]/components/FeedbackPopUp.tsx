'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, CheckCircle2, Users } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import Image from 'next/image';

interface FeedbackPopupProps {
  open: boolean;
  onClose: () => void;
  onDismiss?: (hasInteracted: boolean) => void;
  onFeedbackSubmit?: () => void;
  sessionId?: string;
  testId?: string;
  userId?: string;
  accentColor?: string;
}

export const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
  open,
  onClose,
  onDismiss,
  onFeedbackSubmit,
  sessionId,
  testId,
  userId,
  accentColor = '#0A1A2F'
}) => {
  const [rating, setRating] = useState<number | null>(4);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

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
      };

      const response = await axios.post('/api/feedback/submit', requestData);

      if (response.status >= 200 && response.status < 300) {
        setShowThankYou(true);
        if (onFeedbackSubmit) onFeedbackSubmit();
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
    setShowThankYou(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-[#0A1A2F]/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-gilroy-regular">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2rem] md:p-10 p-8 max-w-[440px] w-full relative shadow-[0_30px_60px_-15px_rgba(10,26,47,0.3)] text-left"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[#0A1A2F] hover:bg-slate-100 rounded-full transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            {showThankYou ? (
              <div className="flex flex-col items-center py-2">
                <div className="mb-4 w-full flex justify-center">
                  <div className="relative w-44 h-44">
                    <Image
                      src="/feedback-thank-you2.png"
                      alt="Feedback Thank You"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="bg-slate-100 px-6 py-2 rounded-full text-slate-500 text-sm font-gilroy-medium mb-6">
                  You selected {rating} out of 5
                </div>

                <h3 className="text-3xl font-gilroy-bold text-[#0A1A2F] mb-4 text-center">
                  Thank You
                </h3>

                <p className="text-slate-500 text-center text-base leading-relaxed mb-4 px-2">
                  We appreciate you taking the time to give a rating. If you ever need more support, don&apos;t hesitate to get in touch.
                </p>

                <button
                  onClick={handleClose}
                  className="w-full mt-6 py-4 text-white rounded-2xl font-gilroy-bold text-lg hover:opacity-90 transition-all shadow-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Star Icon Card */}
                <div className="flex justify-start mb-5">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                    <Star className="h-6 w-6" style={{ color: accentColor, fill: accentColor }} />
                  </div>
                </div>

                <h2 className="text-3xl font-gilroy-bold text-[#0A1A2F] mb-5">
                  Did we expand your perspective?
                </h2>


                {/* Rating Circles */}
                <div className="flex justify-between items-center mb-5 gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => setRating(val)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-gilroy-bold transition-all ${rating === val
                        ? 'text-white shadow-xl scale-110'
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                        }`}
                      style={rating === val ? {
                        backgroundColor: accentColor,
                        boxShadow: `0 10px 15px -3px ${accentColor}33` // Subtle shadow with accent color
                      } : {}}
                    >
                      {val}
                    </button>
                  ))}
                </div>

                <div className="mb-5">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you liked or how we can improve..."
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-opacity-20 transition-all resize-none text-sm font-gilroy-regular"
                    style={{
                      '--tw-ring-color': `${accentColor}1A`, // 10% opacity for ring
                      borderColor: `${accentColor}33` // 20% opacity for border
                    } as React.CSSProperties}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 text-white rounded-2xl font-gilroy-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>

                {/* Hidden preloader for the thank you image */}
                <div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden">
                  <Image
                    src="/feedback-thank-you2.png"
                    alt="preloader"
                    width={1}
                    height={1}
                    priority
                  />
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
