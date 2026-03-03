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
    <div className="mb-20 w-full max-w-3xl">
      <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-black/30 mb-10 md:mb-12 uppercase px-4 md:px-0">
        [{title}]
      </h2>
      <div className="flex flex-col gap-10 md:gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.6 }}
            className="group flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 pb-6 md:pb-4 hover:border-black/20 transition-colors px-4 md:px-0"
          >
            <span className="text-2xl md:text-3xl font-medium tracking-tight mb-4 md:mb-0">
              {item.name}
            </span>
            
            {/* Image Container: Visible on mobile, hover on desktop */}
            <div className="w-full md:w-32 h-48 md:h-20 overflow-hidden bg-gray-50 rounded-sm md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 shadow-sm md:shadow-none">
              <img 
                src={item.thumbnailUrl} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale md:grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
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
      <div className="w-full max-w-3xl flex justify-between items-center mb-16 md:mb-24 px-6 md:px-0">
        <h1 className="text-xs md:text-sm font-bold tracking-[0.5em] uppercase">Works</h1>
        <button 
          onClick={onBack}
          className="text-[10px] md:text-xs uppercase tracking-[0.4em] hover:text-black/40 transition-colors font-medium"
        >
          [ Back ]
        </button>
      </div>

      <Section title="공간디자인" items={spatialProjects} />
      <Section title="영상제작" items={videoProjects} />

      <footer className="mt-20 text-[9px] uppercase tracking-[0.5em] text-black/20 pb-12 text-center">
        © 2026 Portfolio — Crafted with Precision
      </footer>
    </motion.div>
  );
}
