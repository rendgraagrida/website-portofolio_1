import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $isGlobalEditMode } from '../stores/editMode';
import { 
  $profileData, 
  addHobby, 
  updateHobby, 
  deleteHobby,
  type HobbyItem 
} from '../stores/profile';
import { 
  Mountain, 
  Camera, 
  Coffee, 
  Heart, 
  Sparkles,
  MapPin,
  Edit3,
  Trash2,
  Plus,
  Check,
  X
} from 'lucide-react';

interface HobbiesViewProps {
  lang: 'id' | 'en';
}

export const HobbiesView: React.FC<HobbiesViewProps> = ({ lang }) => {
  const profile = useStore($profileData);
  const isEditMode = useStore($isGlobalEditMode);

  // Hobby Edit State
  const [editingHobbyId, setEditingHobbyId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editLoc, setEditLoc] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editTag, setEditTag] = useState('');

  // New Hobby Form State
  const [isAddingHobby, setIsAddingHobby] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLoc, setNewLoc] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('Lifestyle');

  const icons = [Mountain, Camera, Coffee, Heart];

  const handleStartEdit = (h: HobbyItem) => {
    setEditingHobbyId(h.id);
    setEditTitle(h.title);
    setEditLoc(h.location);
    setEditDesc(h.desc);
    setEditTag(h.tag);
  };

  const handleSaveEdit = (id: string) => {
    if (!editTitle.trim()) return;
    updateHobby(id, {
      title: editTitle.trim(),
      location: editLoc.trim(),
      desc: editDesc.trim(),
      tag: editTag.trim() || 'Interest'
    });
    setEditingHobbyId(null);
  };

  const handleAddHobbySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addHobby({
      title: newTitle.trim(),
      location: newLoc.trim() || 'Everyday Life',
      desc: newDesc.trim(),
      tag: newTag.trim() || 'Hobby'
    });
    setNewTitle('');
    setNewLoc('');
    setNewDesc('');
    setIsAddingHobby(false);
  };

  return (
    <div className="space-y-8 animate-fade-in select-none">
      
      {/* Intro Header */}
      <div className="text-center max-w-xl mx-auto mb-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full paper-btn text-brand-brown text-xs font-black mb-2">
          <Sparkles size={13} />
          <span>{lang === 'id' ? 'Di Luar Baris Kode' : 'Beyond The Code'}</span>
        </span>
        <p className="text-earth-800 text-xs md:text-sm leading-relaxed">
          {lang === 'id'
            ? 'Aktivitas, hobi, dan minat yang menjaga keseimbangan hidup, melatih kepekaan estetika, dan mengisi kembali energi dalam berkarya.'
            : 'Passions, hobbies, and pursuits that nurture life balance, refine aesthetic intuition, and energize engineering endeavors.'}
        </p>
      </div>

      {/* Edit Mode Header & Add Hobby Button */}
      {isEditMode && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-brand-brown uppercase tracking-wider">
            {lang === 'id' ? 'Daftar Hobi & Minat' : 'Hobbies & Interests'} ({profile.hobbies.length})
          </span>

          <button
            onClick={() => setIsAddingHobby(true)}
            className="paper-btn px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-brand-brown hover:text-earth-900 flex items-center gap-1.5"
          >
            <Plus size={13} />
            <span>{lang === 'id' ? 'Tambah Hobi' : 'Add Hobby'}</span>
          </button>
        </div>
      )}

      {/* Add New Hobby Form */}
      {isAddingHobby && (
        <form onSubmit={handleAddHobbySubmit} className="paper-card p-6 rounded-3xl bg-[#FAF8F5] border border-brand-brown/30 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#ECE7DF]">
            <h4 className="font-extrabold text-sm text-earth-900">{lang === 'id' ? 'Tambah Hobi / Minat Baru' : 'Add New Hobby'}</h4>
            <button type="button" onClick={() => setIsAddingHobby(false)} className="text-earth-500 hover:text-earth-900">
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-earth-800 mb-1">{lang === 'id' ? 'Nama Hobi' : 'Hobby Title'}</label>
              <input
                type="text"
                required
                placeholder="Contoh: Eksplorasi Musik & Gitar"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-earth-800 mb-1">{lang === 'id' ? 'Lokasi / Suasana' : 'Location / Spot'}</label>
              <input
                type="text"
                placeholder="Contoh: Home Acoustic Session"
                value={newLoc}
                onChange={(e) => setNewLoc(e.target.value)}
                className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-earth-800 mb-1">{lang === 'id' ? 'Deskripsi Cerita' : 'Description'}</label>
              <textarea
                rows={2}
                required
                placeholder="Ceritakan mengapa aktivitas ini menyenangkan..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-earth-800 mb-1">{lang === 'id' ? 'Tag Kategori' : 'Category Tag'}</label>
              <input
                type="text"
                placeholder="Outdoor / Creative / Music"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="paper-well w-full py-2 px-3 rounded-xl text-xs text-earth-900 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsAddingHobby(false)} className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-earth-700">
              {lang === 'id' ? 'Batal' : 'Cancel'}
            </button>
            <button type="submit" className="bg-brand-brown text-white px-4 py-1.5 rounded-xl text-xs font-extrabold shadow-sm">
              {lang === 'id' ? 'Simpan Hobi' : 'Save Hobby'}
            </button>
          </div>
        </form>
      )}

      {/* 4 Hobbies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.hobbies.map((h, idx) => {
          const Icon = icons[idx % icons.length];
          const isEditingThis = editingHobbyId === h.id;

          return (
            <div
              key={h.id || idx}
              className="paper-card p-6 rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between relative group"
            >
              {isEditMode && !isEditingThis && (
                <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
                  <button
                    onClick={() => handleStartEdit(h)}
                    className="w-7 h-7 rounded-xl bg-white/90 hover:bg-brand-brown hover:text-white text-earth-700 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all"
                    title="Edit Hobi"
                  >
                    <Edit3 size={12} />
                  </button>
                  <button
                    onClick={() => deleteHobby(h.id)}
                    className="w-7 h-7 rounded-xl bg-white/90 hover:bg-rose-600 hover:text-white text-earth-600 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all"
                    title="Hapus Hobi"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )}

              {isEditingThis ? (
                <div className="space-y-3 flex-1">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Judul Hobi"
                      className="paper-well w-full py-1.5 px-2.5 rounded-xl text-xs font-bold text-earth-900"
                    />
                    <input
                      type="text"
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value)}
                      placeholder="Tag"
                      className="paper-well w-full py-1.5 px-2.5 rounded-xl text-xs font-bold text-earth-900"
                    />
                  </div>
                  <input
                    type="text"
                    value={editLoc}
                    onChange={(e) => setEditLoc(e.target.value)}
                    placeholder="Lokasi"
                    className="paper-well w-full py-1.5 px-2.5 rounded-xl text-xs text-earth-800"
                  />
                  <textarea
                    rows={3}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Deskripsi"
                    className="paper-well w-full p-2.5 rounded-xl text-xs text-earth-800 resize-none"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button onClick={() => setEditingHobbyId(null)} className="paper-btn px-2.5 py-1 rounded-lg text-xs font-bold text-earth-700">
                      {lang === 'id' ? 'Batal' : 'Cancel'}
                    </button>
                    <button onClick={() => handleSaveEdit(h.id)} className="bg-brand-brown text-white px-3 py-1 rounded-lg text-xs font-extrabold">
                      {lang === 'id' ? 'Simpan' : 'Save'}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl paper-well flex items-center justify-center text-brand-brown">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-brown bg-white px-2.5 py-1 rounded-full shadow-sm border border-[#ECE7DF]">
                      {h.tag}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-earth-900 leading-snug mb-1 pr-14">
                    {h.title}
                  </h3>

                  <p className="text-[11px] text-earth-600 flex items-center gap-1 mb-3 font-medium">
                    <MapPin size={12} className="text-brand-brown" />
                    <span>{h.location}</span>
                  </p>

                  <p className="text-xs md:text-sm text-earth-800 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
