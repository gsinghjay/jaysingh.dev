import React, { useState } from 'react';
import Typography from '../components/Typography';
import { Menu, X } from 'lucide-react';
import { Archetype, getArchetypeColor, archetypeMap } from '../utils/archetypeUtils';
import { IntensityLevel, intensityMap, getOpacityByIntensity } from '../utils/intensityUtils';

/**
 * Typography System Demonstration Page
 * 
 * This example shows how to use the Typography component in various contexts
 * to create a cohesive visual hierarchy according to our design system.
 */
const TypographyDemo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  /**
   * Gets the CSS class for a navigation link based on archetype
   * @param archetype The brand archetype
   * @returns CSS class for the link
   */
  const getNavLinkClass = (archetype: Archetype): string => {
    const colorName = getArchetypeColor(archetype);
    return `text-${colorName} hover:text-${colorName}-300 transition-colors duration-200`;
  };
  
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Navigation Demo */}
      <nav className="bg-gray-800 p-4 fixed w-full z-50" role="navigation" aria-label="Typography Demo Navigation">
        <div className="container mx-auto flex justify-between items-center">
          <Typography variant="h3" weight="light" component="h1" id="demo-title">Typography System</Typography>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6" role="menubar">
            <a href="#variants" className="text-gray-300 hover:text-white transition-colors duration-200" role="menuitem">Variants</a>
            <a href="#archetypes" className="text-gray-300 hover:text-white transition-colors duration-200" role="menuitem">Archetypes</a>
            <a href="#intensity" className="text-gray-300 hover:text-white transition-colors duration-200" role="menuitem">Intensity</a>
            <a href="#responsive" className="text-gray-300 hover:text-white transition-colors duration-200" role="menuitem">Responsive</a>
            <a href="#accessibility" className="text-gray-300 hover:text-white transition-colors duration-200" role="menuitem">Accessibility</a>
            <a href="/" className={getNavLinkClass('ruler')} role="menuitem">Back Home</a>
          </div>

          {/* Mobile Navigation */}
          <div 
            id="mobile-menu"
            className={`
              md:hidden fixed inset-0 bg-gray-800 bg-opacity-95 z-40 transition-transform duration-300 ease-in-out
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
            role="menu"
            aria-hidden={!isMenuOpen}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <a href="#variants" onClick={closeMenu} className="text-gray-300 hover:text-white transition-colors duration-200 text-xl" role="menuitem">Variants</a>
              <a href="#archetypes" onClick={closeMenu} className="text-gray-300 hover:text-white transition-colors duration-200 text-xl" role="menuitem">Archetypes</a>
              <a href="#intensity" onClick={closeMenu} className="text-gray-300 hover:text-white transition-colors duration-200 text-xl" role="menuitem">Intensity</a>
              <a href="#responsive" onClick={closeMenu} className="text-gray-300 hover:text-white transition-colors duration-200 text-xl" role="menuitem">Responsive</a>
              <a href="#accessibility" onClick={closeMenu} className="text-gray-300 hover:text-white transition-colors duration-200 text-xl" role="menuitem">Accessibility</a>
              <a href="/" onClick={closeMenu} className={getNavLinkClass('ruler')} role="menuitem">Back Home</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 pt-24">        
        {/* Type Scale Section */}
        <section id="variants" className="mb-16">
          <Typography variant="h2" className="mb-8" id="type-scale-title">
            Typography Component Props
          </Typography>
          
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-2">Variants</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-blue">
                <Typography variant="h1">Heading 1 (h1)</Typography>
                <Typography variant="h2">Heading 2 (h2)</Typography>
                <Typography variant="h3">Heading 3 (h3)</Typography>
                <Typography variant="h5">Heading 5 (h5)</Typography>
                <Typography variant="body-lg">Body Large (body-lg)</Typography>
                <Typography variant="body">Body (body)</Typography>
                <Typography variant="body-sm">Body Small (body-sm)</Typography>
                <Typography variant="caption">Caption (caption)</Typography>
                <Typography variant="label">Label (label)</Typography>
              </div>
            </div>

            {/* Archetypes Section (UPDATED) */}
            <div id="archetypes">
              <Typography variant="h3" className="mb-2">Text Colors</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-purple">
                <Typography variant="body" className="mb-4">
                  Our typography system uses two simple text colors:
                </Typography>
                
                <Typography archetype="default">
                  Default: White text (default)
                </Typography>
                
                <Typography archetype="muted">
                  Muted: Gray text (secondary information)
                </Typography>
                
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Using text colors
<Typography archetype="default">
  Default white text
</Typography>

<Typography archetype="muted">
  Muted gray text
</Typography>`}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Intensity Section (UPDATED) */}
            <div id="intensity">
              <Typography variant="h3" className="mb-2">Background Intensity Levels</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-green">
                <Typography variant="body" className="mb-4">
                  Intensity levels control the opacity of background colors to create a visual hierarchy of importance:
                </Typography>
                
                {Object.entries(intensityMap).map(([level, config]) => (
                  <div 
                    key={level} 
                    className={`mb-4 p-4 bg-metro-blue ${getOpacityByIntensity(parseInt(level) as IntensityLevel)}`}
                  >
                    <Typography archetype="default">
                      Level {level}: {config.description}
                    </Typography>
                  </div>
                ))}
                
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Using intensity levels for backgrounds
import { IntensityLevel, getOpacityByIntensity } from '../utils/intensityUtils';

// In custom components
const intensityClass = getOpacityByIntensity(2); // returns 'bg-opacity-40'
<div className={\`bg-metro-purple \${intensityClass}\`}>
  Medium intensity background
</div>`}
                  </Typography>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-2">Text Alignment</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-purple">
                <Typography align="left">Left aligned text (default)</Typography>
                <Typography align="center">Center aligned text</Typography>
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-2">Font Weights</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-orange">
                <Typography weight="light">Light weight text</Typography>
                <Typography weight="normal">Normal weight text (default)</Typography>
                <Typography weight="medium">Medium weight text</Typography>
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-2">Narrative Signals</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-teal">
                <Typography 
                  narrativeSignal="discovery"
                >
                  Discovery signal
                </Typography>
                <Typography 
                  narrativeSignal="achievement"
                >
                  Achievement signal
                </Typography>
                <Typography 
                  narrativeSignal="transition"
                >
                  Transition signal
                </Typography>
                <Typography 
                  narrativeSignal="technical"
                >
                  Technical signal
                </Typography>
                <Typography 
                  narrativeSignal="future"
                >
                  Future signal
                </Typography>
                
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Using narrative signals
<Typography 
  narrativeSignal="discovery"
>
  Discovery signal
</Typography>

<Typography 
  narrativeSignal="technical"
>
  Technical signal uses monospace font
</Typography>

// Disable borders for cards
<Typography 
  narrativeSignal="achievement"
  disableNarrativeBorders
>
  Achievement with no borders
</Typography>`}
                  </Typography>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default TypographyDemo; 