import React, { useState } from 'react';
import Typography from '../components/Typography';
import { Menu, X } from 'lucide-react';
import { Archetype, getArchetypeColor, archetypeMap } from '../utils/archetypeUtils';
import { IntensityLevel, intensityMap, getTextOpacityByIntensity, getOpacityByIntensity } from '../utils/intensityUtils';

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
                <Typography variant="h4">Heading 4 (h4)</Typography>
                <Typography variant="h5">Heading 5 (h5)</Typography>
                <Typography variant="h6">Heading 6 (h6)</Typography>
                <Typography variant="body-lg">Body Large (body-lg)</Typography>
                <Typography variant="body">Body (body)</Typography>
                <Typography variant="body-sm">Body Small (body-sm)</Typography>
                <Typography variant="caption">Caption (caption)</Typography>
                <Typography variant="label">Label (label)</Typography>
              </div>
            </div>

            {/* Archetypes Section (NEW) */}
            <div id="archetypes">
              <Typography variant="h3" className="mb-2">Brand Archetypes & Colors</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-purple">
                <Typography variant="body" className="mb-4">
                  Our design system uses brand archetypes to convey meaning through color. Each archetype has a corresponding Metro color:
                </Typography>
                
                {Object.entries(archetypeMap).map(([archetype, config]) => (
                  <div key={archetype} className="mb-4">
                    <Typography 
                      archetype={archetype as Archetype}
                      intensityLevel={4}
                      weight="medium"
                    >
                      {archetype.charAt(0).toUpperCase() + archetype.slice(1)}: {config.color} - {config.description}
                    </Typography>
                  </div>
                ))}
                
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Using archetypes to determine colors
import { getArchetypeColor } from '../utils/archetypeUtils';

// Get color name from archetype
const colorName = getArchetypeColor('explorer'); // returns 'metro-orange'

// Use with Typography or in className
<Typography archetype="ruler">
  Ruler Archetype Text
</Typography>

<div className={\`bg-\${getArchetypeColor('creator')}\`}>
  Creator Archetype Background
</div>`}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Intensity Section (UPDATED) */}
            <div id="intensity">
              <Typography variant="h3" className="mb-2">Emotional Intensity Levels</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-green">
                <Typography variant="body" className="mb-4">
                  Intensity levels control the opacity of colors to create a visual hierarchy of importance:
                </Typography>
                
                {Object.entries(intensityMap).map(([level, config]) => (
                  <div key={level} className="mb-4">
                    <Typography 
                      archetype="ruler"
                      intensityLevel={parseInt(level) as IntensityLevel}
                    >
                      Level {level}: {config.description} ({config.textOpacity})
                    </Typography>
                  </div>
                ))}
                
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Using intensity levels
import { IntensityLevel, getTextOpacityByIntensity } from '../utils/intensityUtils';

// In Typography component
<Typography 
  archetype="ruler"
  intensityLevel={3}
>
  High intensity text (Level 3)
</Typography>

