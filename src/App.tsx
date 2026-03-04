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
import ProjectDetail from './components/ProjectDetail';
import About from './components/About';
import Connect from './components/Connect';
import { Project, SEOData } from './types';
import { INITIAL_PROJECTS, DEFAULT_SEO } from './constants';
import seoDataJson from './data/seoData.json';
import { useParams } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

function ProjectDetailWrapper({ projects, onBack }: { projects: Project[], onBack: () => void }) {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  
  if (!project) return <div className="p-24 text-center">Project not found.</div>;
  
  return <ProjectDetail project={project} onBack={onBack} />;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [seoData, setSeoData] = useState<SEOData>(() => {
    const saved = localStorage.getItem('portfolio_seo');
    return saved ? JSON.parse(saved) : (seoDataJson as SEOData || DEFAULT_SEO);
  });

  // Home state persistence
  const [hasStarted, setHasStarted] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_seo', JSON.stringify(seoData));
    
    // Determine Page-Specific Title
    let pageTitle = seoData.title;
    const path = location.pathname;
    
    if (path === '/about') pageTitle = `About | ${seoData.title}`;
    else if (path === '/connect') pageTitle = `Connect | ${seoData.title}`;
    else if (path === '/work') pageTitle = `Work | ${seoData.title}`;
    else if (path.startsWith('/work/')) {
      const id = path.split('/').pop();
      const project = projects.find(p => p.id === id);
      if (project) pageTitle = `${project.name} | ${seoData.title}`;
    }
    
    document.title = pageTitle;
    
    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoData.description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoData.keywords);

    // Update Open Graph Tags
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', seoData.description);
    updateOGTag('og:type', 'website');
    updateOGTag('og:url', window.location.href);
  }, [seoData, location.pathname, projects]);

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
                  if (target === 'about') navigate('/about');
                  if (target === 'connect') navigate('/connect');
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
            path="/work/:id" 
            element={
              <ProjectDetailWrapper 
                projects={projects} 
                onBack={() => navigate('/work')} 
              />
            } 
          />
          <Route 
            path="/about" 
            element={<About onBack={() => navigate('/')} />} 
          />
          <Route 
            path="/connect" 
            element={<Connect onBack={() => navigate('/')} />} 
          />
          <Route 
            path="/admin" 
            element={
              <AdminPage 
                projects={projects}
                onUpdate={setProjects}
                seoData={seoData}
                onUpdateSEO={setSeoData}
                onBack={() => navigate('/')}
              />
            } 
          />
        </Routes>
      </AnimatePresence>

      {/* Hidden Admin Trigger */}
      <button 
        onClick={() => navigate('/admin')}
        className="fixed bottom-0 right-0 w-12 h-12 md:w-4 md:h-4 opacity-0 hover:opacity-10 z-50 cursor-default"
        title="Admin"
      />
      <Analytics />
    </div>
  );
}
