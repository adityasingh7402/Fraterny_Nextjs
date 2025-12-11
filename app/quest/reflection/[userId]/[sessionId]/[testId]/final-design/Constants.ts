'use client';
import { CardData, CardDimensions, Dimensions } from './types';


// Ratio constants derived from original design
const DESIGN_RATIOS = {
  viewportAspect: 2.0,      // height/width ratio earlier eas 1.804
  cardWidthRatio: 0.7066,     // card width / viewport width
  cardAspect: 2.13,          // card height / card width. Increase the card height
  imageWidthRatio: 0.853,     // image width / card width
  imageAspect: 1.407,         // image height / image width
  gapRatio: 0.073             // gap / card width
};

export const calculateDimensions = (viewportWidth: number): {
  viewport: Dimensions;
  card: CardDimensions;
} => {
  // Round viewport width to integer first to prevent cumulative errors
  const roundedViewportWidth = Math.round(viewportWidth);
  const viewportHeight = Math.round(roundedViewportWidth * DESIGN_RATIOS.viewportAspect);
  const cardWidth = Math.round(roundedViewportWidth * DESIGN_RATIOS.cardWidthRatio);
  const cardHeight = Math.round(cardWidth * DESIGN_RATIOS.cardAspect);
  const imageWidth = Math.round(cardWidth * DESIGN_RATIOS.imageWidthRatio);
  const imageHeight = Math.round(imageWidth * DESIGN_RATIOS.imageAspect);
  const gap = Math.round(cardWidth * DESIGN_RATIOS.gapRatio);



  return {
    viewport: {
      width: roundedViewportWidth,
      height: viewportHeight
    },
    card: {
      width: cardWidth,
      height: cardHeight,
      imageWidth: imageWidth,
      imageHeight: imageHeight,
      gap: gap
    }
  };
};

// Deprecated: Use calculateDimensions() instead for responsive sizing
// Kept for reference only (original design values at 164.6px viewport width)
export const VIEWPORT_DIMENSIONS: Dimensions = {
  width: 164.6,
  height: 297,
};

export const CARD_DIMENSIONS: CardDimensions = {
  width: VIEWPORT_DIMENSIONS.width * 0.7066,
  height: 235.1,
  imageWidth: 99.2,
  imageHeight: 139.6,
  gap: 8.5,
};