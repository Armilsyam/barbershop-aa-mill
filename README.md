# 💈 BARBERSHOP AA'MILL & BARBER ACADEMY

Platform Web Multifungsi Terintegrasi untuk **Barbershop AA'MILL** & **AA'MILL Barber Academy**. Dibuat dengan arsitektur modern, ultra-responsif, cepat, dan siap dideploy langsung ke **GitHub**, **Vercel**, **Netlify**, dan **Cloudflare Pages**, serta mendukung sinkronisasi real-time dengan **Cloud Firestore (Firebase)**.

---

## 🌟 Fitur-Fitur Utama Platform

### 1. 🪒 Media Informasi Barbershop
* **Profil Brand & Kisah Barber:** Cerita dedikasi seni pangkas rambut presisi sejak 2014.
* **Daftar Layanan & Menu Harga Lengkap:** Signature Precision Cut, The Sultan Full Grooming, Royal Hot Towel Shave, Hair Spa & Scalp Detox, Hair Coloring, dan Kids Cut.
* **Master Barber Roster:** Menampilkan profil para kapster/barber dengan rating, jam terbang, dan keahlian spesialisasi.
* **Jam Operasional & Peta Lokasi:** Terintegrasi langsung dengan link Google Maps dan jam buka.
* **Testimoni & Review Pelanggan:** Ulasan berbintang dari pelanggan setia dan alumni siswa academy.

### 2. ✂️ Media Pilih Gambar Bentuk Cukuran (Haircut Lookbook & Smart Consultant)
* **Koleksi Galeri Gaya Rambut:** Low Taper Fade, Textured French Crop, Modern Slick Pompadour, Korean Two-Block Cut, Buzz Cut, Textured Mullet, Undercut Quiff, dan Beard Sculpting.
* **Filter Multifaset:** Filter berdasarkan kategori gaya (Fade, Crop, Classic, Korean, Undercut, Brewok) dan filter berdasarkan **Bentuk Wajah** (Oval, Kotak, Bulat, Lonjong, Segitiga, Berlian).
* **Tes Konsultan Model Rambut (AI Face Matcher Quiz):** Fitur kuis 3 langkah untuk mencocokkan bentuk wajah, tekstur rambut, dan aktivitas pengguna guna merekomendasikan model cukuran paling ideal.
* **Pesan Gaya Ini Langsung:** Dari tampilan detail model rambut, pelanggan dapat mengklik *"Pilih Gaya Ini & Booking Sekarang"* yang otomatis mengisi formulir reservasi.

### 3. 📅 Media Booking & Antrean Online
* **Alur Reservasi Interaktif 5 Langkah:**
  1. Pilih Paket Layanan Grooming.
  2. Pilih Barber/Kapster Favorit & Model Rambut dari Lookbook.
  3. Pilih Tanggal Kunjungan & Slot Jam Real-Time.
  4. Isi Data Kontak (Nama & Nomor WhatsApp).
  5. Konfirmasi Tiket Reservasi + Animasi Confetti.
* **Generator Tiket WhatsApp Otomatis:** Menghasilkan pesan WhatsApp berformat rapi lengkap dengan Kode Booking, nama pelanggan, barber, jam, dan rincian biaya yang langsung dikirimkan ke WhatsApp Admin Barbershop.
* **Live Ticket Tracking:** Pelanggan dapat mengecek status booking mereka kapan saja hanya dengan memasukkan Kode Booking (misal: `BOK-9421`) atau Nomor HP.

### 4. 🎓 Media Belajar Kursus & Barber Academy (AA'MILL Academy)
* **Pilihan Paket Kursus Profesional:**
  * *Kelas Barber Basic (Pemula Nol):* Dari cara memegang gunting hingga potong di model manusia nyata.
  * *Masterclass Fade & Modern Styling:* Kupas tuntas Skin Fade tanpa garis bayang, texturizing, dan beard sculpting.
  * *Program Usaha Barbershop & Bisnis Owner:* Pelatihan teknis + SOP Kasir + Magang 1 Bulan + Bimbingan buka cabang.
  * *Private VIP 1-on-1:* Mentoring privat intensif langsung bersama Chief Aa' Mill.
* **LMS Modul Belajar Siswa (Learning Management System):**
  * Simulator pemutar video modul berkualitas HD studio.
  * Checklist langkah praktek potong rambut bertahap.
  * Daftar peralatan barber wajib per materi (Clipper, Trimmer, Shaver, Thinning Shears).
* **Formulir Pendaftaran Siswa Online:** Calon murid dapat mendaftar langsung secara online dan mendapatkan tiket invoice pendaftaran yang terhubung ke WhatsApp Admin Academy.
* **Ensiklopedia Perkakas Barber:** Panduan mengenal fungsi Clipper, Trimmer, Foil Shaver, Shears, dan Straight Razor.

### 5. 🔥 Media Sosial Media & Komunitas Barber
* **Instagram-Style Stories Bar:** Cerita terkini seputar transformasi rambut, behind the scenes, dan promo mingguan.
* **Feed Portofolio Gaya Cukur:** Menampilkan foto-foto hasil pangkas rambut terbaru dari para barber dan karya praktek siswa.
* **Interaksi Sosial Nyata:** Tombol Suka (Like) beranimasi, kolom komentar interaktif, dan tombol share.
* **Upload Postingan Baru:** Pengguna dan barber dapat mengunggah transformasi cukur baru lengkap dengan tag model rambut.

