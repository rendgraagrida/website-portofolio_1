import React from 'react';
import { ui } from '../i18n/ui';
import { 
  Database, 
  Server, 
  Code2, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Sparkles, 
  GitBranch, 
  Box, 
  Zap, 
  LayoutTemplate, 
  Activity, 
  Workflow, 
  FileCode2 
} from 'lucide-react';

interface TechGridProps {
  lang: 'id' | 'en';
}

interface TechItem {
  name: string;
  category: 'database' | 'devops' | 'code' | 'infra';
  level: string;
  icon: React.ReactNode;
}

const techItems: TechItem[] = [
  { 
    name: 'Oracle Database', 
    category: 'database', 
    level: 'Expert (8+ Years)', 
    icon: <Database className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Siebel CRM Enterprise', 
    category: 'database', 
    level: 'System Admin', 
    icon: <Layers className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'SQL & PL-SQL Tuning', 
    category: 'database', 
    level: 'High Throughput', 
    icon: <Cpu className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'LibSQL & SQLite', 
    category: 'database', 
    level: 'Modern Stack', 
    icon: <HardDrive className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Drizzle ORM', 
    category: 'database', 
    level: 'Type-Safe DB', 
    icon: <Sparkles className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Python Data & Automation', 
    category: 'code', 
    level: 'ETL / OCR Engine', 
    icon: <Terminal className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Linux Server Admin', 
    category: 'infra', 
    level: 'RHEL & Ubuntu', 
    icon: <Server className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Shell & Bash Scripting', 
    category: 'devops', 
    level: 'Process Automation', 
    icon: <Code2 className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'GitHub Actions CI/CD', 
    category: 'devops', 
    level: 'Automated Testing', 
    icon: <Workflow className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Docker Containerization', 
    category: 'devops', 
    level: 'Container Config', 
    icon: <Box className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Bun & Node.js Runtime', 
    category: 'code', 
    level: 'High Performance', 
    icon: <Zap className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'TypeScript & React', 
    category: 'code', 
    level: 'Component Architecture', 
    icon: <FileCode2 className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Astro Framework', 
    category: 'code', 
    level: 'Islands Architecture', 
    icon: <LayoutTemplate className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'ElysiaJS Backend', 
    category: 'code', 
    level: 'TypeBox Validation', 
    icon: <ShieldCheck className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Splunk & Log Analytics', 
    category: 'infra', 
    level: 'Monitoring & Alert', 
    icon: <Activity className="w-5 h-5 text-earth-800" /> 
  },
  { 
    name: 'Gitflow & Version Control', 
    category: 'devops', 
    level: 'Branch Strategy', 
    icon: <GitBranch className="w-5 h-5 text-earth-800" /> 
  },
];

export const TechGrid: React.FC<TechGridProps> = ({ lang }) => {
  const t = ui[lang];

  return (
    <div id="stack" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 shadow-[3px_3px_8px_rgba(180,190,205,0.3),-3px_-3px_8px_rgba(255,255,255,0.9)] text-earth-800 text-xs font-extrabold mb-4 border border-white/60">
            <Cpu size={14} className="text-brand-brown" />
            <span>Technical Infrastructure &amp; Stack</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-3 tracking-tight">
            {t['stack.title']}
          </h2>
          <p className="text-earth-800 leading-relaxed text-sm md:text-base">
            {t['stack.desc']}
          </p>
        </div>

        {/* Minimalist Soft Paper / Neumorphic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
          {techItems.map((tech, index) => (
            <div 
              key={index}
              className="group relative p-5 md:p-6 rounded-2xl bg-[#F6F4F0] border border-white/80 shadow-[6px_6px_14px_rgba(195,185,175,0.35),-6px_-6px_14px_rgba(255,255,255,0.95)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-2px_-2px_5px_rgba(255,255,255,0.85)] transition-all duration-300 flex flex-col items-center text-center cursor-default select-none"
            >
              {/* Minimalist Embossed Icon Container */}
              <div className="w-12 h-12 rounded-xl mb-3.5 flex items-center justify-center bg-[#EFECE6] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] border border-black/5 group-hover:scale-105 transition-transform">
                {tech.icon}
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-sm md:text-base text-earth-900 mb-1.5 tracking-tight group-hover:text-brand-brown transition-colors">
                {tech.name}
              </h3>

              {/* Subtle Paper Tag */}
              <span className="mt-auto text-[11px] font-bold text-earth-600 px-3 py-1 rounded-full bg-white/70 shadow-[2px_2px_5px_rgba(0,0,0,0.04),-2px_-2px_5px_rgba(255,255,255,0.8)] border border-white/60">
                {tech.level}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
