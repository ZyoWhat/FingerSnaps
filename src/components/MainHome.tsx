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
    // Prevent default if it's a touch to avoid double triggers
    if (e && 'touches' in e) {
      // We don't necessarily want to preventDefault here as it might block the actual button clicks later
    }
    
    if (!hasStarted) {
      setHasStarted(true);
      setTimeout(() => {
        setShowCategories(true);
      }, 1500);
    } else {
      // Only toggle if clicking the background, not the buttons
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
      className="relative w-full h-screen bg-white overflow-hidden font-sans text-black touch-none"
      onClick={handleInteraction}
      onTouchStart={(e) => {
        // Simple touch start to trigger interaction on mobile
        if (!hasStarted) handleInteraction();
      }}
    >
      {/* Spline Background Container */}
      <div 
        className="absolute inset-0 z-0 bg-white overflow-hidden transition-opacity duration-1000 pointer-events-none" 
        style={{ 
          backgroundColor: '#ffffff',
          opacity: showCategories ? 0.4 : 1,
          height: '100vh',
        }}
      >
        <iframe 
          src='https://my.spline.design/untitled-JDcyY5KC9ksM1Ygst2F5iY1w/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="Spline 3D Scene"
          className="w-full h-full scale-110 md:scale-100"
          style={{ backgroundColor: '#ffffff', border: 'none' }}
        />
      </div>

      {/* Categories Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {showCategories && (
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              className="flex flex-col items-start gap-4 md:gap-8 pointer-events-auto px-10 w-full max-w-lg"
            >
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(cat.id as any);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ x: 12 }}
                  whileTap={{ scale: 0.95, x: 5 }}
                  className="text-5xl sm:text-6xl md:text-7xl font-sans font-medium tracking-tighter hover:text-black/40 transition-all text-left leading-none"
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
            Tap to start
          </div>
        </motion.div>
      )}
    </div>
  );
}
