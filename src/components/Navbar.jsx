import React, { useState } from 'react';
import { 
  Scissors, 
  Calendar, 
  BookOpen, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  X, 
  PhoneCall, 
  Compass,
  UserCheck
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  isAdmin, 
  setIsAdmin, 
  onOpenBooking, 
  onOpenQuiz,
  barbershopName 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleAdminAuth = (e) => {
    e.preventDefault();
    // Default PIN: 1234 or "admin"
    if (adminPin === '1234' || adminPin === 'admin' || adminPin === 'aamill') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPin('');
      setPinError(false);
      setCurrentTab('admin');
    } else {
      setPinError(true);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Beranda', icon: Scissors },
    { id: 'lookbook', label: 'Pilih Cukuran', icon: Sparkles, badge: 'Tren' },
    { id: 'booking', label: 'Booking Online', icon: Calendar },
    { id: 'academy', label: 'Barber Academy', icon: BookOpen, badge: 'Sertifikasi' },
    { id: 'feed', label: 'Komunitas & Feed', icon: Flame },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/85 border-b border-zinc-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center border border-amber-500/30">
                <Scissors className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury tracking-widest text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  AA'MILL
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  EST. 2014
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 tracking-wider uppercase font-semibold">
                BARBERSHOP & ACADEMY
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive 
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' 
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-zinc-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Consultation Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-900 border border-zinc-700/80 hover:border-amber-500/50 hover:bg-zinc-800 transition-all flex items-center gap-2"
              title="Konsultasi Model Rambut Berdasarkan Bentuk Wajah"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Cek Gaya Wajah</span>
            </button>

            {/* Book Now Button */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gold-gradient text-zinc-950 shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Cukur</span>
            </button>

            {/* Role Switcher (Admin / Customer) */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl px-2.5 py-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <button
                  onClick={() => setCurrentTab('admin')}
                  className={`text-xs font-bold ${currentTab === 'admin' ? 'text-amber-400 underline' : 'text-emerald-300'} hover:text-white`}
                >
                  Admin Panel
                </button>
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    setCurrentTab('home');
                  }}
                  className="text-[10px] text-zinc-400 hover:text-red-400 ml-1 bg-zinc-900 px-1.5 py-0.5 rounded"
                  title="Logout Mode Admin"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAdminModal(true)}
                className="p-2 rounded-xl text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
                title="Login Pengelola / Admin"
              >
                <ShieldCheck className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-gold-gradient text-zinc-950"
            >
              Booking
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-zinc-900/98 border-b border-zinc-800 px-4 py-5 space-y-3">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenQuiz();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-800 border border-zinc-700 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Tes Bentuk Wajah & Gaya Rambut</span>
              </button>

              <button
                onClick={() => {
                  if (isAdmin) {
                    setCurrentTab('admin');
                  } else {
                    setShowAdminModal(true);
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>{isAdmin ? 'Masuk Panel Admin' : 'Login Web Admin AA\'MILL'}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Admin Passcode Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setShowAdminModal(false);
                setPinError(false);
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Akses Admin AA'MILL</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Masukkan PIN Pengelola untuk mengakses data booking, siswa academy, & pengaturan.
              </p>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  PIN Pengelola (Gunakan: 1234 atau admin)
                </label>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => {
                    setAdminPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Ketik PIN..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950 border text-center text-lg tracking-widest font-mono text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    pinError ? 'border-red-500' : 'border-zinc-700'
                  }`}
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-400 mt-1 text-center font-medium">
                    PIN salah! Gunakan "1234" atau "admin".
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                Buka Panel Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
