import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  Send, 
  User, 
  Phone, 
  MapPin, 
  Sparkles,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AcademyModal({ 
  course, 
  isOpen, 
  onClose, 
  onRegisterStudent,
  settings 
}) {
  const [activeTab, setActiveTab] = useState('detail'); // 'detail' or 'register'
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentCity, setStudentCity] = useState('');
  const [studentNotes, setStudentNotes] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  if (!isOpen || !course) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) return;

    const payload = {
      name: studentName.trim(),
      phone: studentPhone.trim(),
      city: studentCity.trim() || 'Indonesia',
      courseId: course.id,
      courseTitle: course.title,
      notes: studentNotes.trim()
    };

    const newStudent = onRegisterStudent(payload);
    setRegisteredData(newStudent);
    setRegisteredSuccess(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const getWhatsAppRegistrationUrl = () => {
    const waPhone = settings?.whatsapp || '6281234567890';
    const message = `Halo Admin AA'MILL Barber Academy! 💈🎓%0A%0ASaya ingin mendaftar program kursus:%0A----------------------------%0A📚 *Paket Kursus:* ${course.title}%0A👤 *Nama Siswa:* ${studentName}%0A📱 *WhatsApp:* ${studentPhone}%0A📍 *Asal Kota:* ${studentCity}%0A💵 *Biaya Kursus:* Rp ${course.price?.toLocaleString('id-ID')}%0A📝 *Catatan:* ${studentNotes || '-'}%0A----------------------------%0AMohon info jadwal batch kelas terdekat dan prosedur transfer pendaftaran. Terima kasih!`;
    return `https://wa.me/${waPhone}?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-6 relative transition-all">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {course.level}
              </span>
              <h3 className="font-serif-luxury text-lg font-bold text-white mt-0.5">{course.title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        {!registeredSuccess && (
          <div className="px-6 pt-3 bg-zinc-950 border-b border-zinc-800 flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('detail')}
              className={`pb-2.5 border-b-2 transition-all ${
                activeTab === 'detail'
                  ? 'border-amber-400 text-amber-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Silabus & Fasilitas
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`pb-2.5 border-b-2 transition-all ${
                activeTab === 'register'
                  ? 'border-amber-400 text-amber-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Formulir Pendaftaran Online
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          
          {/* TAB 1: Silabus & Fasilitas */}
          {activeTab === 'detail' && !registeredSuccess && (
            <div className="space-y-6">
              
              {/* Highlight summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-500 block">Durasi Pelatihan</span>
                  <strong className="text-white text-sm">{course.duration}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Biaya Investasi</span>
                  <strong className="text-amber-400 text-sm">Rp {course.price?.toLocaleString('id-ID')}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Sertifikat Kelulusan</span>
                  <strong className="text-emerald-400 text-sm">Resmi AA'MILL Academy</strong>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Tentang Program</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Keunggulan & Materi Inti</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.highlights?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus Timeline */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Rancangan Pertemuan (Silabus)</h4>
                <div className="space-y-2.5">
                  {course.syllabus?.map((syl, idx) => (
                    <div key={idx} className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-xl flex items-start gap-3 text-xs">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 font-bold text-amber-400 shrink-0">
                        {syl.duration}
                      </span>
                      <div>
                        <h5 className="font-bold text-white">{syl.title}</h5>
                        <p className="text-zinc-400 mt-0.5">{syl.lessons}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {course.bonus && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="text-amber-200">
                    <strong className="text-amber-400">Bonus Siswa: </strong>
                    {course.bonus}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('register')}
                  className="w-full py-3 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Daftar Kelas Ini Sekarang</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: Formulir Pendaftaran */}
          {activeTab === 'register' && !registeredSuccess && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 mb-2">
                <p className="text-xs text-zinc-400">Anda mendaftar untuk:</p>
                <h5 className="text-base font-bold text-white">{course.title}</h5>
                <p className="text-xs text-amber-400 font-semibold mt-0.5">
                  Investasi: Rp {course.price?.toLocaleString('id-ID')} ({course.duration})
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Nama Lengkap Calon Siswa <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Muhammad Ilham"
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
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="Contoh: 081298765432"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Asal Kota / Domisili
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={studentCity}
                    onChange={(e) => setStudentCity(e.target.value)}
                    placeholder="Contoh: Bandung / Jakarta / Solo"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Tujuan / Motivasi Mengikuti Kursus (Opsional)
                </label>
                <textarea
                  rows="2"
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Contoh: Ingin buka usaha barbershop sendiri / upgrade skill skin fade"
                  className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kirim Formulir Pendaftaran</span>
              </button>
            </form>
          )}

          {/* SUCCESS REGISTRATION SCREEN */}
          {registeredSuccess && registeredData && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-serif-luxury text-2xl font-bold text-white">Pendaftaran Berhasil Dicatat!</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Terima kasih <strong className="text-white">{studentName}</strong>. Data Anda telah masuk ke sistem database Academy.
                </p>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md mx-auto text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-zinc-500">ID Registrasi:</span>
                  <span className="text-amber-400 font-mono font-bold">{registeredData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Program:</span>
                  <span className="text-white font-semibold">{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Status Siswa:</span>
                  <span className="text-emerald-400 font-semibold">{registeredData.status}</span>
                </div>
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <a
                  href={getWhatsAppRegistrationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Berkas Pendaftaran ke WhatsApp Academy</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-semibold text-xs hover:bg-zinc-700 transition-colors"
                >
                  Tutup & Kembali
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
