export const INITIAL_SETTINGS = {
  barbershopName: "BARBERSHOP AA'MILL",
  tagline: "The Art of Precision Haircutting & Master Barber Academy",
  address: "Jl. Veteran No. 88, Pusat Kota, Indonesia",
  
  // Kontak Resmi Dua Admin
  admin1: {
    name: "Admin 1 (Reservasi & Booking)",
    phone: "082291544262",
    whatsapp: "6282291544262",
    role: "Layanan Booking, Kasir & Antrean"
  },
  admin2: {
    name: "Admin 2 (Academy & Konsultasi)",
    phone: "082191843162",
    whatsapp: "6282191843162",
    role: "Pendaftaran Kursus Barber & Konsultasi Bisnis"
  },
  
  // Default fallback whatsapp
  whatsapp: "6282291544262",
  phone: "+62 822-9154-4262",
  
  instagram: "@barbershop_aamill",
  tiktok: "@aamillbarber",
  googleMapsUrl: "https://maps.google.com/?q=Barbershop+AAMILL",
  operationalHours: "Senin - Minggu: 09:00 - 22:00 WIB",
  announcement: "🔥 HUBUNGI ADMIN: Admin 1 (082291544262) untuk Booking Cukur | Admin 2 (082191843162) untuk Pendaftaran Kursus Barber Academy!",
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  }
};

export const INITIAL_BARBERS = [
  {
    id: "b1",
    name: "Aa' Mill",
    nickname: "Chief Mill",
    role: "Founder & Master Educator",
    experience: "12 Tahun Pengalaman",
    commissionRate: 0.70, // 70% share for founder/chief
    rating: 5.0,
    totalReviews: 480,
    avatarUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
    bio: "Spesialis Fade presisi tinggi, Scissor over comb, dan konsultan estetika bentuk wajah pria. Instruktur bersertifikasi internasional.",
    specialties: ["High Skin Fade", "Scissor Mastery", "Facial Hair Sculpting", "Classic Slick"]
  },
  {
    id: "b2",
    name: "Rendy Pratama",
    nickname: "Rendy",
    role: "Senior Barber & Stylist",
    experience: "6 Tahun Pengalaman",
    commissionRate: 0.60, // 60% capster share
    rating: 4.9,
    totalReviews: 310,
    avatarUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80",
    bio: "Ahli dalam gaya rambut trendi anak muda modern seperti Two-Block, French Crop, dan Textured Mullet.",
    specialties: ["French Crop", "Korean Two-Block", "Modern Mullet", "Hair Tattoo"]
  },
  {
    id: "b3",
    name: "Doni Setiawan",
    nickname: "Doni",
    role: "Pro Barber & Colorist",
    experience: "5 Tahun Pengalaman",
    commissionRate: 0.60,
    rating: 4.8,
    totalReviews: 245,
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    bio: "Pakar Hair Coloring, Bleaching Ash Grey / Blonde, serta perawatan Hair Spa & Scalp Treatment.",
    specialties: ["Hair Coloring", "Low Taper Fade", "Scalp Detox", "Beard Trim"]
  },
  {
    id: "b4",
    name: "Yoga Saputra",
    nickname: "Yoga",
    role: "Junior Barber & Shaving Specialist",
    experience: "3 Tahun Pengalaman",
    commissionRate: 0.55,
    rating: 4.8,
    totalReviews: 190,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    bio: "Lulusan terbaik AA'MILL Barber Academy. Sangat teliti pada Royal Hot Towel Shave dan pemotongan rapi anak-anak.",
    specialties: ["Royal Hot Shave", "Buzz Cut Precision", "Kids Grooming", "Clean Taper"]
  }
];

