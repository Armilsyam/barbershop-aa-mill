import React from 'react';
import { 
  X, 
  Scissors, 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  Share2, 
  User, 
  HelpCircle,
  Flame
} from 'lucide-react';

export default function LookbookModal({ haircut, isOpen, onClose, onSelectForBooking }) {
  if (!isOpen || !haircut) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${haircut.title} — Barbershop AA'MILL`,
        text: `Lihat model rambut keren ${haircut.title} di Barbershop AA'MILL!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link model cukuran disalin ke papan klip!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-6 relative transition-all">
        
        {/* Close & Share Float */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-zinc-300 hover:text-white hover:border-amber-500 transition-colors"
            title="Bagikan Gaya Ini"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Haircut Image Visual */}
          <div className="relative h-72 md:h-full min-h-[320px] bg-zinc-950 overflow-hidden">
            <img 
              src={haircut.imageUrl} 
              alt={haircut.title} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden" />
            
            {haircut.trending && (
              <div className="absolute top-4 left-4 bg-amber-500 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-zinc-950" />
                <span>Paling Diminati</span>
              </div>
            )}

            <div className="absolute bottom-3 left-4 right-4 text-xs bg-zinc-950/70 backdrop-blur-md p-2.5 rounded-xl border border-zinc-800 text-zinc-300 hidden md:block">
              <span className="text-amber-400 font-semibold">Tingkat Kesulitan: </span>
              {haircut.difficulty || 'Presisi Barber Pro'}
            </div>
          </div>

          {/* Haircut Information Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {haircut.category}
                </span>
                <span className="text-xs text-zinc-500">•</span>
                <span className="text-xs text-zinc-400 font-medium">Model Barber AA'MILL</span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-3">
                {haircut.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {haircut.description}
              </p>

              {/* Face Shapes Compatibility */}
              <div className="bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800 space-y-3 mb-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bentuk Wajah yang Sangat Cocok:</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {haircut.faceShapes?.map((shape, idx) => (
                      <span 
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-800 text-amber-300 border border-zinc-700"
                      >
                        ✓ Wajah {shape}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rekomendasi Produk Styling:</span>
                  </h4>
                  <p className="text-xs text-zinc-300 font-medium">
                    {haircut.pomadeRecommended}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {haircut.tags?.map((tag, i) => (
                  <span key={i} className="text-[11px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onSelectForBooking(haircut);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Pilih Gaya Ini & Booking Sekarang</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
