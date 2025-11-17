'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { QuestProvider } from '../assessment-shared/provider/QuestProvider';
import { QuestIntro } from '../assessment-shared/components/QuestIntro';
import { useQuest } from '../assessment-shared/hooks/useQuest';

/**
 * Quest Begin page - Hero/Intro page that navigates to introspect
 */
function BeginPageContent() {
  const router = useRouter();
  const { startQuest } = useQuest();

  const handleStart = async () => {
    // Mark that user has accepted terms
    localStorage.setItem('fraterny_terms_accepted', 'true');
    
    // Start the quest session first (this initializes or restores from localStorage)
    await startQuest();
    
    // Then navigate to introspect page
    router.push('/quest/introspect');
  };

  return <QuestIntro onStart={handleStart} />;
}

export default function QuestBeginPage() {
  return (
    <QuestProvider>
      <BeginPageContent />
    </QuestProvider>
  );
}
