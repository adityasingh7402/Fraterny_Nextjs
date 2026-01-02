'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const VillaTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Joe Brown",
      role: "Project manager",
      text: "Working with Fraterny was incredibly exceptional experience. The attention to detail, their commitment to sustainability, and the ability to solve each challenge made us feel in the best hands. The final result exceeded our expectations. Highly delighted!"
    },
    {
      name: "Jonathan",
      role: "Project manager",
      text: "Working with this team has been an absolute pleasure. Their attention to detail, creative ideas, and professionalism made the entire process smooth and enjoyable. Highly recommend!"
    },
    {
      name: "Jack Miller",
      role: "Project manager",
      text: "The level of skill and passion they bring to their work is unmatched. They listened to my needs and provided innovative solutions that exceeded expectations."
    },
    {
      name: "Sarah Johnson",
      role: "Business owner",
      text: "An incredible team that delivers beyond expectations. Their creativity and dedication transformed our vision into reality with remarkable precision."
    },
    {
      name: "Michael Chen",
      role: "Creative director",
      text: "Professional, talented, and a pleasure to work with. They brought fresh perspectives and innovative solutions to every challenge we faced."
    },
    {
      name: "Emma Williams",
      role: "Marketing lead",
      text: "Outstanding work from start to finish. Their ability to understand our needs and deliver exceptional results is truly impressive."
    }
  ];

  const itemsPerPage = 3;
  const maxIndex = Math.ceil(testimonials.length / itemsPerPage) - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="py-16 px-6 bg-neutral-200 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-12">
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-gilroy-semibold text-neutral-500 tracking-tight text-left sm:text-center">
              What Our Community Say
            </h2>
            <h3 className="text-5xl sm:text-6xl md:text-7xl font-gilroy-regular italic text-neutral-900">
              About Us
            </h3>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
              aria-label="Previous testimonials"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border-2 border-neutral-900 text-neutral-900 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-colors"
              aria-label="Next testimonials"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="relative overflow-hidden min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-100 rounded-lg p-8 shadow-sm"
                >
                  {/* Badge */}
                  <div className="inline-block mb-6">
                    <span className="px-4 py-2 bg-white border border-neutral-300 rounded-full text-sm font-gilroy-regular text-neutral-900">
                      {testimonial.name}
                    </span>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-neutral-700 leading-relaxed mb-8 text-sm font-gilroy-medium">
                    "{testimonial.text}"
                  </p>

                  {/* Name and Role */}
                  <div>
                    <p className="font-gilroy-medium text-neutral-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-neutral-500 font-gilroy-regular text-xs mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-neutral-900 w-8'
                  : 'bg-neutral-400 hover:bg-neutral-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VillaTestimonials;