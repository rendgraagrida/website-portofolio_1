export interface BilingualList {
  id: string[];
  en: string[];
}

export interface BilingualString {
  id: string;
  en: string;
}

export interface JobDesk {
  title: BilingualString;
  tasks: BilingualList;
  achievements: BilingualList;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  companyHighlight?: BilingualString;
  period: BilingualString;
  jobDesks: JobDesk[];
}

export interface PersonalProfile {
  name: string;
  title: BilingualString;
  location: string;
  email: string;
  phone: string;
  summary: BilingualString;
  socials: {
    linkedin: string;
    jobstreet: string;
    github: string;
  };
  skills: {
    category: BilingualString;
    items: string[];
  }[];
}

export const personalProfile: PersonalProfile = {
  name: 'Rendgra Agrida',
  title: {
    id: 'DevOps Engineer & Database Specialist | Tech Lead',
    en: 'DevOps Engineer & Database Specialist | Technical Lead'
  },
  location: 'Bandung, West Java, Indonesia',
  email: 'rendgraagrida@gmail.com',
  phone: '(+62) 811-222-9811',
  summary: {
    id: 'Profesional IT berpengalaman lebih dari 8 tahun dalam arsitektur database skala enterprise (Oracle, Siebel CRM, LibSQL), otomatisasi data berbasis Python, DevOps CI/CD, serta kepemimpinan teknis proyek lintas divisi.',
    en: 'Seasoned IT professional with 8+ years of expertise in enterprise-scale database architecture (Oracle, Siebel CRM, LibSQL), Python-driven data automation, DevOps CI/CD pipelines, and cross-functional technical leadership.'
  },
  socials: {
    linkedin: 'https://www.linkedin.com/in/rendgra-a-04a141129/',
    jobstreet: 'https://id.jobstreet.com/id/profiles/rendgra-agrida-618h19mh5x',
    github: 'https://github.com/rendgraagrida'
  },
  skills: [
    {
      category: { id: 'Database & Data Eng', en: 'Database & Data Eng' },
      items: ['Oracle Database', 'Siebel CRM', 'SQL / PL-SQL Tuning', 'LibSQL / SQLite', 'Drizzle ORM', 'Data Migration']
    },
    {
      category: { id: 'DevOps & Cloud', en: 'DevOps & Cloud' },
      items: ['Linux Administration', 'Shell / Bash Scripting', 'GitHub Actions (CI/CD)', 'Docker', 'Vercel & Koyeb']
    },
    {
      category: { id: 'Pemrograman & Automasi', en: 'Programming & Automation' },
      items: ['Python (Data Extraction & OCR)', 'TypeScript', 'Bun / Node.js', 'Elysia API', 'React & Astro']
    },
    {
      category: { id: 'Kepemimpinan & Tata Kelola', en: 'Leadership & Governance' },
      items: ['Technical Project Planning', 'Cross-Team Coordination', 'Requirement Engineering', 'IT Documentation']
    }
  ]
};