export const INITIAL_SERVICES = [
  {
    id: "s1",
    name: "Signature Precision Cut",
    category: "Haircut",
    price: 65000,
    duration: "45 Menit",
    description: "Konsultasi bentuk wajah, pangkas rambut presisi, hair wash shampo aromaterapi, pijat leher & styling pomade.",
    popular: true,
    icon: "Scissors"
  },
  {
    id: "s2",
    name: "The Sultan Full Grooming",
    category: "Package",
    price: 135000,
    duration: "75 Menit",
    description: "Signature Haircut + Royal Hot Towel Shave / Beard Trim + Hair Spa Detox + Masker Wajah Hitam + Styling Pomade.",
    popular: true,
    icon: "Crown"
  },
  {
    id: "s3",
    name: "Royal Hot Towel Shave",
    category: "Shaving",
    price: 45000,
    duration: "30 Menit",
    description: "Cukur jenggot/kumis tradisional menggunakan pisau silet baru, handuk hangat aromaterapi, krim busa lembut, dan aftershave dingin.",
    popular: false,
    icon: "Sparkles"
  },
  {
    id: "s4",
    name: "Hair Spa & Scalp Detox",
    category: "Treatment",
    price: 55000,
    duration: "40 Menit",
    description: "Perawatan kulit kepala mendalam untuk mengatasi ketombe, rambut rontok, relaksasi pijat acupressure kepala dan leher.",
    popular: false,
    icon: "Flame"
  },
  {
    id: "s5",
    name: "Hair Coloring & Bleaching",
    category: "Coloring",
    price: 180000,
    duration: "90 Menit",
    description: "Pewarnaan rambut tren terkini (Ash Grey, Platinum Blonde, Brunette, Matrix) menggunakan produk berkualitas ramah kulit kepala.",
    popular: false,
    icon: "Palette"
  },
  {
    id: "s6",
    name: "Kids & Student Gentle Cut",
    category: "Haircut",
    price: 50000,
    duration: "35 Menit",
    description: "Potong rambut khusus anak-anak & pelajar dengan pendekatan sabar dan menyenangkan, bonus permen dan styling gel.",
    popular: false,
    icon: "Smile"
  }
];

export const INITIAL_HAIRCUTS = [
  {
    id: "hc-1",
    title: "Low Taper Fade",
    category: "Fade",
    faceShapes: ["Oval", "Kotak", "Bulat"],
    hairType: "Lurus & Gelombang",
    difficulty: "Medium",
    pomadeRecommended: "Matte Paste / Clay (Natural Hold)",
    description: "Gradasi tipis halus yang dimulai tepat di atas cambang dan tengkuk. Bagian atas dibiarkan bervolume natural untuk kesan rapi namun santai.",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80",
    tags: ["Populer", "Kantoran", "Casual"],
    trending: true
  },
  {
    id: "hc-2",
    title: "Textured French Crop",
    category: "Crop & Textured",
    faceShapes: ["Lonjong", "Oval", "Segitiga"],
    hairType: "Lurus & Tebal",
    difficulty: "Medium Presisi",
    pomadeRecommended: "Styling Powder / Matte Clay",
    description: "Poni depan horizontal bertekstur tajam dengan fade samping yang kontras. Paling digemari pria aktif karena minim perawatan harian.",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=80",
    tags: ["Trendi", "Gaya Eropa", "Easy Care"],
    trending: true
  },
  {
    id: "hc-3",
    title: "Modern Slick Pompadour",
    category: "Classic",
    faceShapes: ["Kotak", "Bulat", "Berlian"],
    hairType: "Lurus & Sedang",
    difficulty: "Tinggi",
    pomadeRecommended: "Water-Based High Shine Pomade",
    description: "Gaya klasik gentleman era rock & roll yang diadaptasi dengan skin fade modern di samping. Menampilkan wibawa pria sejati.",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80",
    tags: ["Gentleman", "Klasik", "Formal"],
    trending: false
  },
  {
    id: "hc-4",
    title: "Korean Two-Block Cut",
    category: "Korean / Two-Block",
    faceShapes: ["Oval", "Segitiga", "Lonjong"],
    hairType: "Lurus Lembut / Jatuh",
    difficulty: "Medium",
    pomadeRecommended: "Sea Salt Spray & Light Wax",
    description: "Gaya rambut khas idola K-Pop dengan bagian samping dan belakang bawah dipotong tipis terpisah (undercut internal) sementara bagian atas jatuh berlayer.",
    imageUrl: "https://images.unsplash.com/photo-1517832606589-7629c3397143?w=800&auto=format&fit=crop&q=80",
    tags: ["K-Style", "Idol", "Casual Clean"],
    trending: true
  },
  {
    id: "hc-5",
    title: "High Skin Fade Buzz Cut",
    category: "Fade",
    faceShapes: ["Kotak", "Oval", "Berlian"],
    hairType: "Semua Tipe Rambut",
    difficulty: "Tinggi Presisi",
    pomadeRecommended: "Hair Tonic & Beard Oil",
    description: "Potongan sangat bersih, tajam dengan line-up dahi presisi. Menonjolkan garis rahang yang tegas dan karakter maskulin kuat.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    tags: ["Maskulin", "Militer Modern", "Anti Gerah"],
    trending: false
  },
  {
    id: "hc-6",
    title: "Textured Modern Mullet",
    category: "Crop & Textured",
    faceShapes: ["Oval", "Kotak", "Lonjong"],
    hairType: "Gelombang / Ikal / Lurus",
    difficulty: "Tinggi",
    pomadeRecommended: "Sea Salt Spray & Medium Clay",
    description: "Sisi samping dipangkas taper/burst fade, bagian belakang dibiarkan menjuntai bertekstur liar. Tren retro yang kembali booming di kalangan Gen-Z.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    tags: ["Edgy", "Retro Modern", "Viral"],
    trending: true
  },
  {
    id: "hc-7",
    title: "Undercut Quiff",
    category: "Undercut",
    faceShapes: ["Bulat", "Kotak", "Oval"],
    hairType: "Tebal & Bervolume",
    difficulty: "Medium",
    pomadeRecommended: "Strong Hold Clay & Hairspray",
    description: "Bagian atas disisir naik bervolume ke arah belakang dengan tepi samping undercut yang tegas tanpa sambungan.",
    imageUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80",
    tags: ["Modern", "Sporty", "Confident"],
    trending: false
  },
  {
    id: "hc-8",
    title: "Beard Sculpt & Sharp Fade",
    category: "Beard & Shave",
    faceShapes: ["Bulat", "Kotak", "Segitiga"],
    hairType: "Semua Tipe Rambut & Brewok",
    difficulty: "Master Level",
    pomadeRecommended: "Beard Balm & Conditioning Oil",
    description: "Kombinasi rambut fade halus yang menyatu mulus (beard fade) ke dalam jambang dan janggut yang dirapikan dengan razor tajam.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    tags: ["Groomed Beard", "Gentleman", "Pro Master"],
    trending: true
  }
];

