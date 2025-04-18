import React from 'react';
import { ThemeColor, getThemeColorClass } from '../../utils/colorUtils';
import { IntensityLevel, getOpacityByIntensity } from '../../utils/intensityUtils';

/**
 * Props for the TransitionMarker component
 */
interface TransitionMarkerProps {
  /** The theme color to transition from */
  fromThemeColor: ThemeColor;
  /** The theme color to transition to */
  toThemeColor: ThemeColor;
  /** Intensity level for the colors */
  intensityLevel?: IntensityLevel;
  /** Additional CSS classes */
  className?: string;
}

/**
 * TransitionMarker component that creates a visual marker between content sections
 * 
 * This component creates a vertical line with a gradient from one color to another,
 * with a node in the middle to visually indicate a transition between narrative phases.
 * It's designed to be used between different sections of content to show progression.
 * 
 * @param {TransitionMarkerProps} props - The component props
 * @returns {JSX.Element} The transition marker component
 */
const TransitionMarker: React.FC<TransitionMarkerProps> = ({
  fromThemeColor,
  toThemeColor,
  intensityLevel = 3,
  className = '',
}) => {
  /**
   * Get color class based on theme color
   * @param themeColor The theme color to convert to color class
   * @returns The color class name
   */
  const getColorClass = (themeColor: ThemeColor): string => {
    return getThemeColorClass(themeColor);
  };

  const fromColor = getColorClass(fromThemeColor);
  const toColor = getColorClass(toThemeColor);
  const opacityClass = getOpacityByIntensity(intensityLevel);

  return (
    <div 
      className={`transition-marker my-12 relative ${className}`} 
      aria-hidden="true"
    >
      {/* Gradient connector line */}
      <div 
        className={`absolute w-1 h-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-${fromColor} to-${toColor} ${opacityClass}`}
      ></div>
      
      {/* Node marker */}
      <div 
        className={`w-6 h-6 rounded-full bg-${toColor} ${opacityClass} absolute top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center`}
      >
        <div className="w-2 h-2 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default TransitionMarker; 