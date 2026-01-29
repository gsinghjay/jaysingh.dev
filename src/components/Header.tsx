import { Page } from '../types';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: 'HOME' },
    { page: 'blog', label: 'BLOG' },
    { page: 'projects', label: 'PROJECTS' },
    { page: 'resume', label: 'RESUME' },
    { page: 'contact', label: 'CONTACT' },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <header className="bg-white border-b-4 border-black sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleNavigate('home')}
            className="bg-black text-white px-4 py-2 text-xl font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-all duration-150 active:translate-y-1"
            style={{ boxShadow: '4px 4px 0 #000' }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = '2px 2px 0 #000';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = '4px 4px 0 #000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '4px 4px 0 #000';
            }}
          >
            JAYSINGH.DEV
          </button>

          <button
            className="md:hidden text-black hover:text-lime-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          <ul className="hidden md:flex gap-4">
            {navItems.map(({ page, label }) => (
              <li key={page}>
                <button
                  onClick={() => handleNavigate(page)}
                  className={`px-4 py-2 text-sm font-bold uppercase border-2 border-black transition-all duration-150 active:translate-y-1 ${
                    currentPage === page
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white text-black hover:bg-lime-300'
                  }`}
                  style={{ boxShadow: '3px 3px 0 #000' }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow = '2px 2px 0 #000';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {mobileMenuOpen && (
          <ul className="md:hidden mt-4 flex flex-col gap-3 border-t-4 border-black pt-4">
            {navItems.map(({ page, label }) => (
              <li key={page}>
                <button
                  onClick={() => handleNavigate(page)}
                  className={`w-full text-left px-4 py-2 text-sm font-bold uppercase border-2 border-black transition-all duration-150 active:translate-y-1 ${
                    currentPage === page
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white text-black hover:bg-lime-300'
                  }`}
                  style={{ boxShadow: '3px 3px 0 #000' }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow = '2px 2px 0 #000';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
