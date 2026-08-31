import { atom } from 'nanostores';

export interface BilingualString {
  id: string;
  en: string;
}

export interface PersonalityItem {
  id: string;
  title: BilingualString;
  desc: BilingualString;
}

export interface HobbyItem {
  id: string;
  title: BilingualString;
  location: BilingualString;
  desc: BilingualString;
  tag: BilingualString;
}

export interface ProfileData {
  fullName: string;
  title: BilingualString;
  titleHighlight: BilingualString;
  desc: BilingualString;
  quote: BilingualString;
  personalityPillars: PersonalityItem[];
  hobbies: HobbyItem[];
}

export const DEFAULT_PROFILE: ProfileData = {
  fullName: 'Rendgra Agrida',
  title: {
    id: 'Membangun Sistem Andal & Memimpin Inovasi Teknis',
    en: 'Engineering Robust Systems & Leading Technical Innovation'
  },
  titleHighlight: {
    id: 'berdampak tinggi',
    en: 'with High Impact'
  },
  desc: {
    id: 'Senior Software Engineer & Tech Lead dengan 8+ tahun pengalaman dalam arsitektur database enterprise berskala besar, optimalisasi performa tingkat tinggi, dan otomasi modern.',
    en: 'Senior Software Engineer & Tech Lead with 8+ years of experience in large-scale enterprise database architecture, high-level performance optimization, and modern automation.'
  },
  quote: {
    id: 'Teknologi terbaik adalah yang bekerja tanpa henti di balik layar, mempermudah hidup manusia, dan dibangun dengan empati serta dedikasi tinggi.',
    en: 'The best technology works tirelessly behind the scenes, simplifying human lives, built with empathy and profound dedication.'
  },
  personalityPillars: [
    {
      id: 'p1',
      title: {
        id: 'Pragmatic & Analytical Problem Solver',
        en: 'Pragmatic & Analytical Problem Solver'
      },
      desc: {
        id: 'Menghadapi kompleksitas sistem enterprise dengan tenang dan terstruktur. Mengutamakan solusi yang teruji, andal, dan efisien tanpa rekayasa berlebihan (no over-engineering).',
        en: 'Handling enterprise system complexities calmly and systematically. Prioritizing proven, reliable, and efficient solutions without over-engineering.'
      }
    },
    {
      id: 'p2',
      title: {
        id: 'Empathetic & Collaborative Leader',
        en: 'Empathetic & Collaborative Leader'
      },
      desc: {
        id: 'Membangun kultur tim yang inklusif, menghargai setiap ide, dan aktif mementori developer lain untuk tumbuh bersama menjadi engineer yang matang.',
        en: 'Fostering an inclusive team culture, valuing every idea, and actively mentoring other developers to grow together into mature engineers.'
      }
    },
    {
      id: 'p3',
      title: {
        id: 'High Ownership & Reliability',
        en: 'High Ownership & Reliability'
      },
      desc: {
        id: 'Bertanggung jawab penuh terhadap stabilitas sistem kritis. Memiliki komitmen tanpa kompromi terhadap kualitas, keamanan data, dan ketersediaan layanan 24/7.',
        en: 'Taking full responsibility for critical system stability. Having uncompromising commitment to quality, data security, and 24/7 service availability.'
      }
    },
    {
      id: 'p4',
      title: {
        id: 'Lifelong Learner & Inquisitive Spirit',
        en: 'Lifelong Learner & Inquisitive Spirit'
      },
      desc: {
        id: 'Rasa ingin tahu yang tinggi terhadap evolusi teknologi modern (AI, Cloud Native, Edge Computing) sembari mempertahankan fondasi arsitektur enterprise yang kokoh.',
        en: 'High curiosity towards the evolution of modern technology (AI, Cloud Native, Edge Computing) while maintaining a solid enterprise architectural foundation.'
      }
    }
  ],
  hobbies: [
    {
      id: 'h1',
      title: {
        id: 'Eksplorasi Alam & Pegunungan',
        en: 'Nature & Mountain Exploration'
      },
      location: {
        id: 'Gunung Bromo, Jawa Timur',
        en: 'Mount Bromo, East Java'
      },
      desc: {
        id: 'Menikmati udara sejuk pegunungan dan panorama matahari terbit. Aktivitas alam terbuka adalah cara terbaik untuk menyegarkan pikiran dan memicu ide-ide segar.',
        en: 'Enjoying the cool mountain breeze and sunrise panoramas. Outdoor activities are the best way to refresh the mind and spark new ideas.'
      },
      tag: { id: 'Outdoor', en: 'Outdoor' }
    },
    {
      id: 'h2',
      title: {
        id: 'Fotografi & Momen Kreatif',
        en: 'Photography & Creative Moments'
      },
      location: {
        id: 'Studio & Urban Exploration',
        en: 'Studio & Urban Exploration'
      },
      desc: {
        id: 'Mengabadikan potret kebersamaan keluarga, konsep visual pop-art, dan estetika warna. Memadukan kepekaan komposisi visual dengan seni penceritaan.',
        en: 'Capturing family portraits, pop-art visual concepts, and color aesthetics. Combining visual composition sensitivity with the art of storytelling.'
      },
      tag: { id: 'Creative', en: 'Creative' }
    },
    {
      id: 'h3',
      title: {
        id: 'Kultur Kopi & Diskusi Teknologi',
        en: 'Coffee Culture & Tech Discussions'
      },
      location: {
        id: 'Artisan Coffee Spots',
        en: 'Artisan Coffee Spots'
      },
      desc: {
        id: 'Menikmati seduhan kopi manual sembari membedah tren arsitektur software, open-source tooling, dan bertukar wawasan seputar dunia rekayasa perangkat lunak.',
        en: 'Enjoying manual brew coffee while dissecting software architecture trends, open-source tooling, and exchanging insights on software engineering.'
      },
      tag: { id: 'Lifestyle', en: 'Lifestyle' }
    },
    {
      id: 'h4',
      title: {
        id: 'Waktu Hangat Bersama Keluarga',
        en: 'Quality Family Time'
      },
      location: {
        id: 'Rumah & Liburan',
        en: 'Home & Travel'
      },
      desc: {
        id: 'Menghabiskan waktu bersama keluarga tercinta, bermain bersama buah hati, dan menjelajahi destinasi baru sebagai sumber energi dan motivasi utama.',
        en: 'Spending time with beloved family, playing with children, and exploring new destinations as the primary source of energy and motivation.'
      },
      tag: { id: 'Family', en: 'Family' }
    }
  ]
};

const STORAGE_PROFILE_KEY = 'rendgra_profile_data_v3';

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

export const saveProfileToStorage = (data: ProfileData) => {
  $profileData.set(data);
  try {
    localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(data));
  } catch (e) {}
};

export const resetProfileData = () => {
  saveProfileToStorage(DEFAULT_PROFILE);
};
