import React from 'react';
import { SocialLink } from '../../data/portfolioData';
import { ThemeColor, getThemeColorClass } from '../../utils/colorUtils';
import { Mail } from 'lucide-react';

interface SocialLinksProps {
  links: SocialLink[];
  email: string;
  /** Theme color for links */
  themeColor: ThemeColor;
}

/**
 * Renders a list of social media links and an email link.
 * 
 * @param {SocialLinksProps} props - Component props.
 * @returns {JSX.Element} The SocialLinks component.
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ links, email, themeColor }) => {

  const getColorClass = (): string => {
    return `text-${getThemeColorClass(themeColor)}`;
  };

  return (
    <div className="space-y-4" role="list" aria-label="Contact links">
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.url} 
          className={`${getColorClass()} hover:text-white transition-colors block flex items-center`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Connect on ${link.name} (opens in new tab)`}
        >
          {link.icon}
          {link.name}
        </a>
      ))}
      <a 
        href={`mailto:${email}`} 
        className={`${getColorClass()} hover:text-white transition-colors block flex items-center`}
        aria-label={`Send email to ${email}`}
      >
        <Mail size={20} className="mr-2 text-white" aria-hidden="true" />
        Email
      </a>
    </div>
  );
};

export default SocialLinks; 