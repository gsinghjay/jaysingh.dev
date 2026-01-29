import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';

interface CalloutBoxProps {
  content: string;
  type: 'info' | 'warning' | 'tip' | 'important';
}

export default function CalloutBox({ content, type }: CalloutBoxProps) {
  const styles = {
    info: {
      border: 'border-blue-400',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-400',
      icon: Info,
    },
    warning: {
      border: 'border-red-400',
      bg: 'bg-red-50',
      iconBg: 'bg-red-400',
      icon: AlertTriangle,
    },
    tip: {
      border: 'border-lime-400',
      bg: 'bg-lime-50',
      iconBg: 'bg-lime-400',
      icon: Lightbulb,
    },
    important: {
      border: 'border-yellow-400',
      bg: 'bg-yellow-50',
      iconBg: 'bg-yellow-400',
      icon: AlertCircle,
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div
      className={`flex gap-4 p-4 border-4 ${style.border} ${style.bg}`}
      style={{ boxShadow: '4px 4px 0 #000' }}
    >
      <div className={`${style.iconBg} border-2 border-black p-2 h-fit`}>
        <Icon size={24} className="text-black" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm uppercase mb-1">{type}</p>
        <p className="text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
