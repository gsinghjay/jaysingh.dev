import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-black text-white px-4 py-2 border-4 border-black">
        <span className="text-xs font-bold uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-2 py-1 bg-lime-400 text-black border-2 border-black text-xs font-bold uppercase hover:bg-yellow-400 transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} />
              COPIED
            </>
          ) : (
            <>
              <Copy size={14} />
              COPY
            </>
          )}
        </button>
      </div>
      <pre className="bg-yellow-50 border-4 border-t-0 border-black p-4 overflow-x-auto">
        <code className="text-sm font-mono leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}
