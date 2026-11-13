import React from 'react';
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  ShieldCheck, 
  Heart,
  ExternalLink,
  Sparkles,
  Award
} from 'lucide-react';

export default function Footer({ setCurrentTab, onOpenBooking, settings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-sm">
      {/* Top Banner Feature */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Instruktur Tersertifikasi</h4>
              <p className="text-xs text-zinc-400">10+ tahun pengalaman mencetak ratusan barber pro di seluruh Indonesia.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Steril & Higienis 100%</h4>
              <p className="text-xs text-zinc-400">Alat disinfeksi UV & silet baru sekali pakai demi kesehatan dan kenyamanan.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Garansi Kepuasan</h4>
              <p className="text-xs text-zinc-400">Konsultasi model bentuk wajah gratis sebelum potong rambut dimulai.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand & About */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center">
              <Scissors className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-serif-luxury tracking-wider text-xl font-bold text-white">
              {settings?.barbershopName || "BARBERSHOP AA'MILL"}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-zinc-400">
            {settings?.tagline || "The Art of Precision Haircutting & Master Barber Academy"} — Memadukan seni pangkas rambut klasik gentleman dan tren modern kontemporer. Pusat pelatihan barber profesional berstandar industri dengan jaminan keterampilan kerja.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <a 
              href="https://wa.me/6282291544262?text=Halo%20Admin%201%20Barbershop%20AA'MILL,%20saya%20mau%20reservasi"
              target="_blank" 
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Admin 1: 0822-9154-4262</span>
            </a>
            <a 
              href="https://wa.me/6282191843162?text=Halo%20Admin%202%20AA'MILL%20Academy,%20saya%20mau%20tanya%20kursus"
              target="_blank" 
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Admin 2: 0821-9184-3162</span>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Menu Utama</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentTab('home')} className="hover:text-amber-400 transition-colors">
                Beranda & Promo
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('lookbook')} className="hover:text-amber-400 transition-colors">
                Katalog Gaya Cukuran
              </button>
            </li>
            <li>
              <button onClick={onOpenBooking} className="text-amber-400 font-semibold hover:underline">
                Booking Jadwal Cukur
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('academy')} className="hover:text-amber-400 transition-colors">
                Paket Kursus Barber
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('feed')} className="hover:text-amber-400 transition-colors">
                Portofolio & Feed Tren
              </button>
            </li>
          </ul>
        </div>

        {/* Academy Programs */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Academy Barber</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentTab('academy')} className="hover:text-amber-400 transition-colors">
                Kelas Pemula (Basic Zero)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('academy')} className="hover:text-amber-400 transition-colors">
                Fade & Styling Masterclass
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('academy')} className="hover:text-amber-400 transition-colors">
                Bimbingan Buka Usaha
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('academy')} className="hover:text-amber-400 transition-colors">
                Private 1-on-1 VIP Chief Mill
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('academy')} className="hover:text-amber-400 transition-colors">
                Sertifikasi & Magang Kerja
              </button>
            </li>
          </ul>
        </div>

        {/* Location & Hours */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Jam & Lokasi</h4>
          <div className="flex items-start gap-2.5 text-xs">
            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">Jam Operasional:</p>
              <p className="text-zinc-400">{settings?.operationalHours || 'Setiap Hari: 09:00 - 22:00 WIB'}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">Alamat Barbershop:</p>
              <p className="text-zinc-400 leading-snug">{settings?.address || 'Jl. Veteran No. 88, Pusat Kota'}</p>
              <a 
                href={settings?.googleMapsUrl || "https://maps.google.com"} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline mt-1 font-semibold"
              >
                <span>Buka Petunjuk Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom credits & deployment badges */}
      <div className="border-t border-zinc-800/80 bg-zinc-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-zinc-400 text-center sm:text-left">
            © {currentYear} <strong className="text-zinc-200">BARBERSHOP AA'MILL & ACADEMY</strong>. Hak Cipta Dilindungi.
          </p>

          <div className="flex items-center flex-wrap justify-center gap-2 text-[11px] text-zinc-400">
            <span>Multi-Deploy Ready:</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">GitHub</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">Vercel</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">Netlify</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">Cloudflare</span>
            <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-400 font-mono">Cloud Firestore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