export const INITIAL_COURSES = [
  {
    id: "crs-1",
    title: "Kelas Barber Basic (Pemula Nol)",
    level: "Basic (Pemula)",
    duration: "2 Minggu (12 Pertemuan)",
    price: 2500000,
    studentCount: 142,
    rating: 4.9,
    description: "Didesain untuk siapa saja yang ingin memulai karir barber dari nol tanpa pengalaman sebelumnya. Dari cara memegang gunting hingga potong model pertama.",
    highlights: [
      "Pengenalan & Anatomi Alat Barber (Clipper, Trimmer, Shaver, Shears)",
      "Teknik Gunting Dasar & Sectioning Rambut",
      "Teknik Clipper Dasar Guard 1-4",
      "Praktek Langsung pada Model Manusia (Disediakan)",
      "Sertifikat Kelulusan Resmi AA'MILL Academy"
    ],
    syllabus: [
      { title: "Dasar & Anatomi", duration: "Day 1-3", lessons: "Pengenalan alat, sterilisasi, sanitasi, dan sectioning kepala" },
      { title: "Clipper & Gunting", duration: "Day 4-7", lessons: "Fading pemula, scissor over comb, clipper over comb" },
      { title: "Praktek Model Nyata", duration: "Day 8-11", lessons: "Praktek potong rambut langsung dengan bimbingan 1-on-1 instruktur" },
      { title: "Ujian & Sertifikasi", duration: "Day 12", lessons: "Live cutting exam & penganugerahan sertifikat barber resmi" }
    ],
    certificateIncluded: true,
    bonus: "Free Apron Eksklusif + Sisir Carbon AA'MILL"
  },
  {
    id: "crs-2",
    title: "Masterclass Fade & Modern Styling",
    level: "Intermediate / Pro",
    duration: "1 Minggu (6 Pertemuan Intensif)",
    price: 3500000,
    studentCount: 98,
    rating: 5.0,
    description: "Tingkatkan skill cukur Anda ke level tertinggi. Membedah teknik Skin Fade tanpa garis bayangan, French Crop tekstur, Two-Block, dan Razor line-up tajam.",
    highlights: [
      "Teknik Zero & Skin Fade Ultra Clean (Foil Shaver & Trimmer)",
      "Texturizing & Point Cutting dengan Gunting Khusus",
      "Korean Two-Block & Modern Mullet Formulations",
      "Teknik Beard Sculpting & Razor Line Presisi",
      "Teknik Fotografi Portofolio Hasil Cukur untuk Instagram"
    ],
    syllabus: [
      { title: "Advanced Fade Science", duration: "Day 1-2", lessons: "Low, Mid, High Fade tanpa garis bayang (zero line removal)" },
      { title: "Texturizing Masters", duration: "Day 3-4", lessons: "French crop, Mullet, Two block dan manipulasi tekstur rambut" },
      { title: "Beard & Razor Art", duration: "Day 5", lessons: "Hot towel shaving, razor edging, hair tattoo grafis dasar" },
      { title: "Photo & Branding", duration: "Day 6", lessons: "Lighting foto portofolio & personal branding barber mahal" }
    ],
    certificateIncluded: true,
    bonus: "Free Wahl Clipper Oil + Paket Modul Video Eksklusif"
  },
  {
    id: "crs-3",
    title: "Program Usaha Barbershop & Bisnis Owner",
    level: "Business & Management",
    duration: "3 Minggu + Magang 1 Bulan",
    price: 6000000,
    studentCount: 64,
    rating: 5.0,
    description: "Paket komplit untuk Anda yang bercita-cita membuka bisnis barbershop sendiri yang profitabel, sistematis, dan langsung bisa mengelola tim barber.",
    highlights: [
      "Seluruh Materi Basic + Advance Fade",
      "Manajemen Keuangan & SOP Kasir Barbershop",
      "Strategi Pemasaran Digital & Google Maps Ranking",
      "Magang Langsung di Barbershop AA'MILL selama 1 Bulan",
      "Konsultasi Desain Interior, Pembelian Alat Grosir, & Rekrutmen Staff"
    ],
    syllabus: [
      { title: "Full Technical Mastery", duration: "Minggu 1-2", lessons: "Kuasai semua model potong rambut dan standar higienis" },
      { title: "SOP & Operasional", duration: "Minggu 3", lessons: "SOP pelayanan pelanggan, POS Kasir, penanganan keluhan" },
      { title: "Magang Operasional Nyata", duration: "Bulan ke-2", lessons: "Menghadapi 50+ pelanggan asli di cabang AA'MILL" },
      { title: "Bimbingan Buka Usaha", duration: "Lifetime", lessons: "Review proposal usaha & panduan vendor distributor alat" }
    ],
    certificateIncluded: true,
    bonus: "Mesin Kasir Software POS Ready + Starter Paket Alat Komplit"
  },
  {
    id: "crs-4",
    title: "Private VIP 1-on-1 dengan Chief Mill",
    level: "Exclusive Private",
    duration: "Jadwal Fleksibel (10 Jam Mentoring)",
    price: 8500000,
    studentCount: 22,
    rating: 5.0,
    description: "Mentoring intensif privat langsung satu lawan satu bersama Founder AA'MILL. Belajar rahasia detail teknik kelas dunia tanpa gangguan murid lain.",
    highlights: [
      "Mentoring 1 Murid 1 Guru (Fokus 100%)",
      "Jadwal fleksibel menyesuaikan waktu luang Anda",
      "Akses Seumur Hidup konsultasi privat via WhatsApp",
      "Koreksi mikro pergerakan tangan dan sudut pisau",
      "Akses materi rahasia dan resep hair treatment salon internasional"
    ],
    syllabus: [
      { title: "Audit & Personalized Goal", duration: "Sesi 1", lessons: "Menentukan target skill spesifik yang ingin dikuasai" },
      { title: "Precision Micro-Tuning", duration: "Sesi 2-4", lessons: "Koreksi sudut gunting, ergonomi tubuh, dan kecepatan potong" },
      { title: "Custom Masterpiece Cutting", duration: "Sesi 5", lessons: "Praktek model live dengan pengawasan detil tiap detik" }
    ],
    certificateIncluded: true,
    bonus: "Sertifikat VIP bertanda tangan emas + Dinner Bisnis Eksklusif"
  }
];

