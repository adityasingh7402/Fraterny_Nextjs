import React from 'react';
import Image from 'next/image';

interface FeatureProps {
  tag: React.ReactNode; // Can be string or JSX
  title: React.ReactNode; // Can be string or JSX
  subTitle?: React.ReactNode; // Can be string or JSX
  description: string;
  imageUrl: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
    avatar: string;
  };
  inverted?: boolean;
}

const Feature: React.FC<FeatureProps> = ({
  tag,
  title,
  subTitle,
  description,
  imageUrl,
  testimonial,
  inverted = false
}) => {
  return (
    <section className="bg-black text-white py-16 md:py-24 px-6 relative overflow-hidden black-bg-section">
      {/* Optional vertical line element */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/20 to-transparent hidden md:block"></div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Tag */}
        <div className="pb-4 w-full flex justify-center">
          {tag}
        </div>

        {/* Title Block */}
        <div className="mb-12 w-full">
          <h2 className="text-5xl md:text-6xl font-gilroy-semibold mb-6">{title}</h2>
          {subTitle && <div className="text-2xl md:text-4xl font-bold text-gray-400 mb-6 font-gilroy-regular">{subTitle}</div>}
          <p className="text-lg text-white leading-relaxed font-gilroy-regular max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Feature Image */}
        <div className="w-full mb-16">
          {/* <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 aspect-4/3 md:aspect-video w-full">
            <Image
              src={imageUrl}
              alt="Feature Image"
              fill
              className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none"></div>
          </div> */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 aspect-video w-full">
            <Image
              src={imageUrl}
              alt="Feature Image"
              fill
              className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none"></div>
          </div>
        </div>

        {/* Testimonial Quote */}
        {testimonial && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <img src={testimonial.avatar} alt={testimonial.author} className="w-16 h-16 rounded-full border-2 border-gray-800" />
            </div>
            <p className="text-xl md:text-2xl italic text-gray-300 mb-6 font-gilroy-medium">
              "{testimonial.text}"
            </p>
            <div>
              <h4 className="font-gilroy-semibold text-white">{testimonial.author}</h4>
              <p className="text-sm text-gray-500 font-gilroy-regular">{testimonial.role}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feature;