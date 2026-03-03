import { useState } from 'react';
import { motion } from 'motion/react';
import { Project, Category } from '../types';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

interface AdminPageProps {
  projects: Project[];
  onUpdate: (updatedProjects: Project[]) => void;
  onBack: () => void;
}

export default function AdminPage({ projects, onUpdate, onBack }: AdminPageProps) {
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);

  const handleChange = (id: string, field: keyof Project, value: string) => {
    const next = localProjects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setLocalProjects(next);
  };

  const handleAdd = (category: Category) => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: '새 프로젝트',
      category,
      thumbnailUrl: 'https://picsum.photos/seed/new/200/120'
    };
    setLocalProjects([...localProjects, newProject]);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setLocalProjects(localProjects.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    onUpdate(localProjects);
    alert('성공적으로 저장되었습니다.');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#f8f8f8] p-6 md:p-12 font-sans text-black">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Project Manager</h1>
          <div className="flex gap-3">
            <button onClick={onBack} className="flex items-center gap-2 px-5 py-2 border rounded-full hover:bg-white transition-all"><ArrowLeft size={16} /> Back</button>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full hover:bg-black/80 transition-all"><Save size={16} /> Save</button>
          </div>
        </header>

        <div className="grid gap-10">
          {(['spatial', 'video'] as Category[]).map(cat => (
            <section key={cat} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="px-8 py-5 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">{cat === 'spatial' ? '공간 디자인' : '영상 제작'}</h2>
                <button onClick={() => handleAdd(cat)} className="flex items-center gap-1 text-[10px] font-bold uppercase text-black hover:opacity-60"><Plus size={14} /> Add</button>
              </div>
              <div className="p-8 grid gap-8">
                {localProjects.filter(p => p.category === cat).map(project => (
                  <div key={project.id} className="grid md:grid-cols-[120px_1fr_auto] gap-6 items-center pb-6 border-b last:border-0">
                    <img src={project.thumbnailUrl} className="w-full aspect-video object-cover rounded" referrerPolicy="no-referrer" />
                    <div className="grid gap-2">
                      <input type="text" value={project.name} onChange={(e) => handleChange(project.id, 'name', e.target.value)} className="text-lg font-medium border-b border-transparent focus:border-black outline-none" />
                      <input type="text" value={project.thumbnailUrl} onChange={(e) => handleChange(project.id, 'thumbnailUrl', e.target.value)} className="text-xs text-gray-400 border-b border-transparent focus:border-black outline-none" />
                    </div>
                    <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