export const INITIAL_LESSONS = [
  {
    id: "lsn-1",
    courseId: "crs-1",
    title: "Modul 1: Anatomi Alat Barber & Cara Sterilisasi Profesional",
    duration: "18:24 Menit",
    videoThumbnail: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80",
    summary: "Pelajari perbedaan Clipper motor magnetik vs rotari, fungsi masing-masing guard (alas sepatu), trimmer untuk detailing, dan clipper spray pendingin anti bakteri.",
    toolRequirements: ["Clipper Wahl / Kemei", "Blade Oil", "Disinfectant Spray", "Cleaning Brush"],
    steps: [
      "Memeriksa kesejajaran mata pisau (blade alignment) agar tidak melukai kulit klien.",
      "Menyetel tuas taper lever (open, half, closed) untuk mengatur panjang sisa rambut.",
      "Cara membersihkan mata pisau clipper dengan kuas pembersih setiap selesai memotong.",
      "Menyemprotkan disinfektan pembasmi jamur dan kuman sebelum dipakai ke klien berikutnya."
    ]
  },
  {
    id: "lsn-2",
    courseId: "crs-1",
    title: "Modul 2: Teknik Pegangan Gunting (Scissor Grip) & Sectioning",
    duration: "24:10 Menit",
    videoThumbnail: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=80",
    summary: "Ergonomi jemari yang tepat agar pergelangan tangan tidak cepat lelah saat menggunting, serta pembagian partisi kepala (horseshoe parting).",
    toolRequirements: ["Gunting Potong 6 Inch", "Sisir Karbon Barber", "Jepit Rambut Buaya"],
    steps: [
      "Posisi ibu jari dan jari manis di lubang gunting (hanya ibu jari yang bergerak aktif).",
      "Menemukan titik puncak kepala (Apex) dan membuat garis pembatas Horseshoe Parting.",
      "Menjepit rambut dengan jari telunjuk dan tengah pada sudut 90 derajat terhadap kulit kepala.",
      "Memotong sejajar dengan garis jari tanpa melewati ruas jari kedua untuk keamanan."
    ]
  },
  {
    id: "lsn-3",
    courseId: "crs-2",
    title: "Modul 3: Membedah Low Skin Fade Tanpa Garis Bayangan (Zero Guideline)",
    duration: "32:45 Menit",
    videoThumbnail: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80",
    summary: "Rahasia transisi gradasi hitam ke putih yang mulus seperti lukisan. Menggunakan teknik C-Stroke dan penghapusan baseline dengan foil shaver.",
    toolRequirements: ["Cordless Clipper", "Foil Shaver", "Detailer Trimmer", "Fade Brush"],
    steps: [
      "Membuat base guideline 0 mm menggunakan trimmer tepat 1 jari di atas telinga.",
      "Membuat zona transisi 0.5 mm dengan tuas clipper setengah terbuka.",
      "Menggunakan guard no. 1.5 dan no. 1 untuk membaurkan bayangan tengah ke atas.",
      "Menghilangkan garis tipis pemisah dengan gerakan mengayun (C-Stroke motion) menggunakan sudut clipper."
    ]
  }
];

