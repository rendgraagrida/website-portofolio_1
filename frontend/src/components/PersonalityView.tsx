import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $isGlobalEditMode } from '../stores/editMode';
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
      
      {/* Hero Quote Card */}
      <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 rounded-2xl bg-brand-brown/10 text-brand-brown flex items-center justify-center flex-shrink-0 shadow-inner">
              <Quote size={20} />
            </div>
            
            <div className="flex-1">
              {isEditingQuote ? (
                <div className="space-y-3">
                  <textarea
                    rows={2}
                    value={quoteInput}
                    onChange={(e) => setQuoteInput(e.target.value)}
                    className="paper-well w-full p-3 rounded-xl text-sm font-bold text-earth-900 focus:outline-none focus:ring-1 focus:ring-brand-brown resize-none"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveQuote}
                      className="bg-brand-brown hover:bg-earth-900 text-white px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-sm"
                    >
                      <Check size={12} />
                      <span>{lang === 'id' ? 'Simpan' : 'Save'}</span>
                    </button>
                    <button
                      onClick={() => setIsEditingQuote(false)}
                      className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-earth-700"
                    >
                      {lang === 'id' ? 'Batal' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-base md:text-lg font-bold text-earth-900 leading-relaxed italic mb-3">
                    "{profile.quote}"
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black text-brand-brown uppercase tracking-wider">
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
              className="paper-btn p-2 rounded-xl text-brand-brown hover:text-earth-900 flex-shrink-0"
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
          <span className="text-xs font-black text-brand-brown uppercase tracking-wider">
            {lang === 'id' ? 'Pilar Kepribadian' : 'Personality Pillars'} ({profile.personalityPillars.length})
          </span>

          <button
            onClick={() => setIsAddingPillar(true)}
            className="paper-btn px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-brand-brown hover:text-earth-900 flex items-center gap-1.5"
          >
            <Plus size={13} />
            <span>{lang === 'id' ? 'Tambah Pilar' : 'Add Pillar'}</span>
          </button>
        </div>
      )}

      {/* Add New Pillar Modal / Form */}
      {isAddingPillar && (
        <form onSubmit={handleAddPillar} className="paper-card p-6 rounded-3xl bg-[#FAF8F5] border border-brand-brown/30 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#ECE7DF]">
            <h4 className="font-extrabold text-sm text-earth-900">{lang === 'id' ? 'Tambah Pilar Baru' : 'Add New Pillar'}</h4>
            <button type="button" onClick={() => setIsAddingPillar(false)} className="text-earth-500 hover:text-earth-900">
              <X size={16} />
            </button>
          </div>
          <div>
            <label className="block text-xs font-bold text-earth-800 mb-1">{lang === 'id' ? 'Judul Karakter' : 'Trait Title'}</label>
            <input
              type="text"
              required
              placeholder="Contoh: Solution-Oriented Thinker"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-earth-800 mb-1">{lang === 'id' ? 'Deskripsi' : 'Description'}</label>
            <textarea
              rows={3}
              required
              placeholder="Jelaskan pola pikir atau cara kerja Anda..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsAddingPillar(false)} className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-earth-700">
              {lang === 'id' ? 'Batal' : 'Cancel'}
            </button>
            <button type="submit" className="bg-brand-brown text-white px-4 py-1.5 rounded-xl text-xs font-extrabold shadow-sm">
              {lang === 'id' ? 'Simpan Pilar' : 'Save Pillar'}
            </button>
          </div>
        </form>
      )}

      {/* Personality Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.personalityPillars.map((t, idx) => {
          const Icon = icons[idx % icons.length];
          const isEditingThis = editingPillarId === t.id;

          return (
            <div
              key={t.id || idx}
              className="paper-card p-6 rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn transition-all duration-300 transform hover:-translate-y-1 flex flex-col relative group"
            >
              {isEditMode && !isEditingThis && (
                <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
                  <button
                    onClick={() => handleStartEditPillar(t)}
                    className="w-7 h-7 rounded-xl bg-white/90 hover:bg-brand-brown hover:text-white text-earth-700 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all"
                    title="Edit Pilar"
                  >
                    <Edit3 size={12} />
                  </button>
                  <button
                    onClick={() => deletePersonalityPillar(t.id)}
                    className="w-7 h-7 rounded-xl bg-white/90 hover:bg-rose-600 hover:text-white text-earth-600 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all"
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
                    className="paper-well w-full py-1.5 px-2.5 rounded-xl text-xs font-bold text-earth-900"
                  />
                  <textarea
                    rows={3}
                    value={pillarDesc}
                    onChange={(e) => setPillarDesc(e.target.value)}
                    className="paper-well w-full p-2.5 rounded-xl text-xs text-earth-800 resize-none"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button onClick={() => setEditingPillarId(null)} className="paper-btn px-2.5 py-1 rounded-lg text-xs font-bold text-earth-700">
                      {lang === 'id' ? 'Batal' : 'Cancel'}
                    </button>
                    <button onClick={() => handleSavePillar(t.id)} className="bg-brand-brown text-white px-3 py-1 rounded-lg text-xs font-extrabold">
                      {lang === 'id' ? 'Simpan' : 'Save'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl paper-well flex items-center justify-center text-brand-brown flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-extrabold text-sm md:text-base text-earth-900 leading-snug pr-12">
                      {t.title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-earth-800 leading-relaxed mt-auto">
                    {t.desc}
                  </p>
                </>
              )}
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