export const experiences: Experience[] = [
  {
    id: 'telkomsigma-tech-lead',
    role: 'Tech Lead',
    company: 'PT. SIGMA CIPTA CARAKA (TELKOMSIGMA)',
    companyUrl: 'https://www.telkomsigma.co.id/',
    companyHighlight: {
      id: 'Perusahaan IT terdepan di Indonesia penyedia solusi infrastruktur, cloud, dan integrasi sistem berskala enterprise.',
      en: 'Leading IT company in Indonesia providing enterprise-scale infrastructure, cloud, and system integration solutions.'
    },
    period: {
      id: 'Agustus 2025 – Desember 2026',
      en: 'August 2025 – December 2026'
    },
    jobDesks: [
      {
        title: {
          id: 'Perencanaan Teknis & Manajemen Kebutuhan',
          en: 'Technical Planning & Requirement Management'
        },
        tasks: {
          id: [
            'Menganalisis kebutuhan bisnis dan teknis untuk menentukan solusi teknologi dan pendekatan implementasi yang tepat.',
            'Menyiapkan kebutuhan teknis, dokumentasi teknis, dan rencana sumber daya IT untuk mendukung aktivitas proyek dan operasional.',
            'Menerjemahkan kebutuhan bisnis menjadi kebutuhan teknis, aktivitas implementasi, ketergantungan, dan kebutuhan sumber daya.',
            'Meninjau kebutuhan teknis dan rencana implementasi untuk memastikan keselarasan dengan tujuan bisnis dan lingkungan IT yang ada.'
          ],
          en: [
            'Analyzed business and technical requirements to define appropriate technology solutions and implementation approaches.',
            'Prepared technical requirements, technical documentation, and IT resource plans to support project and operational activities.',
            'Translated business requirements into technical requirements, implementation activities, dependencies, and resource needs.',
            'Reviewed technical requirements and implementation plans to ensure alignment with business objectives and existing IT environments.'
          ]
        },
        achievements: {
          id: [
            'Meningkatkan struktur dan kejelasan kebutuhan teknis, membuatnya lebih mudah dieksekusi oleh tim teknis.',
            'Mendukung keselarasan yang lebih baik antara kebutuhan bisnis dan implementasi teknis.',
            'Meningkatkan persiapan proyek melalui perencanaan teknis, identifikasi sumber daya, dan dokumentasi yang lebih terstruktur.'
          ],
          en: [
            'Improved the structure and clarity of technical requirements, making them easier for technical teams to execute.',
            'Supported better alignment between business requirements and technical implementation.',
            'Improved project preparation through more structured technical planning, resource identification, and documentation.'
          ]
        }
      },
      {
        title: {
          id: 'Kepemimpinan Teknis & Koordinasi Tim',
          en: 'Technical Leadership & Team Coordination'
        },
        tasks: {
          id: [
            'Mengoordinasikan aktivitas teknis di seluruh tim IT terkait untuk mendukung implementasi proyek dan aktivitas operasional.',
            'Memberikan arahan dan panduan teknis kepada anggota tim selama aktivitas implementasi dan pemecahan masalah.',
            'Memfasilitasi komunikasi antara tim teknis, pemangku kepentingan proyek, dan pengguna bisnis.',
            'Mengidentifikasi ketergantungan teknis, kebutuhan implementasi, dan potensi masalah yang dapat memengaruhi penyampaian proyek.'
          ],
          en: [
            'Coordinated technical activities across relevant IT teams to support project implementation and operational activities.',
            'Provided technical direction and guidance to team members during implementation and problem-solving activities.',
            'Facilitated communication between technical teams, project stakeholders, and business users.',
            'Identified technical dependencies, implementation requirements, and potential issues that could affect project delivery.'
          ]
        },
        achievements: {
          id: [
            'Meningkatkan koordinasi antara tim teknis dan pemangku kepentingan selama aktivitas proyek dan operasional.',
            'Mendukung eksekusi aktivitas teknis yang lebih terstruktur dengan memperjelas tanggung jawab, kebutuhan, dan ketergantungan.',
            'Meningkatkan kolaborasi lintas tim melalui komunikasi dan koordinasi teknis yang efektif.'
          ],
          en: [
            'Improved coordination between technical teams and stakeholders during project and operational activities.',
            'Supported more structured execution of technical activities by clarifying responsibilities, requirements, and dependencies.',
            'Improved collaboration across teams through effective communication and technical coordination.'
          ]
        }
      }
    ]
  },
  {
    id: 'telkomsigma-devops',
    role: 'Dev-Ops',
    company: 'PT. SIGMA CIPTA CARAKA (TELKOMSIGMA)',
    companyUrl: 'https://www.telkomsigma.co.id/',
    companyHighlight: {
      id: 'Perusahaan IT terdepan di Indonesia penyedia solusi infrastruktur, cloud, dan integrasi sistem berskala enterprise.',
      en: 'Leading IT company in Indonesia providing enterprise-scale infrastructure, cloud, and system integration solutions.'
    },
    period: {
      id: 'Agustus 2017 – Agustus 2025',
      en: 'August 2017 – August 2025'
    },
    jobDesks: [
      {
        title: {
          id: 'Administrasi Database Oracle & Siebel CRM',
          en: 'Oracle Database & Siebel CRM Administration'
        },
        tasks: {
          id: [
            'Mengelola lingkungan Oracle Database dan Oracle Siebel CRM yang mendukung operasi bisnis perusahaan.',
            'Menginstal, mengonfigurasi, mengkloning, dan memelihara server Oracle Siebel CRM di seluruh lingkungan pengembangan, pengujian, dan produksi.',
            'Melakukan pemeliharaan database, troubleshooting SQL, validasi data, analisis performa, serta aktivitas backup dan pemulihan.'
          ],
          en: [
            'Administered Oracle Database and Oracle Siebel CRM environments supporting enterprise business operations.',
            'Installed, configured, cloned, and maintained Oracle Siebel CRM servers across development, testing, and production environments.',
            'Performed database maintenance, SQL troubleshooting, data validation, performance analysis, backup, and recovery activities.'
          ]
        },
        achievements: {
          id: [
            'Mempertahankan stabilitas lingkungan aplikasi dan database perusahaan dengan gangguan layanan yang minimal.',
            'Mempercepat penerapan lingkungan (deployment) melalui prosedur instalasi dan kloning server yang berulang (repeatable).',
            'Meningkatkan efisiensi pemecahan masalah (troubleshooting) dengan menggabungkan analisis database dan pemantauan aplikasi.'
          ],
          en: [
            'Maintained stable enterprise application and database environments with minimal service interruptions.',
            'Accelerated environment deployment through repeatable server installation and cloning procedures.',
            'Improved troubleshooting efficiency by combining database analysis, application monitoring, and system log analysis.'
          ]
        }
      },
      {
        title: {
          id: 'Otomatisasi Proses & Scripting',
          en: 'Process Automation & Scripting'
        },
        tasks: {
          id: [
            'Mengembangkan skrip Python dan Shell/Bash untuk mengotomatisasi administrasi sistem, pemrosesan data, pelaporan, dan aktivitas operasional.',
            'Mengidentifikasi proses manual yang berulang dan mengembangkan solusi otomatisasi untuk meningkatkan efisiensi operasional.',
            'Mengotomatisasi aktivitas pemrosesan data untuk mengurangi intervensi manual dan meningkatkan konsistensi proses.'
          ],
          en: [
            'Developed Python and Shell/Bash scripts to automate system administration, data processing, monitoring, reporting, and operational activities.',
            'Identified repetitive manual processes and developed automation solutions to improve operational efficiency.',
            'Automated data-processing activities to reduce manual intervention and improve process consistency.'
          ]
        },
        achievements: {
          id: [
            'Mengurangi aktivitas manual yang berulang melalui otomatisasi proses.',
            'Meminimalkan *human error* dengan mengganti tugas operasional manual dengan skrip standar dan proses terotomatisasi.',
            'Meningkatkan standardisasi proses melalui skrip otomatisasi dan alat operasional yang dapat digunakan kembali.'
          ],
          en: [
            'Reduced repetitive manual activities through process automation.',
            'Minimized human error by replacing manual operational tasks with standardized scripts and automated processes.',
            'Increased process standardization through reusable automation scripts and operational tools.'
          ]
        }
      }
    ]
  },
  {
    id: 'putra-sejati',
    role: 'Engineer',
    company: 'PT. PUTRA SEJATI INDOMAKMUR',
    companyUrl: 'https://psi-oilservices.com/',
    companyHighlight: {
      id: 'Perusahaan penyedia jasa layanan eksplorasi dan produksi minyak bumi terkemuka.',
      en: 'A leading provider of oil exploration and production services.'
    },
    period: {
      id: 'Juli 2016 – Juli 2017',
      en: 'July 2016 – July 2017'
    },
    jobDesks: [
      {
        title: {
          id: 'Otomatisasi & Analisis Data Python',
          en: 'Python Data Automation & Analysis'
        },
        tasks: {
          id: [
            'Mengembangkan skrip Python untuk mengotomatisasi ekstraksi, pembersihan, transformasi, analisis, dan pelaporan data Data Acquisition Unit (DAU).',
            'Memvalidasi dan menganalisis dataset DAU untuk memastikan keakuratan, integritas, dan konsistensi data.',
            'Mengembangkan alat pelaporan dan visualisasi berbasis Python yang dapat digunakan kembali untuk tim teknik dan operasional.'
          ],
          en: [
            'Developed Python scripts to automate data extraction, cleansing, transformation, analysis, and reporting of Data Acquisition Unit (DAU) data.',
            'Validated and analyzed DAU datasets to ensure data accuracy, integrity, and consistency.',
            'Developed reusable Python-based reporting and visualization tools for engineering and operational teams.'
          ]
        },
        achievements: {
          id: [
            'Mengotomatisasi aktivitas pemrosesan data yang berulang, mengurangi upaya manual dan meningkatkan efisiensi pelaporan.',
            'Meningkatkan kualitas data dengan mengidentifikasi dan menyelesaikan inkonsistensi data sebelum dilaporkan.',
            'Menstandardisasi aktivitas pelaporan melalui alat pelaporan dan visualisasi berbasis Python.'
          ],
          en: [
            'Automated repetitive data-processing activities, reducing manual effort and improving reporting efficiency.',
            'Improved data quality by identifying and resolving data inconsistencies before reporting.',
            'Standardized reporting activities through reusable Python-based reporting and visualization tools.'
          ]
        }
      }
    ]
  }
];
