import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  RotateCcw,
  Scissors
} from 'lucide-react';

export default function ConsultationQuizModal({ 
  isOpen, 
  onClose, 
  haircuts = [], 
  onSelectHaircutForBooking,
  onOpenHaircutDetail
}) {
  const [step, setStep] = useState(1);
  const [faceShape, setFaceShape] = useState('');
  const [hairType, setHairType] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [matchedResults, setMatchedResults] = useState([]);

  if (!isOpen) return null;

  const handleFinishQuiz = () => {
    // Filter matching haircuts based on face shape
    let filtered = haircuts.filter((h) => 
      h.faceShapes?.some((shape) => shape.toLowerCase().includes(faceShape.toLowerCase()))
    );

    if (filtered.length === 0) {
      filtered = haircuts.slice(0, 3);
    }

    setMatchedResults(filtered.slice(0, 3));
    setStep(4); // Results
  };

  const handleReset = () => {
    setStep(1);
    setFaceShape('');
    setHairType('');
    setLifestyle('');
    setMatchedResults([]);
  };

  const FACE_OPTIONS = [
    { id: 'Oval', label: 'Wajah Oval', desc: 'Panjang sedikit lebih besar dari lebar tulang pipi, garis rahang lembut.' },
    { id: 'Kotak', label: 'Wajah Kotak / Persegi', desc: 'Garis rahang tegas, dahi dan tulang pipi memiliki lebar yang hampir sama.' },
    { id: 'Bulat', label: 'Wajah Bulat', desc: 'Tulang pipi lebar dengan sudut rahang melengkung lembut.' },
    { id: 'Lonjong', label: 'Wajah Lonjong / Oblong', desc: 'Wajah tampak ramping dan panjang dengan dagu yang sedikit lancip.' },
    { id: 'Segitiga', label: 'Wajah Segitiga / Hati', desc: 'Dahi lebih lebar dengan dagu yang meruncing tegas.' }
  ];

  const HAIR_OPTIONS = [
    { id: 'lurus', label: 'Lurus & Halus / Lembut', desc: 'Mudah jatuh, butuh volume tambahan agar tidak lepek.' },
    { id: 'tebal', label: 'Lurus Kaku & Tebal', desc: 'Rambut mengembang ke samping bila dipotong terlalu pendek.' },
    { id: 'gelombang', label: 'Bergelombang (Wavy)', desc: 'Memiliki tekstur alami berlekuk yang sangat fleksibel.' },
    { id: 'ikal', label: 'Keriting / Ikal (Curly)', desc: 'Padat dan bervolume, bagus untuk fade samping kontras.' }
  ];

  const LIFESTYLE_OPTIONS = [
    { id: 'formal', label: 'Kantoran & Profesional Formal', desc: 'Kesan rapi, gentleman, berwibawa, dan mudah disisir klimis.' },
    { id: 'casual', label: 'Kasual, Kuliah & Mahasiswa Trendi', desc: 'Gaya modern masa kini, tekstur acak natural yang stylish.' },
    { id: 'sporty', label: 'Sporty & Aktif (Anti Gerah)', desc: 'Potongan ringkas, bersih, cepat kering sehabis berolahraga.' },
    { id: 'kreatif', label: 'Kreatif, Musik & Ekspresif', desc: 'Gaya edgy seperti Mullet, Hair Tattoo, atau pewarnaan modern.' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-6 relative transition-all">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-white">Konsultan Model Rambut</h3>
              <p className="text-xs text-zinc-400">Temukan Gaya Cukuran Ideal Berdasarkan Bentuk Wajahmu</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Steps */}
        <div className="p-6">
          
          {/* STEP 1: Bentuk Wajah */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Pertanyaan 1 dari 3</span>
                <h4 className="text-lg font-bold text-white mt-0.5">Bagaimana Bentuk Wajah Anda?</h4>
                <p className="text-xs text-zinc-400">Pilih bentuk wajah yang paling mendekati cermin Anda.</p>
              </div>

              <div className="space-y-2.5">
                {FACE_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setFaceShape(opt.id);
                      setStep(2);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      faceShape === opt.id 
                        ? 'bg-amber-500/15 border-amber-500 text-white' 
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 text-zinc-300'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border border-zinc-600 flex items-center justify-center shrink-0 mt-0.5">
                      {faceShape === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">{opt.label}</h5>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Tipe Rambut */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Pertanyaan 2 dari 3</span>
                <h4 className="text-lg font-bold text-white mt-0.5">Bagaimana Tekstur Alami Rambut Anda?</h4>
                <p className="text-xs text-zinc-400">Tekstur menentukan ketahanan gaya rambut seharian.</p>
              </div>

              <div className="space-y-2.5">
                {HAIR_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setHairType(opt.id);
                      setStep(3);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      hairType === opt.id 
                        ? 'bg-amber-500/15 border-amber-500 text-white' 
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 text-zinc-300'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border border-zinc-600 flex items-center justify-center shrink-0 mt-0.5">
                      {hairType === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">{opt.label}</h5>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Karakter / Aktivitas */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Pertanyaan 3 dari 3</span>
                <h4 className="text-lg font-bold text-white mt-0.5">Kesan & Aktivitas Sehari-hari Anda?</h4>
                <p className="text-xs text-zinc-400">Pilih suasana yang ingin Anda pancarkan setiap hari.</p>
              </div>

              <div className="space-y-2.5">
                {LIFESTYLE_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setLifestyle(opt.id);
                      handleFinishQuiz();
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      lifestyle === opt.id 
                        ? 'bg-amber-500/15 border-amber-500 text-white' 
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 text-zinc-300'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border border-zinc-600 flex items-center justify-center shrink-0 mt-0.5">
                      {lifestyle === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">{opt.label}</h5>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: HASIL REKOMENDASI */}
          {step === 4 && (
            <div className="space-y-5 text-center">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <h4 className="font-serif-luxury text-xl font-bold text-white">
                  Rekomendasi Terbaik Untuk Wajah {faceShape}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Berdasarkan analisa bentuk wajah dan preferensi Anda, berikut gaya paling proporsional:
                </p>
              </div>

              {/* Matched haircut cards */}
              <div className="space-y-3 text-left">
                {matchedResults.map((hc) => (
                  <div
                    key={hc.id}
                    className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between gap-3 hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={hc.imageUrl} 
                        alt={hc.title} 
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">{hc.title}</h5>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {hc.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{hc.description}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Produk: {hc.pomadeRecommended}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          onSelectHaircutForBooking(hc);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gold-gradient text-zinc-950 font-bold text-xs hover:brightness-110 transition-all"
                      >
                        Booking Ini
                      </button>
                      <button
                        onClick={() => {
                          onOpenHaircutDetail(hc);
                          onClose();
                        }}
                        className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-[11px] hover:bg-zinc-700 transition-colors"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Tes Konsultasi</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
