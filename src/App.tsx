import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { ArrowUp } from 'lucide-react';

// Import refactored components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import HomelabSection from './components/HomelabSection';
import Contact from './components/Contact';

// Import data (from .tsx file now)
import {
  heroData,
  journeyData,
  expertiseData,
  projectsData,
  homelabData,
  contactData,
  // navLinksData // Not needed here, handled within Navigation
} from './data/portfolioData'; // Removed .tsx extension

// Initialize Modal for accessibility
Modal.setAppElement('#root');

function App() {
  useEffect(() => {
    // Set document language for screen readers
    document.documentElement.lang = 'en';
    
    // Add focus style sheet for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
      a:focus, button:focus, input:focus, select:focus, textarea:focus {
        outline: 3px solid #4299e1;
        outline-offset: 2px;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #4299e1;
        color: white;
        padding: 8px;
        z-index: 100;
        transition: top 0.3s;
      }
      
      .skip-link:focus {
        top: 0;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      {/* Skip Link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Header with Navigation */}
      <header role="banner">
        {/* Navigation doesn't need data prop here unless customizing links */}
        <Navigation /> 
      </header>

      {/* Main Content Area */}
      <main id="main-content" role="main">
        {/* Render components directly, passing data prop */}
        <Hero data={heroData} />
        <Journey data={journeyData} />
        <Expertise data={expertiseData} />
        <Projects data={projectsData} />
        <HomelabSection data={homelabData} />
      </main>
      
      {/* Footer with Contact Section */}
      {/* Contact component now renders its own footer/section structure */}
      <Contact data={contactData} />
      
      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-gray-700 p-3 rounded-full shadow-lg z-50"
        aria-label="Scroll back to top"
      >
        <ArrowUp className="text-white" size={24} />
      </button>
    </div>
  );
}

export default App;