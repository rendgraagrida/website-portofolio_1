import React from 'react';
import { ui } from '../i18n/ui';
import { Database, Server, Code, Terminal, Layers, ShieldCheck, Cpu } from 'lucide-react';

interface TechGridProps {
  lang: 'id' | 'en';
}

interface TechItem {
  name: string;
  category: 'database' | 'devops' | 'code' | 'infra';
  level: string;
  icon: string;
}

const techItems: TechItem[] = [
  { name: 'Oracle Database', category: 'database', level: 'Expert (8+ Years)', icon: '🛢️' },
  { name: 'Siebel CRM', category: 'database', level: 'Enterprise Admin', icon: '📦' },
  { name: 'SQL & PL/SQL Tuning', category: 'database', level: 'Advanced', icon: '⚡' },
  { name: 'LibSQL & SQLite', category: 'database', level: 'Modern Stack', icon: '🗄️' },
  { name: 'Drizzle ORM', category: 'database', level: 'Type-Safe', icon: '💧' },
  { name: 'Python Automation', category: 'code', level: 'Advanced / OCR', icon: '🐍' },
  { name: 'Linux Server Admin', category: 'infra', level: 'RHEL / Ubuntu', icon: '🐧' },
  { name: 'Shell / Bash Scripting', category: 'devops', level: 'Automation', icon: '⚙️' },
  { name: 'GitHub Actions (CI/CD)', category: 'devops', level: 'Automated Pipelines', icon: '🚀' },
  { name: 'Docker & Containers', category: 'devops', level: 'Containerization', icon: '🐳' },
  { name: 'Bun & Node.js', category: 'code', level: 'High-Performance', icon: '🥟' },
  { name: 'TypeScript & React', category: 'code', level: 'Modern Frontend', icon: '⚛️' },
  { name: 'Astro Framework', category: 'code', level: 'Islands Architecture', icon: '🚀' },
  { name: 'ElysiaJS Backend', category: 'code', level: 'Type-Safe API', icon: '🦊' },
  { name: 'Splunk & Monitoring', category: 'infra', level: 'Log Analysis', icon: '📊' },
  { name: 'Git & Version Control', category: 'devops', level: 'GitFlow & CI', icon: '🐙' },
];

export const TechGrid: React.FC<TechGridProps> = ({ lang }) => {
  const t = ui[lang];

  return (
    <div id="stack" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tuku-brown/10 text-tuku-brown text-xs font-bold mb-3">
            <Cpu size={15} />
            <span>Tech Stack Overview</span>
          </div>
          <h2 className="text-3xl font-extrabold text-tuku-dark mb-3 tracking-tight">
            {t['stack.title']}
          </h2>
          <p className="text-earth-800 leading-relaxed text-sm md:text-base">
            {t['stack.desc']}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {techItems.map((tech, index) => (
            <div 
              key={index}
              className="bg-white p-5 rounded-2xl border border-earth-200/90 shadow-sm hover:shadow-md hover:border-tuku-brown/40 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <span className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform">
                {tech.icon}
              </span>
              <h3 className="font-extrabold text-sm md:text-base text-tuku-dark mb-1 group-hover:text-tuku-brown transition-colors">
                {tech.name}
              </h3>
              <span className="text-xs text-earth-600 font-semibold bg-earth-100/70 px-2.5 py-0.5 rounded-full mt-auto">
                {tech.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