export const INITIAL_FEED_POSTS = [
  {
    id: "post-1",
    author: "Chief Aa' Mill",
    authorRole: "Master Barber",
    avatar: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&auto=format&fit=crop&q=80",
    caption: "Transformasi Low Taper Fade untuk klien setia kita @dimas_ard. Rambut tebal bergelombang ditata rapi dengan sedikit Matte Clay agar tekstur naturalnya tetap keluar maksimal! 🔥 Menurut kalian gimana nilainya dari 1-10?",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80",
    haircutStyleId: "hc-1",
    likesCount: 184,
    commentsCount: 29,
    timestamp: "2 Jam yang lalu",
    tags: ["#LowTaperFade", "#BarbershopAAMILL", "#FadeMaster", "#Hairstyle2026"],
    comments: [
      { user: "Rizky_B", text: "Gokil gradasinya rapi banget bang! Besok sabtu saya booking ya!", time: "1 Jam lalu" },
      { user: "Andi_Styles", text: "Clay yang dipake merk apa chief? Mantap bener teksturnya.", time: "45 Menit lalu" }
    ]
  },
  {
    id: "post-2",
    author: "Rendy Pratama",
    authorRole: "Senior Stylist",
    avatar: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&auto=format&fit=crop&q=80",
    caption: "French Crop dengan blunt fringe dan high skin fade di samping. Cocok buat kamu yang pengen tampil fresh, maskulin, dan gak mau ribet nyisir tiap pagi pas bangun tidur! ✂️ Ready slot booking sore ini ya bro.",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=80",
    haircutStyleId: "hc-2",
    likesCount: 247,
    commentsCount: 38,
    timestamp: "5 Jam yang lalu",
    tags: ["#FrenchCrop", "#HighFade", "#MenHaircut", "#GayaRambutPria"],
    comments: [
      { user: "Gilang99", text: "Model ini pas gak bang buat bentuk muka lonjong?", time: "3 Jam lalu" },
      { user: "Barbershop AA'MILL", text: "@Gilang99 Pas banget bro! Poni horizontalnya menyeimbangkan panjang wajah.", time: "2 Jam lalu" }
    ]
  },
  {
    id: "post-3",
    author: "AA'MILL Barber Academy",
    authorRole: "Official Academy",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    caption: "Suasana ujian praktek potong langsung siswa angkatan 14! Bangga melihat ketelitian dan etika pelayanan dari calon-calon barber hebat masa depan. Pendaftaran angkatan baru telah dibuka, kuota terbatas hanya 8 siswa per kelas!",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80",
    haircutStyleId: "hc-3",
    likesCount: 312,
    commentsCount: 45,
    timestamp: "1 Hari yang lalu",
    tags: ["#KursusBarber", "#SekolahBarber", "#BelajarCukur", "#BarberAcademy"],
    comments: [
      { user: "Bagas_Kurnia", text: "Alhamdulillah lulusan angkatan 10 sekarang sudah buka barbershop sendiri di Solo!", time: "18 Jam lalu" }
    ]
  }
];

