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
    role: 'Senior Application & Database Engineer / Tech Lead',
    company: 'PT. Sigma Cipta Caraka (Telkomsigma)',
    period: '2018 - Sekarang (8+ Tahun)',
    location: 'BSD & Jakarta, Indonesia',
    summary: 'Bertanggung jawab penuh atas keandalan, pemeliharaan tingkat lanjut (L3/L4), serta rekayasa otomasi pada ekosistem mission-critical Telkom Group.',
    bullets: [
      'Memimpin operasional dan manajemen ketersediaan tinggi arsitektur Oracle Database Enterprise berskala multi-terabyte dengan rekam jejak Zero Fatal Downtime.',
      'Melakukan SQL Performance Tuning dan query refactoring ekstensif, mempercepat response time batch processing hingga lebih dari 60%.',
      'Merancang dan mengeksekusi pipeline otomatisasi pemeliharaan, monitoring, dan backup menggunakan Python, Bash, dan Linux Crontab.',
      'Mengelola integrasi ekosistem CRM Siebel Enterprise lintas platform dengan tingkat reliabilitas 99.98% SLA.'
    ],
    skills: ['Oracle DB', 'SQL Tuning', 'Linux RedHat', 'Python', 'Siebel CRM', 'Bash Automation', 'CI/CD']
  },
  {
    id: 'exp-2',
    role: 'System Implementation & Software Engineer',
    company: 'PT. Prawathiya Sumber Insani (PSI)',
    period: '2016 - 2018',
    location: 'Bandung & Jakarta, Indonesia',
    summary: 'Mengembangkan sistem perangkat lunak kustom dan integrasi database untuk klien institusional dan korporasi.',
    bullets: [
      'Mengembangkan backend modul web dan API integrasi database dengan penekanan pada keamanan data dan konkurensi transaksi.',
      'Melakukan deployment, konfigurasi server Linux, serta instalasi database relasional untuk klien korporasi.',
      'Menyusun dokumentasi teknis, standard operating procedures (SOP), dan memberikan pelatihan pengguna teknis.'
    ],
    skills: ['Web Backend', 'Database Design', 'Linux Server', 'REST API', 'SQL Scripting']
  }
];

const STORAGE_EXP_KEY = 'rendgra_experience_data_v1';

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
