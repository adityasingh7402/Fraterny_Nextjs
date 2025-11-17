'use client';

import React, { useEffect } from 'react';
import { QuestProvider } from '../assessment-shared/provider/QuestProvider';
import { QuestAssessment } from '../assessment-shared/components/QuestAssessment';
import { useQuest } from '../assessment-shared/hooks/useQuest';
import QuestLoading from '../assessment-shared/components/QuestLoading';

/**
 * Quest Introspect page - Questions and Answers
 * Main assessment experience
 */
function IntrospectContent() {
  const { session, startQuest, isLoading } = useQuest();

  // Auto-initialize session if not present
  useEffect(() => {
    if (!session && !isLoading) {
      console.log('🔄 No session found, initializing quest...');
      startQuest();
    }
  }, [session, isLoading, startQuest]);

  // Show loading while initializing
  if (isLoading || !session) {
    return <QuestLoading />;
  }

  return (
    <div className="max-h-screen">
      <QuestAssessment />
    </div>
  );
}

export default function QuestIntrospectPage() {
  return (
    <QuestProvider>
      <IntrospectContent />
    </QuestProvider>
  );
}
