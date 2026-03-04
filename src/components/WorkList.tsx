import { motion } from 'motion/react';
import { Project } from '../types';

interface WorkListProps {
  projects: Project[];
  onBack: () => void;
  key?: string;
}

export default function WorkList({ projects, onBack }: WorkListProps) {
  const spatialProjects = projects.filter(p => p.category === 'spatial');
  const videoProjects = projects.filter(p => p.category === 'video');

  const Section = ({ title, items }: { title: string, items: Project[] }) => (
    <div className="mb-20 w-full max-w-2xl">
      <h2 className="text-[13px] md:text-[16px] font-bold tracking-[0.3em] text-black mb-10 md:mb-12 uppercase px-6 md:px-0 text-center">
        [{title}]
      </h2>
      <div className="flex flex-col gap-8 md:gap-5">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.6 }}
            className="group flex items-center justify-center gap-6 md:gap-10 border-b border-black/5 pb-4 hover:border-black/20 transition-colors px-6 md:px-0"
          >
            <span className="text-[13px] md:text-[14px] font-medium tracking-tight text-gray-400 text-right w-1/2 md:w-48">
              {item.name}
            </span>
            
            {/* Image Container: 16:9 Aspect Ratio */}
            <div className="w-24 md:w-40 aspect-video overflow-hidden bg-gray-50 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-sm md:shadow-none pointer-events-none">
              <img 
                src={item.thumbnailUrl} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-black py-12 md:py-24 flex flex-col items-center overflow-x-hidden"
    >
      <div className="w-full max-w-2xl flex justify-between items-center mb-16 md:mb-24 px-6 md:px-0">
        <h1 className="text-[8px] md:text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400">Work</h1>
        <button 
          onClick={onBack}
          className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors font-medium"
        >
          [ Back ]
        </button>
      </div>

      <Section title="공간디자인" items={spatialProjects} />
      <Section title="영상제작" items={videoProjects} />

      <footer className="mt-20 text-[6px] uppercase tracking-[0.5em] text-gray-400 pb-12 text-center">
        © 2026 Portfolio — Crafted with Precision
      </footer>
    </motion.div>
  );
}
