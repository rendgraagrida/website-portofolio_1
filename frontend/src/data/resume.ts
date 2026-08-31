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
    id: 'Software Engineer berpengalaman dengan latar belakang kuat di industri Teknologi Informasi dan Layanan. Ahli dalam DevOps, Otomatisasi Proses, Manajemen Data, Analitik Data, Oracle Database, Oracle Application Server, dan Customer Relationship Management (CRM). Memiliki rekam jejak yang terbukti dalam merancang solusi otomatisasi, meningkatkan efisiensi operasional, dan keandalan sistem.',
    en: 'Experienced Software Engineer with a strong background in the Information Technology and Services industry. Skilled in DevOps, Process Automation, Data Management, Data Analytics, Oracle Database, Oracle Application Server, and Customer Relationship Management (CRM). Proven ability to support and deliver technology solutions that align with business requirements and improve overall performance.'
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
            'Memantau data sistem dan menyelidiki anomali data serta pembacaan yang tidak normal.',
            'Mengembangkan alat pelaporan dan visualisasi berbasis Python yang dapat digunakan kembali untuk tim teknik dan operasional.'
          ],
          en: [
            'Developed Python scripts to automate data extraction, cleansing, transformation, analysis, and reporting of Data Acquisition Unit (DAU) data.',
            'Validated and analyzed DAU datasets to ensure data accuracy, integrity, and consistency.',
            'Monitored system-generated data and investigated abnormal readings and data anomalies.',
            'Developed reusable Python-based reporting and visualization tools for engineering and operational teams.'
          ]
        },
        achievements: {
          id: [
            'Mengotomatisasi aktivitas pemrosesan data yang berulang, mengurangi upaya manual dan meningkatkan efisiensi pelaporan.',
            'Meningkatkan kualitas data dengan mengidentifikasi dan menyelesaikan inkonsistensi data sebelum dilaporkan.',
            'Memungkinkan identifikasi dan investigasi data abnormal yang lebih cepat melalui analisis sistematis.',
            'Menstandardisasi aktivitas pelaporan melalui alat pelaporan dan visualisasi berbasis Python.',
            'Meningkatkan ketersediaan informasi analitik yang tepat waktu dan konsisten untuk pengambilan keputusan teknik dan operasional.'
          ],
          en: [
            'Automated repetitive data-processing activities, reducing manual effort and improving reporting efficiency.',
            'Improved data quality by identifying and resolving data inconsistencies before reporting.',
            'Enabled faster identification and investigation of abnormal data through systematic analysis.',
            'Standardized reporting activities through reusable Python-based reporting and visualization tools.',
            'Improved availability of timely and consistent analytical information for engineering and operational decision-making.'
          ]
        }
      },
      {
        title: {
          id: 'Akuisisi Data & Peningkatan Proses',
          en: 'Data Acquisition & Process Improvement'
        },
        tasks: {
          id: [
            'Berkolaborasi dengan tim teknik dan operasi untuk menganalisis data DAU dan meningkatkan alur kerja akuisisi data.',
            'Menyelidiki anomali data dan melakukan analisis akar penyebab untuk mengidentifikasi potensi masalah dalam proses akuisisi data.',
            'Mendukung perbaikan berkelanjutan dari aktivitas pemrosesan data dan pelaporan.'
          ],
          en: [
            'Collaborated with engineering and operations teams to analyze DAU data and improve data acquisition workflows.',
            'Investigated data anomalies and performed root cause analysis to identify potential issues in the data acquisition process.',
            'Supported continuous improvement of data-processing and reporting activities.'
          ]
        },
        achievements: {
          id: [
            'Meningkatkan efisiensi operasional dengan merampingkan analisis data dan alur kerja pelaporan.',
            'Mendukung output analitis yang lebih andal melalui validasi data dan pemeriksaan kualitas yang ditingkatkan.',
            'Mengurangi upaya investigasi dengan menerapkan analisis terstruktur pada kondisi data yang abnormal.'
          ],
          en: [
            'Improved operational efficiency by streamlining data analysis and reporting workflows.',
            'Supported more reliable analytical outputs through improved data validation and quality checks.',
            'Reduced investigation effort by applying structured analysis to abnormal data conditions.'
          ]
        }
      },
      {
        title: {
          id: 'Instalasi Sensor Industri & Otomatisasi',
          en: 'Industrial Sensor Installation & Automation'
        },
        tasks: {
          id: [
            'Memasang dan mengonfigurasi sensor industri Autonics untuk sistem produksi dan otomatisasi sesuai dengan spesifikasi teknis.',
            'Melakukan kalibrasi, pengujian, dan commissioning sensor sebelum diterapkan di produksi.',
            'Mendiagnosis dan menyelesaikan masalah instalasi, kabel, dan komunikasi sensor.',
            'Membaca dan menginterpretasikan diagram kabel listrik untuk memastikan instalasi yang akurat.',
            'Berkolaborasi dengan tim teknik dan pemeliharaan selama pemasangan sensor dan integrasi sistem.'
          ],
          en: [
            'Installed and configured Autonics industrial sensors for production and automation systems according to technical specifications.',
            'Performed sensor calibration, testing, and commissioning before production deployment.',
            'Diagnosed and resolved sensor installation, wiring, and communication issues.',
            'Read and interpreted electrical wiring diagrams to ensure accurate installation.',
            'Collaborated with engineering and maintenance teams during sensor deployment and system integration.'
          ]
        },
        achievements: {
          id: [
            'Berhasil menyelesaikan pemasangan dan commissioning sensor dengan gangguan minimal pada aktivitas operasional.',
            'Meningkatkan akurasi pengukuran melalui kalibrasi dan pengujian sensor yang tepat.',
            'Mengurangi waktu troubleshooting melalui identifikasi sistematis dan koreksi masalah instalasi dan komunikasi.',
            'Mendukung keberhasilan pengiriman proyek otomatisasi dengan memastikan sensor dipasang, diuji, dan beroperasi dengan benar.'
          ],
          en: [
            'Successfully completed sensor installation and commissioning with minimal disruption to operational activities.',
            'Improved measurement accuracy through proper sensor calibration and testing.',
            'Reduced troubleshooting time through systematic identification and correction of installation and communication issues.',
            'Supported successful automation project delivery by ensuring sensors were properly installed, tested, and operational.'
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
            'Mendukung lingkungan Siebel CRM untuk operasi bisnis Telkom Enterprise, Wholesale, dan Retail.',
            'Melakukan pemeliharaan database, troubleshooting SQL, validasi data, analisis performa, serta aktivitas backup dan pemulihan.',
            'Memantau aplikasi enterprise, database Oracle, dan server Linux untuk mengidentifikasi masalah operasional.'
          ],
          en: [
            'Administered Oracle Database and Oracle Siebel CRM environments supporting enterprise business operations.',
            'Installed, configured, cloned, and maintained Oracle Siebel CRM servers across development, testing, and production environments.',
            'Supported Siebel CRM environments for Telkom Enterprise, Wholesale, and Retail business operations.',
            'Performed database maintenance, SQL troubleshooting, data validation, performance analysis, backup, and recovery activities.',
            'Monitored enterprise applications, Oracle databases, and Linux servers to identify operational issues.'
          ]
        },
        achievements: {
          id: [
            'Mempertahankan stabilitas lingkungan aplikasi dan database perusahaan dengan gangguan layanan yang minimal.',
            'Meningkatkan konsistensi antara lingkungan pengembangan, pengujian, dan produksi melalui aktivitas instalasi dan konfigurasi yang terstandarisasi.',
            'Mempercepat penerapan lingkungan (deployment) melalui prosedur instalasi dan kloning server yang berulang (repeatable).',
            'Meningkatkan efisiensi pemecahan masalah (troubleshooting) dengan menggabungkan analisis database, pemantauan aplikasi, dan analisis log sistem.'
          ],
          en: [
            'Maintained stable enterprise application and database environments with minimal service interruptions.',
            'Improved consistency between development, testing, and production environments through standardized installation and configuration activities.',
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
            'Mengembangkan skrip Python dan Shell/Bash untuk mengotomatisasi administrasi sistem, pemrosesan data, pemantauan, pelaporan, dan aktivitas operasional.',
            'Mengidentifikasi proses manual yang berulang dan mengembangkan solusi otomatisasi untuk meningkatkan efisiensi operasional.',
            'Membuat skrip yang dapat digunakan kembali untuk pemeriksaan sistem, validasi data, pelaporan, dan dukungan operasional.',
            'Mengotomatisasi aktivitas pemrosesan data untuk mengurangi intervensi manual dan meningkatkan konsistensi proses.'
          ],
          en: [
            'Developed Python and Shell/Bash scripts to automate system administration, data processing, monitoring, reporting, and operational activities.',
            'Identified repetitive manual processes and developed automation solutions to improve operational efficiency.',
            'Created reusable scripts for system checks, data validation, reporting, and operational support.',
            'Automated data-processing activities to reduce manual intervention and improve process consistency.'
          ]
        },
        achievements: {
          id: [
            'Mengurangi aktivitas manual yang berulang melalui otomatisasi proses.',
            'Meminimalkan *human error* dengan mengganti tugas operasional manual dengan skrip standar dan proses terotomatisasi.',
            'Meningkatkan efisiensi operasional dengan memungkinkan tim teknis untuk melakukan aktivitas berulang secara lebih konsisten.',
            'Meningkatkan standardisasi proses melalui skrip otomatisasi dan alat operasional yang dapat digunakan kembali.'
          ],
          en: [
            'Reduced repetitive manual activities through process automation.',
            'Minimized human error by replacing manual operational tasks with standardized scripts and automated processes.',
            'Improved operational efficiency by enabling technical teams to perform recurring activities more consistently.',
            'Increased process standardization through reusable automation scripts and operational tools.'
          ]
        }
      },
      {
        title: {
          id: 'Manajemen Data & Migrasi Data',
          en: 'Data Management & Data Migration'
        },
        tasks: {
          id: [
            'Mengembangkan dan mengeksekusi query SQL untuk validasi data, pelaporan, troubleshooting, rekonsiliasi, dan pemeliharaan database.',
            'Melakukan migrasi data dan validasi antara data pelanggan Telkom Tcares dan platform Siebel Wholesale.',
            'Melakukan migrasi data dan validasi antara data pelanggan Telkom IndiHome dan platform Telkomsel.',
            'Melakukan migrasi data dan validasi antara data pelanggan Telkom Wholesale dan platform Infrastruktur Telkom.',
            'Melakukan validasi dan rekonsiliasi data untuk memverifikasi keakuratan, integritas, kelengkapan, dan konsistensi data.'
          ],
          en: [
            'Developed and executed SQL queries for data validation, reporting, troubleshooting, reconciliation, and database maintenance.',
            'Performed data migration and validation between Telkom Tcares customer data and Siebel Wholesale platforms.',
            'Performed data migration and validation between Telkom IndiHome customer data and Telkomsel platforms.',
            'Performed data migration and validation between Telkom Wholesale customer data and Telkom Infrastructure platforms.',
            'Performed data validation and reconciliation to verify data accuracy, integrity, completeness, and consistency.'
          ]
        },
        achievements: {
          id: [
            'Mendukung keberhasilan aktivitas migrasi data skala besar dengan transfer data yang akurat dan andal.',
            'Meningkatkan kualitas data dengan mengidentifikasi inkonsistensi selama aktivitas validasi dan rekonsiliasi.',
            'Mengurangi risiko terkait migrasi melalui validasi data sistematis sebelum dan sesudah migrasi.',
            'Meningkatkan keandalan data pelanggan yang dimigrasikan di seluruh platform enterprise.'
          ],
          en: [
            'Supported successful large-scale data migration activities with accurate and reliable data transfer.',
            'Improved data quality by identifying inconsistencies during validation and reconciliation activities.',
            'Reduced migration-related risks through systematic data validation before and after migration.',
            'Improved reliability of migrated customer data across enterprise platforms.'
          ]
        }
      },
      {
        title: {
          id: 'Pemantauan Sistem & Troubleshooting',
          en: 'System Monitoring & Troubleshooting'
        },
        tasks: {
          id: [
            'Memantau server Linux, database Oracle, dan aplikasi enterprise menggunakan alat pemantauan sistem dan analisis log.',
            'Menggunakan Splunk dan AppDynamics untuk memantau performa aplikasi dan infrastruktur.',
            'Menyelidiki insiden aplikasi, database, server, dan jaringan menggunakan troubleshooting terstruktur dan analisis akar penyebab.',
            'Menganalisis log sistem untuk mengidentifikasi perilaku abnormal, error, masalah performa, dan potensi gangguan layanan.',
            'Memberikan dukungan teknis Level 2/Level 3 untuk aplikasi dan infrastruktur enterprise.'
          ],
          en: [
            'Monitored Linux servers, Oracle databases, and enterprise applications using system monitoring and log-analysis tools.',
            'Utilized Splunk and AppDynamics to monitor application and infrastructure performance.',
            'Investigated application, database, server, and network incidents using structured troubleshooting and root cause analysis.',
            'Analyzed system logs to identify abnormal behavior, errors, performance issues, and potential service disruptions.',
            'Provided Level 2/Level 3 technical support for enterprise applications and infrastructure.'
          ]
        },
        achievements: {
          id: [
            'Memungkinkan identifikasi dini terhadap potensi masalah sistem sebelum secara signifikan mempengaruhi operasi bisnis.',
            'Mengurangi waktu pemecahan masalah melalui analisis log terstruktur dan investigasi akar penyebab.',
            'Meningkatkan ketersediaan sistem dengan menyelesaikan insiden terkait aplikasi, database, infrastruktur, dan jaringan.',
            'Mendukung kontinuitas operasional dengan menyelesaikan masalah teknis yang kompleks dalam tingkat layanan (SLA) yang disyaratkan.'
          ],
          en: [
            'Enabled earlier identification of potential system issues before they significantly affected business operations.',
            'Reduced troubleshooting time through structured log analysis and root cause investigation.',
            'Improved system availability by resolving application, database, infrastructure, and network-related incidents.',
            'Supported operational continuity by resolving complex technical issues within required service levels.'
          ]
        }
      },
      {
        title: {
          id: 'Backup, Pemulihan & Disaster Recovery',
          en: 'Backup, Recovery & Disaster Recovery'
        },
        tasks: {
          id: [
            'Menerapkan dan memelihara prosedur backup database dan sistem.',
            'Melakukan aktivitas pemulihan untuk sistem kritis dan data bisnis.',
            'Mendukung prosedur pemulihan bencana (disaster recovery) untuk meningkatkan ketahanan sistem.',
            'Memvalidasi proses backup dan recovery untuk memastikan data penting dapat dipulihkan bila diperlukan.'
          ],
          en: [
            'Implemented and maintained database and system backup procedures.',
            'Performed recovery activities for critical systems and business data.',
            'Supported disaster recovery procedures to improve system resilience.',
            'Validated backup and recovery processes to ensure critical data could be restored when required.'
          ]
        },
        achievements: {
          id: [
            'Meningkatkan perlindungan data bisnis penting melalui prosedur pencadangan dan pemulihan yang terstruktur.',
            'Meningkatkan ketahanan sistem dan mendukung kontinuitas bisnis selama insiden yang tidak terduga.',
            'Mengurangi risiko operasional yang terkait dengan kehilangan data dan kegagalan sistem.'
          ],
          en: [
            'Improved protection of critical business data through structured backup and recovery procedures.',
            'Increased system resilience and supported business continuity during unexpected incidents.',
            'Reduced operational risk associated with data loss and system failures.'
          ]
        }
      },
      {
        title: {
          id: 'Keamanan Sistem & Manajemen Akses',
          en: 'System Security & Access Management'
        },
        tasks: {
          id: [
            'Mengelola akses pengguna ke sistem enterprise dan aplikasi bisnis.',
            'Mendukung pengerasan (hardening) sistem operasi dan implementasi kontrol keamanan.',
            'Mengimplementasikan kebijakan keamanan dan prosedur manajemen akses.',
            'Meninjau akses dan konfigurasi sistem untuk mendukung operasi enterprise yang aman.'
          ],
          en: [
            'Managed user access to enterprise systems and business applications.',
            'Supported operating system hardening and implementation of security controls.',
            'Implemented security policies and access-management procedures.',
            'Reviewed system access and configuration to support secure enterprise operations.'
          ]
        },
        achievements: {
          id: [
            'Memperkuat keamanan sistem melalui akses pengguna yang terkontrol dan konfigurasi keamanan yang ketat.',
            'Mengurangi risiko operasional terkait akses sistem yang tidak pantas dan konfigurasi yang tidak aman.',
            'Meningkatkan konsistensi praktik manajemen akses di seluruh lingkungan perusahaan yang didukung.'
          ],
          en: [
            'Strengthened system security through controlled user access and security configuration.',
            'Reduced operational risks associated with inappropriate system access and insecure configurations.',
            'Improved consistency of access-management practices across supported enterprise environments.'
          ]
        }
      },
      {
        title: {
          id: 'Peningkatan Infrastruktur & Performa',
          en: 'Infrastructure & Performance Improvement'
        },
        tasks: {
          id: [
            'Menganalisis infrastruktur TI yang ada dan mengidentifikasi peluang untuk perbaikan.',
            'Mendukung penilaian (assessment) perangkat keras, perangkat lunak, server, dan arsitektur.',
            'Berkolaborasi dengan tim engineering untuk menganalisis kapasitas dan performa sistem.',
            'Merekomendasikan peningkatan infrastruktur berdasarkan persyaratan operasional dan bisnis.'
          ],
          en: [
            'Analyzed existing IT infrastructure and identified opportunities for improvement.',
            'Supported hardware, software, server, and architecture assessments.',
            'Collaborated with engineering teams to analyze system capacity and performance.',
            'Recommended infrastructure improvements based on operational and business requirements.'
          ]
        },
        achievements: {
          id: [
            'Mendukung skalabilitas infrastruktur jangka panjang dan perencanaan kapasitas.',
            'Meningkatkan efisiensi infrastruktur melalui identifikasi kebutuhan performa dan kapasitas.',
            'Membantu memastikan lingkungan teknologi dapat mendukung peningkatan beban kerja bisnis.'
          ],
          en: [
            'Supported long-term infrastructure scalability and capacity planning.',
            'Improved infrastructure efficiency through identification of performance and capacity requirements.',
            'Helped ensure technology environments could support increasing business workloads.'
          ]
        }
      },
      {
        title: {
          id: 'Pengembangan Perangkat Lunak & Aplikasi',
          en: 'Software Development & Application Enhancement'
        },
        tasks: {
          id: [
            'Mengembangkan dan menyesuaikan aplikasi perangkat lunak berdasarkan kebutuhan bisnis.',
            'Mendukung aktivitas peningkatan aplikasi, pemecahan masalah, dan integrasi sistem.',
            'Berkolaborasi dengan pengembang dan tim teknik untuk menganalisis masalah aplikasi dan mengimplementasikan perbaikan.',
            'Mengintegrasikan solusi manajemen data dengan aplikasi perusahaan.'
          ],
          en: [
            'Developed and customized software applications based on business requirements.',
            'Supported application enhancement, troubleshooting, and system integration activities.',
            'Collaborated with developers and engineering teams to analyze application issues and implement improvements.',
            'Integrated data management solutions with enterprise applications.'
          ]
        },
        achievements: {
          id: [
            'Meningkatkan fungsionalitas aplikasi dan pengalaman pengguna akhir.',
            'Menghadirkan peningkatan aplikasi yang selaras dengan kebutuhan bisnis.',
            'Meningkatkan aksesibilitas dan pemrosesan data melalui solusi integrasi dan manajemen data.',
            'Mendukung operasi aplikasi perusahaan yang lebih andal melalui aktivitas pemecahan masalah dan peningkatan terstruktur.'
          ],
          en: [
            'Improved application functionality and end-user experience.',
            'Delivered application enhancements aligned with business requirements.',
            'Improved data accessibility and processing through integration and data-management solutions.',
            'Supported more reliable enterprise application operations through structured troubleshooting and enhancement activities.'
          ]
        }
      },
      {
        title: {
          id: 'Dukungan Teknis & Dokumentasi',
          en: 'Technical Support & Documentation'
        },
        tasks: {
          id: [
            'Menyiapkan dokumentasi teknis, prosedur deployment, panduan operasional, dan dokumentasi pemecahan masalah.',
            'Memberikan dukungan teknis untuk aplikasi perusahaan, database, server, dan infrastruktur.',
            'Berkolaborasi dengan administrator database, pengembang, insinyur jaringan, tim infrastruktur, dan pemangku kepentingan bisnis.',
            'Mendukung aktivitas transfer pengetahuan (knowledge transfer) dan serah terima operasional (handover).'
          ],
          en: [
            'Prepared technical documentation, deployment procedures, operational guides, and troubleshooting documentation.',
            'Provided technical support for enterprise applications, databases, servers, and infrastructure.',
            'Collaborated with database administrators, developers, network engineers, infrastructure teams, and business stakeholders.',
            'Supported knowledge transfer and operational handover activities.'
          ]
        },
        achievements: {
          id: [
            'Meningkatkan berbagi pengetahuan dan konsistensi operasional melalui dokumentasi teknis yang terstandardisasi.',
            'Mengurangi ketergantungan pada individu sumber daya teknis dengan mendokumentasikan prosedur operasional dan pemecahan masalah.',
            'Meningkatkan kolaborasi antara tim teknis dan pemangku kepentingan bisnis.',
            'Mendukung proses orientasi (onboarding) dan transfer pengetahuan yang lebih cepat untuk tim dukungan.'
          ],
          en: [
            'Improved knowledge sharing and operational consistency through standardized technical documentation.',
            'Reduced dependency on individual technical resources by documenting operational and troubleshooting procedures.',
            'Improved collaboration between technical teams and business stakeholders.',
            'Supported faster onboarding and knowledge transfer for support teams.'
          ]
        }
      }
    ]
  },
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
      },
      {
        title: {
          id: 'Desain Solusi & Tinjauan Teknis',
          en: 'Solution Design & Technical Review'
        },
        tasks: {
          id: [
            'Meninjau usulan solusi teknis terhadap kebutuhan bisnis, infrastruktur yang ada, lingkungan aplikasi, dan kebutuhan operasional.',
            'Berpartisipasi dalam diskusi teknis yang terkait dengan aplikasi, infrastruktur, database, dan solusi IT enterprise.',
            'Mengevaluasi pendekatan teknis dan mengidentifikasi potensi kendala implementasi, ketergantungan, dan pertimbangan operasional.',
            'Memberikan rekomendasi teknis untuk mendukung pemilihan solusi dan perencanaan implementasi.'
          ],
          en: [
            'Reviewed proposed technical solutions against business requirements, existing infrastructure, application environments, and operational needs.',
            'Participated in technical discussions related to application, infrastructure, database, and enterprise IT solutions.',
            'Evaluated technical approaches and identified potential implementation constraints, dependencies, and operational considerations.',
            'Provided technical recommendations to support solution selection and implementation planning.'
          ]
        },
        achievements: {
          id: [
            'Mendukung pemilihan solusi teknis yang selaras dengan kebutuhan bisnis dan operasional.',
            'Mengurangi potensi masalah implementasi dengan mengidentifikasi ketergantungan teknis dan kendala selama tahap perencanaan.',
            'Meningkatkan kesiapan solusi melalui tinjauan dan penilaian teknis yang terstruktur.'
          ],
          en: [
            'Supported the selection of technical solutions that were aligned with business and operational requirements.',
            'Reduced potential implementation issues by identifying technical dependencies and constraints during the planning stage.',
            'Improved solution readiness through structured technical review and assessment.'
          ]
        }
      },
      {
        title: {
          id: 'Perencanaan Sumber Daya & Kapasitas IT',
          en: 'IT Resource & Capacity Planning'
        },
        tasks: {
          id: [
            'Menyiapkan rencana sumber daya TI yang mencakup sumber daya teknis, infrastruktur, aplikasi, dan komponen pendukung yang diperlukan.',
            'Mengidentifikasi persyaratan sumber daya berdasarkan ruang lingkup proyek, arsitektur teknis, aktivitas implementasi, dan kebutuhan operasional.',
            'Mengoordinasikan persyaratan sumber daya dengan tim teknis terkait dan pemangku kepentingan.',
            'Mendukung perencanaan alokasi sumber daya untuk proyek dan aktivitas operasional.'
          ],
          en: [
            'Prepared IT resource plans covering required technical resources, infrastructure, applications, and supporting components.',
            'Identified resource requirements based on project scope, technical architecture, implementation activities, and operational needs.',
            'Coordinated resource requirements with relevant technical teams and stakeholders.',
            'Supported planning of resource allocation for project and operational activities.'
          ]
        },
        achievements: {
          id: [
            'Meningkatkan visibilitas kebutuhan sumber daya teknis selama perencanaan proyek.',
            'Mendukung alokasi sumber daya yang lebih efektif berdasarkan kebutuhan proyek dan ketergantungan teknis.',
            'Mengurangi risiko kesenjangan sumber daya selama implementasi dengan mengidentifikasi kebutuhan lebih awal dalam proses perencanaan.'
          ],
          en: [
            'Improved visibility of technical resource requirements during project planning.',
            'Supported more effective resource allocation based on project requirements and technical dependencies.',
            'Reduced the risk of resource gaps during implementation by identifying requirements earlier in the planning process.'
          ]
        }
      },
      {
        title: {
          id: 'Dokumentasi Teknis & Tata Kelola',
          en: 'Technical Documentation & Governance'
        },
        tasks: {
          id: [
            'Menyiapkan dan memelihara dokumentasi teknis, rencana implementasi, spesifikasi teknis, dan panduan operasional.',
            'Menetapkan dokumentasi terstruktur untuk persyaratan teknis, aktivitas implementasi, dan konfigurasi sistem.',
            'Meninjau dokumentasi teknis yang disiapkan oleh anggota tim untuk memastikan konsistensi dan kelengkapan.'
          ],
          en: [
            'Prepared and maintained technical documentation, implementation plans, technical specifications, and operational guidelines.',
            'Established structured documentation for technical requirements, implementation activities, and system configurations.',
            'Reviewed technical documentation prepared by team members to ensure consistency and completeness.'
          ]
        },
        achievements: {
          id: [
            'Meningkatkan konsistensi dan kualitas dokumentasi teknis.',
            'Memperkuat transfer pengetahuan antara tim teknis dan tim dukungan operasional.',
            'Meningkatkan kemudahan pemeliharaan pengetahuan proyek dan operasional melalui dokumentasi terstruktur.'
          ],
          en: [
            'Improved consistency and quality of technical documentation.',
            'Strengthened knowledge transfer between technical teams and operational support teams.',
            'Improved maintainability of project and operational knowledge through structured documentation.'
          ]
        }
      },
      {
        title: {
          id: 'Manajemen Risiko, Isu & Masalah',
          en: 'Risk, Issue & Problem Management'
        },
        tasks: {
          id: [
            'Mengidentifikasi risiko teknis, ketergantungan, kendala, dan potensi masalah selama perencanaan dan implementasi proyek.',
            'Mengoordinasikan investigasi masalah teknis dengan tim rekayasa dan dukungan yang relevan.',
            'Mendukung analisis akar penyebab dan pengembangan solusi teknis yang sesuai.',
            'Menindaklanjuti masalah teknis untuk memastikan tindakan perbaikan diterapkan dengan benar.'
          ],
          en: [
            'Identified technical risks, dependencies, constraints, and potential issues during project planning and implementation.',
            'Coordinated investigation of technical issues with relevant engineering and support teams.',
            'Supported root cause analysis and development of appropriate technical solutions.',
            'Followed up on technical issues to ensure corrective actions were properly implemented.'
          ]
        },
        achievements: {
          id: [
            'Memungkinkan identifikasi dini terhadap risiko teknis dan ketergantungan selama kegiatan proyek.',
            'Meningkatkan resolusi masalah melalui analisis teknis terstruktur dan koordinasi lintas fungsional.',
            'Mengurangi potensi dampak masalah teknis pada proyek dan kegiatan operasional.'
          ],
          en: [
            'Enabled earlier identification of technical risks and dependencies during project activities.',
            'Improved issue resolution through structured technical analysis and cross-functional coordination.',
            'Reduced the potential impact of technical issues on project and operational activities.'
          ]
        }
      },
      {
        title: {
          id: 'Penyampaian Proyek & Dukungan Implementasi',
          en: 'Project Delivery & Implementation Support'
        },
        tasks: {
          id: [
            'Mendukung perencanaan dan eksekusi teknis untuk implementasi IT dan proyek peningkatan.',
            'Mengoordinasikan kegiatan teknis di seluruh tahapan persiapan, implementasi, pengujian, penerapan, dan serah terima.',
            'Bekerja sama dengan tim rekayasa, infrastruktur, database, aplikasi, dan tim teknis lainnya untuk memastikan kesiapan implementasi.',
            'Memantau aktivitas teknis dan menindaklanjuti persyaratan implementasi yang belum terselesaikan.'
          ],
          en: [
            'Supported technical planning and execution of IT implementation and enhancement projects.',
            'Coordinated technical activities throughout preparation, implementation, testing, deployment, and handover.',
            'Worked with engineering, infrastructure, database, application, and other technical teams to ensure implementation readiness.',
            'Monitored technical activities and followed up on outstanding implementation requirements.'
          ]
        },
        achievements: {
          id: [
            'Mendukung pelaksanaan kegiatan implementasi teknis yang lebih lancar melalui perencanaan dan koordinasi terstruktur.',
            'Meningkatkan kesiapan implementasi dengan memastikan kebutuhan teknis, sumber daya, dependensi, dan dokumentasi telah diidentifikasi.',
            'Mendukung transisi yang sukses dari kegiatan teknis yang telah selesai ke lingkungan operasional.'
          ],
          en: [
            'Supported smoother execution of technical implementation activities through structured planning and coordination.',
            'Improved implementation readiness by ensuring technical requirements, resources, dependencies, and documentation were identified.',
            'Supported successful transition of completed technical activities into operational environments.'
          ]
        }
      },
      {
        title: {
          id: 'Peningkatan Berkelanjutan & Otomatisasi',
          en: 'Continuous Improvement & Automation'
        },
        tasks: {
          id: [
            'Mengidentifikasi peluang untuk meningkatkan proses IT, alur kerja teknis, dan kegiatan operasional.',
            'Mengevaluasi proses berulang yang dapat distandarisasi atau diotomatisasi.',
            'Bekerja sama dengan tim teknis untuk mengidentifikasi otomatisasi dan peluang perbaikan proses yang sesuai.',
            'Mendukung implementasi peningkatan yang dirancang untuk meningkatkan efisiensi operasional dan mengurangi upaya manual.'
          ],
          en: [
            'Identified opportunities to improve existing IT processes, technical workflows, and operational activities.',
            'Evaluated repetitive processes that could be standardized or automated.',
            'Worked with technical teams to identify appropriate automation and process-improvement opportunities.',
            'Supported implementation of improvements designed to increase operational efficiency and reduce manual effort.'
          ]
        },
        achievements: {
          id: [
            'Meningkatkan efisiensi operasional melalui identifikasi dan implementasi peluang peningkatan proses.',
            'Mengurangi ketergantungan pada aktivitas manual yang berulang dengan mempromosikan standarisasi dan otomatisasi.',
            'Mendukung peningkatan berkelanjutan dari proses operasional IT dan alur kerja teknis.'
          ],
          en: [
            'Improved operational efficiency through identification and implementation of process-improvement opportunities.',
            'Reduced dependency on repetitive manual activities by promoting standardization and automation.',
            'Supported continuous improvement of IT operational processes and technical workflows.'
          ]
        }
      }
    ]
  }
];
