import React, { useState } from 'react';
import { MessageSquare, X, Send, Scissors, BookOpen, Clock } from 'lucide-react';

export default function FloatingWhatsApp({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const waNumber = settings?.whatsapp || '6281234567890';

  const quickMessages = [
    {
      title: 'Booking Cukur Rambut',
      icon: Scissors,
      text: 'Halo Admin AA\'MILL! Saya mau tanya ketersediaan slot potong rambut hari ini.'
    },
    {
      title: 'Konsultasi Kursus Barber',
      icon: BookOpen,
      text: 'Halo Admin Academy! Saya berminat ikut kursus barber AA\'MILL, boleh minta info jadwal dan biayanya?'
    },
    {
      title: 'Alamat & Jam Buka',
      icon: Clock,
      text: 'Halo, saya mau mampir ke Barbershop AA\'MILL sekarang, apakah masih buka?'
    }
  ];

  const handleSend = (text) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Quick Message Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Chat Barbershop AA'MILL</h4>
                <p className="text-[11px] text-emerald-100">Online — Siap Membantu Anda</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-zinc-950 space-y-2.5">
            <p className="text-xs text-zinc-400 mb-2">Pilih pesan cepat WhatsApp:</p>
            {quickMessages.map((qm, i) => {
              const Icon = qm.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleSend(qm.text)}
                  className="w-full text-left p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 transition-all flex items-center gap-3 text-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">{qm.title}</strong>
                    <span className="text-[11px] text-zinc-400 line-clamp-1">{qm.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all group"
        title="Hubungi Kami di WhatsApp"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-zinc-900 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-zinc-900"></span>
      </button>
    </div>
  );
}
