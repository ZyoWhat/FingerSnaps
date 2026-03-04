import { useState } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

interface WorkListProps {
  projects: Project[];
  onBack: () => void;
}

export default function WorkList({ projects, onBack }: WorkListProps) {
  const navigate = useNavigate();
  const spatialProjects = projects.filter(p => p.category === 'spatial');
  const videoProjects = projects.filter(p => p.category === 'video');

  const CategorySection = ({ title, items }: { title: string, items: Project[] }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="mb-32 w-full max-w-6xl px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-black">
            {title}
          </h2>
          {isExpanded && (
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-[10px] uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors"
            >
              [ Close ]
            </button>
          )}
        </div>

        <div className="relative min-h-[200px]">
          {!isExpanded ? (
            /* Stacked View - Scaled down to ~60% */
            <div 
              className="relative w-40 h-40 md:w-48 md:h-48 mx-auto cursor-pointer group"
              onClick={() => setIsExpanded(true)}
            >
              {items.slice(0, 4).map((item, idx) => (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  className="absolute inset-0 bg-gray-100 rounded-2xl shadow-lg border border-black/5 overflow-hidden"
                  style={{ 
                    zIndex: items.length - idx,
                    transformOrigin: 'bottom center'
                  }}
                  initial={false}
                  animate={{ 
                    rotate: idx * 3,
                    x: idx * 4,
                    y: -idx * 4,
                    scale: 1 - idx * 0.02
                  }}
                  whileHover={{ 
                    y: -idx * 8 - 10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <img 
                    src={item.thumbnailUrl} 
                    alt="" 
                    className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {idx === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px]">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-black font-bold">
                        {items.length}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="absolute -bottom-10 left-0 right-0 text-center">
                <span className="text-[11px] font-medium text-black/40 uppercase tracking-widest">Click to open</span>
              </div>
            </div>
          ) : (
            /* Grid View - MacBook Finder Style */
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-12 gap-y-16 md:gap-x-16 md:gap-y-20 justify-items-center"
            >
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => navigate(`/work/${item.id}`)}
                  className="flex flex-col items-center group cursor-pointer w-32 md:w-40"
                >
                  {/* Thumbnail Box (Top) */}
                  <div className="w-full aspect-square bg-gray-50 rounded-2xl shadow-sm border border-black/5 overflow-hidden relative mb-4 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                    <img 
                      src={item.thumbnailUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Project Title (Bottom) */}
                  <span className="text-[11px] md:text-[12px] font-medium tracking-tight text-black/60 text-center leading-tight px-2 group-hover:text-black transition-colors">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-black py-16 md:py-24 flex flex-col items-center overflow-x-hidden"
    >
      <div className="w-full max-w-6xl flex justify-between items-center mb-20 px-6">
        <h1 className="text-xs md:text-sm font-bold tracking-[0.5em] uppercase text-black/20">Work</h1>
        <button 
          onClick={onBack}
          className="text-[10px] md:text-xs uppercase tracking-[0.4em] hover:text-black/40 transition-colors font-medium"
        >
          [ Back ]
        </button>
      </div>

      <CategorySection title="공간디자인" items={spatialProjects} />
      <CategorySection title="영상제작" items={videoProjects} />

      <footer className="mt-20 text-[8px] uppercase tracking-[0.5em] text-black/10 pb-12 text-center">
        © 2026 Portfolio — Crafted with Precision
      </footer>
    </motion.div>
  );
}
