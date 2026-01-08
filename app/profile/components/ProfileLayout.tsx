'use client'

import React from 'react';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-slate-950">
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;