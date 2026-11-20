'use client';

import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#F0EDE6] flex flex-col items-center overflow-x-clip">
      {/* Main Responsive Application Shell (Centered max-w-md on desktop, full-width on mobile) */}
      <main className="w-full max-w-md min-h-screen min-h-[100dvh] bg-[var(--theme-bg-app)] relative shadow-2xl flex flex-col border-x border-stone-200/60 overflow-x-clip">
        {children}
      </main>
    </div>
  );
}
