import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  focusColor?: string;
}

export default function Input({ label, focusColor = 'focus:border-lime-400', className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-bold uppercase text-xs text-black">
          {label}
        </label>
      )}
      <input
        className={`border-4 border-black px-4 py-3 bg-white text-black focus:outline-none ${focusColor} transition-none ${className}`}
        style={{ boxShadow: '4px 4px 0 #000' }}
        {...props}
      />
    </div>
  );
}
