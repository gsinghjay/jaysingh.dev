import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  focusColor?: string;
}

export default function Textarea({ label, focusColor = 'focus:border-lime-400', className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-bold uppercase text-xs text-black">
          {label}
        </label>
      )}
      <textarea
        className={`border-4 border-black px-4 py-3 bg-white text-black focus:outline-none ${focusColor} transition-none min-h-32 resize-none ${className}`}
        style={{ boxShadow: '4px 4px 0 #000' }}
        {...props}
      />
    </div>
  );
}
