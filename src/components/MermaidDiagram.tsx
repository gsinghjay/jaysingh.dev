import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, Copy, Check, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MermaidDiagramProps {
  content: string;
  label?: string;
}

export default function MermaidDiagram({ content, label }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'ui-monospace, monospace',
    });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const renderDiagram = async () => {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, content);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          if (containerRef.current) {
            containerRef.current.innerHTML = '<div class="text-red-600 font-bold">Error rendering diagram</div>';
          }
        }
      };
      renderDiagram();
    }
  }, [content]);

  useEffect(() => {
    if (showFullscreen && fullscreenContainerRef.current) {
      const renderDiagram = async () => {
        try {
          const id = `mermaid-fullscreen-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, content);
          if (fullscreenContainerRef.current) {
            fullscreenContainerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          if (fullscreenContainerRef.current) {
            fullscreenContainerRef.current.innerHTML = '<div class="text-red-600 font-bold">Error rendering diagram</div>';
          }
        }
      };
      renderDiagram();
    }
  }, [content, showFullscreen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));

  const handleReset = () => {
    setZoom(100);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 100) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 100) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -10 : 10;
    setZoom(prev => Math.min(Math.max(prev + delta, 25), 300));
  };

  const handleFullscreenClose = () => {
    setShowFullscreen(false);
    setZoom(100);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  };

  return (
    <>
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-yellow-400 border-b-4 border-black p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {label && <span className="font-bold text-lg uppercase">{label}</span>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="bg-white border-2 border-black px-3 py-2 hover:bg-gray-100 transition-colors"
              title="Copy Mermaid code"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowFullscreen(true)}
              className="bg-white border-2 border-black px-3 py-2 hover:bg-gray-100 transition-colors"
              title="View fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-8 overflow-auto">
          <div ref={containerRef} className="flex justify-center items-center min-h-[300px]" />
        </div>
      </div>

      {showFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black w-full h-full flex flex-col">
            <div className="bg-yellow-400 border-b-4 border-black p-4 flex justify-between items-center">
              <span className="font-bold text-lg uppercase">{label || 'Diagram'}</span>
              <div className="flex gap-2">
                <button
                  onClick={handleZoomOut}
                  className="bg-white border-2 border-black px-3 py-2 hover:bg-gray-100 transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="bg-white border-2 border-black px-4 py-2 font-bold min-w-[80px] text-center">
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
                  onClick={handleReset}
                  className="bg-white border-2 border-black px-3 py-2 hover:bg-gray-100 transition-colors"
                  title="Reset zoom and pan"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleFullscreenClose}
                  className="bg-white border-2 border-black px-4 py-2 font-bold hover:bg-gray-100 transition-colors ml-2"
                >
                  CLOSE
                </button>
              </div>
            </div>
            <div
              className="flex-1 overflow-hidden bg-gray-50 relative"
              style={{
                backgroundImage: 'radial-gradient(circle, #e5e5e5 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              <div
                className="absolute inset-0 flex justify-center items-center overflow-auto"
                style={{
                  cursor: isDragging ? 'grabbing' : zoom > 100 ? 'grab' : 'default',
                }}
              >
                <div
                  ref={fullscreenContainerRef}
                  style={{
                    transform: `scale(${zoom / 100}) translate(${pan.x / (zoom / 100)}px, ${pan.y / (zoom / 100)}px)`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                  }}
                  className="inline-block"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
