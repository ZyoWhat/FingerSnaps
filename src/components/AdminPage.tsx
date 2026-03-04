import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project, Category, SEOData } from '../types';
import { Plus, Trash2, Save, ArrowLeft, Upload, Image as ImageIcon, Search } from 'lucide-react';

interface AdminPageProps {
  projects: Project[];
  onUpdate: (updatedProjects: Project[]) => void;
  seoData: SEOData;
  onUpdateSEO: (updatedSEO: SEOData) => void;
  onBack: () => void;
}

export default function AdminPage({ projects, onUpdate, seoData, onUpdateSEO, onBack }: AdminPageProps) {
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);
  const [localSEO, setLocalSEO] = useState<SEOData>(seoData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      handleChange(id, 'thumbnailUrl', base64String);
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-black/5"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
            <p className="text-sm text-gray-500">Please enter the password to continue.</p>
          </div>
          
          <form onSubmit={handleLogin} className="grid gap-6">
            <div className="grid gap-2">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-black focus:bg-white rounded-2xl outline-none transition-all text-center text-lg tracking-widest"
              />
              {error && <p className="text-red-500 text-xs text-center mt-1">{error}</p>}
            </div>
            
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={onBack}
                className="flex-1 py-4 text-sm font-medium border border-black/10 rounded-2xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 py-4 text-sm font-medium bg-black text-white rounded-2xl hover:bg-black/80 transition-all shadow-lg"
              >
                Enter
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  const handleChange = (id: string, field: keyof Project, value: string) => {
    const next = localProjects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setLocalProjects(next);
  };

  const handleAdd = (category: Category) => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Project',
      category,
      thumbnailUrl: 'https://picsum.photos/seed/new/200/120'
    };
    setLocalProjects([...localProjects, newProject]);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setLocalProjects(localProjects.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    onUpdate(localProjects);
    onUpdateSEO(localSEO);
    alert('Changes saved successfully.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f8f8f8] text-black p-6 md:p-12 font-sans"
    >
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Project Manager</h1>
            <p className="text-sm text-gray-500">Manage your portfolio projects and categories.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-black/10 rounded-full hover:bg-white transition-all shadow-sm"
            >
              <ArrowLeft size={16} />
              Back to Site
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-black text-white rounded-full hover:bg-black/80 transition-all shadow-md"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </header>

        <div className="grid gap-10">
          {/* SEO Settings Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            <div className="px-8 py-5 bg-gray-50 border-b border-black/5 flex justify-between items-center">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                <Search size={14} />
                Site SEO Settings
              </h2>
            </div>
            <div className="p-8 grid gap-6">
              <div className="grid gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Site Title (Browser Tab)</label>
                <input 
                  type="text" 
                  value={localSEO.title}
                  onChange={(e) => setLocalSEO({ ...localSEO, title: e.target.value })}
                  placeholder="Enter site title..."
                  className="w-full text-lg font-medium border-b border-transparent hover:border-gray-200 focus:border-black py-1 outline-none transition-all"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Meta Description (Search Results)</label>
                <textarea 
                  value={localSEO.description}
                  onChange={(e) => setLocalSEO({ ...localSEO, description: e.target.value })}
                  placeholder="Enter site description for search engines..."
                  rows={2}
                  className="w-full text-sm border border-gray-100 rounded-lg p-3 hover:border-gray-200 focus:border-black outline-none transition-all resize-none"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Keywords (Comma separated)</label>
                <input 
                  type="text" 
                  value={localSEO.keywords}
                  onChange={(e) => setLocalSEO({ ...localSEO, keywords: e.target.value })}
                  placeholder="design, video, portfolio..."
                  className="w-full text-sm border-b border-transparent hover:border-gray-200 focus:border-black py-1 outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {(['spatial', 'video'] as Category[]).map(cat => (
            <section key={cat} className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
              <div className="px-8 py-5 bg-gray-50 border-b border-black/5 flex justify-between items-center">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  {cat === 'spatial' ? 'Spatial Design' : 'Video Production'}
                </h2>
                <button 
                  onClick={() => handleAdd(cat)}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black hover:text-black/60 transition-colors"
                >
                  <Plus size={14} />
                  Add Project
                </button>
              </div>
              
              <div className="p-8">
                <div className="grid gap-8">
                  {localProjects.filter(p => p.category === cat).length === 0 ? (
                    <div className="text-center py-12 text-gray-300 italic text-sm">
                      No projects in this category.
                    </div>
                  ) : (
                    localProjects.filter(p => p.category === cat).map(project => (
                      <div key={project.id} className="group relative grid md:grid-cols-[1fr_2fr_auto] gap-6 items-start pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-black/5 relative group/img">
                          <img 
                            src={project.thumbnailUrl} 
                            alt={project.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <label className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white gap-2">
                            <Upload size={24} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Replace Image</span>
                            <input 
                              type="file" 
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(project.id, e)}
                            />
                          </label>
                        </div>
                        
                        <div className="grid gap-4">
                          <div className="grid gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Project Name</label>
                            <input 
                              type="text" 
                              value={project.name}
                              onChange={(e) => handleChange(project.id, 'name', e.target.value)}
                              placeholder="Enter project name..."
                              className="w-full text-lg font-medium border-b border-transparent hover:border-gray-200 focus:border-black py-1 outline-none transition-all"
                            />
                          </div>
                          
                          <div className="grid gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Description</label>
                            <textarea 
                              value={project.description || ''}
                              onChange={(e) => handleChange(project.id, 'description', e.target.value)}
                              placeholder="Enter project description..."
                              rows={3}
                              className="w-full text-sm border border-gray-100 rounded-lg p-3 hover:border-gray-200 focus:border-black outline-none transition-all resize-none"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Thumbnail URL</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={project.thumbnailUrl}
                                onChange={(e) => handleChange(project.id, 'thumbnailUrl', e.target.value)}
                                placeholder="https://..."
                                className="flex-1 text-xs font-mono text-gray-500 border-b border-transparent hover:border-gray-200 focus:border-black py-1 outline-none transition-all"
                              />
                              <label className="cursor-pointer p-1 text-gray-400 hover:text-black transition-colors" title="Upload Image">
                                <Upload size={16} />
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(project.id, e)}
                                />
                              </label>
                            </div>
                          </div>

                          <div className="grid gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Additional Images (URLs, one per line)</label>
                            <textarea 
                              value={project.additionalImages?.join('\n') || ''}
                              onChange={(e) => {
                                const urls = e.target.value.split('\n').filter(url => url.trim() !== '');
                                const next = localProjects.map(p => p.id === project.id ? { ...p, additionalImages: urls } : p);
                                setLocalProjects(next);
                              }}
                              placeholder="https://image1.jpg&#10;https://image2.jpg"
                              rows={3}
                              className="w-full text-xs font-mono text-gray-500 border border-gray-100 rounded-lg p-3 hover:border-gray-200 focus:border-black outline-none transition-all resize-none"
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col justify-end gap-2">
                          <button 
                            onClick={() => handleDelete(project.id)}
                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Project"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
