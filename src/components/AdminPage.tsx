import { useState } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface AdminPageProps {
  projects: Project[];
  onUpdate: (updatedProjects: Project[]) => void;
  onBack: () => void;
  key?: string;
}

export default function AdminPage({ projects, onUpdate, onBack }: AdminPageProps) {
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);

  const handleChange = (id: string, field: keyof Project, value: string) => {
    const next = localProjects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setLocalProjects(next);
  };

  const handleSave = () => {
    onUpdate(localProjects);
    alert('Changes saved successfully.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 text-black p-8 md:p-20 font-sans"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold tracking-tight">Project Manager</h1>
          <div className="flex gap-4">
            <button 
              onClick={onBack}
              className="px-4 py-2 text-sm border border-black/10 rounded hover:bg-white transition-colors"
            >
              Back
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-black/80 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          {['spatial', 'video'].map(cat => (
            <div key={cat} className="bg-white p-6 rounded-lg shadow-sm border border-black/5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b pb-2">
                {cat === 'spatial' ? 'Spatial Design' : 'Video Production'}
              </h2>
              <div className="grid gap-6">
                {localProjects.filter(p => p.category === cat).map(project => (
                  <div key={project.id} className="grid md:grid-cols-2 gap-4 items-end border-b border-gray-50 pb-6">
                    <div>
                      <label className="block text-[10px] uppercase text-gray-400 mb-1">Project Name</label>
                      <input 
                        type="text" 
                        value={project.name}
                        onChange={(e) => handleChange(project.id, 'name', e.target.value)}
                        className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-gray-400 mb-1">Thumbnail URL</label>
                      <input 
                        type="text" 
                        value={project.thumbnailUrl}
                        onChange={(e) => handleChange(project.id, 'thumbnailUrl', e.target.value)}
                        className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-xs text-gray-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
