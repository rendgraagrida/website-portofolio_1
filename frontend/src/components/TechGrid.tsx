import React, { useState } from 'react';
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
  FileCode2,
  X,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface TechGridProps {
  lang: 'id' | 'en';
}

interface TechItem {
  id: string;
  name: string;
  category: 'database' | 'devops' | 'code' | 'infra';
  level: string;
  icon: React.ReactNode;
  overview: {
    id: string;
    en: string;
  };
  functions: {
    id: string[];
    en: string[];
  };
}

const techItems: TechItem[] = [
  { 
    id: 'oracle',
    name: 'Oracle Database', 
    category: 'database', 
    level: 'Expert (8+ Years)', 
    icon: <Database className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Database Relasional skala enterprise andalan untuk pemrosesan transaksi telekomunikasi kritikal dengan volume data terabytes.',
      en: 'Enterprise-grade relational database engine powering mission-critical telecom transaction workloads with high throughput.'
    },
    functions: {
      id: [
        'Manajemen ketersediaan tinggi (High Availability) & zero data loss.',
        'Penyusunan prosedur Backup & Disaster Recovery (RMAN).',
        'Tuning performa query, indexing strategi, dan partisi tabel.',
        'Replikasi dan validasi data lintas sistem (Telkomsel & IndiHome).'
      ],
      en: [
        'High availability management and zero-data-loss architecture.',
        'Backup and Disaster Recovery orchestration with RMAN.',
        'Query performance tuning, partitioning, and indexing strategies.',
        'Cross-system data replication and reconciliation.'
      ]
    }
  },
  { 
    id: 'siebel',
    name: 'Siebel CRM Enterprise', 
    category: 'database', 
    level: 'System Admin', 
    icon: <Layers className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Sistem CRM enterprise komprehensif untuk pengelolaan jutaan pelanggan korporasi dan pelanggan ritel telekomunikasi.',
      en: 'Enterprise CRM suite managing millions of corporate and retail telecommunication customers.'
    },
    functions: {
      id: [
        'Administrasi server Siebel Gateway, Enterprise Server, dan Component.',
        'Troubleshooting transaksi EAI (Enterprise Application Integration).',
        'Ekstraksi & rekonsiliasi data pelanggan harian skala masif.',
        'Pemeliharaan sinkronisasi database dan log integrasi pihak ketiga.'
      ],
      en: [
        'Administration of Siebel Gateway, Enterprise Server, and Components.',
        'Troubleshooting EAI transactions and integration queues.',
        'Mass daily customer data extraction and reconciliation.',
        'Database synchronization and third-party integration log monitoring.'
      ]
    }
  },
  { 
    id: 'sql-tuning',
    name: 'SQL & PL-SQL Tuning', 
    category: 'database', 
    level: 'High Throughput', 
    icon: <Cpu className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Optimalisasi perintah SQL dan prosedur tersimpan (Stored Procedures) untuk memangkas waktu eksekusi dari hitungan jam menjadi hitungan menit.',
      en: 'Optimization of SQL commands and Stored Procedures to slash query execution time from hours down to minutes.'
    },
    functions: {
      id: [
        'Analisis Execution Plan (Explain Plan) & pemanfaatan Optimizer Hints.',
        'Pengurangan beban I/O server melalui perancangan index efisien.',
        'Penulisan Stored Procedure & Package PL/SQL untuk agregasi data otomatis.',
        'Pencegahan table lock dan penanganan concurrency tinggi.'
      ],
      en: [
        'Execution Plan analysis (Explain Plan) and Optimizer Hints usage.',
        'Reduction of server I/O workload via smart indexing design.',
        'Authoring PL/SQL Stored Procedures & Packages for data aggregation.',
        'Mitigating database locks and handling high-concurrency spikes.'
      ]
    }
  },
  { 
    id: 'libsql',
    name: 'LibSQL & SQLite', 
    category: 'database', 
    level: 'Modern Stack', 
    icon: <HardDrive className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Database modern berbasis SQLite terdistribusi (Turso) untuk kecepatan akses latency rendah dan arsitektur edge computing.',
      en: 'Modern distributed SQLite-based database (Turso) engineered for ultra-low latency and edge application architectures.'
    },
    functions: {
      id: [
        'Penyimpanan lokal cepat pada development dan cloud edge database pada produksi.',
        'Dukungan transaksi ACID ringan dengan resource footprint minimal.',
        'Integrasi native dengan Drizzle ORM pada ekosistem TypeScript.'
      ],
      en: [
        'Fast local storage for dev environments and distributed cloud edge for production.',
        'Lightweight ACID transaction support with minimal resource footprint.',
        'Native integration with Drizzle ORM in the TypeScript ecosystem.'
      ]
    }
  },
  { 
    id: 'drizzle',
    name: 'Drizzle ORM', 
    category: 'database', 
    level: 'Type-Safe DB', 
    icon: <Sparkles className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Object-Relational Mapping (ORM) modern generasi baru yang 100% type-safe dengan performa mendekati raw SQL query.',
      en: 'Next-generation TypeScript ORM providing 100% type-safety with performance near raw SQL execution.'
    },
    functions: {
      id: [
        'Skema database yang divalidasi langsung oleh compiler TypeScript.',
        'Migrasi skema database terotomatisasi dan aman (Drizzle Kit).',
        'Mencegah runtime error dan inkonsistensi tipe data di level kode.'
      ],
      en: [
        'Database schemas fully validated by the TypeScript compiler.',
        'Automated, deterministic database schema migrations with Drizzle Kit.',
        'Zero runtime mismatches and compile-time SQL safety.'
      ]
    }
  },
  { 
    id: 'python',
    name: 'Python Data & Automation', 
    category: 'code', 
    level: 'ETL / OCR Engine', 
    icon: <Terminal className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Bahasa pemrograman utama untuk rekayasa otomatisasi, ekstraksi data cerdas (OCR), dan pipeline ETL enterprise.',
      en: 'Primary programming language for enterprise automation engineering, intelligent OCR extraction, and ETL data pipelines.'
    },
    functions: {
      id: [
        'Pengembangan pipeline otomatisasi DAU yang menghemat ratusan jam kerja tim.',
        'Implementasi optical character recognition (OCR) presisi tinggi.',
        'Pemrosesan file masif, web scraping data terstruktur, dan validasi rekonsiliasi.'
      ],
      en: [
        'Engineering automated DAU pipelines saving hundreds of engineering hours.',
        'High-precision Optical Character Recognition (OCR) implementations.',
        'Mass data file parsing, structured scraping, and reconciliation logic.'
      ]
    }
  },
  { 
    id: 'linux',
    name: 'Linux Server Admin', 
    category: 'infra', 
    level: 'RHEL & Ubuntu', 
    icon: <Server className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Pengelolaan dan pengamanan sistem operasi Linux enterprise (Red Hat Enterprise Linux, CentOS, Ubuntu Server) untuk server produksi.',
      en: 'Administration and hardening of enterprise Linux operating systems (RHEL, CentOS, Ubuntu Server) for 24/7 production hosts.'
    },
    functions: {
      id: [
        'Konfigurasi kernel parameters untuk database performa tinggi.',
        'Manajemen user permissions, SSH key hardening, dan firewall security.',
        'Automated task scheduling dengan Cron jobs dan systemd services.',
        'Analisis performa server (CPU, Memory, I/O wait, Storage management).'
      ],
      en: [
        'Kernel parameter tuning for high-performance database engines.',
        'User permission policies, SSH hardening, and network firewall rules.',
        'Automated cron job scheduling and resilient systemd service daemons.',
        'Server health diagnostics (CPU load, memory caches, I/O wait, disk arrays).'
      ]
    }
  },
  { 
    id: 'bash',
    name: 'Shell & Bash Scripting', 
    category: 'devops', 
    level: 'Process Automation', 
    icon: <Code2 className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Otomatisasi skrip bash tingkat lanjut untuk menjalankan tugas-tugas administratif tanpa intervensi manual.',
      en: 'Advanced shell scripting automation to orchestrate complex administrative tasks without manual intervention.'
    },
    functions: {
      id: [
        'Skrip backup database otomatis dengan rotasi dan kompresi arsip.',
        'Log rotation, parsing error log, dan notifikasi alert otomatis.',
        'Otomatisasi instalasi dan bootstrap server environment baru.'
      ],
      en: [
        'Automated database backup scripts with archive compression and rotation.',
        'System log rotation, error log parsing, and real-time alerts.',
        'Server provisioning scripts for quick environment bootstrapping.'
      ]
    }
  },
  { 
    id: 'cicd',
    name: 'GitHub Actions CI/CD', 
    category: 'devops', 
    level: 'Automated Testing', 
    icon: <Workflow className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Pipeline continuous integration & deployment untuk memastikan setiap baris kode teruji otomatis sebelum dirilis ke produksi.',
      en: 'Automated CI/CD workflows ensuring code is continuously type-checked, unit-tested, and deployed securely.'
    },
    functions: {
      id: [
        'Automated type-checking dan unit testing multi-lingkungan.',
        'Auto-deploy frontend statis ke Vercel dan backend ke cloud container.',
        'Standarisasi Gitflow dan branch protection rules.'
      ],
      en: [
        'Automated multi-matrix type-checking and unit test execution.',
        'Zero-touch continuous deployment to Vercel and cloud containers.',
        'Enforcing code quality gates, Gitflow, and branch policies.'
      ]
    }
  },
  { 
    id: 'docker',
    name: 'Docker Containerization', 
    category: 'devops', 
    level: 'Container Config', 
    icon: <Box className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Teknologi kontainerisasi aplikasi untuk memastikan konsistensi lingkungan antara development, staging, dan production.',
      en: 'Application containerization standardizing runtime environments between local development and cloud production.'
    },
    functions: {
      id: [
        'Pembuatan Dockerfile multi-stage ringan berbasis Alpine Linux.',
        'Isolasi dependensi dan environment backend performa tinggi.',
        'Deploy kontainer siap pakai di platform cloud modern (Koyeb, Render).'
      ],
      en: [
        'Multi-stage lightweight Dockerfile builds based on Alpine Linux.',
        'Dependency isolation for ultra-fast and reliable backend runtimes.',
        'Deploying production-ready containers to Koyeb and Render cloud.'
      ]
    }
  },
  { 
    id: 'bun',
    name: 'Bun & Node.js Runtime', 
    category: 'code', 
    level: 'High Performance', 
    icon: <Zap className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Runtime JavaScript/TypeScript modern serba cepat yang mengintegrasikan package manager, bundler, dan test runner dalam satu engine.',
      en: 'Blazing-fast all-in-one JavaScript/TypeScript runtime with native package manager, bundler, and test runner.'
    },
    functions: {
      id: [
        'Eksekusi server API dengan latency milidetik super rendah.',
        'Instalasi paket dependensi hingga 30x lebih cepat dibanding npm standar.',
        'Menjalankan unit test dengan bun:test secara native.'
      ],
      en: [
        'Executing backend API servers with single-digit millisecond latency.',
        'Package installation up to 30x faster than traditional package managers.',
        'Native fast unit test execution via bun:test.'
      ]
    }
  },
  { 
    id: 'react',
    name: 'TypeScript & React', 
    category: 'code', 
    level: 'Component Architecture', 
    icon: <FileCode2 className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Kombinasi bahasa TypeScript dengan library antarmuka React untuk membangun antarmuka web interaktif yang kokoh dan bebas bug.',
      en: 'TypeScript paired with React to construct rich, responsive, and type-safe interactive web interfaces.'
    },
    functions: {
      id: [
        'Pembangunan komponen modular yang dapat digunakan kembali (reusable).',
        'Manajemen state global reaktif tanpa boilerplate berlebih.',
        'Integrasi type safety end-to-end dari backend hingga frontend.'
      ],
      en: [
        'Engineering reusable, modular UI component hierarchies.',
        'Lightweight reactive state management across component boundaries.',
        'End-to-end type safety between backend schemas and frontend props.'
      ]
    }
  },
  { 
    id: 'astro',
    name: 'Astro Framework', 
    category: 'code', 
    level: 'Islands Architecture', 
    icon: <LayoutTemplate className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Web framework modern berarsitektur Islands yang menghasilkan HTML statis murni dengan pengiriman JavaScript 0 kB secara default.',
      en: 'Modern Islands-architecture web framework generating pure static HTML with zero JavaScript by default for maximum speed.'
    },
    functions: {
      id: [
        'Performa skor Google PageSpeed 100/100 dan load time instan.',
        'Isolasi komponen interaktif hanya di area yang benar-benar membutuhkan (Astro Islands).',
        'Dukungan multi-bahasa (i18n) dan rendering SEO statis optimal.'
      ],
      en: [
        'Near-perfect 100/100 Google PageSpeed performance and instant page loads.',
        'Selective hydration of interactive components (Astro Islands).',
        'Native internationalization (i18n) and static SEO optimization.'
      ]
    }
  },
  { 
    id: 'elysia',
    name: 'ElysiaJS Backend', 
    category: 'code', 
    level: 'TypeBox Validation', 
    icon: <ShieldCheck className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Framework backend berbasis Bun dengan validasi skema TypeBox bawaan yang sangat ketat dan proteksi Anti-XSS.',
      en: 'High-speed Bun-powered backend framework featuring strict TypeBox schema validation and robust Anti-XSS protection.'
    },
    functions: {
      id: [
        'Validasi input otomatis pada endpoint (POST /api/contact, dll).',
        'Konektivitas Eden Treaty untuk sinkronisasi tipe data ke frontend.',
        'Keamanan API enterprise dan sanitasi payload data.'
      ],
      en: [
        'Automatic payload schema validation for API endpoints.',
        'Eden Treaty RPC for compile-time type sharing with frontend clients.',
        'Enterprise-grade API security and input sanitization.'
      ]
    }
  },
  { 
    id: 'splunk',
    name: 'Splunk & Log Analytics', 
    category: 'infra', 
    level: 'Monitoring & Alert', 
    icon: <Activity className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Platform observabilitas enterprise untuk memonitor kesehatan sistem, menganalisis log ribuan server, dan mendeteksi anomali.',
      en: 'Enterprise observability platform for infrastructure monitoring, log aggregation, and real-time anomaly detection.'
    },
    functions: {
      id: [
        'Pembuatan query SPL (Search Processing Language) untuk analisis anomali.',
        'Dashboard monitoring ketersediaan layanan dan transaksi kritis.',
        'Sistem peringatan (alerting) dini sebelum terjadi insiden fatal.'
      ],
      en: [
        'Writing advanced SPL queries to diagnose transaction bottlenecks.',
        'Real-time dashboards for service availability and transaction health.',
        'Early alerting rules to prevent service degradation.'
      ]
    }
  },
  { 
    id: 'git',
    name: 'Gitflow & Version Control', 
    category: 'devops', 
    level: 'Branch Strategy', 
    icon: <GitBranch className="w-5 h-5 text-earth-800" />,
    overview: {
      id: 'Sistem kontrol versi standar industri untuk kolaborasi tim teknis, pelacakan riwayat kode, dan manajemen rilis terstruktur.',
      en: 'Industry-standard version control system for engineering collaboration, change tracking, and structured release governance.'
    },
    functions: {
      id: [
        'Penerapan standar branching model (feature, develop, main/production).',
        'Review Pull Request yang terstruktur dengan automated checks.',
        'Resolusi merge conflict dan pemeliharaan riwayat commit yang bersih.'
      ],
      en: [
        'Enforcing structured Gitflow branching models.',
        'Streamlined Pull Request code reviews with automated validation.',
        'Conflict resolution and maintaining semantic commit histories.'
      ]
    }
  },
];

