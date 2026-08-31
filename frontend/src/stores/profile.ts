import { atom } from 'nanostores';

export interface PersonalityItem {
  id: string;
  title: string;
  desc: string;
}

export interface HobbyItem {
  id: string;
  title: string;
  location: string;
  desc: string;
  tag: string;
}

export interface ProfileData {
  fullName: string;
  title: string;
  titleHighlight: string;
  desc: string;
  quote: string;
  personalityPillars: PersonalityItem[];
  hobbies: HobbyItem[];
}

export const DEFAULT_PROFILE: ProfileData = {
  fullName: 'Rendgra Agrida',
  title: 'Engineering Robust Systems & Leading Technical Innovation',
  titleHighlight: 'with High Impact',
  desc: 'Senior Software Engineer & Tech Lead dengan 8+ tahun pengalaman dalam arsitektur database enterprise berskala besar, optimalisasi performa tingkat tinggi, dan otomasi modern.',
  quote: 'Teknologi terbaik adalah yang bekerja tanpa henti di balik layar, mempermudah hidup manusia, dan dibangun dengan empati serta dedikasi tinggi.',
  personalityPillars: [
    {
      id: 'p1',
      title: 'Pragmatic & Analytical Problem Solver',
      desc: 'Menghadapi kompleksitas sistem enterprise dengan tenang dan terstruktur. Mengutamakan solusi yang teruji, andal, dan efisien tanpa rekayasa berlebihan (no over-engineering).'
    },
    {
      id: 'p2',
      title: 'Empathetic & Collaborative Leader',
      desc: 'Membangun kultur tim yang inklusif, menghargai setiap ide, dan aktif mementori developer lain untuk tumbuh bersama menjadi engineer yang matang.'
    },
    {
      id: 'p3',
      title: 'High Ownership & Reliability',
      desc: 'Bertanggung jawab penuh terhadap stabilitas sistem kritis. Memiliki komitmen tanpa kompromi terhadap kualitas, keamanan data, dan ketersediaan layanan 24/7.'
    },
    {
      id: 'p4',
      title: 'Lifelong Learner & Inquisitive Spirit',
      desc: 'Rasa ingin tahu yang tinggi terhadap evolusi teknologi modern (AI, Cloud Native, Edge Computing) sembari mempertahankan fondasi arsitektur enterprise yang kokoh.'
    }
  ],
  hobbies: [
    {
      id: 'h1',
      title: 'Eksplorasi Alam & Pegunungan',
      location: 'Gunung Bromo, Jawa Timur',
      desc: 'Menikmati udara sejuk pegunungan dan panorama matahari terbit. Aktivitas alam terbuka adalah cara terbaik untuk menyegarkan pikiran dan memicu ide-ide segar.',
      tag: 'Outdoor'
    },
    {
      id: 'h2',
      title: 'Fotografi & Momen Kreatif',
      location: 'Studio & Urban Exploration',
      desc: 'Mengabadikan potret kebersamaan keluarga, konsep visual pop-art, dan estetika warna. Memadukan kepekaan komposisi visual dengan seni penceritaan.',
      tag: 'Creative'
    },
    {
      id: 'h3',
      title: 'Kultur Kopi & Diskusi Teknologi',
      location: 'Artisan Coffee Spots',
      desc: 'Menikmati seduhan kopi manual sembari membedah tren arsitektur software, open-source tooling, dan bertukar wawasan seputar dunia rekayasa perangkat lunak.',
      tag: 'Lifestyle'
    },
    {
      id: 'h4',
      title: 'Waktu Hangat Bersama Keluarga',
      location: 'Home & Travel',
      desc: 'Menghabiskan waktu bersama keluarga tercinta, bermain bersama buah hati, dan menjelajahi destinasi baru sebagai sumber energi dan motivasi utama.',
      tag: 'Family'
    }
  ]
};

const STORAGE_PROFILE_KEY = 'rendgra_profile_data_v1';

const getInitialProfile = (): ProfileData => {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const saved = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Gagal membaca profile data:', e);
  }
  return DEFAULT_PROFILE;
};

export const $profileData = atom<ProfileData>(getInitialProfile());

export const updateProfileData = (newData: Partial<ProfileData>) => {
  const current = $profileData.get();
  const updated = { ...current, ...newData };
  $profileData.set(updated);
  try {
    localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(updated));
  } catch (e) {}
};

export const resetProfileData = () => {
  $profileData.set(DEFAULT_PROFILE);
  try {
    localStorage.removeItem(STORAGE_PROFILE_KEY);
  } catch (e) {}
};