// In custom components
const intensityClass = getTextOpacityByIntensity(2); // returns 'text-opacity-40'
<div className={\`text-metro-purple \${intensityClass}\`}>
  Medium intensity text
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
                <Typography align="right">Right aligned text</Typography>
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-2">Font Weights</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-orange">
                <Typography weight="light">Light weight text</Typography>
                <Typography weight="normal">Normal weight text (default)</Typography>
                <Typography weight="medium">Medium weight text</Typography>
                <Typography weight="semibold">Semibold weight text</Typography>
                <Typography weight="bold">Bold weight text</Typography>
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-2">Narrative Signals & Archetypes</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-teal">
                <Typography 
                  narrativeSignal="discovery" 
                  archetype="explorer"
                  intensityLevel={3}
                >
                  Discovery signal (Explorer Archetype)
                </Typography>
                <Typography 
                  narrativeSignal="achievement" 
                  archetype="ruler"
                  intensityLevel={3}
                >
                  Achievement signal (Ruler Archetype)
                </Typography>
                <Typography 
                  narrativeSignal="transition" 
                  archetype="creator"
                  intensityLevel={3}
                >
                  Transition signal (Creator Archetype)
                </Typography>
                <Typography 
                  narrativeSignal="technical" 
                  archetype="sage"
                  intensityLevel={3}
                >
                  Technical signal (Sage Archetype)
                </Typography>
                <Typography 
                  narrativeSignal="future" 
                  archetype="explorer"
                  intensityLevel={3}
                >
                  Future signal (Explorer Archetype)
                </Typography>
                
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Combining archetypes with narrative signals
<Typography
  archetype="explorer"
  intensityLevel={3}
  narrativeSignal="discovery"
>
  An explorer's discovery moment
</Typography>

// Common archetype-signal pairings:
// - 'explorer' + 'discovery'
// - 'ruler' + 'achievement'
// - 'creator' + 'transition'
// - 'sage' + 'technical'`}
                  </Typography>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-2" id="component-override">Component Override</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-blue">
                <Typography variant="h3" component="div">H3 rendered as div</Typography>
                <Typography variant="body" component="span">Body rendered as span</Typography>
                <Typography variant="label" component="label" htmlFor="demo-input" className="block mb-2">
                  Label with htmlFor prop
                </Typography>
                <input 
                  id="demo-input" 
                  type="text" 
                  className="bg-gray-800 border border-gray-700 p-2 w-full" 
                  aria-label="Demo input"
                  placeholder="Input field for demonstration" 
                />
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Component override examples
<Typography variant="h3" component="div">H3 rendered as div</Typography>
<Typography variant="body" component="span">Body rendered as span</Typography>
<Typography variant="label" component="label" htmlFor="input-id">
  Label with htmlFor
</Typography>`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Typography Section */}
        <section id="responsive" className="mb-16">
          <Typography variant="h2" className="mb-8" id="responsive-title">
            Responsive Typography
          </Typography>
          
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-2">Breakpoint Scaling</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-orange">
                <Typography variant="body" className="mb-2">
                  Resize your browser window to see how these headings scale across breakpoints:
                </Typography>
                <Typography variant="h1" className="mb-4">
                  H1: Mobile (text-4xl) → Tablet (text-5xl) → Desktop (text-6xl)
                </Typography>
                <Typography variant="h2" className="mb-4">
                  H2: Mobile (text-3xl) → Tablet (text-4xl) → Desktop (text-5xl)
                </Typography>
                <Typography variant="h3" className="mb-4">
                  H3: Mobile (text-2xl) → Tablet (text-3xl) → Desktop (text-4xl)
                </Typography>
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Typography component automatically applies responsive classes
// based on the selected variant:

// For h1 variant:
'text-4xl sm:text-5xl md:text-6xl leading-tight tracking-[-0.035em]'

// For h2 variant:
'text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.03em]'`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Layout Patterns Section */}  
        <section id="layout-patterns" className="mb-16">
          <Typography variant="h2" className="mb-8" id="layout-patterns-title">
            Layout Patterns
          </Typography>
          
          <div className="space-y-12"> {/* Increased spacing between layout examples */}
            {/* Section Header Demo */}
            <div>
              <Typography variant="h3" className="mb-4">Section Header Box</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-teal">
                <Typography variant="body" className="mb-4">
                  Sections use a semi-transparent box for the title and description, distinct from the main content.
                </Typography>
                {/* Example Implementation */} 
                <div className="bg-[#0D1117] p-4 rounded">
                   <div className="bg-slate-700 bg-opacity-10 p-4 rounded-lg mb-6"> 
                    <Typography variant="h3" archetype="default" className="mb-3">Example Section Title (h3)</Typography>
                    <Typography variant="body-lg" archetype="muted">This is the section description inside the semi-transparent box.</Typography>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <Typography variant="body-sm" archetype="muted">Content (like cards) would appear below the header box...</Typography>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// From Section.tsx
