'use client';

import React from 'react';
import { QuestProvider } from '../assessment-shared/provider/QuestProvider';
import { QuestAssessment } from '../assessment-shared/components/QuestAssessment';
import QuestLoading from '../assessment-shared/components/QuestLoading';

/**
 * Quest Introspect page - Questions and Answers
 * Main assessment experience
 */
export default function QuestIntrospectPage() {
  return (
    <QuestProvider>
      <div className="max-h-screen">
        <QuestAssessment />
      </div>
    </QuestProvider>
  );
}
