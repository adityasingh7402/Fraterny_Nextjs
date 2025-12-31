
"use client"
import React, { useEffect } from 'react';
import MotionProvider from './animations/MotionProvider';
import HomePage from './sections/HomePage';

const QuestLandingPage: React.FC = () => {
  const handleAnalyzeClick = () => {
    console.log('Analyze Me clicked - you can add your logic here');
    // Add any additional logic you need when the button is clicked
  };


  return (
    <MotionProvider>
      <HomePage />
    </MotionProvider>
  );
};
export default QuestLandingPage;

