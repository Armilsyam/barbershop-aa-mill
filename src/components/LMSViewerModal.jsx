import React, { useState } from 'react';
import { 
  X, 
  Play, 
  CheckCircle, 
  BookOpen, 
  Clock, 
  Scissors, 
  Wrench, 
  ListOrdered,
  FileText
} from 'lucide-react';

export default function LMSViewerModal({ lesson, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});

  if (!isOpen || !lesson) return null;

  const toggleStep = (idx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-6 relative transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                LMS Modul Belajar
              </span>
              <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white truncate max-w-md mt-0.5">
                {lesson.title}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Mockup */}
        <div className="relative aspect-video bg-zinc-950 flex items-center justify-center overflow-hidden border-b border-zinc-800">
          <img 
            src={lesson.videoThumbnail} 
            alt={lesson.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent"></div>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-16 h-16 rounded-full bg-gold-gradient text-zinc-950 flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 active:scale-95 transition-all"
          >
            <Play className="w-7 h-7 fill-zinc-950 ml-1" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-zinc-300">
            <span className="bg-zinc-900/80 px-2.5 py-1 rounded-md font-mono text-amber-400">
              {lesson.duration}
            </span>
            <span className="bg-zinc-900/80 px-2.5 py-1 rounded-md">
              Kualitas: 1080p HD Studio
            </span>
          </div>
        </div>

        {/* Lesson Details */}
        <div className="p-6 space-y-5 max-h-[360px] overflow-y-auto">
          
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Ringkasan Materi Kuliah</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {lesson.summary}
            </p>
          </div>

          {/* Tools Required */}
          {lesson.toolRequirements && (
            <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Peralatan Barber yang Disiapkan:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {lesson.toolRequirements.map((tool, i) => (
                  <span key={i} className="text-xs bg-zinc-800 text-zinc-200 px-2.5 py-1 rounded-lg border border-zinc-700">
                    ✂️ {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Practical Steps */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
              <span>Langkah Praktek (Checklist Siswa)</span>
            </h4>
            <div className="space-y-2">
              {lesson.steps?.map((st, idx) => {
                const isChecked = !!completedSteps[idx];
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isChecked 
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                      isChecked ? 'bg-emerald-500 border-emerald-400 text-zinc-950' : 'border-zinc-600'
                    }`}>
                      {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs leading-relaxed">{st}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
