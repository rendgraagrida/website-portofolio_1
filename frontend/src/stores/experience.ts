import { atom } from 'nanostores';

export interface ExperienceItemData {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  skills: string[];
}

export const DEFAULT_EXPERIENCES: ExperienceItemData[] = [
  {
    id: 'exp-1',
    role: 'Tech Lead',
    company: 'PT. SIGMA CIPTA CARAKA (TELKOMSIGMA)',
    period: 'Agustus 2025 - Desember 2026',
    location: 'Bandung / Jakarta, Indonesia',
    summary: 'Mengarahkan perencanaan teknis, koordinasi tim, dan tinjauan desain solusi untuk implementasi proyek IT skala enterprise dan peningkatan infrastruktur.',
    bullets: [
      'Menganalisis kebutuhan bisnis dan teknis untuk menentukan solusi teknologi dan pendekatan implementasi yang tepat.',
      'Mengoordinasikan aktivitas teknis di seluruh tim IT untuk mendukung implementasi proyek dan aktivitas operasional.',
      'Meninjau solusi teknis yang diusulkan terhadap kebutuhan bisnis, infrastruktur yang ada, dan lingkungan aplikasi.',
      'Menyiapkan rencana sumber daya IT, dokumentasi teknis, dan pedoman tata kelola.',
      'Mengidentifikasi risiko teknis, ketergantungan, kendala, dan potensi masalah selama perencanaan proyek.'
    ],
    skills: ['Technical Leadership', 'Solution Design', 'Requirement Management', 'Resource Planning', 'Risk Management']
  },
  {
    id: 'exp-2',
    role: 'Dev-Ops',
    company: 'PT. SIGMA CIPTA CARAKA (TELKOMSIGMA)',
    period: 'Agustus 2017 - Agustus 2025',
    location: 'Bandung / Jakarta, Indonesia',
    summary: 'Mengelola operasi DevOps end-to-end, pemeliharaan Oracle Database & Siebel CRM, otomatisasi skrip Python/Bash, serta migrasi data berskala besar.',
    bullets: [
      'Mengelola lingkungan Oracle Database dan Oracle Siebel CRM yang mendukung operasi bisnis enterprise.',
      'Mengembangkan skrip Python dan Shell/Bash untuk mengotomatisasi administrasi sistem dan aktivitas pemrosesan data.',
      'Melakukan migrasi data skala besar dan validasi antara platform enterprise (Telkom Tcares, IndiHome, Wholesale).',
      'Memantau server Linux, database Oracle, dan aplikasi menggunakan alat monitoring (Splunk, AppDynamics).',
      'Mengimplementasikan dan memelihara prosedur backup database, pemulihan (recovery), dan keamanan sistem.'
    ],
    skills: ['Oracle Database', 'Siebel CRM', 'Python Automation', 'Bash Scripting', 'Data Migration', 'System Monitoring', 'Backup & Recovery']
  },
  {
    id: 'exp-3',
    role: 'Engineer',
    company: 'PT. PUTRA SEJATI INDOMAKMUR',
    period: 'Juli 2016 - Juli 2017',
    location: 'Bandung, Indonesia',
    summary: 'Bertanggung jawab atas otomatisasi ekstraksi data menggunakan Python, perbaikan proses akuisisi data, dan instalasi sensor otomasi industri.',
    bullets: [
      'Mengembangkan skrip Python untuk mengotomatisasi ekstraksi, pembersihan, analisis, dan pelaporan data Data Acquisition Unit (DAU).',
      'Berkolaborasi dengan tim engineering untuk menganalisis data DAU dan meningkatkan alur kerja akuisisi data.',
      'Memasang, mengonfigurasi, dan mengkalibrasi sensor industri Autonics untuk sistem produksi dan otomasi.'
    ],
    skills: ['Python Data Analysis', 'Data Automation', 'Industrial Sensors', 'Data Acquisition (DAU)']
  }
];

const STORAGE_EXP_KEY = 'rendgra_experience_data_v2';

const getInitialExperiences = (): ExperienceItemData[] => {
  if (typeof window === 'undefined') return DEFAULT_EXPERIENCES;
  try {
    const saved = localStorage.getItem(STORAGE_EXP_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}
  return DEFAULT_EXPERIENCES;
};

export const $experiences = atom<ExperienceItemData[]>(getInitialExperiences());

export const addExperience = (item: Omit<ExperienceItemData, 'id'>) => {
  const current = $experiences.get();
  const newItem: ExperienceItemData = {
    ...item,
    id: `exp-${Date.now()}`
  };
  const updated = [newItem, ...current];
  $experiences.set(updated);
  try {
    localStorage.setItem(STORAGE_EXP_KEY, JSON.stringify(updated));
  } catch (e) {}
};

export const updateExperience = (id: string, updatedFields: Partial<ExperienceItemData>) => {
  const current = $experiences.get();
  const updated = current.map((exp) => (exp.id === id ? { ...exp, ...updatedFields } : exp));
  $experiences.set(updated);
  try {
    localStorage.setItem(STORAGE_EXP_KEY, JSON.stringify(updated));
  } catch (e) {}
};

export const deleteExperience = (id: string) => {
  const current = $experiences.get();
  const updated = current.filter((exp) => exp.id !== id);
  $experiences.set(updated);
  try {
    localStorage.setItem(STORAGE_EXP_KEY, JSON.stringify(updated));
  } catch (e) {}
};

export const resetExperiences = () => {
  $experiences.set(DEFAULT_EXPERIENCES);
  try {
    localStorage.removeItem(STORAGE_EXP_KEY);
  } catch (e) {}
};
