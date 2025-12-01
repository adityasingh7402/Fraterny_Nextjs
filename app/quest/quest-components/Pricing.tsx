import React from 'react';
import { Check, X, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingProps {
  plans: PricingPlan[];
}

export interface PricingPlan {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: PricingFeature[];
  isBestOffer?: boolean;
  bonuses?: string[];
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export const Pricing: React.FC<PricingProps> = ({ plans }) => {
  return (
    <section className="bg-black text-white py-24 px-4" id="pricing">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Pay once, use forever</h2>
        <p className="text-gray-400 text-lg">Instant access. Free Updates. No subscription.</p>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`relative rounded-2xl p-6 md:p-8 ${
              plan.isBestOffer 
                ? 'bg-gray-900 border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
                : 'bg-black border border-gray-800'
            }`}
          >
            {plan.isBestOffer && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1/2">
                 <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Best Offer
                 </span>
              </div>
            )}

            <div className="flex justify-between items-start mb-6">
              <div>
                 <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                 <p className="text-gray-400 text-sm max-w-[200px]">{plan.description}</p>
              </div>
              <div className="text-right">
                {plan.originalPrice && (
                    <div className="text-gray-500 line-through text-sm">{plan.originalPrice}</div>
                )}
                <div className="text-4xl font-bold">{plan.price}</div>
                {plan.originalPrice && (
                    <div className="text-emerald-400 text-xs font-bold mt-1 bg-emerald-900/30 px-2 py-0.5 rounded inline-block">
                        -40%
                    </div>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start">
                  <div className={`mt-1 mr-3 rounded-full p-0.5 ${feature.included ? 'bg-white text-black' : 'bg-gray-800 text-gray-500'}`}>
                    {feature.included ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  </div>
                  <span className={`text-sm ${feature.included ? 'text-gray-200' : 'text-gray-600'}`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {plan.bonuses && (
                <div className="mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Bonus Tools ($100+ Value)</h4>
                    <div className="space-y-2">
                        {plan.bonuses.map((bonus, bIdx) => (
                            <div key={bIdx} className="flex items-center text-sm text-gray-300">
                                <Check className="w-4 h-4 text-emerald-400 mr-2" />
                                {bonus}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {plan.isBestOffer ? (
                <Button variant="outline">Get Mosaic Now</Button>
            ) : (
                <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-900">
                    Buy Light Version
                </Button>
            )}

            {plan.isBestOffer && (
                <div className="mt-6 pt-6 border-t border-gray-800 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                    {/* Simulated Payment Icons */}
                    <div className="h-6 w-10 bg-gray-700 rounded"></div>
                    <div className="h-6 w-10 bg-gray-700 rounded"></div>
                    <div className="h-6 w-10 bg-gray-700 rounded"></div>
                    <div className="h-6 w-10 bg-gray-700 rounded"></div>
                </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};