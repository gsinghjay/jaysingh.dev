interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'category';
}

const getTechColor = (tech: string): string => {
  const techLower = tech.toLowerCase();
  if (techLower.includes('react') || techLower.includes('vue')) return 'bg-pink-400';
  if (techLower.includes('python') || techLower.includes('go')) return 'bg-blue-400';
  if (techLower.includes('postgres') || techLower.includes('sql') || techLower.includes('database')) return 'bg-green-400';
  if (techLower.includes('node') || techLower.includes('javascript') || techLower.includes('typescript')) return 'bg-lime-400';
  return 'bg-neutral-100';
};

const getCategoryColor = (category: string): string => {
  const catLower = category.toLowerCase();
  if (catLower.includes('opinion')) return 'bg-yellow-400';
  if (catLower.includes('technical')) return 'bg-blue-400';
  if (catLower.includes('war')) return 'bg-red-400';
  if (catLower.includes('tutorial')) return 'bg-lime-400';
  if (catLower.includes('announcement')) return 'bg-pink-400';
  return 'bg-neutral-100';
};

export default function Tag({ children, onClick, variant = 'default' }: TagProps) {
  const techStr = typeof children === 'string' ? children : '';
  const bgColor = variant === 'category' ? getCategoryColor(techStr) : getTechColor(techStr);

  const baseClasses = 'px-3 py-1 border-2 border-black text-sm font-bold uppercase text-black';
  const interactiveClasses = onClick ? 'cursor-pointer hover:opacity-80 transition-opacity duration-150' : '';
  const sizeClasses = variant === 'category' ? 'text-xs' : 'text-sm';

  return (
    <span
      className={`${baseClasses} ${interactiveClasses} ${bgColor} ${sizeClasses}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
