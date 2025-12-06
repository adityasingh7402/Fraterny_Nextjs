import React from "react";

export interface CardData {
  id: number;
  title: React.ReactNode;
  subtitle: string;
  tag: string;
  imageUrl: string;
  stats: { label: string; value: number }[];
  bgGradient: string;
  icon: React.ReactNode;
  buttonbg: string;
  textcolor: string;
  bgHeading: React.ReactNode;
  bgSubheading: React.ReactNode;
  content: React.ReactNode;
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