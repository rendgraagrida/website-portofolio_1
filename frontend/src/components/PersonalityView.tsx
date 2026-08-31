import React from 'react';
import { 
  Brain, 
  Users, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  HeartHandshake, 
  Quote
} from 'lucide-react';

interface PersonalityViewProps {
  lang: 'id' | 'en';
}

export const PersonalityView: React.FC<PersonalityViewProps> = ({ lang }) => {
  const traits = [
    {
      icon: Brain,
      title: lang === 'id' ? 'Pragmatic & Analytical Problem Solver' : 'Pragmatic & Analytical Problem Solver',
      desc: lang === 'id' 
        ? 'Menghadapi kompleksitas sistem enterprise dengan tenang dan terstruktur. Mengutamakan solusi yang teruji, andal, dan efisien tanpa rekayasa berlebihan (no over-engineering).'
        : 'Approaches complex enterprise systems with calm structure. Prioritizes battle-tested, scalable, and efficient solutions without unnecessary over-engineering.'
    },
    {
      icon: Users,
      title: lang === 'id' ? 'Empathetic & Collaborative Leader' : 'Empathetic & Collaborative Leader',
      desc: lang === 'id'
        ? 'Membangun kultur tim yang inklusif, menghargai setiap ide, dan aktif mementori developer lain untuk tumbuh bersama menjadi engineer yang matang.'
        : 'Fosters an inclusive team culture, respects diverse perspectives, and actively mentors developers to grow into mature, confident engineers.'
    },
    {
      icon: ShieldCheck,
      title: lang === 'id' ? 'High Ownership & Reliability' : 'High Ownership & Reliability',
      desc: lang === 'id'
        ? 'Bertanggung jawab penuh terhadap stabilitas sistem kritis. Memiliki komitmen tanpa kompromi terhadap kualitas, keamanan data, dan ketersediaan layanan 24/7.'
        : 'Takes end-to-end ownership of mission-critical systems. Uncompromising dedication to software quality, data safety, and zero downtime.'
    },
    {
      icon: Compass,
      title: lang === 'id' ? 'Lifelong Learner & Inquisitive Spirit' : 'Lifelong Learner & Inquisitive Spirit',
      desc: lang === 'id'
        ? 'Rasa ingin tahu yang tinggi terhadap evolusi teknologi modern (AI, Cloud Native, Edge Computing) sembari mempertahankan fondasi arsitektur enterprise yang kokoh.'
        : 'Deep curiosity towards emerging technologies (AI, Cloud Native, Edge Computing) while preserving robust enterprise engineering foundations.'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Quote Card */}
      <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-brand-brown/10 text-brand-brown flex items-center justify-center flex-shrink-0 shadow-inner">
            <Quote size={20} />
          </div>
          <div>
            <p className="text-base md:text-lg font-bold text-earth-900 leading-relaxed italic mb-3">
              {lang === 'id'
                ? '"Teknologi terbaik adalah yang bekerja tanpa henti di balik layar, mempermudah hidup manusia, dan dibangun dengan empati serta dedikasi tinggi."'
                : '"The best technology is the one that operates seamlessly behind the scenes, empowers human lives, and is built with empathy and unyielding dedication."'}
            </p>
            <div className="flex items-center gap-2 text-xs font-black text-brand-brown uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Rendgra Agrida • Personal Philosophy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personality Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {traits.map((t, idx) => {
          const Icon = t.icon;
          return (
            <div
              key={idx}
              className="paper-card p-6 rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl paper-well flex items-center justify-center text-brand-brown flex-shrink-0">
                  <Icon size={18} />
                </div>
                <h3 className="font-extrabold text-sm md:text-base text-earth-900 leading-snug">
                  {t.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-earth-800 leading-relaxed mt-auto">
                {t.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Core Principles Well */}
      <div className="paper-well p-6 md:p-8 rounded-3xl border border-[#E6E0D5]">
        <div className="flex items-center gap-2.5 mb-4 text-earth-900 font-extrabold text-sm md:text-base">
          <HeartHandshake size={18} className="text-brand-brown" />
          <span>{lang === 'id' ? 'Nilai Kerja & Kolaborasi' : 'Core Working Principles'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 p-4 rounded-2xl shadow-sm border border-[#ECE7DF]">
            <div className="text-xl font-black text-brand-brown mb-1">Integritas</div>
            <div className="text-xs text-earth-700 font-medium">Jujur, transparan, dan dapat diandalkan dalam setiap komitmen.</div>
          </div>
          <div className="bg-white/80 p-4 rounded-2xl shadow-sm border border-[#ECE7DF]">
            <div className="text-xl font-black text-brand-brown mb-1">Presisi</div>
            <div className="text-xs text-earth-700 font-medium">Memperhatikan detail arsitektur hingga optimasi baris kode terkecil.</div>
          </div>
          <div className="bg-white/80 p-4 rounded-2xl shadow-sm border border-[#ECE7DF]">
            <div className="text-xl font-black text-brand-brown mb-1">Empati</div>
            <div className="text-xs text-earth-700 font-medium">Mendengarkan pengguna dan mengutamakan kenyamanan rekan tim.</div>
          </div>
        </div>
      </div>

    </div>
  );
};