// DATA MEMBER / KOMUNITAS PELANGGAN YANG SUDAH DIPANGKAS
export const INITIAL_MEMBERS = [
  {
    id: "MBR-001",
    name: "Dimas Ardiansyah",
    phone: "081299887766",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    tier: "VIP Sultan",
    cutsCount: 18,
    favoriteBarber: "Aa' Mill",
    joinedDate: "Maret 2024",
    lastCutStyle: "Low Taper Fade",
    badge: "👑 Member Prioritas"
  },
  {
    id: "MBR-002",
    name: "Rizky Ramadhan",
    phone: "085611228899",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80",
    tier: "Gold Gentleman",
    cutsCount: 12,
    favoriteBarber: "Rendy Pratama",
    joinedDate: "Agustus 2024",
    lastCutStyle: "Textured French Crop",
    badge: "⭐ Loyal Customer"
  },
  {
    id: "MBR-003",
    name: "Kevin Pratama",
    phone: "087788994433",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80",
    tier: "Gold Gentleman",
    cutsCount: 9,
    favoriteBarber: "Doni Setiawan",
    joinedDate: "November 2024",
    lastCutStyle: "Korean Two-Block",
    badge: "⭐ Loyal Customer"
  },
  {
    id: "MBR-004",
    name: "Bagas Wicaksono",
    phone: "081399881122",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    tier: "Silver Member",
    cutsCount: 5,
    favoriteBarber: "Yoga Saputra",
    joinedDate: "Februari 2025",
    lastCutStyle: "Royal Hot Towel Shave",
    badge: "⚡ Active Groomer"
  }
];

// DISKUSI GRUP / LOUNGE KOMUNITAS PELANGGAN
export const INITIAL_COMMUNITY_MESSAGES = [
  {
    id: "msg-1",
    author: "Dimas Ardiansyah (VIP Sultan)",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    content: "Bro ada saran clay pomade yang finish-nya matte banget tapi tetep gampang dicuci pas keramas? Rambut gue agak berminyak nih.",
    timestamp: "10 Menit yang lalu",
    likes: 8,
    replies: [
      {
        user: "Chief Aa' Mill",
        role: "Master Barber",
        text: "Pake Suavecito Matte Paste atau Uppercut Matte Clay bro Dimas. Pas finishing kasih sedikit Sea Salt Spray waktu rambut setengah lembab, dijamin tahan seharian dan sekali keramas luntur!",
        time: "5 Menit lalu"
      }
    ]
  },
  {
    id: "msg-2",
    author: "Rizky Ramadhan (Gold Member)",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    content: "Potongan French Crop kemarin dipuji anak-anak kantor! Mas Rendy juara emang bikin garis poni simetris.",
    timestamp: "1 Jam yang lalu",
    likes: 14,
    replies: [
      {
        user: "Rendy Pratama",
        role: "Senior Barber",
        text: "Mantap bro Rizky! Jangan lupa 3 minggu lagi mampir touch up taper sampingnya ya biar selalu on-point.",
        time: "45 Menit lalu"
      }
    ]
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    customerName: "Bima Arya",
    rating: 5,
    date: "12 Nov 2026",
    comment: "Potongan fade-nya luar biasa halus! Chief Mill benar-benar memperhatikan bentuk tengkorak dan arah pusar rambut saya. Pelayanan dan pijat relaksasinya bikin ketagihan.",
    serviceUsed: "Signature Precision Cut",
    barberName: "Aa' Mill"
  },
  {
    id: "rev-2",
    customerName: "Kevin Santoso",
    rating: 5,
    date: "10 Nov 2026",
    comment: "Tempatnya super bersih, berkelas, musik jazz-nya asyik dan aroma kopinya nikmat. Booking lewat web sangat praktis tanpa perlu antri lama di kursi tunggu.",
    serviceUsed: "The Sultan Full Grooming",
    barberName: "Rendy Pratama"
  },
  {
    id: "rev-3",
    customerName: "Fajar Nugraha",
    rating: 5,
    date: "8 Nov 2026",
    comment: "Saya alumni Barber Academy AA'MILL. Materinya daging semua, diajarin dari cara pegang clipper sampai strategi marketing dan POS kasir. Sangat rekomen!",
    serviceUsed: "Kelas Barber Basic (Pemula)",
    barberName: "AA'MILL Academy"
  }
];

