import React, { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


function QuestPDFView() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // All PDF preview images
      const images = Array.from({ length: 24 }, (_, i) => {
        if (i === 0) return '/pdf/front.webp';
        return `/pdf/page-${i}.webp`;
      });
    
      // Number of images to load immediately (priority load)
      const PRIORITY_LOAD_COUNT = 3;
    
      // Auto-play effect - changes slide every 5 seconds
      useEffect(() => {
        if (isPaused) return;
    
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000); // 5 seconds
    
        return () => clearInterval(interval);
      }, [isPaused, images.length]);
    
      const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      };
    
      const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
      };







  return (
    <div className=''>
        <div className='container mx-auto max-w-7xl px-6'>
      <h2 className="text-left sm:text-center leading-tight pt-16">
          <div className='text-neutral-500 font-gilroy-medium text-xl md:text-4xl lg:text-5xl'> <span className='text-neutral-800 font-gilroy-bold
          text-4xl md:text-5xl lg:text-6xl'>Quest Sample Artifact</span></div>
        </h2>
        <p className="text-left sm:text-center text-gray-700 text-[15px] md:text-xl mb-8 md:mb-12 font-gilroy-semibold">
          Unique. Accurate. Secure
        </p>
      </div>

      <div className='container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-24 pt-0 px-4'>
        <div
          className='relative w-full max-w-sm md:max-w-lg h-auto group border-2 border-gray-200 rounded-2xl shadow-2xl bg-white p-2'
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl bg-gray-50">
            {images.map((img, index) => {
              const isPriority = index < PRIORITY_LOAD_COUNT;

              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <Image
                    src={img}
                    alt={`Quest PDF Preview ${index + 1}`}
                    layout='fill'
                    objectFit='cover'
                    className="object-center"
                    priority={isPriority}
                    loading={isPriority ? 'eager' : 'lazy'}
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-gilroy-medium">
            {currentSlide + 1} / {images.length}
          </div>
        </div>
        <div className='p-4 sm:p-0 relative '>
          {[
            {
              id: "extract-1",
              title: "Reveals Your True Self",
              description: "Quest helps you understand your core motivations, strengths, and weaknesses, providing a clear picture of your current self."
            },
            {
              id: "extract-2",
              title: "Identifies the Gap",
              description: "It highlights the gap between your current reality and your ideal self, showing you exactly what's holding you back."
            },
            {
              id: "extract-3",
              title: "Provides Personalized Tools",
              description: "Based on your unique persona, Quest delivers hyper-personalized psychological frameworks and tools to take immediate action."
            }
          ].map((item) => (
            <li className="group pb-4 mb-4 border-b border-gray-300 list-none" key={item.id}>
              <input
                type="radio"
                name="accordion"
                id={item.id}
                className="peer hidden"
                defaultChecked={item.id === "extract-1"}
              />
              <label
                htmlFor={item.id}
                className="transition-colors peer-checked:text-black text-neutral-400 cursor-pointer block"
              >
                <p className="text-3xl sm:text-5xl font-gilroy-semibold">{item.title}</p>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-has-checked:grid-rows-[1fr]">
                  <div className="overflow-hidden text-lg md:text-xl font-gilroy-regular">
                    {item.description}
                  </div>
                </div>
              </label>
            </li>
          ))}

          <div className='pt-20 flex justify-center sm:justify-start'>
            <Link href='/quest/quest-mode'>
              <div className=" text-center sm:text-left text-2xl md:text-3xl font-bold text-neutral-900 sm:text-neutral-400 hover:text-neutral-900  transition-colors duration-300 flex flex-row items-center gap-4 cursor-pointer underline">
                Enter Quest Mode.
                <ArrowRight />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestPDFView