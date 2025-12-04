

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

export const VIEWPORT_DIMENSIONS: Dimensions = {
  width: 164.6,
  height: 297,
};

export const CARD_DIMENSIONS: CardDimensions = {
  width: VIEWPORT_DIMENSIONS.width * 0.7066, // Exactly 70.66% of viewport width
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