<div className="bg-slate-700 bg-opacity-10 p-4 rounded-lg mb-6"> 
  <Typography variant="h3" ...>Title</Typography>
  <Typography variant="body-lg" ...>Description</Typography>
</div>
<div className="mt-6">
  {/* children (cards, etc.) */}
</div>`}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Card Layout Demo */}
            <div>
              <Typography variant="h3" className="mb-4">Standard Card Layout</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-blue">
                 <Typography variant="body" className="mb-4">
                  Cards typically have a colored header (with pattern) and a flat content area.
                </Typography>
                {/* Example Implementation */} 
                <div className="bg-[#0D1117] p-4 rounded flex justify-center"> 
                  <article className="bg-slate-800 overflow-hidden shadow-md w-full max-w-sm">
                    {/* Header */} 
                    <div className={`relative px-4 py-3 border-b border-white/20 flex items-center justify-start gap-3 bg-${getArchetypeColor('ruler')} ${getOpacityByIntensity(3)}`}>
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-30" aria-hidden="true"></div>
                      <div className="relative flex items-center justify-start gap-3 w-full">
                        <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded flex items-center justify-center text-white"> {/* Placeholder Icon */}i</div> 
                        <Typography variant="h5" component="h3" archetype="default" className="font-medium">Card Title (h5)</Typography>
                      </div>
                    </div>
                    {/* Content */} 
                    <div className="p-4 relative">
                      <Typography variant="body" className="mb-3">Card description text goes here.</Typography>
                      <div className="flex flex-wrap gap-2">
                         <span className="bg-slate-700 px-3 py-1 text-xs text-white rounded-sm">Tag 1</span>
                         <span className="bg-slate-700 px-3 py-1 text-xs text-white rounded-sm">Tag 2</span>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Simplified Card Structure (e.g., InfoCard.tsx)
<article className="bg-slate-800 ...">
  {/* Header */}
  <div className="relative px-4 py-3 border-b ... bg-ARCHETYPE OPACITY">
     {/* Pattern */}
    <div className="absolute inset-0 ..."></div>
    <div className="relative flex ...">
      {/* Icon */}
      {/* Title (variant="h5") */}
    </div>
  </div>
  {/* Content */}
  <div className="p-4 relative">
    {/* Description, Lists, Tags */}
  </div>
</article>`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Accessibility Props Section */}
        <section id="accessibility" className="mb-16">
          <Typography variant="h2" className="mb-8" id="examples-title">
            Accessibility Props
          </Typography>
          
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-2">ARIA & ID Props</Typography>
              <div className="space-y-6 pl-4 border-l-2 border-metro-blue">
                <Typography id="custom-id-example">Element with custom ID: "custom-id-example"</Typography>
                <Typography ariaLabel="This is accessible to screen readers">With aria-label: "This is accessible to screen readers"</Typography>
                <Typography variant="label" htmlFor="aria-input" className="block mb-2">Label with htmlFor="aria-input"</Typography>
                <input 
                  id="aria-input" 
                  type="text" 
                  className="bg-gray-800 border border-gray-700 p-2 w-full" 
                  placeholder="Input field connected to label above"
                />
                <div className="bg-gray-800 p-4 mt-4 rounded">
                  <Typography variant="body-sm" component="pre" className="text-gray-300">
{`// Accessibility props examples
<Typography id="section-title">
  Element with custom ID for aria-labelledby
</Typography>

<Typography ariaLabel="Screen reader only text">
  With explicit aria-label
</Typography>

<Typography variant="label" htmlFor="form-field">
  Form label with htmlFor connection
</Typography>`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-800">
          <Typography variant="body-sm" archetype="muted" className="text-center">
            Typography System © {new Date().getFullYear()}
          </Typography>
        </footer>
      </div>
    </div>
  );
};

export default TypographyDemo; 