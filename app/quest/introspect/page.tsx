'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

/**
 * Guard component that checks terms before loading QuestProvider
 */
function TermsGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const termsAccepted = localStorage.getItem('fraterny_terms_accepted');
    const savedSession = localStorage.getItem('fraterny_quest_session');
    
    // If terms not accepted and no saved session, redirect to begin page
    if (!termsAccepted && !savedSession) {
      console.log('⚠️ Terms not accepted and no saved session, redirecting to /quest/begin');
      router.replace('/quest/begin');
      setCanAccess(false);
    } else {
      console.log('✅ Access granted - terms accepted or session exists');
      setCanAccess(true);
    }
    
    setIsChecking(false);
  }, [router]);

  // Show nothing while checking or if access denied
  if (isChecking || !canAccess) {
    return null;
  }

  return <>{children}</>;
}

export default function QuestIntrospectPage() {
  return (
    <TermsGuard>
      <QuestProvider>
        <IntrospectContent />
      </QuestProvider>
    </TermsGuard>
  );
}