export const TechGrid: React.FC<TechGridProps> = ({ lang }) => {
  const t = ui[lang];
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const handleTechClick = (tech: TechItem) => {
    setSelectedTech(tech);
  };

  const handleCloseModal = () => {
    setSelectedTech(null);
  };

  return (
    <div id="stack" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full paper-btn text-earth-800 text-xs font-extrabold mb-3">
            <Cpu size={14} className="text-brand-brown" />
            <span>Technical Infrastructure &amp; Stack</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-earth-900 mb-3 tracking-tight">
            {t['stack.title']}
          </h2>
          <p className="text-earth-800 leading-relaxed text-sm md:text-base">
            {t['stack.desc']}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-earth-600 font-semibold mt-3 bg-[#ECE7DF] px-3 py-1 rounded-full shadow-inner">
            <HelpCircle size={13} className="text-brand-brown" />
            <span>{lang === 'id' ? 'Klik kartu keahlian untuk melihat fungsi & use-case lengkap' : 'Click any skill card to view detailed overview & use cases'}</span>
          </span>
        </div>

        {/* Minimalist Soft Paper / Neumorphic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
          {techItems.map((tech) => (
            <button 
              key={tech.id}
              onClick={() => handleTechClick(tech)}
              className="group relative p-5 md:p-6 rounded-3xl paper-card hover:paper-btn transition-all duration-300 flex flex-col items-center text-center cursor-pointer select-none focus:outline-none text-left w-full transform hover:-translate-y-1"
            >
              {/* Minimalist Inset Well for Icon */}
              <div className="w-12 h-12 rounded-2xl mb-3.5 flex items-center justify-center paper-well group-hover:scale-105 transition-transform">
                {tech.icon}
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-sm md:text-base text-earth-900 mb-1.5 tracking-tight group-hover:text-brand-brown transition-colors">
                {tech.name}
              </h3>

              {/* Subtle Paper Tag */}
              <span className="mt-auto text-[11px] font-bold text-earth-600 px-3 py-1 rounded-full paper-btn">
                {tech.level}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* TECH OVERVIEW MODAL (PAPER-BASED MODAL) */}
      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="paper-card rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-fade-in">
            
            {/* Modal Header */}
            <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
                  {selectedTech.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-earth-900 leading-tight">
                    {selectedTech.name}
                  </h4>
                  <span className="text-xs font-bold text-brand-brown">
                    {selectedTech.level}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="paper-btn w-8 h-8 rounded-xl flex items-center justify-center text-earth-700 hover:text-brand-brown focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Overview Section */}
              <div>
                <h5 className="text-xs uppercase font-extrabold tracking-wider text-earth-600 mb-2">
                  {lang === 'id' ? 'Ringkasan & Arsitektur Teknologi' : 'Technology Architecture & Overview'}
                </h5>
                <p className="text-earth-900 leading-relaxed text-sm md:text-base bg-white p-4 rounded-2xl border border-[#ECE7DF] shadow-sm">
                  {selectedTech.overview[lang]}
                </p>
              </div>

              {/* Core Functions / Enterprise Use Cases */}
              <div>
                <h5 className="text-xs uppercase font-extrabold tracking-wider text-earth-600 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-brand-brown" />
                  <span>{lang === 'id' ? 'Fungsi & Implementasi Utama' : 'Core Functions & Key Implementations'}</span>
                </h5>
                <ul className="space-y-2.5">
                  {selectedTech.functions[lang].map((func, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-earth-800 bg-[#FAF8F5] p-3 rounded-xl border border-[#ECE7DF]">
                      <span className="w-2 h-2 rounded-full bg-brand-brown mt-1.5 flex-shrink-0"></span>
                      <span className="leading-relaxed font-medium">{func}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#ECE7DF] flex justify-end">
              <button
                onClick={handleCloseModal}
                className="paper-btn px-5 py-2 rounded-xl text-xs font-extrabold text-earth-900 hover:text-brand-brown"
              >
                {lang === 'id' ? 'Tutup Overview' : 'Close Overview'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
