import React from 'react';
import { Star } from 'lucide-react';

export interface TestimonialData {
  name: string;
  role: string;
  avatar: string;
  stars: number;
  text: string;
}

interface TestimonialsProps {
  title: string;
  data: TestimonialData[];
  light?: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ title, data, light = true }) => {
  return (
    <section className={`py-20 px-4 ${light ? 'bg-white text-black' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-center text-gray-500 mb-12">Smart people, real feedback.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
              <div className="flex text-orange-400 mb-3">
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed italic">"{item.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};