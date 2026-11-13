import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  User, 
  Scissors, 
  Send,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function BookingView({ 
  bookings = [], 
  onOpenBookingModal, 
  settings 
}) {
  const [searchCode, setSearchCode] = useState('');
  const [searchedBooking, setSearchedBooking] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const term = searchCode.trim().toLowerCase();
    const found = bookings.find(
      b => b.id.toLowerCase() === term || b.phone.includes(term) || b.customerName.toLowerCase().includes(term)
    );

    setSearchedBooking(found || null);
    setHasSearched(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">Dikonfirmasi (Siap)</span>;
      case 'completed':
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs font-bold">Selesai Cukur</span>;
      case 'cancelled':
        return <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold">Dibatalkan</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold">Menunggu Konfirmasi</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header & Main CTA */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Sistem Reservasi & Antrean Pintar</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-black text-white">
          Booking Cukur Rambut Online
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Nikmati pengalaman pangkas rambut tanpa waktu tunggu. Pilih kapster favorit, tentukan waktu kunjungan, dan dapatkan konfirmasi instan langsung ke WhatsApp Anda.
        </p>

        <div className="pt-2">
          <button
            onClick={onOpenBookingModal}
            className="px-8 py-4 rounded-2xl bg-gold-gradient text-zinc-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Buat Jadwal Booking Sekarang</span>
          </button>
        </div>
      </div>

      {/* TRACKING BOOKING TICKET BOX */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="text-center max-w-md mx-auto">
          <h3 className="font-serif-luxury text-xl font-bold text-white">Cek Status Reservasi Anda</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Masukkan Kode Booking (contoh: <span className="text-amber-400 font-mono">BOK-9421</span>) atau Nomor WhatsApp Anda.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Contoh: BOK-9421 atau 0812..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-colors shrink-0"
          >
            Cek Tiket
          </button>
        </form>

        {/* Search Result Ticket Card */}
        {hasSearched && (
          <div className="max-w-xl mx-auto pt-2">
            {searchedBooking ? (
              <div className="bg-zinc-950 border-2 border-dashed border-amber-500/40 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-[11px] text-zinc-500 block">Kode Reservasi:</span>
                    <h4 className="font-mono text-base font-bold text-amber-400">{searchedBooking.id}</h4>
                  </div>
                  <div>
                    {getStatusBadge(searchedBooking.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Nama Pelanggan:</span>
                    <strong className="text-white text-sm">{searchedBooking.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Nomor WhatsApp:</span>
                    <strong className="text-white text-sm">{searchedBooking.phone}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Paket Layanan:</span>
                    <strong className="text-white">{searchedBooking.service}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Model Cukuran:</span>
                    <strong className="text-amber-400">{searchedBooking.haircutStyle}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Barber Pilihan:</span>
                    <strong className="text-white">{searchedBooking.barberName}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Jadwal Tanggal & Jam:</span>
                    <strong className="text-white">{searchedBooking.date} • {searchedBooking.timeSlot} WIB</strong>
                  </div>
                </div>

                {searchedBooking.notes && (
                  <div className="p-3 bg-zinc-900 rounded-xl text-xs text-zinc-400 border border-zinc-800">
                    <span className="text-zinc-500 font-semibold block">Catatan Anda:</span>
                    "{searchedBooking.notes}"
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a
                    href={`https://wa.me/${settings?.whatsapp || '6281234567890'}?text=Halo%20Admin,%20saya%20mau%20konfirmasi/reschedule%20jadwal%20booking%20${searchedBooking.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Hubungi CS WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 text-center text-xs text-zinc-400">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p>Data booking dengan kata kunci "{searchCode}" tidak ditemukan.</p>
                <p className="text-[11px] text-zinc-500 mt-1">Pastikan kode booking atau nomor WhatsApp sudah sesuai.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* WHY BOOK ONLINE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base">Hemat Waktu 100%</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Tidak perlu membuang waktu menunggu giliran di kursi tunggu. Datang sesuai jam yang telah dipesan dan kursi Anda sudah siap.
          </p>
        </div>

        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Scissors className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base">Pilih Barber Idola</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Pilih kapster yang paling mengerti model rambut dan bentuk kepala Anda, dari Chief Mill hingga stylist spesialis fade lainnya.
          </p>
        </div>

        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base">Konsultasi Sebelum Cukur</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Bisa melampirkan foto model rambut pilihan Anda langsung di formulir booking agar barber langsung paham ekspektasi Anda.
          </p>
        </div>
      </div>

    </div>
  );
}
