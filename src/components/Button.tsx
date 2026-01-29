import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'lime' | 'pink' | 'yellow' | 'blue' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ variant = 'lime', children, className = '', ...props }: ButtonProps) {
  const baseClasses = 'px-6 py-6 text-xl font-black uppercase border-4 border-black transition-all duration-150 cursor-pointer active:translate-y-1';

  const variantClasses = {
    lime: 'bg-lime-400 text-black',
    pink: 'bg-pink-400 text-black',
    yellow: 'bg-yellow-400 text-black',
    blue: 'bg-blue-400 text-black',
    secondary: 'bg-white text-black hover:bg-yellow-400',
  };

  const isPrimary = variant !== 'secondary';
  const baseShadow = isPrimary ? '6px 6px 0 #000' : '3px 3px 0 #000';
  const activeShadow = isPrimary ? '3px 3px 0 #000' : '2px 2px 0 #000';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ boxShadow: baseShadow }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = activeShadow;
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = baseShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = baseShadow;
      }}
      {...props}
    >
      {children} {isPrimary && '→'}
    </button>
  );
}
