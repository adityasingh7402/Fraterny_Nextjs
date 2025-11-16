'use client';

import React, { useState } from 'react';
import { QuestProvider } from '../assessment-shared/provider/QuestProvider';
import { QuestIntro } from '../assessment-shared/components/QuestIntro';
import { QuestAssessment } from '../assessment-shared/components/QuestAssessment';

/**
 * Quest Begin page - Combined Hero/Intro and Questions
 * Keeps both in same QuestProvider to maintain session
 */
export default function QuestBeginPage() {
  const [showQuestions, setShowQuestions] = useState(false);

  const handleStart = () => {
    // Show questions instead of navigating
    setShowQuestions(true);
  };

  return (
    <QuestProvider>
      {!showQuestions ? (
        <QuestIntro onStart={handleStart} />
      ) : (
        <QuestAssessment />
      )}
    </QuestProvider>
  );
}
