import React from 'react';
import Section from './Section';
import Typography from './Typography';
import SocialLinks from './SocialLinks';
import ContactForm from './ContactForm';
import { ContactData } from '../data/portfolioData';

interface ContactProps {
  data: ContactData;
}

/**
 * Renders the Contact section including social links and a contact form.
 * 
 * @param {ContactProps} props - The component props containing contact data.
 * @returns {JSX.Element} The Contact section component.
 */
const Contact: React.FC<ContactProps> = ({ data }) => {
  return (
    <Section
      id={data.id}
      title={data.title}
      description={data.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Typography 
            variant="h3" 
            className="mb-6"
            narrativeSignal="technical"
            archetype="default"
          >
            Connect With Me
          </Typography>
          <Typography 
            variant="body" 
            archetype="muted"
            className="mb-6"
          >
            {data.connectDescription} 
          </Typography>
          <SocialLinks 
            links={data.socialLinks} 
            email={data.email} 
            archetype={data.primaryArchetype} 
          />
        </div>

        <div>
          <ContactForm buttonArchetype={data.primaryArchetype} />
        </div>
      </div>
    </Section>
  );
};

export default Contact; 