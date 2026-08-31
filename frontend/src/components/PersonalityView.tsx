import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $isGlobalEditMode } from '../stores/editMode';
import { $navMode } from '../stores/navigation';
import { 
  $profileData, 
  updateQuote, 
  addPersonalityPillar, 
  updatePersonalityPillar, 
  deletePersonalityPillar,
  type PersonalityItem 
} from '../stores/profile';
import { 
  Brain, 
  Users, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  HeartHandshake, 
  Quote,
  Edit3,
  Trash2,
  Plus,
  Check,
  X
} from 'lucide-react';

interface PersonalityViewProps {
  lang: 'id' | 'en';
}

export const PersonalityView: React.FC<PersonalityViewProps> = ({ lang }) => {
  const profile = useStore($profileData);
  const isEditMode = useStore($isGlobalEditMode);
  const navMode = useStore($navMode);
  const isPersonal = navMode === 'personal';

  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [quoteInput, setQuoteInput] = useState(profile.quote);

  // Pillar Editor State
  const [editingPillarId, setEditingPillarId] = useState<string | null>(null);
  const [pillarTitle, setPillarTitle] = useState('');
  const [pillarDesc, setPillarDesc] = useState('');

  // New Pillar Form State
  const [isAddingPillar, setIsAddingPillar] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const icons = [Brain, Users, ShieldCheck, Compass];

  const handleSaveQuote = () => {
    updateQuote(quoteInput);
    setIsEditingQuote(false);
  };

  const handleStartEditPillar = (p: PersonalityItem) => {
    setEditingPillarId(p.id);
    setPillarTitle(p.title);
    setPillarDesc(p.desc);
  };

  const handleSavePillar = (id: string) => {
    if (!pillarTitle.trim()) return;
    updatePersonalityPillar(id, { title: pillarTitle.trim(), desc: pillarDesc.trim() });
    setEditingPillarId(null);
  };

  const handleAddPillar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addPersonalityPillar({ title: newTitle.trim(), desc: newDesc.trim() });
    setNewTitle('');
    setNewDesc('');
    setIsAddingPillar(false);
  };

  return (
    <div className="space-y-8 animate-fade-in select-none">
      
      {/* Hero Quote Card (Neo-Brutalist in Personal Mode) */}
      <div className={`p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${
        isPersonal
          ? 'bg-[#00F0FF] border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-none'
          : 'paper-card rounded-3xl bg-[#FAF8F5] border border-white/80 shadow-md'
      }`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${
              isPersonal 
                ? 'bg-[#FF007F] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-none' 
                : 'rounded-2xl bg-brand-brown/10 text-brand-brown shadow-inner'
            }`}>
              <Quote size={24} />
            </div>
            
            <div className="flex-1">
              {isEditingQuote ? (
                <div className="space-y-3">
                  <textarea
                    rows={2}
                    value={quoteInput}
                    onChange={(e) => setQuoteInput(e.target.value)}
                    className="w-full p-3 rounded-none border-2 border-black bg-white text-sm font-bold text-black focus:outline-none resize-none shadow-[3px_3px_0px_0px_#000]"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveQuote}
                      className="bg-black text-white px-3.5 py-1.5 rounded-none text-xs font-black flex items-center gap-1 shadow-[2px_2px_0px_0px_#FFF]"
                    >
                      <Check size={12} />
                      <span>{lang === 'id' ? 'Simpan' : 'Save'}</span>
                    </button>
                    <button
                      onClick={() => setIsEditingQuote(false)}
                      className="bg-white text-black border border-black px-3 py-1.5 rounded-none text-xs font-bold"
                    >
                      {lang === 'id' ? 'Batal' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className={`text-base md:text-xl font-extrabold leading-relaxed italic mb-3 ${
                    isPersonal ? 'text-black font-sans tracking-tight drop-shadow-xs' : 'text-earth-900'
                  }`}>
                    "{profile.quote}"
                  </p>
                  <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${
                    isPersonal ? 'text-black bg-white px-2.5 py-1 border-2 border-black inline-flex shadow-[3px_3px_0px_0px_#000]' : 'text-brand-brown'
                  }`}>
                    <Sparkles size={13} />
                    <span>{profile.fullName} • Personal Philosophy</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {isEditMode && !isEditingQuote && (
            <button
              onClick={() => {
                setQuoteInput(profile.quote);
                setIsEditingQuote(true);
              }}
              className={`p-2 flex-shrink-0 ${
                isPersonal 
                  ? 'bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] text-black hover:bg-[#FF007F] hover:text-white' 
                  : 'paper-btn rounded-xl text-brand-brown hover:text-earth-900'
              }`}
              title="Edit Kutipan"
            >
              <Edit3 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Personality Pillars Header & Add Button */}
      {isEditMode && (
        <div className="flex items-center justify-between">
          <span className={`text-xs font-black uppercase tracking-wider ${isPersonal ? 'text-black bg-[#FFE600] px-2 py-0.5 border-2 border-black' : 'text-brand-brown'}`}>
            {lang === 'id' ? 'Pilar Kepribadian' : 'Personality Pillars'} ({profile.personalityPillars.length})
          </span>

          <button
            onClick={() => setIsAddingPillar(true)}
            className={`px-3.5 py-1.5 text-xs font-black flex items-center gap-1.5 ${
              isPersonal 
                ? 'bg-[#FF007F] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-none' 
                : 'paper-btn rounded-xl text-brand-brown'
            }`}
          >
            <Plus size={13} />
            <span>{lang === 'id' ? 'Tambah Pilar' : 'Add Pillar'}</span>
          </button>
        </div>
      )}

      {/* Add New Pillar Modal / Form */}
      {isAddingPillar && (
        <form onSubmit={handleAddPillar} className={`p-6 space-y-4 ${
          isPersonal ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-none' : 'paper-card rounded-3xl bg-[#FAF8F5] border border-brand-brown/30'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-black">
            <h4 className="font-extrabold text-sm text-black uppercase tracking-wider">{lang === 'id' ? 'Tambah Pilar Baru' : 'Add New Pillar'}</h4>
            <button type="button" onClick={() => setIsAddingPillar(false)} className="text-black hover:text-red-600">
              <X size={18} />
            </button>
          </div>
          <div>
            <label className="block text-xs font-black text-black mb-1">{lang === 'id' ? 'Judul Karakter' : 'Trait Title'}</label>
            <input
              type="text"
              required
              placeholder="Contoh: Solution-Oriented Thinker"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full py-2 px-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-black mb-1">{lang === 'id' ? 'Deskripsi' : 'Description'}</label>
            <textarea
              rows={3}
              required
              placeholder="Jelaskan pola pikir atau cara kerja Anda..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full py-2 px-3 border-2 border-black bg-[#F4F1EA] text-xs text-black focus:outline-none resize-none font-medium"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsAddingPillar(false)} className="px-3 py-1.5 border-2 border-black text-xs font-bold bg-white">
              {lang === 'id' ? 'Batal' : 'Cancel'}
            </button>
            <button type="submit" className="bg-black text-white px-4 py-1.5 border-2 border-black text-xs font-black shadow-[2px_2px_0px_0px_#FFE600]">
              {lang === 'id' ? 'Simpan Pilar' : 'Save Pillar'}
            </button>
          </div>
        </form>
      )}

      {/* Personality Pillars Grid (Dual Styled) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.personalityPillars.map((t, idx) => {
          const Icon = icons[idx % icons.length];
          const isEditingThis = editingPillarId === t.id;

          return (
            <div
              key={t.id || idx}
              className={`p-6 flex flex-col relative transition-all duration-300 ${
                isPersonal 
                  ? 'bg-white border-3 border-black shadow-[6px_6px_0px_0px_#000] rounded-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]' 
                  : 'paper-card rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn hover:-translate-y-1'
              }`}
            >
              {isEditMode && !isEditingThis && (
                <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
                  <button
                    onClick={() => handleStartEditPillar(t)}
                    className="w-7 h-7 bg-white border border-black hover:bg-[#FFE600] text-black flex items-center justify-center transition-all shadow-[1px_1px_0px_0px_#000]"
                    title="Edit Pilar"
                  >
                    <Edit3 size={12} />
                  </button>
                  <button
                    onClick={() => deletePersonalityPillar(t.id)}
                    className="w-7 h-7 bg-white border border-black hover:bg-rose-600 hover:text-white text-black flex items-center justify-center transition-all shadow-[1px_1px_0px_0px_#000]"
                    title="Hapus Pilar"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )}

              {isEditingThis ? (
                <div className="space-y-3 flex-1">
                  <input
                    type="text"
                    value={pillarTitle}
                    onChange={(e) => setPillarTitle(e.target.value)}
                    className="w-full py-1.5 px-2.5 border-2 border-black text-xs font-bold text-black"
                  />
                  <textarea
                    rows={3}
                    value={pillarDesc}
                    onChange={(e) => setPillarDesc(e.target.value)}
                    className="w-full p-2.5 border-2 border-black text-xs text-black resize-none"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button onClick={() => setEditingPillarId(null)} className="px-2.5 py-1 border border-black text-xs font-bold">
                      {lang === 'id' ? 'Batal' : 'Cancel'}
                    </button>
                    <button onClick={() => handleSavePillar(t.id)} className="bg-black text-white px-3 py-1 text-xs font-black">
                      {lang === 'id' ? 'Simpan' : 'Save'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                      isPersonal ? 'bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-none' : 'w-9 h-9 rounded-xl paper-well text-brand-brown'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <h3 className={`font-extrabold text-sm md:text-base leading-snug pr-12 ${
                      isPersonal ? 'font-comic text-xl text-black tracking-wide' : 'text-earth-900'
                    }`}>
                      {t.title}
                    </h3>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed mt-auto ${
                    isPersonal ? 'text-black font-semibold' : 'text-earth-800'
                  }`}>
                    {t.desc}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Core Principles (Dual Styled) */}
      <div className={`p-6 md:p-8 transition-all duration-300 ${
        isPersonal ? 'bg-[#FF007F] border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-none text-white' : 'paper-well rounded-3xl border border-[#E6E0D5]'
      }`}>
        <div className={`flex items-center gap-2.5 mb-4 font-extrabold text-sm md:text-base ${
          isPersonal ? 'font-comic text-2xl text-white tracking-wider' : 'text-earth-900'
        }`}>
          <HeartHandshake size={22} className={isPersonal ? 'text-white' : 'text-brand-brown'} />
          <span>{lang === 'id' ? 'NILAI KERJA & KOLABORASI' : 'CORE WORKING PRINCIPLES'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className={`p-4 ${isPersonal ? 'bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000] rounded-none' : 'bg-white/80 rounded-2xl shadow-sm border border-[#ECE7DF]'}`}>
            <div className={`text-xl font-black mb-1 ${isPersonal ? 'font-comic text-2xl text-[#FF007F]' : 'text-brand-brown'}`}>Integritas</div>
            <div className="text-xs text-black font-bold">Jujur, transparan, dan dapat diandalkan dalam setiap komitmen.</div>
          </div>
          <div className={`p-4 ${isPersonal ? 'bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000] rounded-none' : 'bg-white/80 rounded-2xl shadow-sm border border-[#ECE7DF]'}`}>
            <div className={`text-xl font-black mb-1 ${isPersonal ? 'font-comic text-2xl text-[#00F0FF]' : 'text-brand-brown'}`}>Presisi</div>
            <div className="text-xs text-black font-bold">Memperhatikan detail arsitektur hingga optimasi baris kode terkecil.</div>
          </div>
          <div className={`p-4 ${isPersonal ? 'bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000] rounded-none' : 'bg-white/80 rounded-2xl shadow-sm border border-[#ECE7DF]'}`}>
            <div className={`text-xl font-black mb-1 ${isPersonal ? 'font-comic text-2xl text-[#FFE600]' : 'text-brand-brown'}`}>Empati</div>
            <div className="text-xs text-black font-bold">Mendengarkan pengguna dan mengutamakan kenyamanan rekan tim.</div>
          </div>
        </div>
      </div>

    </div>
  );
};
