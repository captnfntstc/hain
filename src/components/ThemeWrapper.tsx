'use client';

import React, { useEffect } from 'react';
import { useHain } from '../context/HainContext';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { timeOfDay } = useHain();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', timeOfDay);
  }, [timeOfDay]);

  return <div className="min-h-screen transition-colors duration-300">{children}</div>;
}
