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

export interface Cluster {
  name: React.ReactNode;
  img: string,
  bgimg?: string,
  buttonbg?: string,
  textcolor?: string,
  icon?: React.ReactNode;
  bgHeading?: React.ReactNode;
  bgSubheading?: React.ReactNode;
  content: React.ReactNode;
  archetypes: Archetype[];
}

export type Archetype = string;

export interface Context {
  self: string;
  world: string;
  aspire: string;
}

export type ResultData = {
  archetypes: {
    [key: string]: {
      clusterName: React.ReactNode;
      subtitle: string;  // ADD THIS
      imgUrl: string;
      bgUrl: string;
      buttonbg: string;
      textcolor: string;
      icon: React.ReactNode;
      content: React.ReactNode;
      bgHeading: React.ReactNode;
      bgSubheading: React.ReactNode;
    };
  };
  core_line: string;
  primary_pattern: string;
  slider_question: {
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    likert1: string[];
    likert2: string[];
    likert3: string[];
    likert4: string[];
  };
  signals: {
    signal1_purpose: string;
    signal2_purpose: string;
    signal3_purpose: string;
    signal4_purpose: string;
    signal5_purpose: string;
    signal1_description: string;
    signal2_description: string;
    signal3_description: string;
    signal4_description: string;
    signal5_description: string;
  };
  depth_score: number;
};

export interface User {
  id: string;
  email?: string;
  name?: string;
  user_metadata?: any;
  app_metadata?: any;
}

export interface RouteParams {
  userId: string;
  sessionId: string;
  testId: string;
}

export interface PricingData {
  main: string;
  original: string;
  currency: string;
  symbol: string;
  amount: number;
  isIndia: boolean;
  isLoading: boolean;
}

export interface DualGatewayPricingData {
  razorpay: PricingData;
  paypal: {
    main: string;
    original: string;
    currency: string;
    amount: number;
    isIndia: boolean;
  };
  isLoading: boolean;
}

export interface AssessmentPaymentStatus {
  ispaymentdone: "success" | null;
  quest_pdf: string;
  quest_status: "generated" | "working" | null;
}

export type PaymentGateway = 'razorpay' | 'paypal';