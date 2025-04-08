import React from 'react';
import Typography from '../ui/Typography';
import { Archetype, getArchetypeColor } from '../../utils/archetypeUtils';

interface ContactFormProps {
  /** Archetype for button background color */
  buttonArchetype: Archetype;
}

/**
 * Renders a simple contact form.
 * 
 * @param {ContactFormProps} props - Component props.
 * @returns {JSX.Element} The ContactForm component.
 */
const ContactForm: React.FC<ContactFormProps> = ({ buttonArchetype }) => {

  // Get background color class for button
  const getBgColorClass = (): string => {
    return `bg-${getArchetypeColor(buttonArchetype)}`;
  };

  // TODO: Implement form submission logic (e.g., using state, form library, API call)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted'); // Placeholder
    // Add actual submission logic here
  };

  return (
    <form className="space-y-4" aria-labelledby="contact-form-title" onSubmit={handleSubmit}>
      <Typography 
        variant="h3" 
        id="contact-form-title"
        className="sr-only" // Visually hidden title for accessibility
        archetype="default"
      >
        Contact Form
      </Typography>
      
      <div className="form-group">
        <label htmlFor="name" className="sr-only">Name</label>
        <input
          id="name"
          name="name" // Added name attribute for form handling
          type="text"
          placeholder="Name"
          className="w-full bg-slate-800 text-white p-4"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          name="email" // Added name attribute
          type="email"
          placeholder="Email"
          className="w-full bg-slate-800 text-white p-4"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message" // Added name attribute
          placeholder="Message"
          rows={4}
          className="w-full bg-slate-800 text-white p-4"
          required
        ></textarea>
      </div>
      
      <button
        type="submit"
        className={`${getBgColorClass()} text-white px-8 py-4 hover:opacity-90 transition-colors w-full md:w-auto`}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm; 