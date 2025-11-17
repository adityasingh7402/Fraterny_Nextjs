// StickyCTA.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { tokens, CTA_HEIGHT } from '../utils/constants';
import { DualGatewayPricingData } from '../utils/types';

async function shareText(title: string, text: string): Promise<boolean> {
  try {
    if (navigator.share) {
      await navigator.share({ title, text });
      return true;
    }
  } catch { }
  try {
    await navigator.clipboard.writeText(`${title}\n\n${text}`);
    return true;
  } catch {
    return false;
  }
}

interface StickyCTAProps {
  onOpen: () => void;
  pricing: DualGatewayPricingData;
  percentile?: string;
  qualityScore?: string;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ 
  onOpen, 
  pricing, 
  percentile, 
  qualityScore 
}) => {

  const onShare = async () => {
  const title = `I just took Quest and got a Depth Score of ${qualityScore ?? '85'}/100 🪞`;

  const share =
    `Quest gave me a breakdown of my inner patterns: the things I overlook, the things I carry, and the things that quietly drive my decisions using my own thoughts.\n\n` +
    `If you’ve been wanting clearer self-understanding (emotionally or logically), this is genuinely worth trying.\n\n` +
    `Here’s the link if you are intereseted in trying structured journaling and positive psychology:\n` +
    `https://fraterny.com/quest/quest-mode`;

  await shareText(title, share);
};
  


  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(255,255,255,0.92)",
        borderTop: `1px solid ${tokens.border}`,
        boxShadow: "0 -6px 18px rgba(10,10,10,0.06)",
        height: CTA_HEIGHT,
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overscrollBehavior: 'none'
      }}
    >
      <div className="mx-auto flex h-full max-w-[390px] items-center justify-between px-3">
        {/* Center Section - Score Info */}
        <div className="flex flex-col justify-center items-center min-h-[60px]">
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black tracking-tight leading-none" style={{ color: tokens.textDark }}>
              {qualityScore || '85'}
            </div>
            <div className="text-lg font-bold" style={{ color: tokens.muted }}>
              /100
            </div>
          </div>
          <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: tokens.textDark }}>
            Your Depth Score
          </div>
        </div>

        {/* Right Section - CTA Button */}
        <motion.button
          onClick={onShare}
          whileTap={{ scale: 0.98 }}
          className="font-gilroy-regular tracking-tight flex items-center justify-center rounded-xl px-6 py-2 text-lg font-bold text-white whitespace-nowrap"
          style={{
            background: `linear-gradient(135deg, ${tokens.accent} 0%, ${tokens.accent2} 60%, ${tokens.accent3} 100%)`,
            boxShadow: "0 8px 16px rgba(12,69,240,0.20)",
            touchAction: 'manipulation',
            pointerEvents: 'auto'
          }}
          aria-label="Unlock Full Report"
        >
          Share Quest
        </motion.button>
      </div>
    </div>
  );
};