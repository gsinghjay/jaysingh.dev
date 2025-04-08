import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import TypographyDemo from './routes/TypographyDemo.tsx';
import './index.css';

// Add preload links for critical fonts to improve performance
const preloadFonts = () => {
  const fontPreloads = [
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' },
    { href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap', as: 'style' }
  ];

  fontPreloads.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Execute font preloading
preloadFonts();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/typography" element={<TypographyDemo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
