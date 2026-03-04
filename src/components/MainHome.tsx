import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MainHomeProps {
  onNavigate: (view: 'work' | 'about' | 'connect') => void;
  showCategories: boolean;
  setShowCategories: (show: boolean) => void;
  hasStarted: boolean;
  setHasStarted: (started: boolean) => void;
  key?: string;
}

export default function MainHome({ onNavigate, showCategories, setShowCategories, hasStarted, setHasStarted }: MainHomeProps) {
  const handleInteraction = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!hasStarted) {
      setHasStarted(true);
      // Show categories after a brief delay to feel responsive
      setTimeout(() => {
        setShowCategories(true);
      }, 800);
    } else {
      // Toggle logic: If clicking anywhere (including hand area), toggle menu
      // But don't toggle if clicking the menu buttons themselves
      if (e && (e.target as HTMLElement).tagName !== 'BUTTON') {
        setShowCategories(!showCategories);
      }
    }
  };

  useEffect(() => {
    const checkFocus = () => {
      if (document.activeElement instanceof HTMLIFrameElement) {
        handleInteraction();
        window.focus();
      }
    };
    const interval = setInterval(checkFocus, 200);
    return () => clearInterval(interval);
  }, [hasStarted, showCategories]);

  const categories = [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'connect', label: 'Connect' },
  ];

  return (
    <div 
      className="relative w-full h-screen bg-white overflow-hidden font-sans text-black touch-none cursor-pointer"
      onClick={handleInteraction}
      onTouchStart={(e) => {
        if (!hasStarted) handleInteraction();
      }}
    >
      {/* Spline Background Container - Centered and Cropped to hide watermark */}
      <div 
        className="absolute inset-0 z-0 bg-white overflow-hidden transition-all duration-1000" 
        style={{ 
          backgroundColor: '#ffffff',
          opacity: showCategories ? 0.3 : 1, // Dim more when menu is active
          width: '100vw',
          height: '100vh',
          transform: showCategories ? 'scale(0.95)' : 'scale(1)', // Subtle zoom out when menu is active
        }}
      >
        <iframe 
          src='https://my.spline.design/untitled-JDcyY5KC9ksM1Ygst2F5iY1w/' 
          frameBorder='0' 
          title="Spline 3D Scene"
          className="absolute"
          style={{ 
            backgroundColor: '#ffffff', 
            border: 'none',
            // Increased size and offset to ensure centering and watermark hiding
            width: 'calc(100% + 400px)', 
            height: 'calc(100% + 400px)',
            top: '-200px',
            left: '-200px',
            maxWidth: 'none',
            pointerEvents: 'auto'
          }}
        />
      </div>

      {/* Categories Overlay - Centered Vertical Left-Aligned within Center */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {showCategories && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ 
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 1
              }}
              className="flex flex-col items-start gap-4 md:gap-6 pointer-events-auto px-10 w-fit"
            >
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent toggling menu when clicking a button
                    onNavigate(cat.id as any);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.08 + 0.1 
                  }}
                  whileHover={{ scale: 1.1, x: 10, color: "rgba(0,0,0,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tighter transition-all text-left leading-none"
                >
                  {cat.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Hint */}
      {!hasStarted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <div className="text-[10px] uppercase tracking-[0.8em] text-black/30 font-medium animate-pulse">
            Tap to interact
          </div>
        </motion.div>
      )}
    </div>
  );
}
