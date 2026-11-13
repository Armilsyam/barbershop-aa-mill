import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Scissors, 
  BookOpen, 
  Users, 
  Flame, 
  Settings, 
  Plus, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Send, 
  Eye, 
  Save, 
  RefreshCw, 
  Cloud, 
  ShieldCheck,
  Phone,
  User,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AdminView({ 
  bookings = [], 
  haircuts = [], 
  courses = [], 
  students = [], 
  barbers = [], 
  feedPosts = [], 
  settings = {},
  onUpdateBookingStatus,
  onDeleteBooking,
  onSaveHaircut,
  onDeleteHaircut,
  onSaveCourse,
  onSaveBarber,
  onSaveSettings,
  onUpdateStudentStatus,
  onDeletePost,
  onResetAllData 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'haircuts' | 'academy' | 'barbers' | 'settings'

  // Booking filters
  const [bookingFilter, setBookingFilter] = useState('all');

  // New Haircut Modal / Form
  const [showAddHaircut, setShowAddHaircut] = useState(false);
  const [newHaircut, setNewHaircut] = useState({
    title: '',
    category: 'Fade',
    faceShapes: 'Oval, Kotak',
    hairType: 'Semua Tipe',
    difficulty: 'Medium',
    pomadeRecommended: 'Matte Clay',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80',
    trending: false
  });

  // Settings form
  const [formSettings, setFormSettings] = useState(settings);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Stats calculation
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, curr) => acc + (curr.totalPrice || 65000), 0);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

  const handleSaveSettingsSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formSettings);
    setSaveSuccessMsg('Pengaturan dan konfigurasi Cloud Firestore berhasil diperbarui!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleAddHaircutSubmit = (e) => {
    e.preventDefault();
    if (!newHaircut.title) return;

    const shapesArray = typeof newHaircut.faceShapes === 'string'
      ? newHaircut.faceShapes.split(',').map(s => s.trim()).filter(Boolean)
      : newHaircut.faceShapes;

    onSaveHaircut({
      ...newHaircut,
      faceShapes: shapesArray,
      tags: ['Populer', 'BarberAA\'MILL']
    });

    setShowAddHaircut(false);
    setNewHaircut({
      title: '',
      category: 'Fade',
      faceShapes: 'Oval, Kotak',
      hairType: 'Semua Tipe',
      difficulty: 'Medium',
      pomadeRecommended: 'Matte Clay',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80',
      trending: false
    });
  };

  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === 'all') return true;
    return b.status === bookingFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Title & Nav Tabs */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury text-2xl font-bold text-white">Panel Pengelola AA'MILL</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-xs text-zinc-400">Pusat kontrol reservasi cukur, katalog gaya, akademi siswa, & database cloud</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                if (confirm('Yakin ingin mereset seluruh data kembali ke kondisi awal bawaan?')) {
                  onResetAllData();
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data Contoh</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-t border-zinc-800/80 pt-4 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Ringkasan & Statistik', icon: BarChart3 },
            { id: 'bookings', label: `Daftar Booking (${pendingBookings} Baru)`, icon: Calendar, highlight: pendingBookings > 0 },
            { id: 'haircuts', label: `Katalog Cukuran (${haircuts.length})`, icon: Scissors },
            { id: 'academy', label: `Siswa & Kursus (${students.length})`, icon: BookOpen },
            { id: 'barbers', label: `Tim Barber (${barbers.length})`, icon: Users },
            { id: 'settings', label: 'Pengaturan & Cloud Firestore', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                  active 
                    ? 'bg-gold-gradient text-zinc-950 font-bold shadow-md shadow-amber-500/20' 
                    : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.highlight && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW & STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Stat Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Total Booking</span>
              <div className="text-3xl font-black text-white font-serif-luxury">{bookings.length}</div>
              <p className="text-xs text-amber-400 font-medium">
                {pendingBookings} menunggu konfirmasi
              </p>
            </div>

            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Estimasi Omzet</span>
              <div className="text-3xl font-black text-amber-400 font-serif-luxury">
                Rp {totalRevenue.toLocaleString('id-ID')}
              </div>
              <p className="text-xs text-zinc-400">Dari booking dikonfirmasi & selesai</p>
            </div>

            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Siswa Academy</span>
              <div className="text-3xl font-black text-emerald-400 font-serif-luxury">{students.length}</div>
              <p className="text-xs text-zinc-400">Dalam bimbingan & verifikasi</p>
            </div>

            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Koleksi Model Cukur</span>
              <div className="text-3xl font-black text-purple-400 font-serif-luxury">{haircuts.length}</div>
              <p className="text-xs text-zinc-400">Aktif di lookbook pelanggan</p>
            </div>
          </div>

          {/* Recent Bookings Quick Table */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-lg font-bold text-white">Reservasi Terbaru Masuk</h3>
              <button 
                onClick={() => setActiveTab('bookings')}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Buka Semua Reservasi →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-500 font-bold uppercase border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Kode Booking</th>
                    <th className="p-3">Pelanggan</th>
                    <th className="p-3">Layanan & Gaya</th>
                    <th className="p-3">Barber</th>
                    <th className="p-3">Waktu</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {bookings.slice(0, 5).map(b => (
                    <tr key={b.id} className="hover:bg-zinc-800/40">
                      <td className="p-3 font-mono font-bold text-amber-400">{b.id}</td>
                      <td className="p-3 font-semibold text-white">{b.customerName} ({b.phone})</td>
                      <td className="p-3">{b.service} <span className="text-amber-400">({b.haircutStyle})</span></td>
                      <td className="p-3 text-zinc-400">{b.barberName}</td>
                      <td className="p-3">{b.date} • {b.timeSlot} WIB</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          b.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                          b.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKING MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Kelola Reservasi Cukur</h3>
              <p className="text-xs text-zinc-400">Konfirmasi, jadwalkan ulang, atau tandai reservasi selesai.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
                <button
                  key={f}
                  onClick={() => setBookingFilter(f)}
                  className={`px-3 py-1.5 rounded-xl capitalize font-semibold transition-all ${
                    bookingFilter === f
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {f === 'all' ? 'Semua Status' : f}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-500 font-bold uppercase border-b border-zinc-800">
                  <tr>
                    <th className="p-3.5">ID Tiket</th>
                    <th className="p-3.5">Nama & Kontak</th>
                    <th className="p-3.5">Layanan</th>
                    <th className="p-3.5">Model Cukuran</th>
                    <th className="p-3.5">Barber</th>
                    <th className="p-3.5">Jadwal Tanggal & Jam</th>
                    <th className="p-3.5">Tarif</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Aksi Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {filteredBookings.map(b => (
                    <tr key={b.id} className="hover:bg-zinc-800/40">
                      <td className="p-3.5 font-mono font-bold text-amber-400">{b.id}</td>
                      <td className="p-3.5">
                        <strong className="text-white block">{b.customerName}</strong>
                        <a 
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-emerald-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{b.phone}</span>
                        </a>
                      </td>
                      <td className="p-3.5 text-zinc-200">{b.service}</td>
                      <td className="p-3.5 text-amber-400 font-medium">{b.haircutStyle}</td>
                      <td className="p-3.5">{b.barberName}</td>
                      <td className="p-3.5 font-semibold text-white">{b.date} • {b.timeSlot} WIB</td>
                      <td className="p-3.5 font-mono text-amber-400">Rp {b.totalPrice?.toLocaleString('id-ID')}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                          b.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                          b.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {b.status !== 'confirmed' && (
                            <button
                              onClick={() => onUpdateBookingStatus(b.id, 'confirmed')}
                              className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white"
                              title="Konfirmasi Booking"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {b.status !== 'completed' && (
                            <button
                              onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                              className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white"
                              title="Tandai Selesai Cukur"
                            >
                              <Scissors className="w-4 h-4" />
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button
                              onClick={() => onUpdateBookingStatus(b.id, 'cancelled')}
                              className="p-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white"
                              title="Batalkan Booking"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm(`Hapus booking ${b.id}?`)) {
                                onDeleteBooking(b.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400"
                            title="Hapus Dari Database"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HAIRCUT CATALOG MANAGEMENT */}
      {activeTab === 'haircuts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Kelola Model Rambut (Lookbook)</h3>
              <p className="text-xs text-zinc-400">Tambah model cukuran baru, atur foto, dan bentuk wajah cocok.</p>
            </div>
            <button
              onClick={() => setShowAddHaircut(true)}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs hover:brightness-110 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Model Cukuran</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {haircuts.map(hc => (
              <div 
                key={hc.id}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-zinc-950">
                  <img src={hc.imageUrl} alt={hc.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-zinc-950/80 text-amber-400 text-[10px] px-2 py-0.5 rounded font-bold">
                    {hc.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-white text-sm">{hc.title}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-2">{hc.description}</p>
                  <p className="text-[11px] text-zinc-500">Produk: {hc.pomadeRecommended}</p>
                </div>
                <div className="p-3 border-t border-zinc-800 flex items-center justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`Hapus model ${hc.title}?`)) {
                        onDeleteHaircut(hc.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                    title="Hapus Model"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ADD HAIRCUT MODAL */}
          {showAddHaircut && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">
                <h3 className="font-serif-luxury text-xl font-bold text-white mb-4">
                  Tambah Model Rambut ke Lookbook
                </h3>
                <form onSubmit={handleAddHaircutSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Nama Model Rambut</label>
                    <input
                      type="text"
                      required
                      value={newHaircut.title}
                      onChange={(e) => setNewHaircut({ ...newHaircut, title: e.target.value })}
                      placeholder="Contoh: Burst Fade Mullet"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Kategori</label>
                      <select
                        value={newHaircut.category}
                        onChange={(e) => setNewHaircut({ ...newHaircut, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                      >
                        <option value="Fade">Fade</option>
                        <option value="Crop & Textured">Crop & Textured</option>
                        <option value="Classic">Classic</option>
                        <option value="Korean / Two-Block">Korean / Two-Block</option>
                        <option value="Undercut">Undercut</option>
                        <option value="Beard & Shave">Beard & Shave</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Produk Pomade</label>
                      <input
                        type="text"
                        value={newHaircut.pomadeRecommended}
                        onChange={(e) => setNewHaircut({ ...newHaircut, pomadeRecommended: e.target.value })}
                        placeholder="Matte Clay / Powder"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                      >
                      </input>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Bentuk Wajah yang Cocok (Pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={newHaircut.faceShapes}
                      onChange={(e) => setNewHaircut({ ...newHaircut, faceShapes: e.target.value })}
                      placeholder="Oval, Kotak, Bulat"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">URL Foto Model (Unsplash / Web)</label>
                    <input
                      type="url"
                      required
                      value={newHaircut.imageUrl}
                      onChange={(e) => setNewHaircut({ ...newHaircut, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows="2"
                      value={newHaircut.description}
                      onChange={(e) => setNewHaircut({ ...newHaircut, description: e.target.value })}
                      placeholder="Karakteristik potongan dan kesan yang ditampilkan..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="trendingCheck"
                      checked={newHaircut.trending}
                      onChange={(e) => setNewHaircut({ ...newHaircut, trending: e.target.checked })}
                      className="rounded bg-zinc-950 border-zinc-700 text-amber-500"
                    />
                    <label htmlFor="trendingCheck" className="text-zinc-300">Tandai sebagai model Trending / Paling Diminati</label>
                  </div>

                  <div className="pt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddHaircut(false)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gold-gradient text-zinc-950 font-bold"
                    >
                      Simpan Model
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ACADEMY STUDENTS & COURSES */}
      {activeTab === 'academy' && (
        <div className="space-y-8">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-white">Daftar Siswa Pendaftar Kursus</h3>
            <p className="text-xs text-zinc-400">Verifikasi calon murid academy dan catat progress kelulusan.</p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-500 font-bold uppercase border-b border-zinc-800">
                  <tr>
                    <th className="p-3.5">ID Siswa</th>
                    <th className="p-3.5">Nama & Kontak</th>
                    <th className="p-3.5">Program Kursus</th>
                    <th className="p-3.5">Tgl Daftar</th>
                    <th className="p-3.5">Status Pembelajaran</th>
                    <th className="p-3.5 text-right">Ubah Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {students.map(std => (
                    <tr key={std.id} className="hover:bg-zinc-800/40">
                      <td className="p-3.5 font-mono font-bold text-amber-400">{std.id}</td>
                      <td className="p-3.5">
                        <strong className="text-white block">{std.name}</strong>
                        <a 
                          href={`https://wa.me/${std.phone.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-emerald-400 font-mono text-[11px] flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{std.phone}</span>
                        </a>
                      </td>
                      <td className="p-3.5 text-amber-300 font-medium">{std.courseTitle}</td>
                      <td className="p-3.5 text-zinc-400">{std.registeredAt}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          {std.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onUpdateStudentStatus(std.id, 'Aktif Belajar')}
                            className="px-2 py-1 rounded bg-zinc-800 hover:bg-emerald-600 hover:text-white text-[10px]"
                          >
                            Aktif
                          </button>
                          <button
                            onClick={() => onUpdateStudentStatus(std.id, 'Lulus & Bersertifikat')}
                            className="px-2 py-1 rounded bg-zinc-800 hover:bg-blue-600 hover:text-white text-[10px]"
                          >
                            Lulus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BARBER TEAM MANAGEMENT */}
      {activeTab === 'barbers' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-white">Daftar Kapster & Master Barber</h3>
            <p className="text-xs text-zinc-400">Kelola anggota tim yang dapat dipilih pelanggan saat booking.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {barbers.map(b => (
              <div key={b.id} className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl text-center space-y-3">
                <img 
                  src={b.avatarUrl} 
                  alt={b.name} 
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-amber-500/40 p-1"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{b.name}</h4>
                  <p className="text-xs text-amber-400">{b.role}</p>
                  <p className="text-[11px] text-zinc-500">{b.experience}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {b.specialties?.map((sp, i) => (
                    <span key={i} className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SETTINGS & CLOUD FIRESTORE CONFIG */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-white">Pengaturan Barbershop & Cloud Firestore</h3>
            <p className="text-xs text-zinc-400">
              Konfigurasikan informasi toko, WhatsApp, dan sinkronisasi Cloud Firestore / Cloudflare tanpa repot.
            </p>
          </div>

          {saveSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveSettingsSubmit} className="space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
            
            {/* General Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
                1. Informasi Barbershop & Kontak
              </h4>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Barbershop</label>
                <input
                  type="text"
                  value={formSettings.barbershopName || ''}
                  onChange={(e) => setFormSettings({ ...formSettings, barbershopName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Nomor WhatsApp Admin (Untuk Menerima Booking)</label>
                <input
                  type="text"
                  value={formSettings.whatsapp || ''}
                  onChange={(e) => setFormSettings({ ...formSettings, whatsapp: e.target.value })}
                  placeholder="Contoh: 6281234567890 (awali 62)"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Alamat Lengkap</label>
                <input
                  type="text"
                  value={formSettings.address || ''}
                  onChange={(e) => setFormSettings({ ...formSettings, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Jam Operasional</label>
                <input
                  type="text"
                  value={formSettings.operationalHours || ''}
                  onChange={(e) => setFormSettings({ ...formSettings, operationalHours: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Pengumuman Banner Promo Ticker</label>
                <input
                  type="text"
                  value={formSettings.announcement || ''}
                  onChange={(e) => setFormSettings({ ...formSettings, announcement: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs"
                />
              </div>
            </div>

            {/* Cloud Firestore configuration */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  2. Konfigurasi Cloud Firestore / Firebase (Cloude Fire)
                </h4>
              </div>
              <p className="text-xs text-zinc-400">
                Aplikasi ini dilengkapi <em>Hybrid Architecture</em>: Otomatis berjalan cepat & lancar secara offline (LocalStorage), dan saat Anda memasukkan Firebase API Key di bawah, data booking akan tersinkronisasi real-time ke Cloud Firestore!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Firebase API Key</label>
                  <input
                    type="password"
                    value={formSettings.firebaseConfig?.apiKey || ''}
                    onChange={(e) => setFormSettings({
                      ...formSettings,
                      firebaseConfig: { ...formSettings.firebaseConfig, apiKey: e.target.value }
                    })}
                    placeholder="AIzaSy..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Project ID</label>
                  <input
                    type="text"
                    value={formSettings.firebaseConfig?.projectId || ''}
                    onChange={(e) => setFormSettings({
                      ...formSettings,
                      firebaseConfig: { ...formSettings.firebaseConfig, projectId: e.target.value }
                    })}
                    placeholder="barbershop-aamill"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Auth Domain</label>
                  <input
                    type="text"
                    value={formSettings.firebaseConfig?.authDomain || ''}
                    onChange={(e) => setFormSettings({
                      ...formSettings,
                      firebaseConfig: { ...formSettings.firebaseConfig, authDomain: e.target.value }
                    })}
                    placeholder="barbershop-aamill.firebaseapp.com"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Storage Bucket</label>
                  <input
                    type="text"
                    value={formSettings.firebaseConfig?.storageBucket || ''}
                    onChange={(e) => setFormSettings({
                      ...formSettings,
                      firebaseConfig: { ...formSettings.firebaseConfig, storageBucket: e.target.value }
                    })}
                    placeholder="barbershop-aamill.appspot.com"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Semua Perubahan Pengaturan</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
