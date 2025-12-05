export interface CardData {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  stats: { label: string; value: number }[];
  bgGradient: string;
buttonbg: string;
textcolor: string;
bgHeading: string;
  bgSubheading: string;
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

export interface CardProps {
  data: CardData;
  dimensions: CardDimensions;
  active: boolean;
}