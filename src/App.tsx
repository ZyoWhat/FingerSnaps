/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import MainHome from './components/MainHome';
import WorkList from './components/WorkList';
import AdminPage from './components/AdminPage';
import { Project } from './types';
import { INITIAL_PROJECTS } from './constants';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  // Home state persistence
  const [hasStarted, setHasStarted] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  return (
    <div className="relative w-full h-screen bg-white">
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route 
            path="/" 
            element={
              <MainHome 
                hasStarted={hasStarted}
                setHasStarted={setHasStarted}
                showCategories={showCategories}
                setShowCategories={setShowCategories}
                onNavigate={(target) => {
                  if (target === 'work') navigate('/work');
                }}
              />
            } 
          />
          <Route 
            path="/work" 
            element={
              <WorkList 
                projects={projects}
                onBack={() => navigate('/')}
              />
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminPage 
                projects={projects}
                onUpdate={setProjects}
                onBack={() => navigate('/')}
              />
            } 
          />
        </Routes>
      </AnimatePresence>

      {/* Hidden Admin Trigger */}
      <button 
        onClick={() => navigate('/admin')}
        className="fixed bottom-2 right-2 w-4 h-4 opacity-0 hover:opacity-10 z-50 cursor-default"
        title="Admin"
      />
    </div>
  );
}
