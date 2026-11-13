import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Play, 
  Wrench, 
  Users, 
  Sparkles, 
  Send, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  GraduationCap
} from 'lucide-react';

export default function AcademyView({ 
  courses = [], 
  lessons = [], 
  onOpenCourseModal, 
  onOpenLessonModal,
  settings 
}) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const FAQS = [
    {
      q: "Apakah pemula yang sama sekali belum pernah pegang gunting bisa ikut?",
      a: "Tentu saja! 80% siswa kami mulai dari nol tanpa dasar potong rambut sama sekali. Kami membimbing dari teknik memegang gunting yang benar, anatomi kepala, hingga praktek langsung ke model manusia."
    },
    {
      q: "Apakah model manusia untuk latihan praktek disediakan oleh Academy?",
      a: "Ya! Barbershop AA'MILL menyediakan model manusia asli untuk setiap sesi praktek siswa, sehingga Anda terbiasa memotong di atas kepala sungguhan dengan berbagai jenis rambut."
    },
    {
      q: "Apakah setelah lulus mendapatkan sertifikat resmi?",
      a: "Ya, setiap lulusan yang memenuhi standar ujian praktek akan mendapatkan Sertifikat Kompetensi Barber Resmi dari AA'MILL Barber Academy yang diakui dan dapat digunakan untuk melamar kerja atau legalitas usaha."
    },
    {
      q: "Bisa dibantu dicarikan kerja atau magang setelah lulus?",
      a: "Tentu. Kami memiliki jaringan kemitraan dengan puluhan barbershop ternama di berbagai kota dan membuka kesempatan magang langsung di cabang Barbershop AA'MILL."
    }
  ];

  const BARBER_TOOLS = [
    {
      name: "Hair Clipper (Mesin Cukur Utama)",
      desc: "Digunakan untuk memotong volume rambut besar dan membuat gradasi fade menggunakan sepatu sisir (guards 0.5 - 8).",
      icon: "✂️"
    },
    {
      name: "Detailer Trimmer",
      desc: "Pisau tipis T-Blade presisi untuk membuat garis tepi rambut (line-up dahi, jambang, dan tengkuk) super tajam.",
      icon: "📐"
    },
    {
      name: "Foil Shaver (Pencukur Halus)",
      desc: "Menghabisi bulu halus hingga setipis 0.0 mm tanpa membuat kulit tergores silet, menciptakan Skin Fade mulus.",
      icon: "🪒"
    },
    {
      name: "Gunting Potong (Hair Shears)",
      desc: "Baja Jepang berkualitas tinggi untuk memotong rambut bagian atas dengan teknik sectioning dan point cutting.",
      icon: "✂️"
    },
    {
      name: "Gunting Penipis (Thinning / Blending)",
      desc: "Gigi bertingkat untuk menipiskan rambut tebal dan membaurkan batas patahan rambut agar jatuh natural.",
      icon: "💈"
    },
    {
      name: "Straight Razor (Pisau Silet)",
      desc: "Gagang pisau lipat dengan silet baru steril sekali pakai untuk Royal Shave kumis, jenggot, dan garis leher.",
      icon: "🗡️"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* ACADEMY HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-amber-950/60 border border-amber-500/30 p-8 sm:p-14">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>Pusat Kursus Barber Profesional & Sertifikasi Terpercaya</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-black text-white leading-tight">
            AA'MILL BARBER ACADEMY <br />
            <span className="text-gold-gradient">DARI PEMULA HINGGA JADI MASTER</span>
          </h1>

          <p className="text-zinc-300 text-xs sm:text-base leading-relaxed">
            Kurikulum terstruktur berbasis standar industri internasional. Belajar teknik fade modern, scissor over comb, manajemen usaha barbershop, dan praktek langsung pada model manusia. Garansi bisa sampai mahir!
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-zinc-300 font-semibold">
            <div className="flex items-center gap-2 text-amber-400">
              <CheckCircle2 className="w-4 h-4" /> 100% Praktek Model Disediakan
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <CheckCircle2 className="w-4 h-4" /> Modul Video LMS Online
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <CheckCircle2 className="w-4 h-4" /> Sertifikat Kelulusan Resmi
            </div>
          </div>
        </div>
      </section>

      {/* PAKET KURSUS BARBER CARDS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Pilihan Paket Kursus Barber</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Program Pelatihan Sesuai Kebutuhan Anda
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Pilih paket yang paling cocok dengan target karir Anda. Kuota dibatasi demi efektivitas bimbingan intensif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((crs) => (
            <div
              key={crs.id}
              className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {crs.level}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    {crs.duration.split(' ')[0]} {crs.duration.split(' ')[1]}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-white leading-snug">
                  {crs.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {crs.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Fasilitas & Materi Utama:
                  </span>
                  {crs.highlights?.slice(0, 3).map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span className="line-clamp-2">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <div>
                  <span className="text-[11px] text-zinc-500 block">Biaya Investasi</span>
                  <div className="text-xl font-black text-amber-400">
                    Rp {crs.price?.toLocaleString('id-ID')}
                  </div>
                </div>

                <button
                  onClick={() => onOpenCourseModal(crs)}
                  className="w-full py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Detail & Daftar Online</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEDIA BELAJAR LMS VIDEO PREVIEW */}
      <section className="bg-zinc-900/50 border border-zinc-800 p-8 sm:p-10 rounded-3xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Play className="w-4 h-4 fill-amber-400" />
              <span>Media Belajar Kursus Online (LMS Preview)</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              Pratinjau Modul Materi Belajar Siswa
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Setiap siswa AA'MILL Academy mendapatkan akses ke portal video tutorial dan checklist praktek ini.
            </p>
          </div>
          <span className="text-xs text-zinc-500">
            {lessons.length} Modul Interaktif Tersedia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lessons.map((lsn) => (
            <div
              key={lsn.id}
              onClick={() => onOpenLessonModal(lsn)}
              className="group bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                <img 
                  src={lsn.videoThumbnail} 
                  alt={lsn.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-zinc-950 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-zinc-950/90 text-amber-400 font-mono text-[11px] px-2 py-0.5 rounded">
                  {lsn.duration}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                  {lsn.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {lsn.summary}
                </p>
                <div className="pt-2 text-xs text-amber-400 font-semibold flex items-center justify-between">
                  <span>Buka Lembar Praktek</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BARBER TOOLS ENCYCLOPEDIA */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Wrench className="w-4 h-4" />
            <span>Ensiklopedia Alat Barber Modern</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Peralatan Utama yang Dikuasai Setiap Siswa
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Standar perkakas berkelas dunia yang digunakan di barbershop profesional modern.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BARBER_TOOLS.map((tool, idx) => (
            <div key={idx} className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{tool.icon}</span>
                <h4 className="font-bold text-sm text-white">{tool.name}</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Tanya Jawab Seputar Kursus</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div 
              key={i}
              className="p-4 bg-zinc-900/70 border border-zinc-800 rounded-2xl cursor-pointer transition-colors"
              onClick={() => toggleFaq(i)}
            >
              <div className="flex items-center justify-between font-bold text-sm text-white">
                <span>{faq.q}</span>
                <span className="text-amber-400 text-lg ml-2">{activeFaq === i ? '−' : '+'}</span>
              </div>
              {activeFaq === i && (
                <p className="text-xs text-zinc-300 mt-3 pt-3 border-t border-zinc-800 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
