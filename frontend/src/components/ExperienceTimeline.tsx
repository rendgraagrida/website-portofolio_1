import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $isGlobalEditMode } from '../stores/editMode';
import { 
  $experiences, 
  addExperience, 
  updateExperience, 
  deleteExperience, 
  resetExperiences,
  type ExperienceItemData 
} from '../stores/experience';
import { 
  Briefcase, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Target,
  Edit3,
  Trash2,
  Plus,
  RotateCcw,
  X,
  MapPin,
  Tag
} from 'lucide-react';
import { ui } from '../i18n/ui';

interface TimelineProps {
  lang: 'id' | 'en';
}

export const ExperienceTimeline: React.FC<TimelineProps> = ({ lang }) => {
  const t = ui[lang];
  const experiences = useStore($experiences);
  const isEditMode = useStore($isGlobalEditMode);

  const [expandedDesks, setExpandedDesks] = useState<Record<string, boolean>>({
    'exp-1': true,
    'telkomsigma-tech-lead-0': true
  });

  // Edit Experience State
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editPeriod, setEditPeriod] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editBulletsText, setEditBulletsText] = useState('');
  const [editSkillsText, setEditSkillsText] = useState('');

  // Add Experience Form State
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPeriod, setNewPeriod] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newBulletsText, setNewBulletsText] = useState('');
  const [newSkillsText, setNewSkillsText] = useState('');

  const toggleDesk = (id: string) => {
    setExpandedDesks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStartEdit = (exp: ExperienceItemData) => {
    setEditingExpId(exp.id);
    setEditRole(exp.role);
    setEditCompany(exp.company);
    setEditPeriod(exp.period);
    setEditLocation(exp.location || '');
    setEditSummary(exp.summary || '');
    setEditBulletsText((exp.bullets || []).join('\n'));
    setEditSkillsText((exp.skills || []).join(', '));
  };

  const handleSaveEdit = (id: string) => {
    if (!editRole.trim() || !editCompany.trim()) return;

    const bullets = editBulletsText
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const skills = editSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    updateExperience(id, {
      role: editRole.trim(),
      company: editCompany.trim(),
      period: editPeriod.trim(),
      location: editLocation.trim(),
      summary: editSummary.trim(),
      bullets,
      skills
    });

    setEditingExpId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.trim() || !newCompany.trim()) return;

    const bullets = newBulletsText
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const skills = newSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    addExperience({
      role: newRole.trim(),
      company: newCompany.trim(),
      period: newPeriod.trim() || '2024 - Sekarang',
      location: newLocation.trim() || 'Indonesia',
      summary: newSummary.trim(),
      bullets: bullets.length > 0 ? bullets : ['Memimpin proyek rekayasa perangkat lunak dan arsitektur database enterprise.'],
      skills: skills.length > 0 ? skills : ['Database', 'Engineering']
    });

    setNewRole('');
    setNewCompany('');
    setNewPeriod('');
    setNewLocation('');
    setNewSummary('');
    setNewBulletsText('');
    setNewSkillsText('');
    setIsAddingExp(false);
  };

  return (
    <section id="pengalaman" className="py-12 select-none">
      <div className="max-w-5xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full paper-btn text-earth-800 text-xs font-extrabold mb-3">
            <Briefcase size={14} className="text-brand-brown" />
            <span>Professional Career Track</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-earth-900 mb-2 tracking-tight">
            {t['experience.title']}
          </h2>
          <p className="text-earth-800 text-base md:text-lg">
            {t['experience.desc']}
          </p>
        </div>

        {/* Add Experience Button (Visible during Edit Mode) */}
        {isEditMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingExp(true)}
              className="paper-btn px-4 py-2 rounded-2xl text-xs font-extrabold text-brand-brown hover:text-earth-900 flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={14} />
              <span>{lang === 'id' ? 'Tambah Pengalaman' : 'Add Experience'}</span>
            </button>
            <button
              onClick={() => {
                if (confirm(lang === 'id' ? 'Reset data riwayat karier ke default?' : 'Reset experiences to default?')) {
                  resetExperiences();
                }
              }}
              className="paper-btn p-2 rounded-xl text-xs font-bold text-earth-600 hover:text-brand-brown"
              title="Reset Default"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Add New Experience Modal / Form */}
      {isAddingExp && (
        <div className="max-w-5xl mx-auto px-6 mb-10">
          <form onSubmit={handleAddSubmit} className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] border border-brand-brown/30 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DF]">
              <h4 className="font-extrabold text-base text-earth-900">{lang === 'id' ? 'Tambah Pengalaman Karier Baru' : 'Add New Career Experience'}</h4>
              <button type="button" onClick={() => setIsAddingExp(false)} className="text-earth-500 hover:text-earth-900">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-earth-900 mb-1">{lang === 'id' ? 'Posisi / Role' : 'Position / Role'}</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Lead Software Engineer"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-earth-900 mb-1">{lang === 'id' ? 'Nama Perusahaan' : 'Company Name'}</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT. Inovasi Teknologi Nusantara"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-earth-900 mb-1">{lang === 'id' ? 'Periode Waktu' : 'Time Period'}</label>
                <input
                  type="text"
                  placeholder="Contoh: 2022 - Sekarang (2+ Tahun)"
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value)}
                  className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-earth-900 mb-1">{lang === 'id' ? 'Lokasi' : 'Location'}</label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta & Remote"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-earth-900 mb-1">{lang === 'id' ? 'Ringkasan Tanggung Jawab' : 'Summary'}</label>
              <textarea
                rows={2}
                placeholder="Gambaran umum kontribusi dan cakupan kepemimpinan teknis..."
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-earth-900 mb-1">{lang === 'id' ? 'Poin-Poin Pencapaian / Tugas (1 baris per poin)' : 'Key Tasks & Achievements (1 per line)'}</label>
              <textarea
                rows={4}
                placeholder="Memimpin perancangan arsitektur microservices...&#10;Mengoptimasi performa database dengan kenaikan 40%..."
                value={newBulletsText}
                onChange={(e) => setNewBulletsText(e.target.value)}
                className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none resize-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-earth-900 mb-1">{lang === 'id' ? 'Skills / Tech Stack (Pisahkan dengan koma)' : 'Skills / Tech Stack (Comma separated)'}</label>
              <input
                type="text"
                placeholder="Oracle DB, Python, Docker, CI/CD"
                value={newSkillsText}
                onChange={(e) => setNewSkillsText(e.target.value)}
                className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsAddingExp(false)} className="paper-btn px-4 py-2 rounded-xl text-xs font-bold text-earth-700">
                {lang === 'id' ? 'Batal' : 'Cancel'}
              </button>
              <button type="submit" className="bg-brand-brown text-white px-5 py-2 rounded-xl text-xs font-extrabold shadow-sm">
                {lang === 'id' ? 'Simpan Pengalaman' : 'Save Experience'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline List */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative border-l-2 border-[#DCD5C9] ml-4 md:ml-6 space-y-12 pb-8">
          {experiences.map((exp) => {
            const isEditingThis = editingExpId === exp.id;
            const isExpanded = expandedDesks[exp.id] ?? true;

            return (
              <div key={exp.id} className="relative pl-8 md:pl-12">
                
                {/* Timeline Dot */}
                <div className="absolute w-7 h-7 paper-btn rounded-full -left-[15px] top-1 flex items-center justify-center text-brand-brown">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-brown shadow-inner"></div>
                </div>

                {/* Edit & Delete Controls in Edit Mode */}
                {isEditMode && !isEditingThis && (
                  <div className="absolute top-0 right-0 flex items-center gap-1.5 z-10">
                    <button
                      onClick={() => handleStartEdit(exp)}
                      className="w-7 h-7 rounded-xl bg-white/90 hover:bg-brand-brown hover:text-white text-earth-700 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all"
                      title="Edit Pengalaman"
                    >
                      <Edit3 size={12} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(lang === 'id' ? 'Hapus riwayat pengalaman ini?' : 'Delete this experience?')) {
                          deleteExperience(exp.id);
                        }
                      }}
                      className="w-7 h-7 rounded-xl bg-white/90 hover:bg-rose-600 hover:text-white text-earth-600 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all"
                      title="Hapus Pengalaman"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}

                {/* Inline Editing Mode */}
                {isEditingThis ? (
                  <div className="paper-card p-6 rounded-3xl bg-[#FAF8F5] border border-brand-brown/40 shadow-md space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        placeholder="Posisi"
                        className="paper-well w-full py-1.5 px-3 rounded-xl text-xs font-bold text-earth-900"
                      />
                      <input
                        type="text"
                        value={editCompany}
                        onChange={(e) => setEditCompany(e.target.value)}
                        placeholder="Perusahaan"
                        className="paper-well w-full py-1.5 px-3 rounded-xl text-xs font-bold text-earth-900"
                      />
                      <input
                        type="text"
                        value={editPeriod}
                        onChange={(e) => setEditPeriod(e.target.value)}
                        placeholder="Periode"
                        className="paper-well w-full py-1.5 px-3 rounded-xl text-xs text-earth-800"
                      />
                      <input
                        type="text"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        placeholder="Lokasi"
                        className="paper-well w-full py-1.5 px-3 rounded-xl text-xs text-earth-800"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={editSummary}
                      onChange={(e) => setEditSummary(e.target.value)}
                      placeholder="Ringkasan tugas..."
                      className="paper-well w-full py-1.5 px-3 rounded-xl text-xs text-earth-800 resize-none"
                    />
                    <textarea
                      rows={4}
                      value={editBulletsText}
                      onChange={(e) => setEditBulletsText(e.target.value)}
                      placeholder="Poin-poin tugas (1 baris per poin)..."
                      className="paper-well w-full py-1.5 px-3 rounded-xl text-xs text-earth-800 resize-none font-mono"
                    />
                    <input
                      type="text"
                      value={editSkillsText}
                      onChange={(e) => setEditSkillsText(e.target.value)}
                      placeholder="Skills (koma)..."
                      className="paper-well w-full py-1.5 px-3 rounded-xl text-xs text-earth-800"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                      <button onClick={() => setEditingExpId(null)} className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-earth-700">
                        {lang === 'id' ? 'Batal' : 'Cancel'}
                      </button>
                      <button onClick={() => handleSaveEdit(exp.id)} className="bg-brand-brown text-white px-4 py-1.5 rounded-xl text-xs font-extrabold">
                        {lang === 'id' ? 'Simpan' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="mb-4 pr-16">
                      <h3 className="text-2xl font-extrabold text-earth-900 tracking-tight">{exp.role}</h3>
                      <div className="flex flex-wrap items-center text-earth-800 mt-2 gap-3 md:gap-5 font-medium">
                        <span className="font-extrabold text-brand-brown text-base">{exp.company}</span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-earth-600 bg-[#ECE7DF] px-3 py-1 rounded-full shadow-inner">
                          <Calendar size={13} className="text-brand-brown" />
                          <span>{exp.period}</span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1 text-xs text-earth-600 font-medium">
                            <MapPin size={12} className="text-brand-brown" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                      {exp.summary && (
                        <p className="text-xs md:text-sm text-earth-700 mt-2 leading-relaxed max-w-3xl">
                          {exp.summary}
                        </p>
                      )}
                    </div>

                    {/* Expandable Details Card */}
                    <div className="paper-card rounded-2xl overflow-hidden transition-all duration-300">
                      <button 
                        onClick={() => toggleDesk(exp.id)}
                        className="w-full text-left px-6 py-3.5 flex items-center justify-between hover:bg-[#F3EFE7] focus:outline-none transition-colors"
                      >
                        <span className="font-extrabold text-sm md:text-base text-earth-900 flex items-center gap-2">
                          <Target size={16} className="text-brand-brown" />
                          <span>{t['experience.responsibilities']} &amp; Pencapaian</span>
                        </span>
                        <div className="w-7 h-7 rounded-xl paper-btn flex items-center justify-center text-brand-brown flex-shrink-0">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 pt-2 border-t border-[#ECE7DF] space-y-4">
                          <ul className="space-y-2.5">
                            {(exp.bullets || []).map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-3 text-earth-800 text-xs md:text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-brown mt-2 flex-shrink-0"></span>
                                <span className="leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech Stack Pills */}
                          {(exp.skills || []).length > 0 && (
                            <div className="pt-3 border-t border-[#ECE7DF] flex flex-wrap items-center gap-1.5">
                              {exp.skills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-[10px] font-bold text-brand-brown bg-[#ECE7DF] px-2.5 py-0.5 rounded-md shadow-inner">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
