import React from 'react';

export const Thesis: React.FC = () => {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-gray-400 font-medium mb-6 uppercase tracking-wider text-sm">The Mosaic Thesis</h3>
        
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12">
          The dynamics in business and in life have <span className="gradient-text">changed</span>. 
          They can be your <span className="text-red-400">enemy</span>. 
          Or your <span className="gradient-text">opportunity</span>.
        </h2>

        <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
          <p>
            Here's the problem: whether you're in product, marketing, HR, operations, engineering or management — your expertise is becoming a commodity.
          </p>

          <div className="space-y-4 border-l-2 border-gray-800 pl-6 my-8">
            <p>AI is eating knowledge work.</p>
            <p>SaaS is eating specialized skills.</p>
            <p>Global talent is eating local advantage.</p>
          </div>

          <p className="font-medium text-white">
            Being great at a thing used to be enough. <br/>
            Not anymore.
          </p>

          <p>
            The market is brutal: You either become intellectually unique, or you will be replaced.
          </p>

          <p>
            The future will reward those who can link different areas of insight and thus contribute novel ideas: Communication, analytics, science, philosophy, psychology, culture, self-awareness. And more.
          </p>

          <div className="pt-8">
            <p className="mb-4">And it all starts with being curious.</p>
            <p className="text-2xl md:text-3xl font-bold text-white">Enter: Mosaic.</p>
          </div>
        </div>
      </div>
    </section>
  );
};