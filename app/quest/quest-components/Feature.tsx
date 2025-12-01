import React from 'react';

interface FeatureProps {
  tag: string;
  title: string;
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
    <section className="bg-black text-white py-24 px-6 relative overflow-hidden">
        {/* Optional vertical line element */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent hidden md:block"></div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Tag */}
        <div className="inline-block px-4 py-1 rounded-full border border-gray-700 text-gray-300 text-xs font-semibold uppercase tracking-wider mb-8 bg-gray-900">
          {tag}
        </div>

        {/* Title Block */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{title}</h2>
          {subTitle && <div className="text-2xl md:text-4xl font-bold text-gray-400 mb-6">{subTitle}</div>}
          <p className="text-lg text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Feature Image */}
        <div className="w-full max-w-3xl mb-16">
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-900 aspect-[4/3] md:aspect-video">
                 <img 
                    src={imageUrl} 
                    alt={title} 
                    className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
        </div>

        {/* Testimonial Quote */}
        {testimonial && (
          <div className="max-w-2xl mx-auto text-center">
             <div className="mb-6 flex justify-center">
                <img src={testimonial.avatar} alt={testimonial.author} className="w-16 h-16 rounded-full border-2 border-gray-800" />
             </div>
             <p className="text-xl md:text-2xl font-serif italic text-gray-300 mb-6">
                "{testimonial.text}"
             </p>
             <div>
                <h4 className="font-bold text-white">{testimonial.author}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feature;