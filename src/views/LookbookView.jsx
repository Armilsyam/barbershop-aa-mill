import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Flame, 
  Check, 
  ArrowRight,
  Compass
} from 'lucide-react';

export default function LookbookView({ 
  haircuts = [], 
  onOpenHaircutDetail, 
  onSelectForBooking,
  onOpenQuiz 
}) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedFaceShape, setSelectedFaceShape] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Semua', 
    'Fade', 
    'Crop & Textured', 
    'Classic', 
    'Korean / Two-Block', 
    'Undercut', 
    'Beard & Shave'
  ];

  const faceShapes = [
    'Semua', 
    'Oval', 
    'Kotak', 
    'Bulat', 
    'Lonjong', 
    'Segitiga', 
    'Berlian'
  ];

  // Filtering
  const filteredHaircuts = haircuts.filter((item) => {
    const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchFace = selectedFaceShape === 'Semua' || item.faceShapes?.includes(selectedFaceShape);
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchFace && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Media Pilih Gambar Bentuk Cukuran Rambut Pria</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-black text-white">
          Katalog Gaya Rambut & Lookbook AA'MILL
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Temukan inspirasi potongan rambut pria terkini. Klik model mana saja untuk melihat rekomendasi bentuk wajah, produk penata rambut, dan langsung jadwalkan booking potong rambut Anda.
        </p>

        <div className="pt-2">
          <button
            onClick={onOpenQuiz}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-400 hover:text-zinc-950 hover:bg-gold-gradient font-bold text-xs transition-all shadow-md inline-flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Bingung Memilih? Coba Tes Bentuk Wajah AI Disini</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-3xl space-y-5">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari model cukuran (contoh: Low Fade, Mullet, Two Block, Pompadour)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
            Kategori Gaya:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-gold-gradient text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Face Shape Filter */}
        <div className="space-y-2 pt-2 border-t border-zinc-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>Filter Sesuai Bentuk Wajah Anda:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {faceShapes.map((shape) => {
              const active = selectedFaceShape === shape;
              return (
                <button
                  key={shape}
                  onClick={() => setSelectedFaceShape(shape)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-amber-500/20 border border-amber-500 text-amber-300 font-bold'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border border-transparent'
                  }`}
                >
                  {shape === 'Semua' ? 'Semua Bentuk Wajah' : `Wajah ${shape}`}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Haircuts Gallery Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-zinc-400">
            Menampilkan <strong className="text-white">{filteredHaircuts.length}</strong> model rambut
          </span>
          {(selectedCategory !== 'Semua' || selectedFaceShape !== 'Semua' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSelectedFaceShape('Semua');
                setSearchQuery('');
              }}
              className="text-xs text-amber-400 hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {filteredHaircuts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-zinc-800">
            <p className="text-zinc-400 text-sm">Tidak ada model cukuran yang cocok dengan filter pencarian Anda.</p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSelectedFaceShape('Semua');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs"
            >
              Tampilkan Semua Gaya
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHaircuts.map((hc) => (
              <div
                key={hc.id}
                className="group bg-zinc-900/70 border border-zinc-800/80 rounded-3xl overflow-hidden hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image and Badges */}
                <div 
                  onClick={() => onOpenHaircutDetail(hc)}
                  className="relative aspect-[4/5] bg-zinc-950 cursor-pointer overflow-hidden"
                >
                  <img 
                    src={hc.imageUrl} 
                    alt={hc.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                  
                  {hc.trending && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-zinc-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <Flame className="w-3 h-3 fill-zinc-950" />
                      <span>Trending</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase font-bold text-amber-400 bg-zinc-950/80 px-2 py-0.5 rounded">
                      {hc.category}
                    </span>
                    <h3 className="font-serif-luxury text-lg font-bold text-white mt-1">
                      {hc.title}
                    </h3>
                  </div>
                </div>

                {/* Card Description & Face Badges */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {hc.description}
                    </p>

                    <div className="space-y-1 text-[11px]">
                      <span className="text-zinc-500 block">Bentuk Wajah Cocok:</span>
                      <div className="flex flex-wrap gap-1">
                        {hc.faceShapes?.map((s, idx) => (
                          <span key={idx} className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                    <button
                      onClick={() => onOpenHaircutDetail(hc)}
                      className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => onSelectForBooking(hc)}
                      className="flex-1 py-2 rounded-xl bg-gold-gradient text-zinc-950 text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Booking</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Face Shape Guide Educational Infographic */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-serif-luxury text-2xl font-bold text-white">
            Panduan Menemukan Potongan Berdasarkan Wajah
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Tips dari Chief Master Barber AA'MILL untuk tampilan paling proporsional.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800">
            <h4 className="font-bold text-amber-400 mb-1">1. Wajah Oval</h4>
            <p className="text-zinc-300">
              Bentuk paling fleksibel. Cocok untuk hampir semua model: Undercut, Pompadour, Fade, atau Buzz cut rapi.
            </p>
          </div>
          <div className="p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800">
            <h4 className="font-bold text-amber-400 mb-1">2. Wajah Kotak</h4>
            <p className="text-zinc-300">
              Garis rahang kuat. Pilihlah potongan dengan sisi samping pendek (Low/Skin Fade) dan tekstur bervolume di atas.
            </p>
          </div>
          <div className="p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800">
            <h4 className="font-bold text-amber-400 mb-1">3. Wajah Bulat</h4>
            <p className="text-zinc-300">
              Butuh ilusi memperpanjang wajah. Hindari poni depan tebal. Pilih Quiff bervolume tinggi atau Pompadour.
            </p>
          </div>
          <div className="p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800">
            <h4 className="font-bold text-amber-400 mb-1">4. Wajah Lonjong</h4>
            <p className="text-zinc-300">
              Sangat pas dengan gaya berponi seperti Textured French Crop atau Two-Block agar proporsi dahi seimbang.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
