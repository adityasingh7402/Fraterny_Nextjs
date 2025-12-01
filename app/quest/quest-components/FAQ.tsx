'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';


export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-white text-black">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Got Questions?</h2>
            <p className="text-gray-500">Still unsure? Here's what you need to know.</p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <button
                className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg hover:bg-gray-100 transition-colors focus:outline-none"
                onClick={() => toggle(index)}
              >
                <span className="pr-4">{item.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-200 bg-white">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};