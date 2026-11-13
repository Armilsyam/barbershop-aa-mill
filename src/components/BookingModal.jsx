import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Scissors, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ 
  isOpen, 
  onClose, 
  preselectedHaircut = null, 
  services = [], 
  barbers = [], 
  haircuts = [],
  onBookingCreated,
  settings
}) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [createdBooking, setCreatedBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Available time slots
  const TIME_SLOTS = [
    '09:30', '10:30', '11:30', '13:00', '14:00', '15:00', 
    '16:00', '17:00', '18:30', '19:30', '20:30', '21:00'
  ];

  // Set defaults when opening modal
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMsg('');
      setCreatedBooking(null);
      // Preselect default date (today or tomorrow)
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
      if (preselectedHaircut) {
        setSelectedHaircut(preselectedHaircut);
      }
      if (services.length > 0 && !selectedService) {
        setSelectedService(services[0]);
      }
      if (barbers.length > 0 && !selectedBarber) {
        setSelectedBarber(barbers[0]);
      }
    }
  }, [isOpen, preselectedHaircut, services, barbers]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 1 && !selectedService) {
      setErrorMsg('Silakan pilih salah satu layanan.');
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      setErrorMsg('Silakan pilih tanggal dan jam kunjungan.');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setStep(step - 1);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg('Mohon lengkapi nama dan nomor WhatsApp Anda.');
      return;
    }

    const bookingPayload = {
      customerName: customerName.trim(),
      phone: customerPhone.trim(),
      service: selectedService?.name || 'Haircut',
      haircutStyle: selectedHaircut?.title || 'Konsultasi di Tempat',
      barberId: selectedBarber?.id || 'b1',
      barberName: selectedBarber?.name || 'Barber AA\'MILL',
      date: selectedDate,
      timeSlot: selectedTime || '14:00',
      totalPrice: selectedService?.price || 65000,
      notes: customerNotes.trim()
    };

    const newBooking = onBookingCreated(bookingPayload);
    setCreatedBooking(newBooking);
    setStep(5); // Success step

    // Celebrate with confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect');
    }
  };

  const [targetAdmin, setTargetAdmin] = useState('admin1'); // 'admin1' or 'admin2'

  const generateWhatsAppUrl = () => {
    if (!createdBooking) return '#';
    const admin1Wa = settings?.admin1?.whatsapp || '6282291544262';
    const admin2Wa = settings?.admin2?.whatsapp || '6282191843162';
    const waPhone = targetAdmin === 'admin2' ? admin2Wa : admin1Wa;

    const message = `Halo Admin ${targetAdmin === 'admin2' ? '2' : '1'} Barbershop AA'MILL! 💈%0A%0ASaya ingin konfirmasi booking online:%0A----------------------------%0A📋 *Kode Booking:* ${createdBooking.id}%0A👤 *Nama:* ${createdBooking.customerName}%0A📱 *WhatsApp:* ${createdBooking.phone}%0A✂️ *Layanan:* ${createdBooking.service}%0A💈 *Model Cukuran:* ${createdBooking.haircutStyle}%0A👨‍🦰 *Barber:* ${createdBooking.barberName}%0A📅 *Tanggal:* ${createdBooking.date}%0A⏰ *Jam:* ${createdBooking.timeSlot} WIB%0A💵 *Estimasi Biaya:* Rp ${createdBooking.totalPrice?.toLocaleString('id-ID')}%0A📝 *Catatan:* ${createdBooking.notes || '-'}%0A----------------------------%0AMohon konfirmasi ketersediaan kursi. Terima kasih!`;
    return `https://wa.me/${waPhone}?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700/80 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-6 relative transition-all">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-white">Reservasi Cukur Online</h3>
              <p className="text-xs text-zinc-400">Barbershop AA'MILL — Tanpa Antre, Pasti Nyaman</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (1 to 4) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs">
            <span className={`font-semibold ${step >= 1 ? 'text-amber-400' : 'text-zinc-500'}`}>
              1. Layanan
            </span>
            <span className="text-zinc-600">→</span>
            <span className={`font-semibold ${step >= 2 ? 'text-amber-400' : 'text-zinc-500'}`}>
              2. Barber & Gaya
            </span>
            <span className="text-zinc-600">→</span>
            <span className={`font-semibold ${step >= 3 ? 'text-amber-400' : 'text-zinc-500'}`}>
              3. Jadwal & Jam
            </span>
            <span className="text-zinc-600">→</span>
            <span className={`font-semibold ${step >= 4 ? 'text-amber-400' : 'text-zinc-500'}`}>
              4. Kontak Diri
            </span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Content Bodies */}
        <div className="p-6">

          {/* STEP 1: Pilih Layanan */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Langkah 1: Pilih Paket Layanan
                </h4>
                <span className="text-xs text-amber-400">Termasuk konsultasi gratis</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {services.map((svc) => {
                  const isSelected = selectedService?.id === svc.id;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => setSelectedService(svc)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/10' 
                          : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400">
                          {svc.duration}
                        </span>
                        {svc.popular && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-black">
                            Favorit
                          </span>
                        )}
                      </div>
                      <h5 className="font-semibold text-white text-sm">{svc.name}</h5>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {svc.description}
                      </p>
                      <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                        <span className="text-xs text-zinc-500">Tarif</span>
                        <span className="text-sm font-bold text-amber-400">
                          Rp {svc.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Pilih Barber & Model Cukuran */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Barber Selector */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Pilih Barber / Kapster Pilihan Anda
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {barbers.map((b) => {
                    const isSelected = selectedBarber?.id === b.id;
                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBarber(b)}
                        className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-amber-500/15 border-amber-500 shadow-md' 
                            : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <img 
                          src={b.avatarUrl} 
                          alt={b.name} 
                          className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-zinc-700"
                        />
                        <h6 className="text-xs font-bold text-white truncate">{b.name}</h6>
                        <p className="text-[10px] text-amber-400 font-medium">★ {b.rating} ({b.experience})</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Haircut Style Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Model Rambut yang Diinginkan
                  </h4>
                  <span className="text-[11px] text-zinc-400">Opsional</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[160px] overflow-y-auto pr-1">
                  <div
                    onClick={() => setSelectedHaircut(null)}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                      selectedHaircut === null 
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Scissors className="w-5 h-5 mb-1 text-zinc-400" />
                    <span className="text-xs font-medium">Konsultasi di Tempat</span>
                  </div>

                  {haircuts.map((hc) => {
                    const isSelected = selectedHaircut?.id === hc.id;
                    return (
                      <div
                        key={hc.id}
                        onClick={() => setSelectedHaircut(hc)}
                        className={`p-2 rounded-xl border cursor-pointer transition-all flex items-center gap-2 ${
                          isSelected 
                            ? 'bg-amber-500/15 border-amber-500 text-white' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                        }`}
                      >
                        <img 
                          src={hc.imageUrl} 
                          alt={hc.title} 
                          className="w-9 h-9 rounded-lg object-cover shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold truncate">{hc.title}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{hc.category}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Jadwal & Jam */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Pilih Tanggal Kunjungan
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Pilih Slot Jam Tersedia
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                          isSelected 
                            ? 'bg-gold-gradient text-zinc-950 border-amber-400 font-bold shadow-md' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot} WIB</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Kontak Diri & Konfirmasi */}
          {step === 4 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 mb-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Layanan:</span>
                  <span className="text-white font-semibold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Model Rambut:</span>
                  <span className="text-amber-400 font-semibold">{selectedHaircut?.title || 'Konsultasi di Tempat'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Barber:</span>
                  <span className="text-white font-semibold">{selectedBarber?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Waktu:</span>
                  <span className="text-white font-semibold">{selectedDate} — Pukul {selectedTime} WIB</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm">
                  <span className="text-zinc-400 font-bold">Total Pembayaran:</span>
                  <span className="text-amber-400 font-bold">Rp {selectedService?.price.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Nama Lengkap <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Derry Firmansyah"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Nomor WhatsApp Aktif <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Catatan Khusus ke Barber (Opsional)
                </label>
                <textarea
                  rows="2"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Contoh: Kulit agak sensitif, jangan terlalu tipis bagian samping."
                  className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all mt-3"
              >
                Konfirmasi & Simpan Reservasi
              </button>
            </form>
          )}

          {/* STEP 5: SUCCESS TICKET & WHATSAPP SEND */}
          {step === 5 && createdBooking && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-serif-luxury text-2xl font-bold text-white">Booking Berhasil Dibuat!</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  ID Booking: <strong className="text-amber-400 font-mono text-sm">{createdBooking.id}</strong>
                </p>
              </div>

              {/* Virtual Barber Ticket */}
              <div className="bg-zinc-950 border-2 border-dashed border-amber-500/40 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2 text-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-zinc-950 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">
                  Confirmed Slot
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Nama Pelanggan:</span>
                  <span className="text-white font-bold">{createdBooking.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Layanan:</span>
                  <span className="text-amber-400 font-semibold">{createdBooking.service}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Model Cukuran:</span>
                  <span className="text-white font-medium">{createdBooking.haircutStyle}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Barber:</span>
                  <span className="text-white font-medium">{createdBooking.barberName}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-500">Jadwal:</span>
                  <span className="text-white font-bold">{createdBooking.date} • {createdBooking.timeSlot} WIB</span>
                </div>
              </div>

              {/* Admin target selection */}
              <div className="max-w-md mx-auto text-left bg-zinc-950 p-3 rounded-2xl border border-zinc-800 space-y-1.5">
                <span className="text-[11px] text-zinc-400 font-semibold block">Pilih Nomor WhatsApp Admin Tujuan:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTargetAdmin('admin1')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      targetAdmin === 'admin1'
                        ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <span className="block text-emerald-400">Admin 1 (Booking)</span>
                    <span className="font-mono text-[10px] text-zinc-400">0822-9154-4262</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetAdmin('admin2')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      targetAdmin === 'admin2'
                        ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <span className="block text-amber-400">Admin 2 (Academy)</span>
                    <span className="font-mono text-[10px] text-zinc-400">0821-9184-3162</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 max-w-md mx-auto">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Tiket ke WhatsApp {targetAdmin === 'admin2' ? 'Admin 2' : 'Admin 1'}</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-colors"
                >
                  Tutup & Selesai
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Nav Buttons (Step 1-4) */}
        {step < 5 && step !== 4 && (
          <div className="px-6 py-4 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-zinc-800 flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            ) : <div></div>}

            <button
              type="button"
              onClick={handleNextStep}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gold-gradient text-zinc-950 shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
