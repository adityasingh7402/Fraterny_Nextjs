// types.ts
export interface Film {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Subject {
  title: string;
  description: string;
  matchPercentage: number;
}

export interface AstrologyData {
  actualSign: string;
  behavioralSign: string;
  description: string;
  predictions: Array<{
    title: string;
    likelihood: number;
    reason: string;
  }>;
}

export interface AstrologyModalProps {
  prediction: { title: string, likelihood: number, reason: string } | null;
  onClose: () => void;
}

export interface Book {
  title: string;
  author: string;
  description?: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface MindCardData {
  name?: string;
  personality?: string;
  description?: string;
  attributes: string[];
  scores: string[];
  insights: string[];
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
    signal1_description: string;
    signal2_description: string;
    signal3_description: string;
    signal4_description: string;
  };
  depth_score: number;
  likert?: {
    q1?: number;
    q2?: number;
    q3?: number;
    q4?: number;
    q5?: number;
  };
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