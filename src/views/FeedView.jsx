import React, { useState } from 'react';
import { 
  Flame, 
  Heart, 
  MessageCircle, 
  Share2, 
  Send, 
  Sparkles, 
  PlusCircle, 
  X, 
  Calendar,
  Image as ImageIcon
} from 'lucide-react';

export default function FeedView({ 
  posts = [], 
  haircuts = [], 
  onLikePost, 
  onAddComment, 
  onNewPost,
  onSelectHaircutForBooking,
  isAdmin 
}) {
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [userNameInput, setUserNameInput] = useState('');
  
  // New Post Form state
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('Barber Staff');
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newHaircutId, setNewHaircutId] = useState('');

  const STORIES = [
    { name: "Chief Mill", avatar: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=150&auto=format&fit=crop&q=80", active: true },
    { name: "Fade Hari Ini", avatar: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=150&auto=format&fit=crop&q=80", active: true },
    { name: "Siswa Praktek", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80", active: true },
    { name: "Promo Weekend", avatar: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=150&auto=format&fit=crop&q=80", active: false },
    { name: "Behind Scenes", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", active: false },
  ];

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const user = userNameInput.trim() || 'Pelanggan AA\'MILL';
    onAddComment(postId, user, commentInput.trim());
    setCommentInput('');
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newCaption.trim() || !newImageUrl.trim()) return;

    onNewPost({
      author: newAuthor.trim() || 'Barbershop AA\'MILL',
      authorRole: newRole,
      avatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&auto=format&fit=crop&q=80',
      caption: newCaption.trim(),
      imageUrl: newImageUrl.trim(),
      haircutStyleId: newHaircutId || null,
      tags: ['#BarbershopAAMILL', '#FreshFade', '#ModernMenStyle']
    });

    setShowNewPostModal(false);
    setNewCaption('');
    setNewImageUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>Media Sosial & Komunitas Barber</span>
          </div>
          <h1 className="font-serif-luxury text-3xl font-black text-white">
            Portofolio & Tren Gaya Rambut
          </h1>
          <p className="text-xs text-zinc-400">
            Karya potongan rambut terkini dari tim Barber AA'MILL & karya siswa Academy.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Postingan Baru</span>
        </button>
      </div>

      {/* Stories Bar */}
      <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-3xl flex items-center gap-4 overflow-x-auto">
        {STORIES.map((st, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
            <div className={`p-0.5 rounded-full ${
              st.active ? 'bg-gradient-to-tr from-amber-500 via-red-500 to-amber-300' : 'bg-zinc-700'
            }`}>
              <img 
                src={st.avatar} 
                alt={st.name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-zinc-950 group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-[10px] text-zinc-300 font-medium truncate max-w-[65px]">{st.name}</span>
          </div>
        ))}
      </div>

      {/* Feed Post List */}
      <div className="space-y-8">
        {posts.map((post) => {
          const matchingHaircut = haircuts.find(h => h.id === post.haircutStyleId);
          return (
            <div
              key={post.id}
              className="bg-zinc-900/70 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Post Author Bar */}
              <div className="p-4 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/40">
                <div className="flex items-center gap-3">
                  <img 
                    src={post.avatar} 
                    alt={post.author} 
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-white">{post.author}</h4>
                      <span className="text-[10px] text-amber-400 font-semibold px-2 py-0.2 rounded bg-amber-500/10">
                        {post.authorRole}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500">{post.timestamp}</span>
                  </div>
                </div>

                {matchingHaircut && (
                  <button
                    onClick={() => onSelectHaircutForBooking(matchingHaircut)}
                    className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-zinc-950 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Booking Model Ini</span>
                  </button>
                )}
              </div>

              {/* Post Main Image */}
              <div className="relative aspect-square sm:aspect-[4/3] bg-zinc-950 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt="Barber transformation" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Action Toolbar (Like, Comment, Share) */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onLikePost(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-semibold transition-transform active:scale-125 ${
                        post.isLiked ? 'text-red-500' : 'text-zinc-300 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-red-500' : ''}`} />
                      <span>{post.likesCount} Suka</span>
                    </button>

                    <button
                      onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.commentsCount || 0} Komentar</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: post.caption, url: window.location.href }).catch(() => {});
                      } else {
                        alert('Link postingan siap dibagikan!');
                      }
                    }}
                    className="text-zinc-400 hover:text-white p-1"
                    title="Bagikan"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Caption */}
                <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <strong className="text-white mr-1.5">{post.author}</strong>
                  {post.caption}
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags?.map((t, idx) => (
                    <span key={idx} className="text-[11px] text-amber-400/90 hover:underline cursor-pointer">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Comments Section */}
                <div className="pt-3 border-t border-zinc-800/80 space-y-2.5">
                  {post.comments?.map((c, i) => (
                    <div key={i} className="text-xs flex items-start justify-between bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/60">
                      <div>
                        <strong className="text-amber-400 mr-1.5">{c.user}:</strong>
                        <span className="text-zinc-300">{c.text}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 shrink-0 ml-2">{c.time}</span>
                    </div>
                  ))}

                  {/* Add comment input */}
                  <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="pt-2 flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={userNameInput}
                      onChange={(e) => setUserNameInput(e.target.value)}
                      placeholder="Nama Anda (opsional)..."
                      className="w-full sm:w-1/3 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        required
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Tulis tanggapan atau tanya model rambut..."
                        className="flex-1 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shrink-0 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE NEW POST MODAL */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShowNewPostModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-luxury text-xl font-bold text-white mb-1">
              Buat Postingan Portofolio Baru
            </h3>
            <p className="text-xs text-zinc-400 mb-5">
              Bagikan hasil pangkas rambut terbaru ke feed komunitas AA'MILL.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Pembuat</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Contoh: Rendy Pratama"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Peran / Jabatan</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white"
                  >
                    <option value="Master Barber">Master Barber</option>
                    <option value="Senior Stylist">Senior Stylist</option>
                    <option value="Siswa Academy">Siswa Academy</option>
                    <option value="Pelanggan Setia">Pelanggan Setia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  URL Foto Hasil Cukur <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Caption & Cerita Cukur <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows="3"
                  required
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Ceritakan proses pemotongan, jenis rambut klien, dan produk yang dipakai..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Hubungkan dengan Model di Lookbook (Opsional)
                </label>
                <select
                  value={newHaircutId}
                  onChange={(e) => setNewHaircutId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white"
                >
                  <option value="">-- Tidak dihubungkan --</option>
                  {haircuts.map(h => (
                    <option key={h.id} value={h.id}>{h.title} ({h.category})</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs hover:brightness-110 transition-all mt-2"
              >
                Publikasikan ke Feed
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
