'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileClientLayout from './contexts/profile-client';
import { useAuth } from '../auth/cotexts/AuthContext';
import type { ReactNode } from 'react';

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const { user, authReady, isLoading } = useAuth();
  const router = useRouter();

  // Client-side redirect when auth state is known and user is not logged in
  useEffect(() => {
    if (authReady && !isLoading && !user) {
      router.push('/auth');
    }
  }, [authReady, isLoading, user, router]);

  // While auth is resolving, or we're in the middle of redirecting, don't render the profile shell
  if (!authReady || isLoading || !user) {
    return null;
  }

  return (
    <ProfileClientLayout user={user}>
      {children}
    </ProfileClientLayout>
  );
}
