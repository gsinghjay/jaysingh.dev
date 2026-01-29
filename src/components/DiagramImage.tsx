import { useState } from 'react';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

interface DiagramImageProps {
  src: string;
  alt: string;
  label?: string;
}

export default function DiagramImage({ src, alt, label }: DiagramImageProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <>
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-blue-400 border-b-4 border-black p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {label && <span className="font-bold text-lg uppercase">{label}</span>}
          </div>
          <button
            onClick={() => setShowFullscreen(true)}
            className="bg-white border-2 border-black px-3 py-2 hover:bg-gray-100 transition-colors"
            title="View fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
        <div className="p-8 overflow-auto bg-gray-50">
          <img
            src={src}
            alt={alt}
            className="mx-auto border-2 border-black cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setShowFullscreen(true)}
          />
        </div>
      </div>

      {showFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black max-w-6xl w-full max-h-[90vh] flex flex-col">
            <div className="bg-blue-400 border-b-4 border-black p-4 flex justify-between items-center">
              <span className="font-bold text-lg uppercase">{label || 'Diagram'}</span>
              <div className="flex gap-2">
                <button
                  onClick={handleZoomOut}
                  className="bg-white border-2 border-black px-3 py-2 hover:bg-gray-100 transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="bg-white border-2 border-black px-4 py-2 font-bold">
                  {zoom}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="bg-white border-2 border-black px-3 py-2 hover:bg-gray-100 transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setShowFullscreen(false);
                    setZoom(100);
                  }}
                  className="bg-white border-2 border-black px-4 py-2 font-bold hover:bg-gray-100 transition-colors ml-2"
                >
                  CLOSE
                </button>
              </div>
            </div>
            <div className="p-8 overflow-auto flex-1 bg-gray-50">
              <div className="flex justify-center items-center min-h-full">
                <img
                  src={src}
                  alt={alt}
                  style={{ width: `${zoom}%` }}
                  className="border-2 border-black"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
