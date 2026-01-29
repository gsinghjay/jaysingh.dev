import { FileText, Download } from 'lucide-react';

interface DocumentDownloadProps {
  url: string;
  filename?: string;
}

export default function DocumentDownload({ url, filename }: DocumentDownloadProps) {
  const getFileExtension = (path: string) => {
    const parts = path.split('.');
    return parts[parts.length - 1].toUpperCase();
  };

  const getFileName = () => {
    if (filename) return filename;
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <a
      href={url}
      download={getFileName()}
      className="inline-block bg-green-400 border-4 border-black px-6 py-4 font-bold text-lg uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
    >
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6" />
        <div className="flex flex-col items-start">
          <span className="text-sm">DOWNLOAD DOCUMENTATION</span>
          <span className="text-xs font-normal">{getFileExtension(url)} FILE</span>
        </div>
        <Download className="w-5 h-5 ml-2" />
      </div>
    </a>
  );
}
