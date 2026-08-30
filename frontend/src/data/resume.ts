export interface TaskAchievement {
  tasks: string[];
  achievements: string[];
}

export interface JobDesk {
  title: string;
  details: TaskAchievement;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  companyHighlight?: string;
  period: string;
  jobDesks: JobDesk[];
}

export const experiences: Experience[] = [
  {
    id: 'telkomsigma-tech-lead',
    role: 'Tech Lead',
    company: 'PT. SIGMA CIPTA CARAKA (TELKOMSIGMA)',
    companyUrl: 'https://www.telkomsigma.co.id/',
    companyHighlight: 'Perusahaan IT terdepan di Indonesia penyedia solusi infrastruktur, cloud, dan integrasi sistem berskala enterprise.',
    period: 'August 2025 – December 2026',
    jobDesks: [
      {
        title: 'Technical Planning & Requirement Management',
        details: {
          tasks: [
            'Analyzed business and technical requirements to define appropriate technology solutions and implementation approaches.',
            'Prepared technical requirements, technical documentation, and IT resource plans to support project and operational activities.',
            'Translated business requirements into technical requirements, implementation activities, dependencies, and resource needs.',
            'Reviewed technical requirements and implementation plans to ensure alignment with business objectives and existing IT environments.'
          ],
          achievements: [
            'Improved the structure and clarity of technical requirements, making them easier for technical teams to execute.',
            'Supported better alignment between business requirements and technical implementation.',
            'Improved project preparation through more structured technical planning, resource identification, and documentation.'
          ]
        }
      },
      {
        title: 'Technical Leadership & Team Coordination',
        details: {
          tasks: [
            'Coordinated technical activities across relevant IT teams to support project implementation and operational activities.',
            'Provided technical direction and guidance to team members during implementation and problem-solving activities.',
            'Facilitated communication between technical teams, project stakeholders, and business users.',
            'Identified technical dependencies, implementation requirements, and potential issues that could affect project delivery.'
          ],
          achievements: [
            'Improved coordination between technical teams and stakeholders during project and operational activities.',
            'Supported more structured execution of technical activities by clarifying responsibilities, requirements, and dependencies.',
            'Improved collaboration across teams through effective communication and technical coordination.'
          ]
        }
      },
      {
        title: 'Solution Design & Technical Review',
        details: {
          tasks: [
            'Reviewed proposed technical solutions against business requirements, existing infrastructure, application environments, and operational needs.',
            'Participated in technical discussions related to application, infrastructure, database, and enterprise IT solutions.',
            'Evaluated technical approaches and identified potential implementation constraints, dependencies, and operational considerations.',
            'Provided technical recommendations to support solution selection and implementation planning.'
          ],
          achievements: [
            'Supported the selection of technical solutions that were aligned with business and operational requirements.',
            'Reduced potential implementation issues by identifying technical dependencies and constraints during the planning stage.',
            'Improved solution readiness through structured technical review and assessment.'
          ]
        }
      },
      {
        title: 'IT Resource & Capacity Planning',
        details: {
          tasks: [
            'Prepared IT resource plans covering required technical resources, infrastructure, applications, and supporting components.',
            'Identified resource requirements based on project scope, technical architecture, implementation activities, and operational needs.',
            'Coordinated resource requirements with relevant technical teams and stakeholders.',
            'Supported planning of resource allocation for project and operational activities.'
          ],
          achievements: [
            'Improved visibility of technical resource requirements during project planning.',
            'Supported more effective resource allocation based on project requirements and technical dependencies.',
            'Reduced the risk of resource gaps during implementation by identifying requirements earlier in the planning process.'
          ]
        }
      },
      {
        title: 'Technical Documentation & Governance',
        details: {
          tasks: [
            'Prepared and maintained technical documentation, implementation plans, technical specifications, and operational guidelines.',
            'Established structured documentation for technical requirements, implementation activities, and system configurations.',
            'Reviewed technical documentation prepared by team members to ensure consistency and completeness.'
          ],
          achievements: [
            'Improved consistency and quality of technical documentation.',
            'Strengthened knowledge transfer between technical teams and operational support teams.',
            'Improved maintainability of project and operational knowledge through structured documentation.'
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
    companyHighlight: 'Perusahaan IT terdepan di Indonesia penyedia solusi infrastruktur, cloud, dan integrasi sistem berskala enterprise.',
    period: 'August 2017 – August 2025',
    jobDesks: [
      {
        title: 'Oracle Database & Siebel CRM Administration',
        details: {
          tasks: [
            'Administered Oracle Database and Oracle Siebel CRM environments supporting enterprise business operations.',
            'Installed, configured, cloned, and maintained Oracle Siebel CRM servers across development, testing, and production environments.',
            'Supported Siebel CRM environments for Telkom Enterprise, Wholesale, and Retail business operations.',
            'Performed database maintenance, SQL troubleshooting, data validation, performance analysis, backup, and recovery activities.',
            'Monitored enterprise applications, Oracle databases, and Linux servers to identify operational issues.'
          ],
          achievements: [
            'Maintained stable enterprise application and database environments with minimal service interruptions.',
            'Improved consistency between development, testing, and production environments through standardized installation and configuration activities.',
            'Accelerated environment deployment through repeatable server installation and cloning procedures.',
            'Improved troubleshooting efficiency by combining database analysis, application monitoring, and system log analysis.'
          ]
        }
      },
      {
        title: 'Process Automation & Scripting',
        details: {
          tasks: [
            'Developed Python and Shell/Bash scripts to automate system administration, data processing, monitoring, reporting, and operational activities.',
            'Identified repetitive manual processes and developed automation solutions to improve operational efficiency.',
            'Created reusable scripts for system checks, data validation, reporting, and operational support.',
            'Automated data-processing activities to reduce manual intervention and improve process consistency.'
          ],
          achievements: [
            'Reduced repetitive manual activities through process automation.',
            'Minimized human error by replacing manual operational tasks with standardized scripts and automated processes.',
            'Improved operational efficiency by enabling technical teams to perform recurring activities more consistently.',
            'Increased process standardization through reusable automation scripts and operational tools.'
          ]
        }
      },
      {
        title: 'Data Management & Data Migration',
        details: {
          tasks: [
            'Developed and executed SQL queries for data validation, reporting, troubleshooting, reconciliation, and database maintenance.',
            'Performed data migration and validation between Telkom Tcares customer data and Siebel Wholesale platforms.',
            'Performed data migration and validation between Telkom IndiHome customer data and Telkomsel platforms.',
            'Performed data migration and validation between Telkom Wholesale customer data and Telkom Infrastructure platforms.',
            'Performed data validation and reconciliation to verify data accuracy, integrity, completeness, and consistency.'
          ],
          achievements: [
            'Supported successful large-scale data migration activities with accurate and reliable data transfer.',
            'Improved data quality by identifying inconsistencies during validation and reconciliation activities.',
            'Reduced migration-related risks through systematic data validation before and after migration.',
            'Improved reliability of migrated customer data across enterprise platforms.'
          ]
        }
      },
      {
        title: 'System Monitoring & Troubleshooting',
        details: {
          tasks: [
            'Monitored Linux servers, Oracle databases, and enterprise applications using system monitoring and log-analysis tools.',
            'Utilized Splunk and AppDynamics to monitor application and infrastructure performance.',
            'Investigated application, database, server, and network incidents using structured troubleshooting and root cause analysis.',
            'Analyzed system logs to identify abnormal behavior, errors, performance issues, and potential service disruptions.',
            'Provided Level 2/Level 3 technical support for enterprise applications and infrastructure.'
          ],
          achievements: [
            'Enabled earlier identification of potential system issues before they significantly affected business operations.',
            'Reduced troubleshooting time through structured log analysis and root cause investigation.',
            'Improved system availability by resolving application, database, infrastructure, and network-related incidents.',
            'Supported operational continuity by resolving complex technical issues within required service levels.'
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
    companyHighlight: 'Perusahaan penyedia jasa layanan eksplorasi dan produksi minyak bumi terkemuka.',
    period: 'Juli 2016 – Juli 2017',
    jobDesks: [
      {
        title: 'Python Data Automation & Analysis',
        details: {
          tasks: [
            'Developed Python scripts to automate data extraction, cleansing, transformation, analysis, and reporting of Data Acquisition Unit (DAU) data.',
            'Validated and analyzed DAU datasets to ensure data accuracy, integrity, and consistency.',
            'Monitored system-generated data and investigated abnormal readings and data anomalies.',
            'Developed reusable Python-based reporting and visualization tools for engineering and operational teams.'
          ],
          achievements: [
            'Automated repetitive data-processing activities, reducing manual effort and improving reporting efficiency.',
            'Improved data quality by identifying and resolving data inconsistencies before reporting.',
            'Enabled faster identification and investigation of abnormal data through systematic analysis.',
            'Standardized reporting activities through reusable Python-based reporting and visualization tools.',
            'Improved availability of timely and consistent analytical information for engineering and operational decision-making.'
          ]
        }
      },
      {
        title: 'Industrial Sensor Installation & Automation',
        details: {
          tasks: [
            'Installed and configured Autonics industrial sensors for production and automation systems according to technical specifications.',
            'Performed sensor calibration, testing, and commissioning before production deployment.',
            'Diagnosed and resolved sensor installation, wiring, and communication issues.',
            'Read and interpreted electrical wiring diagrams to ensure accurate installation.',
            'Collaborated with engineering and maintenance teams during sensor deployment and system integration.'
          ],
          achievements: [
            'Successfully completed sensor installation and commissioning with minimal disruption to operational activities.',
            'Improved measurement accuracy through proper sensor calibration and testing.',
            'Reduced troubleshooting time through systematic identification and correction of installation and communication issues.',
            'Supported successful automation project delivery by ensuring sensors were properly installed, tested, and operational.'
          ]
        }
      }
    ]
  }
];
