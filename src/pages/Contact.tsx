import { useState, FormEvent } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import profileData from '../data/profile.json';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const contactLinks = [
    { label: 'EMAIL', value: profileData.email, href: `mailto:${profileData.email}` },
    { label: 'GITHUB', value: 'github.com/dev', href: profileData.github },
    { label: 'LINKEDIN', value: 'linkedin.com/in/dev', href: profileData.linkedin },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          LET'S <span className="bg-yellow-400 px-2">WORK TOGETHER</span>
        </h1>
        <p className="text-xl text-neutral-600">
          Got a project? Drop me a message.
        </p>
      </div>

      <Card size="lg" className="bg-yellow-400 mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase">Send a Message</h2>

        {showSuccess && (
          <div className="mb-6 p-4 bg-blue-400 border-4 border-black flex items-center gap-3" style={{ boxShadow: '4px 4px 0 #000' }}>
            <CheckCircle size={24} />
            <p className="font-bold uppercase">MESSAGE RECEIVED (NOT REALLY)</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="NAME *"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              focusColor="focus:border-blue-400"
            />
            <Input
              label="EMAIL *"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              focusColor="focus:border-blue-400"
            />
          </div>

          <Input
            label="SUBJECT"
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Project Inquiry"
            focusColor="focus:border-blue-400"
          />

          <Textarea
            label="MESSAGE *"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell me about your project..."
            rows={6}
            focusColor="focus:border-blue-400"
          />

          <div className="flex flex-col gap-4">
            <Button type="submit" className="w-full md:w-auto flex items-center justify-center gap-2">
              <Send size={20} />
              <span>SEND MESSAGE</span>
            </Button>
            <p className="text-xs text-neutral-700">
              * This form is currently non-functional. Please use the email link below to contact me directly.
            </p>
          </div>
        </form>
      </Card>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-black mb-6 uppercase">Or Reach Out Directly</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactLinks.map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            target={label !== 'EMAIL' ? '_blank' : undefined}
            rel={label !== 'EMAIL' ? 'noopener noreferrer' : undefined}
            className="bg-white border-4 border-black p-6 active:translate-y-1 transition-all duration-150 text-center"
            style={{ boxShadow: '4px 4px 0 #000' }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = '2px 2px 0 #000';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = '4px 4px 0 #000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '4px 4px 0 #000';
            }}
          >
            <p className="text-xs text-neutral-500 mb-2 font-bold">{label}</p>
            <p className="text-base font-bold break-words">{value}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
