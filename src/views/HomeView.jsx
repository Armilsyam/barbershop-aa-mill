import React from 'react';
import { 
  Scissors, 
  Calendar, 
  Sparkles, 
  Award, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  MapPin, 
  Clock, 
  Flame, 
  CheckCircle,
  Compass,
  MessageCircle
} from 'lucide-react';

export default function HomeView({ 
  setCurrentTab, 
  onOpenBooking, 
  onOpenQuiz, 
  onOpenHaircutDetail,
  haircuts = [], 
  services = [], 
  barbers = [], 
  reviews = [], 
  courses = [], 
  settings 
}) {
  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-zinc-800/80">
        {/* Subtle background ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute -top-10 right-10 w-72 h-72 bg-amber-600/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Top Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-inner">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Barbershop & Academy No. 1 Berstandar Internasional</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-6xl font-black text-white leading-tight tracking-wide">
                SENI PANGKAS RAMBUT <br />
                <span className="text-gold-gradient">PRESISI & BERKELAS</span>
              </h1>

              <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Di <strong>BARBERSHOP AA'MILL</strong>, setiap potongan rambut adalah karya seni yang disesuaikan secara personal dengan kontur bentuk wajah dan karakter pria modern. Reservasi online tanpa antre atau tingkatkan keahlian Anda di <strong>AA'MILL Barber Academy</strong>.
              </p>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Booking Jadwal Sekarang</span>
                </button>

                <button
                  onClick={() => setCurrentTab('lookbook')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-500/50 text-white font-semibold text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Lihat Katalog Cukuran</span>
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:text-amber-400 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Tes Bentuk Wajah</span>
                </button>
              </div>

              {/* Social Proof Stats */}
              <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="font-serif-luxury text-2xl font-black text-white">12,500+</div>
                  <div className="text-[11px] text-zinc-400">Pria Telah Dicukur</div>
                </div>
                <div>
                  <div className="font-serif-luxury text-2xl font-black text-amber-400 flex items-center gap-1">
                    <span>4.9</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-[11px] text-zinc-400">Rating Google Maps</div>
                </div>
                <div>
                  <div className="font-serif-luxury text-2xl font-black text-white">450+</div>
                  <div className="text-[11px] text-zinc-400">Alumni Barber Pro</div>
                </div>
              </div>

            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-amber-500/30 via-zinc-800 to-zinc-950 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-900">
                  <img 
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&auto=format&fit=crop&q=80" 
                    alt="Barbershop AA'MILL Master Haircut" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Barber Badge */}
                  <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 p-3 rounded-2xl flex items-center gap-3 shadow-xl">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-zinc-400 font-semibold uppercase">Chief Barber</p>
                      <h4 className="text-xs font-bold text-white">Aa' Mill & Team</h4>
                    </div>
                  </div>

                  {/* Floating Clean Service Badge */}
                  <div className="absolute bottom-4 right-4 bg-zinc-950/90 backdrop-blur-md border border-amber-500/40 p-3 rounded-2xl flex items-center gap-3 shadow-xl">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-zinc-400">Sanitasi Steril UV</p>
                      <p className="text-xs font-bold text-emerald-400">100% Silet Baru</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROMO TICKER ANNOUNCEMENT */}
      {settings?.announcement && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 border border-amber-500/40 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-amber-200">
              <span className="p-2 rounded-xl bg-amber-500 text-zinc-950 font-bold uppercase text-[10px] shrink-0">
                Pengumuman
              </span>
              <span>{settings.announcement}</span>
            </div>
            <button
              onClick={() => setCurrentTab('academy')}
              className="shrink-0 px-3.5 py-1.5 rounded-lg bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              Cek Kelas
            </button>
          </div>
        </section>
      )}

      {/* MEDIA PILIH GAMBAR BENTUK CUKURAN (LOOKBOOK TEASER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Media Pilih Gambar Bentuk Cukuran</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              Koleksi Tren Gaya Rambut Pria
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
              Pilih model cukuran favorit Anda dan langsung terapkan ke jadwal booking dengan sekali klik.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('lookbook')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-amber-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 flex items-center gap-1.5 transition-all"
            >
              <span>Lihat Semua ({haircuts.length} Model)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Haircut Grid Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {haircuts.slice(0, 4).map((hc) => (
            <div 
              key={hc.id}
              onClick={() => onOpenHaircutDetail(hc)}
              className="group bg-zinc-900/60 rounded-3xl border border-zinc-800/80 overflow-hidden hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                <img 
                  src={hc.imageUrl} 
                  alt={hc.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                
                <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md text-[10px] uppercase font-bold text-amber-400 px-2.5 py-1 rounded-full border border-zinc-800">
                  {hc.category}
                </span>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-serif-luxury text-lg font-bold text-white">{hc.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hc.faceShapes?.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="text-[10px] text-zinc-300 bg-zinc-900/80 px-2 py-0.5 rounded">
                        Wajah {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2.5">
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {hc.description}
                </p>
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono text-[11px]">{hc.difficulty}</span>
                  <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                    <span>Lihat & Pilih</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES MENU / PRICE LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Scissors className="w-4 h-4" />
            <span>Daftar Layanan & Menu Cukur</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Pilihan Perawatan Grooming Pria
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Dikerjakan oleh barber profesional berpengalaman dengan peralatan steril dan produk premium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                svc.popular 
                  ? 'bg-zinc-900/90 border-amber-500/60 shadow-xl shadow-amber-500/10' 
                  : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-zinc-800 text-amber-400">
                    {svc.duration}
                  </span>
                  {svc.popular && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 uppercase">
                      Paling Populer
                    </span>
                  )}
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">{svc.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {svc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-zinc-500 block">Tarif</span>
                  <span className="text-lg font-black text-amber-400">
                    Rp {svc.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 text-white hover:bg-amber-500 hover:text-zinc-950 transition-colors"
                >
                  Booking Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BARBER TEAM ROSTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Award className="w-4 h-4" />
            <span>Master Barber Roster</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Para Ahli Pangkas Rambut AA'MILL
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Tangan-tangan terampil yang siap merealisasikan model rambut impian Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <img 
                  src={b.avatarUrl} 
                  alt={b.name} 
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-amber-500/30 p-1"
                />
                <h4 className="font-serif-luxury text-base font-bold text-white">{b.name}</h4>
                <p className="text-xs text-amber-400 font-semibold">{b.role}</p>
                <p className="text-[11px] text-zinc-500 mb-3">{b.experience}</p>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">{b.bio}</p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80">
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {b.specialties?.slice(0, 2).map((sp, i) => (
                    <span key={i} className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                      {sp}
                    </span>
                  ))}
                </div>
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-200 transition-colors"
                >
                  Pilih Barber Ini
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACADEMY TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-amber-950/40 border border-amber-500/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>AA'MILL BARBER ACADEMY INDONESIA</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
                Ingin Menjadi Barber Profesional & Membuka Bisnis Barbershop Sendiri?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                Bergabunglah dengan ratusan alumni yang telah sukses membuka barbershop atau bekerja di salon ternama. Pembelajaran intensif dari dasar, praktek langsung di model manusia, modul video LMS, dan sertifikat kelulusan resmi.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-zinc-300 font-medium">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <CheckCircle className="w-4 h-4" /> 1 Murid 1 Alat & Model Disediakan
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <CheckCircle className="w-4 h-4" /> Garansi Bisa Sampai Mahir
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <CheckCircle className="w-4 h-4" /> Bimbingan SOP & Buka Usaha
                </span>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setCurrentTab('academy')}
                  className="px-6 py-3 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Lihat Paket Kursus Barber</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-zinc-950/80 p-6 rounded-2xl border border-zinc-800 text-center space-y-4">
              <div className="w-14 h-14 bg-amber-500/15 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="text-white font-serif-luxury font-bold text-lg">Pendaftaran Angkatan Baru</h4>
              <p className="text-xs text-zinc-400">
                Tersedia kelas Pemula Nol, Fade Master, dan Private 1-on-1 langsung bersama Chief Mill.
              </p>
              <div className="p-3 bg-zinc-900 rounded-xl text-xs text-amber-300 font-semibold border border-amber-500/20">
                Sisa 4 Kursi Tersedia Bulan Ini
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>Ulasan & Testimoni Pelanggan</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Pengalaman Cukur Tak Terlupakan
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Kepuasan pelanggan adalah prioritas utama setiap hembusan gunting dan sentuhan pisau cukur kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-500">{rev.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-white">{rev.customerName}</h5>
                  <p className="text-[11px] text-zinc-500">{rev.serviceUsed}</p>
                </div>
                <span className="text-[11px] text-amber-400 font-medium">Barber: {rev.barberName}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
