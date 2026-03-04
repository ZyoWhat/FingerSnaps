import { useState, useEffect } from 'react';
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
  const handleInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
      // Show categories after 1.5 seconds as requested
      setTimeout(() => {
        setShowCategories(true);
      }, 1500);
    } else {
      setShowCategories(!showCategories);
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
    <div className="relative w-full h-screen bg-white overflow-hidden font-sans text-black">
      {/* Spline Background Container - Watermark Removal Filter */}
      <div 
        className="absolute inset-0 z-0 bg-white overflow-hidden transition-opacity duration-1000" 
        style={{ 
          backgroundColor: '#ffffff',
          opacity: showCategories ? 0.5 : 1,
          height: 'calc(100vh + 100px)',
          marginBottom: '-100px'
        }}
      >
        <iframe 
          src='https://my.spline.design/untitled-JDcyY5KC9ksM1Ygst2F5iY1w/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="Spline 3D Scene"
          className="w-full h-full"
          style={{ backgroundColor: '#ffffff', border: 'none' }}
        />
      </div>

      {/* Categories Overlay - Center Vertical Left-Aligned */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {showCategories && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              className="flex flex-col items-start gap-4 md:gap-6 pointer-events-auto px-8"
            >
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  onClick={() => onNavigate(cat.id as any)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="text-lg md:text-2xl font-sans font-medium tracking-tight hover:text-black/40 transition-all text-left"
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
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <div className="text-[9px] uppercase tracking-[0.6em] text-black/20 font-light">
            Click to interact
          </div>
        </motion.div>
      )}
    </div>
  );
}
