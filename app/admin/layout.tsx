'use client';

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// Admin email list - matches the existing pattern from lib/admin-auth.ts
const ADMIN_EMAILS = [
  'malhotrayash1900@gmail.com',
  'adityasingh7402@gmail.com',
  'aditya@fraterny.com',
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user || !user.email) {
          router.push('/auth');
          return;
        }

        const email = user.email.toLowerCase();

        // Check admin status via API (checks database first, then fallback)
        try {
          const response = await fetch(`/api/admin/emails/check?email=${encodeURIComponent(email)}`);
          const data = await response.json();

          if (data.success && data.isAdmin) {
            setIsAuthorized(true);
          } else {
            // If API says not admin, redirect to home
            router.push('/');
          }
        } catch (apiError) {
          console.warn('API check failed, using fallback:', apiError);
          // Fallback to hardcoded list if API fails
          if (ADMIN_EMAILS.includes(email)) {
            setIsAuthorized(true);
          } else {
            router.push('/');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
