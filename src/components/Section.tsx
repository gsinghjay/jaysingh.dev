import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}

export default function Section({ children, className = '', bordered = true }: SectionProps) {
  const borderClasses = bordered ? 'border-brutal-thick border-brutal-black' : '';

  return (
    <section className={`p-6 md:p-8 ${borderClasses} ${className}`}>
      {children}
    </section>
  );
}
