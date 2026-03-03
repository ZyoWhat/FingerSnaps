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
    <div className="mb-16 w-full max-w-2xl">
      <h2 className="text-xs font-bold tracking-[0.3em] text-black/30 mb-8 uppercase">
        [{title}]
      </h2>
      <div className="flex flex-col gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group flex items-center justify-between border-b border-black/5 pb-4 hover:border-black/20 transition-colors"
          >
            <span className="text-xl md:text-2xl font-medium tracking-tight">
              {item.name}
            </span>
            <div className="w-24 h-14 md:w-32 md:h-20 overflow-hidden bg-gray-50 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <img 
                src={item.thumbnailUrl} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
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
      className="min-h-screen bg-white text-black p-8 md:p-24 flex flex-col items-center"
    >
      <div className="w-full max-w-2xl flex justify-between items-center mb-20">
        <h1 className="text-sm font-bold tracking-[0.5em] uppercase">Works</h1>
        <button 
          onClick={onBack}
          className="text-[10px] uppercase tracking-[0.4em] hover:text-black/40 transition-colors"
        >
          [ Back ]
        </button>
      </div>

      <Section title="공간디자인" items={spatialProjects} />
      <Section title="영상제작" items={videoProjects} />

      <footer className="mt-20 text-[9px] uppercase tracking-[0.5em] text-black/20 pb-12">
        © 2024 Portfolio
      </footer>
    </motion.div>
  );
}
