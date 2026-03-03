/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import MainHome from './components/MainHome';
import WorkList from './components/WorkList';
import AdminPage from './components/AdminPage';
import { Project, View } from './types';
import { INITIAL_PROJECTS } from './constants';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  // Home state persistence to maintain animation state when coming back from Work
  const [hasStarted, setHasStarted] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  // Handle hidden admin access (bottom right corner)
  const handleAdminAccess = () => {
    setView('admin');
  };

  return (
    <div className="relative w-full h-screen bg-white">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <MainHome 
            key="home"
            hasStarted={hasStarted}
            setHasStarted={setHasStarted}
            showCategories={showCategories}
            setShowCategories={setShowCategories}
            onNavigate={(target) => {
              if (target === 'work') setView('work');
            }}
          />
        )}

        {view === 'work' && (
          <WorkList 
            key="work"
            projects={projects}
            onBack={() => setView('home')}
          />
        )}

        {view === 'admin' && (
          <AdminPage 
            key="admin"
            projects={projects}
            onUpdate={setProjects}
            onBack={() => setView('home')}
          />
        )}
      </AnimatePresence>

      {/* Hidden Admin Trigger */}
      <button 
        onClick={handleAdminAccess}
        className="fixed bottom-2 right-2 w-4 h-4 opacity-0 hover:opacity-10 z-50 cursor-default"
        title="Admin"
      />
    </div>
  );
}
