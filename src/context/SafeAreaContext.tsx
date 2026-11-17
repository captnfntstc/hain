'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Safe area insets interface mirroring `react-native-safe-area-context`
 */
export interface EdgeInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const defaultInsets: EdgeInsets = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const SafeAreaContext = createContext<EdgeInsets>(defaultInsets);

/**
 * Hook to access safe area insets anywhere in the app,
 * identical to `useSafeAreaInsets` from `react-native-safe-area-context`.
 */
export function useSafeAreaInsets(): EdgeInsets {
  return useContext(SafeAreaContext);
}

/**
 * Provider that measures device safe area insets (Dynamic Island, notch, home indicator bar)
 * and broadcasts them via React Context AND CSS Custom Properties.
 */
export function SafeAreaProvider({ children }: { children: React.ReactNode }) {
  const [insets, setInsets] = useState<EdgeInsets>(defaultInsets);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Create a hidden measuring probe element using CSS env()
    const probe = document.createElement('div');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = `
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding-top: env(safe-area-inset-top, 0px);
      padding-bottom: env(safe-area-inset-bottom, 0px);
      padding-left: env(safe-area-inset-left, 0px);
      padding-right: env(safe-area-inset-right, 0px);
      visibility: hidden;
      pointer-events: none;
      z-index: -99999;
    `;
    document.body.appendChild(probe);

    const measure = () => {
      const computed = window.getComputedStyle(probe);
      const top = parseFloat(computed.paddingTop) || 0;
      const bottom = parseFloat(computed.paddingBottom) || 0;
      const left = parseFloat(computed.paddingLeft) || 0;
      const right = parseFloat(computed.paddingRight) || 0;

      setInsets({ top, bottom, left, right });

      // Keep CSS custom properties synchronized on :root
      document.documentElement.style.setProperty('--sat', `${top}px`);
      document.documentElement.style.setProperty('--sab', `${bottom}px`);
      document.documentElement.style.setProperty('--sal', `${left}px`);
      document.documentElement.style.setProperty('--sar', `${right}px`);
    };

    measure();

    // Listen for orientation change and viewport resizing
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);

    // Also observe screen visualViewport if available (e.g. keyboard open/close)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', measure);
    }

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', measure);
      }
      if (probe.parentNode) {
        probe.parentNode.removeChild(probe);
      }
    };
  }, []);

  return (
    <SafeAreaContext.Provider value={insets}>
      {children}
    </SafeAreaContext.Provider>
  );
}

/**
 * Component mimicking `SafeAreaView` from `react-native-safe-area-context`
 */
export function SafeAreaView({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  className = '',
  style = {},
  ...props
}: {
  children: React.ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}) {
  const insets = useSafeAreaInsets();

  const combinedStyle: React.CSSProperties = {
    ...style,
    paddingTop: edges.includes('top') 
      ? `max(${style.paddingTop || '0px'}, ${insets.top}px)` 
      : style.paddingTop,
    paddingBottom: edges.includes('bottom') 
      ? `max(${style.paddingBottom || '0px'}, ${insets.bottom}px)` 
      : style.paddingBottom,
    paddingLeft: edges.includes('left') 
      ? `max(${style.paddingLeft || '0px'}, ${insets.left}px)` 
      : style.paddingLeft,
    paddingRight: edges.includes('right') 
      ? `max(${style.paddingRight || '0px'}, ${insets.right}px)` 
      : style.paddingRight,
  };

  return (
    <div className={className} style={combinedStyle} {...props}>
      {children}
    </div>
  );
}
