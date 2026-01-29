import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url?: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const shareText = encodeURIComponent(title);
  const shareLink = encodeURIComponent(shareUrl);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border-4 border-black p-6" style={{ boxShadow: '6px 6px 0 #000' }}>
      <div className="flex items-center gap-2 mb-4">
        <Share2 size={20} />
        <h3 className="text-lg font-black uppercase">Share This Post</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-400 text-black border-4 border-black font-bold uppercase text-sm hover:bg-blue-300 transition-all"
          style={{ boxShadow: '3px 3px 0 #000' }}
        >
          TWITTER
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white border-4 border-black font-bold uppercase text-sm hover:bg-blue-500 transition-all"
          style={{ boxShadow: '3px 3px 0 #000' }}
        >
          LINKEDIN
        </a>
        <button
          onClick={handleCopyLink}
          className="px-4 py-2 bg-lime-400 text-black border-4 border-black font-bold uppercase text-sm hover:bg-lime-300 transition-all flex items-center gap-2"
          style={{ boxShadow: '3px 3px 0 #000' }}
        >
          {copied ? (
            <>
              <Check size={16} />
              COPIED
            </>
          ) : (
            'COPY LINK'
          )}
        </button>
      </div>
    </div>
  );
}
