import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Scissors, 
  BookOpen, 
  Users, 
  Settings, 
  Plus, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Send, 
  Save, 
  RefreshCw, 
  Cloud, 
  ShieldCheck,
  Phone,
  FileSpreadsheet,
  Printer,
  FileText,
  DollarSign,
  TrendingUp,
  Percent,
  Download,
  Check,
  Clock,
  Filter
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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reports' | 'bookings' | 'haircuts' | 'academy' | 'barbers' | 'settings'

  // Booking table filters
  const [bookingFilter, setBookingFilter] = useState('all');

  // REPORT FILTERS
  const [reportPeriod, setReportPeriod] = useState('daily'); // 'daily' | 'weekly' | 'monthly' | 'yearly'
  const [reportBarberId, setReportBarberId] = useState('all'); // 'all' or barber id
  const [customReportDate, setCustomReportDate] = useState('2026-11-13');

  // New Haircut Modal
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
  const [formSettings, setFormSettings] = useState({
    ...settings,
    admin1: settings.admin1 || {
      name: "Admin 1 (Reservasi & Booking)",
      phone: "082291544262",
      whatsapp: "6282291544262",
      role: "Layanan Booking, Kasir & Antrean"
    },
    admin2: settings.admin2 || {
      name: "Admin 2 (Academy & Konsultasi)",
      phone: "082191843162",
      whatsapp: "6282191843162",
      role: "Pendaftaran Kursus Barber & Bisnis"
    }
  });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Overall stats
  const totalRevenueAll = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, curr) => acc + (curr.totalPrice || 65000), 0);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  // REPORT FILTER LOGIC
  const getFilteredReportBookings = () => {
    return bookings.filter(b => {
      // Must be confirmed or completed
      const isValid = b.status === 'confirmed' || b.status === 'completed';
      if (!isValid) return false;

      // Barber filter
      if (reportBarberId !== 'all' && b.barberId !== reportBarberId) {
        return false;
      }

      // Period filter
      const bDate = b.date || b.createdAt?.split('T')[0] || '';
      
      if (reportPeriod === 'daily') {
        return bDate === customReportDate;
      }
      if (reportPeriod === 'weekly') {
        // Mock range: within last 7 days of 2026-11-13
        return bDate >= '2026-11-07' && bDate <= '2026-11-13';
      }
      if (reportPeriod === 'monthly') {
        // Same month (2026-11)
        const targetMonth = customReportDate.substring(0, 7); // '2026-11'
        return bDate.startsWith(targetMonth);
      }
      if (reportPeriod === 'yearly') {
        // Same year (2026)
        const targetYear = customReportDate.substring(0, 4); // '2026'
        return bDate.startsWith(targetYear);
      }

      return true;
    });
  };

  const reportBookings = getFilteredReportBookings();

  // Metrics for report
  const reportTotalRevenue = reportBookings.reduce((sum, b) => sum + (b.totalPrice || 65000), 0);
  const reportTotalCapsterCommission = reportBookings.reduce((sum, b) => {
    if (b.capsterCommission) return sum + b.capsterCommission;
    // Default 60%
    return sum + Math.round((b.totalPrice || 65000) * 0.6);
  }, 0);
  const reportTotalBarberShopShare = reportTotalRevenue - reportTotalCapsterCommission;
  const reportAverageTicket = reportBookings.length > 0 ? Math.round(reportTotalRevenue / reportBookings.length) : 0;

  // Breakdown per barber for accountability table
  const barberPerformanceList = barbers.map(barber => {
    const barberBookings = reportBookings.filter(b => b.barberId === barber.id);
    const count = barberBookings.length;
    const gross = barberBookings.reduce((s, b) => s + (b.totalPrice || 65000), 0);
    const commission = barberBookings.reduce((s, b) => {
      if (b.capsterCommission) return s + b.capsterCommission;
      return s + Math.round((b.totalPrice || 65000) * (barber.commissionRate || 0.6));
    }, 0);
    const netBarbershop = gross - commission;

    return {
      barber,
      count,
      gross,
      commission,
      netBarbershop
    };
  });

  // DOWNLOAD CSV HANDLER
  const handleDownloadCSV = () => {
    const selectedBarberName = reportBarberId === 'all' 
      ? 'Semua Capster' 
      : (barbers.find(b => b.id === reportBarberId)?.name || 'Capster');

    let csvContent = "\uFEFF"; // UTF-8 BOM for Excel
    csvContent += `LAPORAN PENGHASILAN DAN PERTANGGUNGJAWABAN KOMISI CAPSTER\n`;
    csvContent += `BARBERSHOP AA'MILL & ACADEMY\n`;
    csvContent += `Periode: ${reportPeriod.toUpperCase()} (${customReportDate})\n`;
    csvContent += `Filter Capster: ${selectedBarberName}\n`;
    csvContent += `Tanggal Unduh: ${new Date().toLocaleString('id-ID')}\n\n`;

    // Ringkasan Keuangan
    csvContent += `RINGKASAN AKUNTANSI\n`;
    csvContent += `Total Transaksi Pelanggan,${reportBookings.length} Orang\n`;
    csvContent += `Total Omzet Kotor (Gross),Rp ${reportTotalRevenue.toLocaleString('id-ID')}\n`;
    csvContent += `Total Komisi Hak Capster,Rp ${reportTotalCapsterCommission.toLocaleString('id-ID')}\n`;
    csvContent += `Pendapatan Bersih Kas Barbershop,Rp ${reportTotalBarberShopShare.toLocaleString('id-ID')}\n`;
    csvContent += `Rata-rata Nilai Transaksi,Rp ${reportAverageTicket.toLocaleString('id-ID')}\n\n`;

    // Rekapitulasi Per Capster
    csvContent += `REKAPITULASI BAGI HASIL PER CAPSTER\n`;
    csvContent += `Nama Capster,Peran,Tarif Komisi (%),Jumlah Cukur,Total Omzet Dihasilkan (Rp),Hak Komisi Capster (Rp),Kas Bersih Barbershop (Rp)\n`;
    barberPerformanceList.forEach(item => {
      csvContent += `"${item.barber.name}","${item.barber.role}",${Math.round((item.barber.commissionRate || 0.6) * 100)}%,${item.count},${item.gross},${item.commission},${item.netBarbershop}\n`;
    });
    csvContent += `\n`;

    // Rincian Transaksi
    csvContent += `RINCIAN TRANSAKSI DETAIL BUKU KAS\n`;
    csvContent += `No,ID Tiket,Tanggal,Jam,Nama Pelanggan,No HP,Layanan Grooming,Model Cukuran,Capster Bertugas,Tarif (Rp),Komisi Capster (Rp),Kas Barbershop (Rp),Metode Bayar\n`;
    reportBookings.forEach((b, idx) => {
      const comm = b.capsterCommission || Math.round((b.totalPrice || 65000) * 0.6);
      const shop = (b.totalPrice || 65000) - comm;
      csvContent += `${idx + 1},"${b.id}","${b.date}","${b.timeSlot}","${b.customerName}","${b.phone}","${b.service}","${b.haircutStyle}","${b.barberName}",${b.totalPrice || 65000},${comm},${shop},"${b.paymentMethod || 'Kasir'}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Keuangan_AAMILL_${reportPeriod}_${customReportDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PRINT / DOWNLOAD PDF HANDLER
  const handlePrintPDF = () => {
    const selectedBarberName = reportBarberId === 'all' 
      ? 'SEMUA CAPSTER (KONSOLIDASI)' 
      : (barbers.find(b => b.id === reportBarberId)?.name?.toUpperCase() || 'CAPSTER');

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Mohon izinkan pop-up browser untuk mencetak / mengunduh PDF laporan.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Laporan Keuangan & Komisi Capster - Barbershop AA'MILL</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #111; margin: 30px; line-height: 1.4; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 22px; font-weight: bold; letter-spacing: 1px; }
          .header p { margin: 3px 0 0; font-size: 11px; color: #555; }
          .title { text-align: center; font-size: 15px; font-weight: bold; text-decoration: underline; margin-bottom: 15px; }
          .meta-grid { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 11px; }
          .summary-boxes { display: flex; gap: 10px; margin-bottom: 20px; }
          .box { flex: 1; border: 1px solid #ccc; padding: 10px; background: #fafafa; border-radius: 4px; }
          .box-title { font-size: 10px; text-transform: uppercase; color: #666; font-weight: bold; }
          .box-val { font-size: 16px; font-weight: bold; margin-top: 4px; color: #000; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11px; }
          table th, table td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
          table th { background: #f0f0f0; font-weight: bold; }
          .text-right { text-align: right; }
          .signatures { display: flex; justify-content: space-between; margin-top: 40px; page-break-inside: avoid; }
          .sig-box { width: 30%; text-align: center; }
          .sig-line { margin-top: 60px; border-bottom: 1px solid #000; font-weight: bold; }
          @media print {
            body { margin: 15mm; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>BARBERSHOP AA'MILL & ACADEMY</h1>
          <p>Jl. Veteran No. 88, Pusat Kota • WhatsApp Admin 1: 0822-9154-4262 • Admin 2: 0821-9184-3162</p>
        </div>

        <div class="title">LAPORAN REKAPITULASI PENGHASILAN & KOMISI BAGI HASIL CAPSTER</div>

        <div class="meta-grid">
          <div>
            <strong>Periode Laporan:</strong> ${reportPeriod.toUpperCase()}<br>
            <strong>Tanggal Acuan:</strong> ${customReportDate}<br>
            <strong>Target Capster:</strong> ${selectedBarberName}
          </div>
          <div style="text-align: right;">
            <strong>Nomor Dokumen:</strong> REP-AAMILL/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}<br>
            <strong>Waktu Cetak:</strong> ${new Date().toLocaleString('id-ID')}
          </div>
        </div>

        <div class="summary-boxes">
          <div class="box">
            <div class="box-title">Total Omzet Kotor</div>
            <div class="box-val">Rp ${reportTotalRevenue.toLocaleString('id-ID')}</div>
          </div>
          <div class="box">
            <div class="box-title">Hak Komisi Capster</div>
            <div class="box-val" style="color: #2563eb;">Rp ${reportTotalCapsterCommission.toLocaleString('id-ID')}</div>
          </div>
          <div class="box">
            <div class="box-title">Kas Bersih Barbershop</div>
            <div class="box-val" style="color: #16a34a;">Rp ${reportTotalBarberShopShare.toLocaleString('id-ID')}</div>
          </div>
          <div class="box">
            <div class="box-title">Total Transaksi</div>
            <div class="box-val">${reportBookings.length} Konsumen</div>
          </div>
        </div>

        <h4 style="margin: 0 0 6px;">1. Rekapitulasi Perolehan Masing-Masing Capster</h4>
        <table>
          <thead>
            <tr>
              <th>Nama Capster</th>
              <th>Jabatan / Role</th>
              <th class="text-right">Bagi Hasil</th>
              <th class="text-right">Jml Cukur</th>
              <th class="text-right">Omzet Bruto</th>
              <th class="text-right">Hak Komisi Capster</th>
              <th class="text-right">Kas Barbershop</th>
            </tr>
          </thead>
          <tbody>
            ${barberPerformanceList.map(item => `
              <tr>
                <td><strong>${item.barber.name}</strong></td>
                <td>${item.barber.role}</td>
                <td class="text-right">${Math.round((item.barber.commissionRate || 0.6) * 100)}%</td>
                <td class="text-right">${item.count}</td>
                <td class="text-right">Rp ${item.gross.toLocaleString('id-ID')}</td>
                <td class="text-right" style="font-weight: bold; color: #2563eb;">Rp ${item.commission.toLocaleString('id-ID')}</td>
                <td class="text-right">Rp ${item.netBarbershop.toLocaleString('id-ID')}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="font-weight: bold; background: #fafafa;">
              <td colspan="3">TOTAL KESELURUHAN</td>
              <td class="text-right">${reportBookings.length}</td>
              <td class="text-right">Rp ${reportTotalRevenue.toLocaleString('id-ID')}</td>
              <td class="text-right" style="color: #2563eb;">Rp ${reportTotalCapsterCommission.toLocaleString('id-ID')}</td>
              <td class="text-right" style="color: #16a34a;">Rp ${reportTotalBarberShopShare.toLocaleString('id-ID')}</td>
            </tr>
          </tfoot>
        </table>

        <h4 style="margin: 15px 0 6px;">2. Rincian Transaksi Konsumen yang Selesai</h4>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>ID Tiket</th>
              <th>Waktu</th>
              <th>Pelanggan</th>
              <th>Layanan & Model</th>
              <th>Capster</th>
              <th class="text-right">Tarif</th>
              <th class="text-right">Komisi Capster</th>
              <th>Metode</th>
            </tr>
          </thead>
          <tbody>
            ${reportBookings.map((b, idx) => {
              const comm = b.capsterCommission || Math.round((b.totalPrice || 65000) * 0.6);
              return `
                <tr>
                  <td>${idx + 1}</td>
                  <td><code>${b.id}</code></td>
                  <td>${b.date} ${b.timeSlot}</td>
                  <td>${b.customerName}</td>
                  <td>${b.service} (${b.haircutStyle})</td>
                  <td>${b.barberName}</td>
                  <td class="text-right">Rp ${(b.totalPrice || 65000).toLocaleString('id-ID')}</td>
                  <td class="text-right">Rp ${comm.toLocaleString('id-ID')}</td>
                  <td>${b.paymentMethod || 'Kasir'}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div class="signatures">
          <div class="sig-box">
            <p>Capster yang Bersangkutan,</p>
            <div class="sig-line">${selectedBarberName}</div>
            <p style="font-size: 10px; color: #777;">Tanda tangan pertanggungjawaban</p>
          </div>

          <div class="sig-box">
            <p>Admin 1 / Kasir,</p>
            <div class="sig-line">Admin 1 (0822-9154-4262)</div>
            <p style="font-size: 10px; color: #777;">Verifikator Keuangan</p>
          </div>

          <div class="sig-box">
            <p>Founder & Master Barber,</p>
            <div class="sig-line">Chief Aa' Mill</div>
            <p style="font-size: 10px; color: #777;">Pemilik Barbershop AA'MILL</p>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleSaveSettingsSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formSettings);
    setSaveSuccessMsg('Pengaturan, kontak WhatsApp Admin 1 & 2, serta Cloud Firestore berhasil diperbarui!');
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
              <p className="text-xs text-zinc-400">
                Pusat kontrol reservasi cukur, laporan keuangan capster, akademi siswa, & kontak WhatsApp Admin 1 / 2
              </p>
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
            { id: 'overview', label: 'Ringkasan & KPI', icon: BarChart3 },
            { id: 'reports', label: '🔥 Laporan Keuangan & Komisi Capster', icon: FileSpreadsheet, highlight: true },
            { id: 'bookings', label: `Daftar Booking (${pendingBookings} Baru)`, icon: Calendar, highlight: pendingBookings > 0 },
            { id: 'haircuts', label: `Katalog Cukuran (${haircuts.length})`, icon: Scissors },
            { id: 'academy', label: `Siswa & Kursus (${students.length})`, icon: BookOpen },
            { id: 'barbers', label: `Tim Barber (${barbers.length})`, icon: Users },
            { id: 'settings', label: 'Pengaturan & Admin WA', icon: Settings },
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
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB: LAPORAN KEUANGAN & KOMISI CAPSTER (CSV & PDF EXPORT) */}
      {activeTab === 'reports' && (
        <div className="space-y-8">
          
          {/* Header & Filter Bar */}
          <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Audit Keuangan & Bagi Hasil Capster</span>
                </div>
                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                  Laporan Rekapan Penghasilan & Pertanggungjawaban
                </h2>
                <p className="text-xs text-zinc-400">
                  Pantau omzet harian, mingguan, bulanan, tahunan dan cetak laporan resmi berformat PDF & CSV siap unduh.
                </p>
              </div>

              {/* Action Buttons: Download CSV & Print PDF */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownloadCSV}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
                  title="Unduh file spreadsheet CSV untuk Excel / Google Sheets"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File CSV</span>
                </button>

                <button
                  onClick={handlePrintPDF}
                  className="px-4 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs flex items-center gap-2 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all"
                  title="Cetak atau simpan sebagai PDF berstandar audit resmi"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Unduh PDF</span>
                </button>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-zinc-800 text-xs">
              
              {/* Period Selector */}
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Pilih Periode Waktu</label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { id: 'daily', label: 'Harian' },
                    { id: 'weekly', label: 'Mingguan' },
                    { id: 'monthly', label: 'Bulanan' },
                    { id: 'yearly', label: 'Tahunan' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setReportPeriod(p.id)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                        reportPeriod === p.id
                          ? 'bg-amber-500 text-zinc-950 font-bold'
                          : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capster Filter */}
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Target Capster / Barber</label>
                <select
                  value={reportBarberId}
                  onChange={(e) => setReportBarberId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs"
                >
                  <option value="all">-- Semua Capster (Konsolidasi Toko) --</option>
                  {barbers.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.role} - Bagi Hasil {Math.round((b.commissionRate || 0.6) * 100)}%)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">
                  {reportPeriod === 'daily' ? 'Pilih Tanggal Transaksi' : 'Tanggal Acuan Kalender'}
                </label>
                <input
                  type="date"
                  value={customReportDate}
                  onChange={(e) => setCustomReportDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs"
                />
              </div>

            </div>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                <span>Total Omzet Kotor (Gross)</span>
                <DollarSign className="w-4 h-4 text-amber-400" />
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-serif-luxury">
                Rp {reportTotalRevenue.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-zinc-400">Dari {reportBookings.length} transaksi selesai</p>
            </div>

            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                <span>Hak Komisi Capster</span>
                <Percent className="w-4 h-4 text-blue-400" />
              </span>
              <div className="text-2xl sm:text-3xl font-black text-blue-400 font-serif-luxury">
                Rp {reportTotalCapsterCommission.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-zinc-400">Bagi hasil untuk kapster</p>
            </div>

            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                <span>Kas Bersih Barbershop</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-serif-luxury">
                Rp {reportTotalBarberShopShare.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-zinc-400">Pendapatan bersih manajemen</p>
            </div>

            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                <span>Rata-Rata Tiket</span>
                <Clock className="w-4 h-4 text-purple-400" />
              </span>
              <div className="text-2xl sm:text-3xl font-black text-purple-400 font-serif-luxury">
                Rp {reportAverageTicket.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-zinc-400">Per pelanggan pangkas</p>
            </div>

          </div>

          {/* TABLE 1: REKAPITULASI BAGI HASIL PER MASING-MASING CAPSTER */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  1. Rekapitulasi Performa & Komisi Per Masing-Masing Capster
                </h3>
                <p className="text-xs text-zinc-400">
                  Digunakan sebagai bukti pertanggungjawaban penyerahan gaji & bagi hasil kepada kapster.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-500 font-bold uppercase border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Nama Capster</th>
                    <th className="p-3">Peran / Jabatan</th>
                    <th className="p-3 text-right">Skema Komisi</th>
                    <th className="p-3 text-right">Total Dicukur</th>
                    <th className="p-3 text-right">Omzet Bruto</th>
                    <th className="p-3 text-right">Hak Komisi Capster</th>
                    <th className="p-3 text-right">Kas Barbershop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {barberPerformanceList.map((item) => (
                    <tr key={item.barber.id} className="hover:bg-zinc-800/40">
                      <td className="p-3 font-semibold text-white flex items-center gap-2">
                        <img 
                          src={item.barber.avatarUrl} 
                          alt={item.barber.name} 
                          className="w-7 h-7 rounded-full object-cover border border-amber-500/40"
                        />
                        <span>{item.barber.name}</span>
                      </td>
                      <td className="p-3 text-zinc-400">{item.barber.role}</td>
                      <td className="p-3 text-right font-mono text-amber-400">
                        {Math.round((item.barber.commissionRate || 0.6) * 100)}%
                      </td>
                      <td className="p-3 text-right font-bold text-white">
                        {item.count} Pelanggan
                      </td>
                      <td className="p-3 text-right font-mono font-semibold text-zinc-200">
                        Rp {item.gross.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-blue-400">
                        Rp {item.commission.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-400">
                        Rp {item.netBarbershop.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-zinc-700 bg-zinc-950/80 font-bold text-xs">
                  <tr>
                    <td colSpan="3" className="p-3 text-white uppercase">TOTAL KESELURUHAN</td>
                    <td className="p-3 text-right text-white">{reportBookings.length} Orang</td>
                    <td className="p-3 text-right text-amber-400 font-mono">Rp {reportTotalRevenue.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right text-blue-400 font-mono">Rp {reportTotalCapsterCommission.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right text-emerald-400 font-mono">Rp {reportTotalBarberShopShare.toLocaleString('id-ID')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* TABLE 2: RINCIAN DETAIL BUKU KAS TRANSAKSI */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  2. Rincian Detail Buku Kas Transaksi ({reportBookings.length} Transaksi)
                </h3>
                <p className="text-xs text-zinc-400">
                  Daftar transaksi yang masuk dalam periode terpilih.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-500 font-bold uppercase border-b border-zinc-800">
                  <tr>
                    <th className="p-3">ID Tiket</th>
                    <th className="p-3">Tanggal & Jam</th>
                    <th className="p-3">Pelanggan</th>
                    <th className="p-3">Layanan Grooming</th>
                    <th className="p-3">Capster</th>
                    <th className="p-3 text-right">Tarif</th>
                    <th className="p-3 text-right">Komisi Capster</th>
                    <th className="p-3 text-right">Metode Bayar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {reportBookings.map((b) => {
                    const comm = b.capsterCommission || Math.round((b.totalPrice || 65000) * 0.6);
                    return (
                      <tr key={b.id} className="hover:bg-zinc-800/40">
                        <td className="p-3 font-mono font-bold text-amber-400">{b.id}</td>
                        <td className="p-3 text-zinc-300">{b.date} • {b.timeSlot}</td>
                        <td className="p-3 text-white font-medium">{b.customerName}</td>
                        <td className="p-3 text-zinc-300">{b.service}</td>
                        <td className="p-3 text-zinc-200">{b.barberName}</td>
                        <td className="p-3 text-right font-mono text-zinc-200">
                          Rp {(b.totalPrice || 65000).toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-blue-400">
                          Rp {comm.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-right text-zinc-400">{b.paymentMethod || 'Kasir'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB: OVERVIEW & STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Total Booking</span>
              <div className="text-3xl font-black text-white font-serif-luxury">{bookings.length}</div>
              <p className="text-xs text-amber-400 font-medium">
                {pendingBookings} menunggu konfirmasi
              </p>
            </div>

            <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Total Omzet Keseluruhan</span>
              <div className="text-3xl font-black text-amber-400 font-serif-luxury">
                Rp {totalRevenueAll.toLocaleString('id-ID')}
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

          {/* Quick Access to Reports */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-zinc-900 to-zinc-950 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-serif-luxury text-lg font-bold text-white">
                Cetak Rekapan Laporan Keuangan Capster
              </h4>
              <p className="text-xs text-zinc-300 mt-0.5">
                Tersedia filter harian, mingguan, bulanan, tahunan dengan ekspor CSV & PDF resmi.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('reports')}
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs hover:brightness-110 flex items-center gap-2 shrink-0 shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Buka Menu Laporan Keuangan</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB: BOOKING MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Kelola Reservasi Cukur</h3>
              <p className="text-xs text-zinc-400">Konfirmasi, hubungi nomor WhatsApp pelanggan, atau tandai selesai.</p>
            </div>

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

      {/* TAB: HAIRCUT CATALOG */}
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
                      />
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
                    <label className="block text-zinc-300 font-semibold mb-1">URL Foto Model</label>
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
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                    ></textarea>
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

      {/* TAB: ACADEMY */}
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

      {/* TAB: BARBERS */}
      {activeTab === 'barbers' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-white">Daftar Kapster & Master Barber</h3>
            <p className="text-xs text-zinc-400">Atur profil, spesialisasi, dan persentase komisi bagi hasil.</p>
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

                <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
                  <span className="text-zinc-500 block text-[10px]">Skema Bagi Hasil:</span>
                  <strong className="text-emerald-400 text-sm font-mono">
                    {Math.round((b.commissionRate || 0.6) * 100)}% Capster / {100 - Math.round((b.commissionRate || 0.6) * 100)}% Barbershop
                  </strong>
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

      {/* TAB: SETTINGS & DUA NOMOR ADMIN WA */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-white">Pengaturan Barbershop & Kontak Dua Admin</h3>
            <p className="text-xs text-zinc-400">
              Atur kontak WhatsApp Admin 1 (082291544262) & Admin 2 (082191843162) untuk direct communication formulir.
            </p>
          </div>

          {saveSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveSettingsSubmit} className="space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
            
            {/* KONTAK DUA ADMIN */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
                1. Kontak Resmi Admin Barbershop & Academy
              </h4>

              {/* Admin 1 Box */}
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <strong className="text-white text-xs">Admin 1 — Layanan Booking & Kasir</strong>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Nama Admin 1</label>
                    <input
                      type="text"
                      value={formSettings.admin1?.name || ''}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        admin1: { ...formSettings.admin1, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Nomor WhatsApp Admin 1</label>
                    <input
                      type="text"
                      value={formSettings.admin1?.phone || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        const wa = val.replace(/^0/, '62').replace(/[^0-9]/g, '');
                        setFormSettings({
                          ...formSettings,
                          admin1: { ...formSettings.admin1, phone: val, whatsapp: wa }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Admin 2 Box */}
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <strong className="text-white text-xs">Admin 2 — Academy & Kursus Barber</strong>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Nama Admin 2</label>
                    <input
                      type="text"
                      value={formSettings.admin2?.name || ''}
                      onChange={(e) => setFormSettings({
                        ...formSettings,
                        admin2: { ...formSettings.admin2, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Nomor WhatsApp Admin 2</label>
                    <input
                      type="text"
                      value={formSettings.admin2?.phone || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        const wa = val.replace(/^0/, '62').replace(/[^0-9]/g, '');
                        setFormSettings({
                          ...formSettings,
                          admin2: { ...formSettings.admin2, phone: val, whatsapp: wa }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* General Info */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
                2. Profil Usaha & Operasional
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
            </div>

            {/* Cloud Firestore configuration */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  3. Konfigurasi Cloud Firestore / Firebase
                </h4>
              </div>

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
