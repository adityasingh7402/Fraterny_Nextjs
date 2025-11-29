// /src/components/quest-landing/sections/FaqSection.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface FaqSectionProps {
  className?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is the dossier?",
    answer: "A confidential psychological file that assembles your inner patterns into a clear, structured architecture.\n\nIt is a composed interpretation of your mind: precise, coherent, and built from a blend of your language and refined psychological frameworks."
  },
  {
    question: "What does the full edition contain?",
    answer: "Your complete architecture:\nextended analysis, deeper behavioral drivers, pattern mappings, contradiction lines, and the unsealed sections withheld from the preview.\n\nIt is the full, uninterrupted configuration of your psyche."
  },
  {
    question: "How is it created?",
    answer: "Quest studies your written responses through a proprietary method that unites behavioral modeling, linguistic observation, and structured psychological logic.\n\nYour words provide the signal; the system interprets the underlying structure and formats it into a deliberate, refined edition."
  },
  {
    question: "Why do people choose the dossier?",
    answer: "Because it offers rare clarity.\n\nMost people feel their inner world - they don't see its structure.\n\nThe dossier renders that structure with precision: your motifs, tensions, consistencies, and patterns arranged in a way that feels both intelligent and deeply personal.\n\nUsers keep it as a permanent reference piece."
  },
  {
    question: "Why are parts of the preview redacted?",
    answer: "Because the preview is only a controlled fragment.\n\nThe remainder: extended interpretations, deeper pattern lines, and the full psychological layout stays sealed until you access the full edition."
  },
  {
    question: "Is my identity required?",
    answer: "No.\n\nYou may remain partially anonymous.\n\nWe need basic information such as your name and email for sharing the invoice as well as your private psychological file.\n\nYour dossier is private, and nothing you write is shared beyond its creation."
  },
  {
    question: "How long does it take to access the full edition?",
    answer: "Not more than 10 minutes.\n\nYour dossier starts getting assembled, formatted, and ready for access immediately after you proceed. Once prepared, you can access it on the preview section, on the dashboard as well as your personal email."
  },
  {
    question: "Who is this designed for?",
    answer: "Individuals who value depth, clarity, and intellectual precision.\n\nThose who prefer composed insight over generic statements and appreciate an artifact that reflects their mind with both rigor and aesthetic discipline."
  },
  {
    question: "Can I revisit my dossier anytime?",
    answer: "Yes.\n\nYour edition remains archived for you to return to, study, and reflect on whenever you choose. You can access it on your personal dashboard anytime you want to."
  }
];

const FAQ: React.FC<FaqSectionProps> = ({ 
  className = '' 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className={`w-full min-h-screen px-6 py-12 ${className}`}
    >

      {/* FAQ Items */}
      <div className="space-y-0">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-white/20">
            {/* Question */}
            <button
              onClick={() => toggleFaq(index)}
              className="w-full py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
            >
              <h3 
                className="text-white pr-4 font-gilroy-regular text-[28px] font-weight-400"
                style={{ lineHeight: '105%', letterSpacing: '0%' }}
              >
                {faq.question}
              </h3>
              
              {/* Expand/Collapse Icon */}
              <motion.div
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
              >
                {openIndex === index ? (
                  <X size={24} className="text-white rotate-45" />
                ) : (
                  <Plus size={24} className="text-white" />
                )}
              </motion.div>
            </button>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-12">
                    <p 
                      className="text-white whitespace-pre-line font-gilroy-regular"
                      style={{
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '130%',
                        letterSpacing: '0%'
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
