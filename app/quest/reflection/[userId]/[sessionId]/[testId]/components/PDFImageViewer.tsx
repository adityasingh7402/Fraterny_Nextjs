'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Image from 'next/image';
// import { DualGatewayPricingData } from '../../../../../components/pricing/DualGatewayPricingData';





interface PDFImageViewerProps {
  paymentSuccess: boolean;
  onUnlockClick: () => void;
  paymentStatus: {
    ispaymentdone: "success" | null;
    quest_pdf: string;
    quest_status: "generated" | "working" | null;
  } | null;
  onPDFDownload: () => void;
  pricing: {
    razorpay: {
      main: string;
      original: string;
    };
    isLoading: boolean;
  };
  isCheckingPayment?: boolean;
}

export const PDFImageViewer: React.FC<PDFImageViewerProps> = ({ paymentSuccess, onUnlockClick, paymentStatus, onPDFDownload, pricing, isCheckingPayment = false }) => {
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate array of 24 image paths
  // First page: front.webp
  // Rest: page-1.webp, page-2.webp, ... page-23.webp
  const images = Array.from({ length: 24 }, (_, i) => {
    if (i === 0) return `/pdf/front.webp`; // First page is the front cover
    return `/pdf/page-${i}.webp`; // Rest are page-1, page-2, etc.
  });

  // Number of images to load immediately (priority load)
  const PRIORITY_LOAD_COUNT = 3;

  const handleZoomIn = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      setZoom(prev => {
        const newZoom = Math.min(prev + 0.2, 3);

        // Maintain scroll position relative to zoom
        setTimeout(() => {
          if (container) {
            const ratio = newZoom / (newZoom - 0.2);
            container.scrollTop = scrollTop * ratio;
          }
        }, 0);

        return newZoom;
      });
    } else {
      setZoom(prev => Math.min(prev + 0.2, 3));
    }
  };

  const handleZoomOut = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollTop = container.scrollTop;

      setZoom(prev => {
        const newZoom = Math.max(prev - 0.2, 1.0);

        // Maintain scroll position relative to zoom
        setTimeout(() => {
          if (container) {
            const ratio = newZoom / (newZoom + 0.2);
            container.scrollTop = scrollTop * ratio;
          }
        }, 0);

        return newZoom;
      });
    } else {
      setZoom(prev => Math.max(prev - 0.2, 1.0));
    }
  };

  const handleReset = () => {
    setZoom(1);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollLeft = 0;
    }
  };

  // Mouse drag handlers for panning when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1 && containerRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setScrollStart({
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current && zoom > 1) {
      const deltaX = dragStart.x - e.clientX;
      const deltaY = dragStart.y - e.clientY;

      containerRef.current.scrollLeft = scrollStart.x + deltaX;
      containerRef.current.scrollTop = scrollStart.y + deltaY;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
      {/* Image Viewer Container */}
      <div className="h-[550px] md:h-[650px] w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 relative">
        <div
          ref={containerRef}
          className="w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          data-lenis-prevent
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
        >
          <div
            className="flex flex-col items-center"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'left top',
              transition: 'transform 0.2s ease-out'
            }}
          >
            {images.map((image, index) => {
              // First 3 images: Load immediately with priority
              // Remaining images: Lazy load as user scrolls
              const isPriority = index < PRIORITY_LOAD_COUNT;

              return (
                <div key={index} className="w-full pb-1">
                  <Image
                    src={image}
                    alt={`PDF Page ${index + 1}`}
                    width={1200}
                    height={1600}
                    className="w-full h-auto select-none"
                    draggable={false}
                    priority={isPriority}
                    loading={isPriority ? 'eager' : 'lazy'}
                    quality={90}
                    unoptimized={false}
                    onError={(e) => {
                      console.error(`Failed to load ${image}`);
                    }}
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <motion.button
            onClick={handleZoomIn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            aria-label="Zoom In"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleZoomOut}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            aria-label="Zoom Out"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            aria-label="Reset Zoom"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
        </div>

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-gilroy-regular">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Unlock Overlay with Blue Gradient */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="relative rounded-2xl border-t border-blue-300/30 p-6" style={{
          background: 'linear-gradient(135deg, rgba(12,69,240,1) 0%, rgba(72,185,216,0.95) 100%)'
        }}>

          <div className="relative z-10">
            {isCheckingPayment ? (
              <div className="flex flex-col items-center justify-center py-4">
                <span className="text-white/90 font-gilroy-medium animate-pulse">Verifying access...</span>
              </div>
            ) : (
              <>
                {/* Pricing Section - Only show when payment not done */}
                {paymentStatus?.ispaymentdone !== "success" && (
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-4xl font-gilroy-bold text-white">
                      {pricing.isLoading ? '...' : pricing.razorpay.main}
                    </span>
                    {/* <span className="text-xl font-gilroy-regular line-through text-white/70">
                      {pricing.isLoading ? '...' : pricing.razorpay.original}
                    </span> */}
                  </div>
                )}

                {/* 35+ Pages PDF Label - Always visible */}
                <div className="flex items-center justify-center gap-1 text-sm text-white/90 mb-4">
                  <FileText className="h-4 w-4 text-white/90" />
                  <span className="font-gilroy-regular">Your Mind Printed</span>
                </div>

                {/* Centered Button */}
                <div className="flex justify-center">
                  {paymentStatus?.ispaymentdone === "success" ? (
                    paymentStatus.quest_status === "generated" ? (
                      // Payment done and PDF ready - show download button
                      <motion.button
                        onClick={onPDFDownload}
                        whileTap={{ scale: 0.98 }}
                        className="font-gilroy-semibold flex items-center bg-black justify-center rounded-full px-6 py-2.5 text-[14px] font-[700] text-white gap-2"
                        style={{
                          width: '280px'
                        }}
                        aria-label="Download PDF report"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Get Your File
                      </motion.button>
                    ) : (
                      // Payment done but PDF still generating
                      <div className="flex items-center justify-center rounded-full px-6 py-2.5 text-[14px] font-[700] text-white bg-white/20 gap-2" style={{ width: '280px' }}>
                        PDF Generating...
                      </div>
                    )
                  ) : (
                    // Payment not done - show unlock button
                    <motion.button
                      onClick={onUnlockClick}
                      whileTap={{ scale: 0.98 }}
                      className="font-gilroy-semibold flex items-center justify-center rounded-full px-6 py-2.5 text-[14px] font-[700] text-black"
                      style={{
                        background: 'rgba(255,255,255,0.95)',
                        boxShadow: "0 10px 20px rgba(255,255,255,0.20)",
                        width: '280px'
                      }}
                      aria-label="Unlock full PDF report"
                    >
                      Get a Personal Artifact
                    </motion.button>
                  )}

                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Page Indicator */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm font-gilroy-regular">Sample PDF Report Preview (24 Pages)</p>
      </div>
    </div>
  );
};