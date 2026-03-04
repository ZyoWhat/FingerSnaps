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
    <div className="mb-24 w-full max-w-3xl">
      <h2 className="text-[11px] md:text-xs font-bold tracking-[0.4em] text-black/30 mb-12 md:mb-16 uppercase px-6 md:px-0">
        [{title}]
      </h2>
      <div className="flex flex-col gap-12 md:gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.05, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="group flex flex-col md:flex-row md:items-center justify-between border-b border-black/10 pb-8 md:pb-6 hover:border-black/30 transition-colors px-6 md:px-0"
          >
            <div className="flex flex-col gap-2 mb-6 md:mb-0">
              <span className="text-3xl md:text-4xl font-medium tracking-tighter leading-tight">
                {item.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-black/40 md:hidden">
                View Project
              </span>
            </div>
            
            {/* Image Container: High visibility on mobile, refined hover on desktop */}
            <div className="w-full md:w-40 h-56 md:h-24 overflow-hidden bg-gray-100 rounded-lg md:rounded-sm md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 shadow-xl md:shadow-none transform group-hover:scale-[1.02] md:group-hover:scale-100">
              <img 
                src={item.thumbnailUrl} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-1000"
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
      className="min-h-screen bg-white text-black py-16 md:py-32 flex flex-col items-center overflow-x-hidden"
    >
      <div className="w-full max-w-3xl flex justify-between items-center mb-20 md:mb-32 px-8 md:px-0">
        <h1 className="text-[11px] md:text-xs font-bold tracking-[0.6em] uppercase text-black/80">Works</h1>
        <button 
          onClick={onBack}
          className="text-[11px] md:text-xs uppercase tracking-[0.4em] hover:text-black/40 transition-colors font-semibold border-b border-black/20 pb-1"
        >
          Back
        </button>
      </div>

      <Section title="공간디자인" items={spatialProjects} />
      <Section title="영상제작" items={videoProjects} />

      <footer className="mt-32 text-[10px] uppercase tracking-[0.6em] text-black/20 pb-16 text-center px-8 leading-relaxed">
        © 2026 Portfolio<br className="md:hidden" /> — Crafted with Precision
      </footer>
    </motion.div>
  );
}
