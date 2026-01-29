import { ContentBlock as ContentBlockType } from '../types';
import CodeBlock from './CodeBlock';
import CalloutBox from './CalloutBox';
import MermaidDiagram from './MermaidDiagram';

interface ContentBlockProps {
  block: ContentBlockType;
  index: number;
}

export default function ContentBlock({ block, index }: ContentBlockProps) {
  switch (block.type) {
    case 'text':
      return (
        <p className="text-lg leading-relaxed text-neutral-700 mb-6">
          {block.content}
        </p>
      );

    case 'heading':
      const level = block.metadata?.level || 2;
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      const headingId = block.content.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      const headingClasses = {
        2: 'text-3xl font-black mb-6 mt-12 uppercase',
        3: 'text-2xl font-black mb-4 mt-8 uppercase',
        4: 'text-xl font-black mb-3 mt-6 uppercase',
      };

      const colors = ['bg-lime-400', 'bg-pink-400', 'bg-yellow-400', 'bg-blue-400'];
      const color = colors[index % colors.length];

      return (
        <HeadingTag
          id={headingId}
          className={`${headingClasses[level]} scroll-mt-24`}
        >
          <span className={`${color} px-2 inline-block`}>
            {block.content}
          </span>
        </HeadingTag>
      );

    case 'code':
      return (
        <div className="mb-6">
          <CodeBlock
            code={block.content}
            language={block.metadata?.language || 'text'}
          />
        </div>
      );

    case 'diagram':
      if (block.metadata?.diagramType === 'mermaid') {
        return (
          <div className="mb-6">
            <MermaidDiagram content={block.content} label="Diagram" />
          </div>
        );
      }
      return null;

    case 'image':
      return (
        <div className="mb-6">
          <div className="border-4 border-black" style={{ boxShadow: '6px 6px 0 #000' }}>
            <img
              src={block.metadata?.imageUrl}
              alt={block.metadata?.imageAlt || ''}
              className="w-full h-auto"
            />
            {block.metadata?.caption && (
              <div className="bg-black text-white px-4 py-2 font-bold text-sm">
                {block.metadata.caption}
              </div>
            )}
          </div>
        </div>
      );

    case 'callout':
      return (
        <div className="mb-6">
          <CalloutBox
            content={block.content}
            type={block.metadata?.calloutType || 'info'}
          />
        </div>
      );

    case 'divider':
      return (
        <div className="my-8">
          <div className="border-t-4 border-black" />
        </div>
      );

    default:
      return null;
  }
}