// REKAP TRANSAKSI / BOOKINGS LENGKAP UNTUK LAPORAN KEUANGAN
// Mencakup transaksi harian, mingguan, bulanan, dan tahunan per masing-masing capster
export const INITIAL_BOOKINGS = [
  // HARI INI (13 Nov 2026)
  {
    id: "BOK-9421",
    customerName: "Derry Firmansyah",
    phone: "081234889911",
    service: "Signature Precision Cut",
    haircutStyle: "Low Taper Fade",
    barberId: "b1",
    barberName: "Aa' Mill",
    date: "2026-11-13",
    timeSlot: "14:00",
    status: "completed",
    totalPrice: 65000,
    capsterCommission: 45500, // 70%
    barberShopShare: 19500,
    paymentMethod: "QRIS / Transfer",
    notes: "Rambut samping tolong jangan terlalu tipis",
    createdAt: "2026-11-13T09:15:00Z"
  },
  {
    id: "BOK-9422",
    customerName: "Satria Pratama",
    phone: "081388772233",
    service: "The Sultan Full Grooming",
    haircutStyle: "Textured French Crop",
    barberId: "b2",
    barberName: "Rendy Pratama",
    date: "2026-11-13",
    timeSlot: "16:00",
    status: "completed",
    totalPrice: 135000,
    capsterCommission: 81000, // 60%
    barberShopShare: 54000,
    paymentMethod: "Tunai / Cash",
    notes: "Plus pijat leher ekstra kalau bisa",
    createdAt: "2026-11-13T10:40:00Z"
  },
  {
    id: "BOK-9423",
    customerName: "Aldi Gunawan",
    phone: "087799001122",
    service: "Royal Hot Towel Shave",
    haircutStyle: "Beard Sculpt & Sharp Fade",
    barberId: "b4",
    barberName: "Yoga Saputra",
    date: "2026-11-13",
    timeSlot: "10:00",
    status: "completed",
    totalPrice: 45000,
    capsterCommission: 24750, // 55%
    barberShopShare: 20250,
    paymentMethod: "QRIS / Transfer",
    notes: "Kulit sensitif butuh lotion aftershave dingin",
    createdAt: "2026-11-13T08:20:00Z"
  },
  {
    id: "BOK-9424",
    customerName: "Rian Maulana",
    phone: "081922334455",
    service: "Hair Coloring & Bleaching",
    haircutStyle: "Korean Two-Block Cut",
    barberId: "b3",
    barberName: "Doni Setiawan",
    date: "2026-11-13",
    timeSlot: "18:30",
    status: "confirmed",
    totalPrice: 180000,
    capsterCommission: 108000,
    barberShopShare: 72000,
    paymentMethod: "QRIS / Transfer",
    notes: "Bleaching Ash Grey level 8",
    createdAt: "2026-11-13T11:00:00Z"
  },

  // MINGGU INI (10 - 12 Nov 2026)
  {
    id: "BOK-9415",
    customerName: "Farhan Hakim",
    phone: "085711223344",
    service: "Signature Precision Cut",
    haircutStyle: "Low Taper Fade",
    barberId: "b1",
    barberName: "Aa' Mill",
    date: "2026-11-12",
    timeSlot: "11:30",
    status: "completed",
    totalPrice: 65000,
    capsterCommission: 45500,
    barberShopShare: 19500,
    paymentMethod: "Tunai / Cash",
    notes: "-",
    createdAt: "2026-11-12T09:00:00Z"
  },
  {
    id: "BOK-9416",
    customerName: "Budi Santoso",
    phone: "081233445566",
    service: "The Sultan Full Grooming",
    haircutStyle: "Modern Slick Pompadour",
    barberId: "b2",
    barberName: "Rendy Pratama",
    date: "2026-11-12",
    timeSlot: "15:00",
    status: "completed",
    totalPrice: 135000,
    capsterCommission: 81000,
    barberShopShare: 54000,
    paymentMethod: "QRIS / Transfer",
    notes: "Styling Pomade oil-based",
    createdAt: "2026-11-12T13:30:00Z"
  },
  {
    id: "BOK-9417",
    customerName: "Ahmad Zaki",
    phone: "087811992200",
    service: "Kids & Student Gentle Cut",
    haircutStyle: "Undercut Quiff",
    barberId: "b4",
    barberName: "Yoga Saputra",
    date: "2026-11-11",
    timeSlot: "16:00",
    status: "completed",
    totalPrice: 50000,
    capsterCommission: 27500,
    barberShopShare: 22500,
    paymentMethod: "Tunai / Cash",
    notes: "Potongan rapi untuk sekolah",
    createdAt: "2026-11-11T14:15:00Z"
  },
  {
    id: "BOK-9418",
    customerName: "Galih Prasetya",
    phone: "085277889900",
    service: "Hair Spa & Scalp Detox",
    haircutStyle: "Textured French Crop",
    barberId: "b3",
    barberName: "Doni Setiawan",
    date: "2026-11-10",
    timeSlot: "14:00",
    status: "completed",
    totalPrice: 55000,
    capsterCommission: 33000,
    barberShopShare: 22000,
    paymentMethod: "QRIS / Transfer",
    notes: "Scalp massage ekstra",
    createdAt: "2026-11-10T11:00:00Z"
  },

  // BULAN INI (Awal November 2026)
  {
    id: "BOK-9380",
    customerName: "Hendrik Wijaya",
    phone: "081199882233",
    service: "The Sultan Full Grooming",
    haircutStyle: "High Skin Fade Buzz Cut",
    barberId: "b1",
    barberName: "Aa' Mill",
    date: "2026-11-05",
    timeSlot: "13:00",
    status: "completed",
    totalPrice: 135000,
    capsterCommission: 94500,
    barberShopShare: 40500,
    paymentMethod: "QRIS / Transfer",
    notes: "Langganan bulanan",
    createdAt: "2026-11-05T10:00:00Z"
  },
  {
    id: "BOK-9381",
    customerName: "Dani Firmansyah",
    phone: "081377881122",
    service: "Signature Precision Cut",
    haircutStyle: "Textured Modern Mullet",
    barberId: "b2",
    barberName: "Rendy Pratama",
    date: "2026-11-04",
    timeSlot: "17:00",
    status: "completed",
    totalPrice: 65000,
    capsterCommission: 39000,
    barberShopShare: 26000,
    paymentMethod: "Tunai / Cash",
    notes: "-",
    createdAt: "2026-11-04T12:00:00Z"
  },
  {
    id: "BOK-9382",
    customerName: "Cahyo Utomo",
    phone: "085811229988",
    service: "Royal Hot Towel Shave",
    haircutStyle: "Beard Sculpt & Sharp Fade",
    barberId: "b4",
    barberName: "Yoga Saputra",
    date: "2026-11-03",
    timeSlot: "19:30",
    status: "completed",
    totalPrice: 45000,
    capsterCommission: 24750,
    barberShopShare: 20250,
    paymentMethod: "Tunai / Cash",
    notes: "Kumis dan jenggot dirapikan",
    createdAt: "2026-11-03T18:00:00Z"
  },

  // BULAN LALU (Oktober 2026)
  {
    id: "BOK-9290",
    customerName: "Erik Gunawan",
    phone: "082188990011",
    service: "The Sultan Full Grooming",
    haircutStyle: "Modern Slick Pompadour",
    barberId: "b1",
    barberName: "Aa' Mill",
    date: "2026-10-25",
    timeSlot: "15:00",
    status: "completed",
    totalPrice: 135000,
    capsterCommission: 94500,
    barberShopShare: 40500,
    paymentMethod: "QRIS / Transfer",
    notes: "-",
    createdAt: "2026-10-25T13:00:00Z"
  },
  {
    id: "BOK-9291",
    customerName: "Lukman Hakim",
    phone: "081277665544",
    service: "Hair Coloring & Bleaching",
    haircutStyle: "Korean Two-Block Cut",
    barberId: "b3",
    barberName: "Doni Setiawan",
    date: "2026-10-20",
    timeSlot: "14:00",
    status: "completed",
    totalPrice: 180000,
    capsterCommission: 108000,
    barberShopShare: 72000,
    paymentMethod: "QRIS / Transfer",
    notes: "Silver Platinum",
    createdAt: "2026-10-20T11:00:00Z"
  },
  {
    id: "BOK-9292",
    customerName: "Indra Kusuma",
    phone: "087755443322",
    service: "Signature Precision Cut",
    haircutStyle: "Textured French Crop",
    barberId: "b2",
    barberName: "Rendy Pratama",
    date: "2026-10-18",
    timeSlot: "16:00",
    status: "completed",
    totalPrice: 65000,
    capsterCommission: 39000,
    barberShopShare: 26000,
    paymentMethod: "Tunai / Cash",
    notes: "-",
    createdAt: "2026-10-18T14:00:00Z"
  },
  {
    id: "BOK-9293",
    customerName: "Tommy Pratama",
    phone: "081399001122",
    service: "Kids & Student Gentle Cut",
    haircutStyle: "High Skin Fade Buzz Cut",
    barberId: "b4",
    barberName: "Yoga Saputra",
    date: "2026-10-15",
    timeSlot: "11:00",
    status: "completed",
    totalPrice: 50000,
    capsterCommission: 27500,
    barberShopShare: 22500,
    paymentMethod: "Tunai / Cash",
    notes: "-",
    createdAt: "2026-10-15T09:00:00Z"
  }
];
