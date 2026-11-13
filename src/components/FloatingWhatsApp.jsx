import React, { useState } from 'react';
import { MessageSquare, X, Send, Scissors, BookOpen, Clock, Phone, UserCheck } from 'lucide-react';

export default function FloatingWhatsApp({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Kontak 2 Admin Resmi
  const admin1 = settings?.admin1 || {
    name: "Admin 1 (Reservasi & Booking)",
    phone: "082291544262",
    whatsapp: "6282291544262",
    role: "Layanan Booking, Kasir & Antrean"
  };

  const admin2 = settings?.admin2 || {
    name: "Admin 2 (Academy & Konsultasi)",
    phone: "082191843162",
    whatsapp: "6282191843162",
    role: "Pendaftaran Kursus Barber & Bisnis"
  };

  const [selectedAdmin, setSelectedAdmin] = useState('admin1'); // 'admin1' or 'admin2'

  const activeNumber = selectedAdmin === 'admin1' ? admin1.whatsapp : admin2.whatsapp;

  const quickMessages = [
    {
      title: 'Booking Cukur Rambut',
      adminTarget: 'admin1',
      icon: Scissors,
      text: 'Halo Admin 1 Barbershop AA\'MILL! Saya ingin cek ketersediaan slot pangkas rambut hari ini.'
    },
    {
      title: 'Konsultasi Kursus Barber Academy',
      adminTarget: 'admin2',
      icon: BookOpen,
      text: 'Halo Admin 2 AA\'MILL Barber Academy! Saya tertarik mendaftar program kursus barber, boleh minta info biaya dan jadwal angkatan terdekat?'
    },
    {
      title: 'Tanya Alamat & Info Lokasi',
      adminTarget: 'admin1',
      icon: Clock,
      text: 'Halo, saya mau berkunjung ke Barbershop AA\'MILL sekarang, apakah masih ada antrean?'
    }
  ];

  const handleSend = (text, targetAdmin = null) => {
    const wa = targetAdmin === 'admin2' ? admin2.whatsapp : (targetAdmin === 'admin1' ? admin1.whatsapp : activeNumber);
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${wa}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Quick Message Bubble */}
      {isOpen && (
        <div className="mb-3 w-88 max-w-[92vw] bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Chat Resmi AA'MILL</h4>
                <p className="text-[11px] text-emerald-100">Pilih Admin Tujuan Anda (Online)</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Choice Tabs */}
          <div className="p-3 bg-zinc-950 border-b border-zinc-800 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setSelectedAdmin('admin1')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedAdmin === 'admin1'
                  ? 'bg-emerald-500/15 border-emerald-500 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="font-bold text-emerald-400 block truncate">Admin 1 (Booking)</span>
              <span className="text-[10px] text-zinc-400 block font-mono">{admin1.phone}</span>
            </button>

            <button
              onClick={() => setSelectedAdmin('admin2')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedAdmin === 'admin2'
                  ? 'bg-emerald-500/15 border-emerald-500 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="font-bold text-amber-400 block truncate">Admin 2 (Academy)</span>
              <span className="text-[10px] text-zinc-400 block font-mono">{admin2.phone}</span>
            </button>
          </div>

          {/* Quick Message Options */}
          <div className="p-4 bg-zinc-950 space-y-2">
            <p className="text-[11px] text-zinc-400 mb-2">Pilih pesan cepat WhatsApp:</p>
            {quickMessages.map((qm, i) => {
              const Icon = qm.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleSend(qm.text, qm.adminTarget)}
                  className="w-full text-left p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 transition-all flex items-center gap-3 text-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <strong className="text-white block truncate">{qm.title}</strong>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                        {qm.adminTarget === 'admin1' ? 'Adm 1' : 'Adm 2'}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 line-clamp-1">{qm.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Direct WhatsApp Call */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Langsung chat:</span>
            <a
              href={`https://wa.me/${activeNumber}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Buka WhatsApp</span>
            </a>
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all group"
        title="Hubungi Admin 1 atau Admin 2"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-zinc-900 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-zinc-900"></span>
      </button>
    </div>
  );
}
