import React from 'react';

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">There is more</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">I spent hundreds of hours perfecting Mosaic to ensure it works seamlessly in your everyday life.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-3">Multi-Device Compatible</h3>
                    <p className="text-gray-500 text-sm mb-6">Whether you're on your phone, tablet, or computer, have a consistent and streamlined experience across all devices.</p>
                    <div className="bg-gray-100 rounded-lg h-32 w-full flex items-end justify-center overflow-hidden">
                        <img src="https://picsum.photos/300/200?random=20" className="w-3/4 rounded-t-lg shadow-lg translate-y-2" alt="Devices" />
                    </div>
                </div>

                 {/* Card 2 */}
                 <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-3">Light and Dark Mode</h3>
                    <p className="text-gray-500 text-sm mb-6">Mosaic is designed to look stunning in both light and dark modes. You can switch between them whenever you like.</p>
                    <div className="bg-gray-100 rounded-lg h-32 w-full flex items-center justify-center overflow-hidden gap-2">
                        <div className="w-1/3 h-full bg-white border-r border-gray-200"></div>
                        <div className="w-1/3 h-full bg-black"></div>
                    </div>
                </div>

                 {/* Card 3 */}
                 <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-3">Free Updates</h3>
                    <p className="text-gray-500 text-sm mb-6">Mosaic will be updated regularly with new models, insights, resources. You only pay once and get all updates for free.</p>
                    <div className="bg-emerald-50 rounded-lg h-32 w-full flex items-center justify-center">
                        <span className="text-emerald-500 font-bold text-2xl">Forever.</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}