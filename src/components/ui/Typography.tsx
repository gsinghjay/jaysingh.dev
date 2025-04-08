import React, { ReactNode } from 'react';

/**
 * Props for Typography component
 */
type TypographyProps = {
  /** Typography variant defining the size, line height, and tracking */
  variant?: 'h1' | 'h2' | 'h3' | 'h5' | 'body' | 'body-lg' | 'body-sm' | 'caption' | 'label';
  /** Brand archetype for text color */
  archetype?: 'default' | 'muted';
  /** Text alignment */
  align?: 'left' | 'center';
  /** Font weight */
  weight?: 'light' | 'normal' | 'medium';
  /** Additional CSS classes */
  className?: string;
  /** Content to be rendered */
  children: ReactNode;
  /** Override the rendered element */
  component?: React.ElementType;
  /** Narrative signaling for visual punctuation at key transition moments */
  narrativeSignal?: 'discovery' | 'achievement' | 'transition' | 'technical' | 'future' | null;
  /** Disable border styling for narrative signals (useful in card layouts) */
  disableNarrativeBorders?: boolean;
  /** Element ID */
  id?: string;
  /** For label elements */
  htmlFor?: string;
};

/**
 * Typography component for consistent text styling that integrates with content strategy
 * 
 * This component implements the visual-verbal rhythm framework and emotional intensity
 * scales defined in our content strategy. Typography actively reinforces narrative
 * structure rather than merely presenting content.
 * 
 * @param {TypographyProps} props - The component props
 * @returns {JSX.Element} The typography component
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  archetype = 'default',
  align = 'left',
  weight = 'normal',
  className = '',
  children,
  component,
  narrativeSignal = null,
  disableNarrativeBorders = false,
  id,
  htmlFor,
  ...props
}) => {

  /**
   * Get typography variant classes for font size, line height, and tracking
   * @returns CSS classes for typography variant styling
   */
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'h1':
        return 'text-4xl sm:text-5xl md:text-6xl leading-tight tracking-[-0.035em]';
      case 'h2':
        return 'text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.03em]';
      case 'h3':
        return 'text-2xl sm:text-3xl md:text-4xl leading-snug tracking-[-0.025em]';
      case 'h5':
        return 'text-lg sm:text-xl md:text-2xl leading-normal tracking-[-0.015em]';
      case 'body-lg':
        return 'text-base sm:text-lg leading-relaxed tracking-[-0.01em]';
      case 'body':
        return 'text-base leading-normal tracking-[-0.01em]';
      case 'body-sm':
        return 'text-sm leading-normal tracking-[0]';
      case 'caption':
        return 'text-xs leading-normal tracking-[0]';
      case 'label':
        return 'text-sm leading-none tracking-[0]';
      default:
        return 'text-base leading-normal tracking-[-0.01em]';
    }
  };

  /**
   * Converts archetype to text color classes
   * @returns CSS classes for text color
   */
  const getColorClass = (): string => {
    if (archetype === 'default') return 'text-white';
    if (archetype === 'muted') return 'text-gray-400';
    return 'text-white';
  };

  /**
   * Gets text alignment classes
   * @returns CSS classes for text alignment
   */
  const getAlignClasses = (): string => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'left':
      default:
        return 'text-left';
    }
  };

  /**
   * Gets font weight classes
   * @returns CSS classes for font weight
   */
  const getWeightClasses = (): string => {
    switch (weight) {
      case 'light':
        return 'font-light';
      case 'medium':
        return 'font-medium';
      case 'normal':
      default:
        return 'font-normal';
    }
  };

  /**
   * Gets narrative signal classes for visual punctuation at key transition moments
   * @returns CSS classes for narrative signaling
   */
  const getNarrativeSignalClasses = (): string => {
    if (!narrativeSignal) return '';
    
    // Determine border class based on disableNarrativeBorders
    const borderClass = (classes: string) => disableNarrativeBorders ? '' : classes;
    
    switch (narrativeSignal) {
      case 'discovery':
        // Discovery moments: scale transform
        return 'scale-105 origin-left transform transition-transform duration-300';
      case 'achievement':
        // Achievement milestones: increased weight, optional border
        return `font-medium ${borderClass('pb-4 mb-6 border-b border-current')}`;
      case 'transition':
        // Transition points: italic, optional border
        return `italic ${borderClass('border-l-4 pl-4 py-2')}`;
      case 'technical':
        // Technical deepening: mono font, background
        return 'font-mono bg-slate-800 bg-opacity-50 px-2 py-1';
      case 'future':
        // Forward-leaning: optional border/margin
        return disableNarrativeBorders ? 'pl-2' : 'ml-4 pl-4 border-l-2';
      default:
        return '';
    }
  };

  /**
   * Determines the default HTML element based on variant
   * @returns The appropriate HTML element
   */
  function getDefaultComponent() {
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h5': return 'h5';
      case 'body':
      case 'body-lg':
      case 'body-sm': return 'p';
      case 'caption': return 'span';
      case 'label': return 'label';
      default: return 'p';
    }
  }

  // Combine all classes
  const Element = component || getDefaultComponent();
  const combinedClasses = [
    // Apply user classes first to allow overrides
    className, 
    // Then apply component-derived classes
    getVariantClasses(),
    getColorClass(),
    getAlignClasses(),
    getWeightClasses(),
    getNarrativeSignalClasses(),
  ].filter(Boolean).join(' ');

  // Prepare props for the element
  const elementProps: React.HTMLAttributes<HTMLElement> & {
    id?: string;
    htmlFor?: string;
    className: string;
  } = {
    className: combinedClasses,
    ...(id && { id }),
    ...(htmlFor && Element === 'label' && { htmlFor }),
    ...props, // Spread remaining props
  };

  return <Element {...elementProps}>{children}</Element>;
};

// Export the component as default
export default Typography;