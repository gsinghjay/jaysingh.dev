import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Typography from '../ui/Typography';
import { ThemeColor, getThemeColorClass } from '../../utils/colorUtils';
import { navLinksData, NavLink } from '../../data/portfolioData'; // Import data and type

/**
 * Navigation component that provides responsive navigation with mobile menu toggle functionality
 */
interface NavigationProps {
  logoText?: string;
  highlightedLinkThemeColor?: ThemeColor; // Theme color for the special highlighted link
  links?: Omit<NavLink, 'className'>[]; // Allow passing links, default to portfolioData
}

const Navigation: React.FC<NavigationProps> = ({ 
  logoText = 'Jay Singh',
  highlightedLinkThemeColor = 'primary', // Default highlight theme color
  links = navLinksData // Use imported data as default
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to get classes for a nav link
  const getNavLinkClass = (link: Omit<NavLink, 'className'>): string => {
    let classes = 'text-gray-300 hover:text-white transition-colors duration-200';
    // Example: Highlight the 'Typography' link specifically
    if (link.label === 'Typography' && highlightedLinkThemeColor) {
      const colorClass = getThemeColorClass(highlightedLinkThemeColor);
      // For text colors, we don't use opacity - just use the color directly
      classes += ` text-${colorClass} hover:text-${colorClass}-300`; // Apply highlight color and hover
    }
    return classes;
  };

  // Generate the final navLinks with dynamic classes
  const navLinks: NavLink[] = links.map(link => ({
    ...link,
    className: getNavLinkClass(link)
  }));

  return (
    <nav className="bg-[#0D1117] p-4 fixed w-full z-50" role="navigation" aria-label="Main Navigation">
      <div className="container mx-auto flex justify-between items-center">
        {/* Wrap logo in HUD-style div */}
        <div className="bg-slate-700 bg-opacity-30 px-3 py-1 rounded-md"> 
          <Typography 
            component="h1"
            // Adjusted className, removed leading-snug as padding handles height
            className="sm:text-2xl md:text-3xl font-light tracking-[-0.025em]"
            archetype="default"
          >
            {logoText}
          </Typography>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6" role="menubar">
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className={link.className} // Use calculated className
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`
            md:hidden fixed inset-0 bg-[#0D1117] bg-opacity-95 z-40 transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                onClick={closeMenu}
                className={`${link.className} text-xl`} // Use calculated className and add mobile size
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 