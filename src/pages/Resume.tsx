import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Resume, Skills } from '../types';
import resumeData from '../data/resume.json';
import skillsData from '../data/skills.json';

export default function ResumePage() {
  const resume = resumeData as Resume;
  const skills = skillsData as Skills;

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const handleDownloadCV = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <h1 className="text-4xl font-black">
          WORK <span className="bg-blue-400 px-2">HISTORY</span>
        </h1>
        <button
          onClick={handleDownloadCV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-400 border-4 border-black font-bold uppercase text-sm hover:bg-lime-400 transition-all duration-150 active:translate-y-1"
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
          <Download size={20} />
          DOWNLOAD CV
        </button>
      </div>

      <div className="space-y-6">
        {resume.experience.map((exp) => (
          <Card key={exp.id}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h2 className="text-2xl font-black mb-2">{exp.position}</h2>
                <p className="text-xl font-bold">{exp.company}</p>
              </div>
              <div className="text-sm text-neutral-500 mt-2 md:mt-0 md:text-right">
                <p className="font-bold">
                  {formatDate(exp.startDate)} - {exp.current ? 'PRESENT' : formatDate(exp.endDate!)}
                </p>
              </div>
            </div>

            <ul className="space-y-2 border-t-4 border-black pt-4">
              {exp.responsibilities.map((resp, index) => (
                <li key={index} className="flex gap-3 text-base text-neutral-600">
                  <span className="font-bold">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {resume.education && resume.education.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-black mb-6">
            EDUCATION
          </h2>
          <div className="space-y-6">
            {resume.education.map((edu) => (
              <Card key={edu.id}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-xl font-black mb-2">{edu.degree}</h3>
                    <p className="text-base font-bold">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-neutral-500 mt-2 md:mt-0">
                    <p className="font-bold">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-3xl font-black mb-6">
          TECHNICAL <span className="bg-lime-400 px-2">TOOLKIT</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">FRONTEND</h3>
            <p className="text-sm text-neutral-600">{skills.frontend.join(', ')}</p>
          </Card>

          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">BACKEND</h3>
            <p className="text-sm text-neutral-600">{skills.backend.join(', ')}</p>
          </Card>

          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">DATA</h3>
            <p className="text-sm text-neutral-600">{skills.database.join(', ')}</p>
          </Card>

          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">INFRA</h3>
            <p className="text-sm text-neutral-600">{skills.devops.join(', ')}</p>
          </Card>

          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">OBSERVABILITY</h3>
            <p className="text-sm text-neutral-600">{skills.observability.join(', ')}</p>
          </Card>

          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">SECURITY</h3>
            <p className="text-sm text-neutral-600">{skills.security.join(', ')}</p>
          </Card>

          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">TESTING</h3>
            <p className="text-sm text-neutral-600">{skills.testing.join(', ')}</p>
          </Card>

          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">TOOLS</h3>
            <p className="text-sm text-neutral-600">{skills.tools.join(', ')}</p>
          </Card>

          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">ARCHITECTURE</h3>
            <p className="text-sm text-neutral-600">{skills.architecture.join(', ')}</p>
          </Card>

          <Card className="bg-lime-400">
            <h3 className="text-xl font-black mb-3">CLOUD</h3>
            <p className="text-sm text-neutral-600">{skills.cloud.join(', ')}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
