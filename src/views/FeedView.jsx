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
  Users,
  Award,
  Crown,
  UserPlus,
  MessageSquare,
  CheckCircle,
  ExternalLink,
  Phone
} from 'lucide-react';

export default function FeedView({ 
  posts = [], 
  haircuts = [], 
  members = [],
  communityMessages = [],
  onLikePost, 
  onAddComment, 
  onNewPost,
  onAddMember,
  onSendCommunityMessage,
  onSelectHaircutForBooking,
  settings,
  isAdmin 
}) {
  const [subTab, setSubTab] = useState('feed'); // 'feed' | 'members' | 'lounge'
  
  // Post comments
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [userNameInput, setUserNameInput] = useState('');
  
  // New Post Form modal
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('Senior Stylist');
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newHaircutId, setNewHaircutId] = useState('');

  // New Member Join Form modal
  const [showJoinMemberModal, setShowJoinMemberModal] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberBarber, setMemberBarber] = useState('Aa\' Mill');
  const [memberStyle, setMemberStyle] = useState('Low Taper Fade');

  // Customer Lounge Chat input
  const [loungeName, setLoungeName] = useState('');
  const [loungeMessage, setLoungeMessage] = useState('');

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
    const user = userNameInput.trim() || 'Pelanggan Setia AA\'MILL';
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

  const handleJoinMemberSubmit = (e) => {
    e.preventDefault();
    if (!memberName.trim() || !memberPhone.trim()) return;

    onAddMember({
      name: memberName.trim(),
      phone: memberPhone.trim(),
      favoriteBarber: memberBarber,
      lastCutStyle: memberStyle,
      joinedDate: 'Hari Ini'
    });

    setShowJoinMemberModal(false);
    setMemberName('');
    setMemberPhone('');
    alert(`Selamat bergabung di Member Club Barbershop AA'MILL, ${memberName}!`);
  };

  const handleLoungeSubmit = (e) => {
    e.preventDefault();
    if (!loungeMessage.trim()) return;
    const user = loungeName.trim() || 'Pelanggan AA\'MILL';
    onSendCommunityMessage(user, loungeMessage.trim());
    setLoungeMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>Media Sosial & Komunitas Member Pelanggan</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-black text-white">
            Komunitas Barbershop AA'MILL
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Wadah berbagi tren potongan rambut, interaksi sesama pelanggan, dan apresiasi karya kapster.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowJoinMemberModal(true)}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-400 hover:bg-zinc-800 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Member Club</span>
          </button>

          <button
            onClick={() => setShowNewPostModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Hasil Cukur</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-2 rounded-2xl flex items-center gap-2 text-xs font-semibold">
        <button
          onClick={() => setSubTab('feed')}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
            subTab === 'feed'
              ? 'bg-gold-gradient text-zinc-950 font-bold shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Feed Portofolio Cukur</span>
        </button>

        <button
          onClick={() => setSubTab('members')}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
            subTab === 'members'
              ? 'bg-gold-gradient text-zinc-950 font-bold shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Member & Pelanggan ({members.length})</span>
        </button>

        <button
          onClick={() => setSubTab('lounge')}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
            subTab === 'lounge'
              ? 'bg-gold-gradient text-zinc-950 font-bold shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Lounge Diskusi Komunitas</span>
        </button>
      </div>

      {/* TAB 1: FEED PORTOFOLIO CUKUR */}
      {subTab === 'feed' && (
        <div className="space-y-8">
          
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

          {/* Posts List */}
          <div className="space-y-8">
            {posts.map((post) => {
              const matchingHaircut = haircuts.find(h => h.id === post.haircutStyleId);
              return (
                <div
                  key={post.id}
                  className="bg-zinc-900/70 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl"
                >
                  {/* Author Bar */}
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

                  {/* Post Image */}
                  <div className="relative aspect-square sm:aspect-[4/3] bg-zinc-950 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt="Barber transformation" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Interaksi Like & Comment */}
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

                    {/* Comments Area */}
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

        </div>
      )}

      {/* TAB 2: MEMBER & PELANGGAN YANG SUDAH DIPANGKAS */}
      {subTab === 'members' && (
        <div className="space-y-8">
          
          {/* Member Club VIP Perks Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-zinc-900 to-amber-950/40 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                <Crown className="w-4 h-4" />
                <span>AA'MILL Gentleman Club Privilege</span>
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Komunitas Pelanggan Setia Barbershop AA'MILL
              </h3>
              <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
                Dapatkan potongan harga khusus 10% setiap cukur ke-5, prioritas booking tanpa antre, dan undangan sharing session grooming bersama Chief Aa' Mill.
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-2">
              <a
                href="https://wa.me/6282291544262?text=Halo%20Admin%201,%20saya%20mau%20gabung%20Grup%20WhatsApp%20VIP%20Customer%20AA'MILL"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Gabung Grup WA VIP Customer</span>
              </a>

              <button
                onClick={() => setShowJoinMemberModal(true)}
                className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
              >
                + Daftarkan Diri Jadi Member
              </button>
            </div>
          </div>

          {/* Members Grid Cards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Daftar Member Aktif ({members.length} Pelanggan Bergabung)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {members.map((mbr) => (
                <div
                  key={mbr.id}
                  className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl text-center space-y-3 hover:border-amber-500/40 transition-all"
                >
                  <div className="relative inline-block">
                    <img
                      src={mbr.avatar}
                      alt={mbr.name}
                      className="w-18 h-18 rounded-full object-cover mx-auto border-2 border-amber-500/40 p-1"
                    />
                    <span className="absolute bottom-0 right-0 px-2 py-0.2 rounded-full bg-amber-500 text-zinc-950 font-bold text-[9px]">
                      {mbr.cutsCount}x Cukur
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-white text-sm truncate">{mbr.name}</h5>
                    <p className="text-[11px] text-amber-400 font-semibold">{mbr.badge || mbr.tier}</p>
                    <span className="text-[10px] text-zinc-500 block">Bergabung: {mbr.joinedDate}</span>
                  </div>

                  <div className="p-2.5 bg-zinc-950 rounded-xl text-left text-[11px] space-y-1 border border-zinc-800/80">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Kapster Favorit:</span>
                      <strong className="text-zinc-300">{mbr.favoriteBarber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Gaya Terakhir:</span>
                      <strong className="text-amber-400 truncate max-w-[100px]">{mbr.lastCutStyle}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: LOUNGE DISKUSI KOMUNITAS PELANGGAN */}
      {subTab === 'lounge' && (
        <div className="space-y-6">
          
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Customer Lounge & Tanya Jawab Gaya Rambut
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Ruang diskusi santai sesama pelanggan Barbershop AA'MILL. Tanyakan tips perawatan rambut dan kapster siap menjawab langsung.
              </p>
            </div>

            {/* Input New Topic */}
            <form onSubmit={handleLoungeSubmit} className="space-y-3 pt-2 border-t border-zinc-800">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={loungeName}
                  onChange={(e) => setLoungeName(e.target.value)}
                  placeholder="Nama Anda / Member ID..."
                  className="w-full sm:w-1/3 px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  value={loungeMessage}
                  onChange={(e) => setLoungeMessage(e.target.value)}
                  placeholder="Tulis topik diskusi, tips pomade, atau review hasil cukuran..."
                  className="flex-1 px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs shrink-0 hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan</span>
                </button>
              </div>
            </form>
          </div>

          {/* Lounge Message Feed */}
          <div className="space-y-4">
            {communityMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-5 bg-zinc-900/70 border border-zinc-800 rounded-3xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={msg.avatar}
                      alt={msg.author}
                      className="w-9 h-9 rounded-full object-cover border border-amber-500/40"
                    />
                    <div>
                      <h5 className="font-bold text-white text-xs sm:text-sm">{msg.author}</h5>
                      <span className="text-[10px] text-zinc-500">{msg.timestamp}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-12">
                  {msg.content}
                </p>

                {/* Replies from Kapster */}
                {msg.replies && msg.replies.length > 0 && (
                  <div className="ml-12 pt-2 border-t border-zinc-800/80 space-y-2">
                    {msg.replies.map((rep, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-400 flex items-center gap-1">
                            ✂️ {rep.user} <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300">Official Staff</span>
                          </span>
                          <span className="text-[10px] text-zinc-500">{rep.time}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{rep.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

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
              Buat Postingan Portofolio Cukur
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

      {/* JOIN MEMBER CLUB MODAL */}
      {showJoinMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShowJoinMemberModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Daftar Member Club AA'MILL
              </h3>
              <p className="text-xs text-zinc-400">
                Catat riwayat pangkas rambut Anda untuk mendapatkan diskon loyalitas.
              </p>
            </div>

            <form onSubmit={handleJoinMemberSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="Contoh: Derry Firmansyah"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Kapster / Barber Langganan</label>
                <select
                  value={memberBarber}
                  onChange={(e) => setMemberBarber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                >
                  <option value="Aa' Mill">Chief Aa' Mill (Master)</option>
                  <option value="Rendy Pratama">Rendy Pratama (Senior)</option>
                  <option value="Doni Setiawan">Doni Setiawan (Colorist)</option>
                  <option value="Yoga Saputra">Yoga Saputra (Shaving)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Model Rambut Favorit Anda</label>
                <input
                  type="text"
                  value={memberStyle}
                  onChange={(e) => setMemberStyle(e.target.value)}
                  placeholder="Contoh: Low Taper Fade / French Crop"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs hover:brightness-110 transition-all mt-3"
              >
                Konfirmasi Bergabung Member Club
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
