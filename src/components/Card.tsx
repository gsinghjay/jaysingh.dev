import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'default' | 'lg';
}

export default function Card({ children, className = '', onClick, size = 'default' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const shadowStyles = {
    sm: '4px 4px 0 #000',
    default: '6px 6px 0 #000',
    lg: '8px 8px 0 #000',
  };

  const activeShadowStyles = {
    sm: '2px 2px 0 #000',
    default: '3px 3px 0 #000',
    lg: '4px 4px 0 #000',
  };

  const baseClasses = `bg-white border-4 border-black ${paddingClasses[size]}`;
  const interactiveClasses = onClick
    ? 'cursor-pointer active:translate-y-1 transition-all duration-150 group'
    : '';

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      style={{ boxShadow: shadowStyles[size] }}
      onClick={onClick}
      onMouseDown={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = activeShadowStyles[size];
        }
      }}
      onMouseUp={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = shadowStyles[size];
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = shadowStyles[size];
        }
      }}
    >
      {children}
    </div>
  );
}
