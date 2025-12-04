'use client';

export interface CardData {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  stats: { label: string; value: number }[];
  bgGradient: string;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface CardDimensions {
  width: number;
  height: number;
  imageWidth: number;
  imageHeight: number;
  gap: number;
}

// Ratio constants derived from original design
const DESIGN_RATIOS = {
  viewportAspect: 1.804,      // height/width ratio
  cardWidthRatio: 0.7066,     // card width / viewport width
  cardAspect: 2.022,          // card height / card width
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

  console.log('📐 Calculated Dimensions:', {
    inputWidth: viewportWidth,
    rounded: roundedViewportWidth,
    viewport: { width: roundedViewportWidth, height: viewportHeight },
    card: { width: cardWidth, height: cardHeight },
    image: { width: imageWidth, height: imageHeight }
  });

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

export const CARDS_DATA: CardData[] = [
  {
    id: 1,
    title: "",
    subtitle: "",
    tag: "",
    imageUrl: '/result/SOUL ALIGNED (2).png',
    stats: [],
    bgGradient: '/result/SOUL ALIGNED (3).png'
  },
  {
    id: 2,
    title: "",
    subtitle: "",
    tag: "",
    imageUrl: "/result/RESTLESS MIND.png",
    stats: [],
    bgGradient: "/result/RESTLESS MIND (2).png"
  },
  {
    id: 3,
    title: "",
    subtitle: "",
    tag: "",
    imageUrl: "/result/HIDDEN THINKER (2).png",
    stats: [],
    bgGradient: "/result/HIDDEN THINKER (3).png"
  }
];