### 6. 💬 Media Komunikasi & Konsultasi
* **Floating WhatsApp Bubble:** Tombol WhatsApp melayang di sudut kanan bawah dengan 3 pesan cepat (Booking Cukur, Tanya Kursus, Cek Lokasi).
* **Tanya Jawab Seputar Kursus (FAQ Interaktif).**

### 7. 🛡️ Web Admin Dashboard Lengkap (Pengelola)
* **Login PIN Khusus:** Masuk ke mode admin dengan menekan ikon perisai di navbar (PIN bawaan: `1234` atau `admin`).
* **Tab Ringkasan (Overview):** Pantau total booking harian, estimasi omzet, jumlah siswa academy aktif, dan total model di katalog.
* **Kelola Reservasi (Booking Management):** Filter status (*Semua, Menunggu, Dikonfirmasi, Selesai, Batal*), tombol konfirmasi, ubah status, dan tombol direct chat WhatsApp ke pelanggan.
* **Kelola Katalog Cukuran (Haircut Management):** Tambah gaya rambut baru, upload foto URL, atur bentuk wajah cocok, dan tandai status trending.
* **Kelola Siswa Academy:** Verifikasi siswa pendaftar baru, ubah status belajar ke *Aktif Belajar* atau *Lulus & Bersertifikat*.
* **Kelola Tim Barber:** Roster kapster dan spesialisasi keahlian.
* **Pengaturan & Cloud Firestore Sync:** Atur identitas barbershop, nomor WhatsApp tujuan, banner promo, dan masukkan API Key Cloud Firestore / Firebase.

---

## 🚀 Panduan Deploy ke 3 Platform + Cloudflare

Proyek ini telah dikonfigurasi secara lengkap untuk multi-platform deployment:
- `vercel.json` (Optimasi routing SPA & Caching di Vercel)
- `netlify.toml` & `public/_redirects` (Rewrite rules SPA di Netlify)
- `wrangler.toml` (Konfigurasi Cloudflare Pages / Workers)
- `.github/workflows/deploy.yml` (CI/CD GitHub Actions)

### 1. Push ke GitHub
1. Buat repository baru di [GitHub](https://github.com/new), misalnya dengan nama `barbershop-aamill`.
2. Jalankan perintah berikut di terminal komputer Anda:
```bash
git remote add origin https://github.com/USERNAME_ANDA/barbershop-aamill.git
git push -u origin main
```

### 2. Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **"Add New..."** → **"Project"**.
3. Pilih repository `barbershop-aamill`.
4. Vercel akan otomatis mendeteksi:
   * **Framework Preset:** Vite
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. Klik **"Deploy"**. Dalam hitungan detik website Anda langsung live dengan HTTPS gratis!

### 3. Deploy ke Netlify
1. Buka [netlify.com](https://netlify.com) dan login.
2. Klik **"Add new site"** → **"Import an existing project"**.
3. Hubungkan ke GitHub dan pilih repository `barbershop-aamill`.
4. Konfigurasi build (otomatis terbaca dari `netlify.toml`):
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
5. Klik **"Deploy barbershop-aamill"**.

### 4. Deploy ke Cloudflare Pages (Cloude Fire)
1. Buka dashboard [Cloudflare](https://dash.cloudflare.com/) → pilih menu **Compute (Workers & Pages)**.
2. Klik **"Create application"** → pilih tab **"Pages"** → **"Connect to Git"**.
3. Pilih repository GitHub Anda.
4. Pada Build settings:
   * **Framework preset:** `Vite`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
5. Klik **"Save and Deploy"**.

---

## 🔥 Mengaktifkan Realtime Cloud Firestore (Firebase)

Platform ini menggunakan **Hybrid Offline-First Architecture**:
* **Mode Bawaan:** Berjalan 100% lancar dan persisten menggunakan penyimpanan lokal browser (LocalStorage) tanpa memerlukan konfigurasi database eksternal.
* **Mode Cloud Firestore:**
  1. Buka [Firebase Console](https://console.firebase.google.com/) dan buat project baru (misal: `barbershop-aamill`).
  2. Buka menu **Firestore Database** → klik **Create Database** (pilih *Production* atau *Test Mode*).
  3. Buka **Project Settings** → salin konfigurasi `firebaseConfig`:
     * `apiKey`
     * `projectId`
     * `authDomain`
     * `storageBucket`
  4. Buka website Anda → Masuk ke **Admin Panel** (PIN: `1234`) → Pilih tab **"Pengaturan & Cloud Firestore"**.
  5. Tempelkan data konfigurasi tersebut dan klik **"Simpan Semua Perubahan Pengaturan"**.
  6. Data reservasi Anda kini otomatis tersinkronisasi ke cloud secara real-time!

---

## 💻 Menjalankan di Komputer Lokal (Development)

Jika ingin menjalankan server development lokal di komputer Anda:
```bash
# Menjalankan dev server Vite
npm run dev

# Membangun bundle produksi
npm run build

# Menjalankan preview hasil build produksi
npm run preview
```

---

## 🎨 Teknologi yang Digunakan
* **Frontend:** React 19, Vite 6
* **Styling & Desain:** Tailwind CSS v4, Google Fonts (*Cinzel Luxury Serif*, *Plus Jakarta Sans*, *Oswald*)
* **Ikon:** Lucide React
* **Animasi & Efek:** Canvas Confetti & Keyframe Animations
* **Database & Cloud:** Cloud Firestore / Firebase SDK + LocalStorage Hybrid
* **CI/CD:** GitHub Actions

---
*Dibuat dengan presisi tinggi untuk **BARBERSHOP AA'MILL & ACADEMY**.*
