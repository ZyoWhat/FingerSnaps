import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowLeft } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-black py-12 md:py-24 px-6 md:px-12 flex flex-col items-center overflow-x-hidden"
    >
      <div className="w-full max-w-5xl">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.4em] hover:text-black/40 transition-colors font-medium mb-12"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Thumbnail Title */}
        <div className="mb-4">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-black/30 uppercase">
            [{project.category === 'spatial' ? 'Spatial Design' : 'Video Production'}]
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
          {project.name}
        </h1>

        {/* Large Main Image */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-2xl overflow-hidden mb-16 shadow-lg">
          <img 
            src={project.thumbnailUrl} 
            alt={project.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Description Text */}
        <div className="max-w-3xl mb-24">
          <p className="text-lg md:text-xl text-black/70 leading-relaxed text-left">
            {project.description || "Project description will be updated soon. This project showcases our commitment to excellence in design and execution."}
          </p>
        </div>

        {/* Additional Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-24">
          {(project.additionalImages && project.additionalImages.length > 0) ? (
            project.additionalImages.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-black/5"
              >
                <img 
                  src={img} 
                  alt={`${project.name} detail ${idx + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))
          ) : (
            // Placeholder grid if no additional images
            [1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="aspect-square bg-gray-50 rounded-2xl border border-dashed border-black/10 flex items-center justify-center text-black/10">
                <span className="text-[10px] uppercase tracking-widest">Detail Image {idx + 1}</span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-[8px] uppercase tracking-[0.5em] text-black/10 pb-12 text-center">
          © 2026 Portfolio — Crafted with Precision
        </footer>
      </div>
    </motion.div>
  );
}
