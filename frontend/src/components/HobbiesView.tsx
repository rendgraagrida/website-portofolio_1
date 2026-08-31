import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $isGlobalEditMode } from '../stores/editMode';
import { $navMode } from '../stores/navigation';
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
  X 
} from 'lucide-react';

interface HobbiesViewProps {
  lang: 'id' | 'en';
}

export const HobbiesView: React.FC<HobbiesViewProps> = ({ lang }) => {
  const profile = useStore($profileData);
  const isEditMode = useStore($isGlobalEditMode);
  const navMode = useStore($navMode);
  const isPersonal = navMode === 'personal';

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
        <span className={`inline-flex items-center gap-1.5 px-4 py-1 text-xs font-black mb-2 ${
          isPersonal ? 'bg-[#FF007F] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-none uppercase' : 'paper-btn text-brand-brown rounded-full'
        }`}>
          <Sparkles size={13} />
          <span>{lang === 'id' ? 'Di Luar Baris Kode' : 'Beyond The Code'}</span>
        </span>
        <p className={`text-xs md:text-sm leading-relaxed ${isPersonal ? 'text-black font-semibold' : 'text-earth-800'}`}>
          {lang === 'id'
            ? 'Aktivitas, hobi, dan minat yang menjaga keseimbangan hidup, melatih kepekaan estetika, dan mengisi kembali energi dalam berkarya.'
            : 'Passions, hobbies, and pursuits that nurture life balance, refine aesthetic intuition, and energize engineering endeavors.'}
        </p>
      </div>

      {/* Edit Mode Header & Add Hobby Button */}
      {isEditMode && (
        <div className="flex items-center justify-between">
          <span className={`text-xs font-black uppercase tracking-wider ${isPersonal ? 'text-black bg-[#FFE600] px-2 py-0.5 border-2 border-black' : 'text-brand-brown'}`}>
            {lang === 'id' ? 'Daftar Hobi & Minat' : 'Hobbies & Interests'} ({profile.hobbies.length})
          </span>

          <button
            onClick={() => setIsAddingHobby(true)}
            className={`px-3.5 py-1.5 text-xs font-black flex items-center gap-1.5 ${
              isPersonal 
                ? 'bg-[#00F0FF] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-none' 
                : 'paper-btn rounded-xl text-brand-brown'
            }`}
          >
            <Plus size={13} />
            <span>{lang === 'id' ? 'Tambah Hobi' : 'Add Hobby'}</span>
          </button>
        </div>
      )}

      {/* Add New Hobby Form */}
      {isAddingHobby && (
        <form onSubmit={handleAddHobbySubmit} className={`p-6 space-y-4 ${
          isPersonal ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-none' : 'paper-card rounded-3xl bg-[#FAF8F5] border border-brand-brown/30'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-black">
            <h4 className="font-extrabold text-sm text-black uppercase tracking-wider">{lang === 'id' ? 'Tambah Hobi / Minat Baru' : 'Add New Hobby'}</h4>
            <button type="button" onClick={() => setIsAddingHobby(false)} className="text-black hover:text-red-600">
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-black mb-1">{lang === 'id' ? 'Nama Hobi' : 'Hobby Title'}</label>
              <input
                type="text"
                required
                placeholder="Contoh: Eksplorasi Musik & Gitar"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full py-2 px-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-black mb-1">{lang === 'id' ? 'Lokasi / Suasana' : 'Location / Spot'}</label>
              <input
                type="text"
                placeholder="Contoh: Home Acoustic Session"
                value={newLoc}
                onChange={(e) => setNewLoc(e.target.value)}
                className="w-full py-2 px-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-black text-black mb-1">{lang === 'id' ? 'Deskripsi Cerita' : 'Description'}</label>
              <textarea
                rows={2}
                required
                placeholder="Ceritakan mengapa aktivitas ini menyenangkan..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full py-2 px-3 border-2 border-black bg-[#F4F1EA] text-xs text-black focus:outline-none resize-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-black mb-1">{lang === 'id' ? 'Tag Kategori' : 'Category Tag'}</label>
              <input
                type="text"
                placeholder="Outdoor / Creative / Music"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="w-full py-2 px-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsAddingHobby(false)} className="px-3 py-1.5 border-2 border-black text-xs font-bold bg-white">
              {lang === 'id' ? 'Batal' : 'Cancel'}
            </button>
            <button type="submit" className="bg-black text-white px-4 py-1.5 border-2 border-black text-xs font-black shadow-[2px_2px_0px_0px_#00F0FF]">
              {lang === 'id' ? 'Simpan Hobi' : 'Save Hobby'}
            </button>
          </div>
        </form>
      )}

      {/* 4 Hobbies Grid (Dual Styled) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.hobbies.map((h, idx) => {
          const Icon = icons[idx % icons.length];
          const isEditingThis = editingHobbyId === h.id;

          return (
            <div
              key={h.id || idx}
              className={`p-6 flex flex-col justify-between relative transition-all duration-300 ${
                isPersonal 
                  ? 'bg-white border-3 border-black shadow-[6px_6px_0px_0px_#000] rounded-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]' 
                  : 'paper-card rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn hover:-translate-y-1'
              }`}
            >
              {isEditMode && !isEditingThis && (
                <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
                  <button
                    onClick={() => handleStartEdit(h)}
                    className="w-7 h-7 bg-white border border-black hover:bg-[#FFE600] text-black flex items-center justify-center transition-all shadow-[1px_1px_0px_0px_#000]"
                    title="Edit Hobi"
                  >
                    <Edit3 size={12} />
                  </button>
                  <button
                    onClick={() => deleteHobby(h.id)}
                    className="w-7 h-7 bg-white border border-black hover:bg-rose-600 hover:text-white text-black flex items-center justify-center transition-all shadow-[1px_1px_0px_0px_#000]"
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
                      className="w-full py-1.5 px-2.5 border-2 border-black text-xs font-bold text-black"
                    />
                    <input
                      type="text"
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value)}
                      placeholder="Tag"
                      className="w-full py-1.5 px-2.5 border-2 border-black text-xs font-bold text-black"
                    />
                  </div>
                  <input
                    type="text"
                    value={editLoc}
                    onChange={(e) => setEditLoc(e.target.value)}
                    placeholder="Lokasi"
                    className="w-full py-1.5 px-2.5 border-2 border-black text-xs text-black"
                  />
                  <textarea
                    rows={3}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Deskripsi"
                    className="w-full p-2.5 border-2 border-black text-xs text-black resize-none"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button onClick={() => setEditingHobbyId(null)} className="px-2.5 py-1 border border-black text-xs font-bold">
                      {lang === 'id' ? 'Batal' : 'Cancel'}
                    </button>
                    <button onClick={() => handleSaveEdit(h.id)} className="bg-black text-white px-3 py-1 text-xs font-black">
                      {lang === 'id' ? 'Simpan' : 'Save'}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 flex items-center justify-center ${
                      isPersonal ? 'bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-none' : 'rounded-2xl paper-well text-brand-brown'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 ${
                      isPersonal ? 'bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]' : 'text-brand-brown bg-white rounded-full shadow-sm border border-[#ECE7DF]'
                    }`}>
                      {h.tag}
                    </span>
                  </div>

                  <h3 className={`font-extrabold text-base leading-snug mb-1 pr-14 ${
                    isPersonal ? 'font-comic text-2xl text-black tracking-wide' : 'text-earth-900'
                  }`}>
                    {h.title}
                  </h3>

                  <p className={`text-[11px] flex items-center gap-1 mb-3 font-bold ${
                    isPersonal ? 'text-black' : 'text-earth-600'
                  }`}>
                    <MapPin size={12} className={isPersonal ? 'text-[#FF007F]' : 'text-brand-brown'} />
                    <span>{h.location}</span>
                  </p>

                  <p className={`text-xs md:text-sm leading-relaxed ${
                    isPersonal ? 'text-black font-semibold' : 'text-earth-800'
                  }`}>
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
