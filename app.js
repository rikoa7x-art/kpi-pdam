/* ============================================================
   KPI PDAM - Main Application JavaScript
   ============================================================ */

// ─── DATA ────────────────────────────────────────────────────
const PERSPEKTIF = [
  {
    id: 'keuangan', label: 'Keuangan & Efisiensi', bobot: '30%',
    color: '#0ea5e9', colorLight: '#0ea5e920', dotClass: 'dot-blue',
    kpi: [
      { no:1, nama:'Tingkat Penagihan Rekening (Collection Rate)', desc:'Persentase tagihan air yang berhasil ditagih dari total tagihan yang diterbitkan kepada pelanggan aktif.',
        formula:'(Total Rekening Tertagih / Total Rekening Diterbitkan) × 100%', satuan:'%', bobot:'4%', target:'≥95%',
        scoring:'5=≥98%; 4=95-97%; 3=90-94%; 2=85-89%; 1=<85%', periode:'Bulanan', arah:'tinggi' },
      { no:2, nama:'Indeks Kepuasan Pelanggan / IKP', desc:'Rata-rata skor kepuasan pelanggan dari survei berkala yang mengukur kualitas layanan PDAM.',
        formula:'Rata-rata skor survei kepuasan (skala 0-100)', satuan:'Skor', bobot:'5%', target:'≥80/100',
        scoring:'5=≥90; 4=80-89; 3=70-79; 2=60-69; 1=<60', periode:'Triwulanan', arah:'tinggi' },
      { no:3, nama:'Rasio Pendapatan Operasional terhadap Biaya Operasional (OPEX Ratio)', desc:'Mengukur efisiensi operasional perusahaan: seberapa besar biaya yang dikeluarkan per rupiah pendapatan.',
        formula:'(Biaya Operasional / Pendapatan Operasional) × 100%', satuan:'%', bobot:'5%', target:'≤85%',
        scoring:'5=≤70%; 4=70-85%; 3=85-95%; 2=95-105%; 1=>105%', periode:'Triwulanan', arah:'rendah' },
      { no:4, nama:'Return on Assets (ROA)', desc:'Kemampuan perusahaan menghasilkan laba dari seluruh aset yang dimiliki.',
        formula:'(Laba Bersih / Total Aset) × 100%', satuan:'%', bobot:'4%', target:'≥3%',
        scoring:'5=≥8%; 4=5-7,9%; 3=3-4,9%; 2=1-2,9%; 1=<1%', periode:'Tahunan', arah:'tinggi' },
      { no:5, nama:'Rasio Likuiditas (Current Ratio)', desc:'Kemampuan perusahaan memenuhi kewajiban jangka pendek menggunakan aset lancar.',
        formula:'(Aset Lancar / Kewajiban Lancar)', satuan:'Rasio', bobot:'3%', target:'≥1,5x',
        scoring:'5=≥2,5x; 4=2-2,4x; 3=1,5-1,9x; 2=1-1,4x; 1=<1x', periode:'Triwulanan', arah:'tinggi' },
      { no:6, nama:'Pertumbuhan Pendapatan Tarif Air (Revenue Growth)', desc:'Persentase pertumbuhan total pendapatan dari penjualan air dibandingkan periode yang sama tahun sebelumnya.',
        formula:'((Pendapatan Tahun Ini - Pendapatan Tahun Lalu) / Pendapatan Tahun Lalu) × 100%', satuan:'%', bobot:'3%', target:'≥5%',
        scoring:'5=≥15%; 4=10-14%; 3=5-9%; 2=0-4%; 1=<0% (turun)', periode:'Tahunan', arah:'tinggi' },
      { no:7, nama:'Realisasi Investasi & Belanja Modal (CapEx Realization)', desc:'Persentase realisasi program investasi dan belanja modal yang telah dianggarkan dalam RKAP.',
        formula:'(Realisasi CapEx / Anggaran CapEx) × 100%', satuan:'%', bobot:'3%', target:'≥85%',
        scoring:'5=≥95%; 4=85-94%; 3=70-84%; 2=55-69%; 1=<55%', periode:'Tahunan', arah:'tinggi' },
      { no:8, nama:'Efisiensi Biaya Energi per M³ Air Diproduksi', desc:'Biaya energi listrik yang dikeluarkan untuk memproduksi setiap meter kubik air.',
        formula:'Total Biaya Energi / Total Volume Air Diproduksi (m³)', satuan:'Rp/m³', bobot:'2%', target:'≤1.800 Rp/m³',
        scoring:'5=≤1.500; 4=1.500-1.800; 3=1.800-2.100; 2=2.100-2.500; 1=>2.500', periode:'Bulanan', arah:'rendah' },
      { no:9, nama:'Debt Service Coverage Ratio (DSCR)', desc:'Kemampuan perusahaan membayar kewajiban hutang menggunakan arus kas operasional.',
        formula:'(EBITDA / Total Kewajiban Hutang Jatuh Tempo)', satuan:'Rasio', bobot:'1%', target:'≥1,2x',
        scoring:'5=≥2x; 4=1,5-1,9x; 3=1,2-1,4x; 2=1,0-1,1x; 1=<1x', periode:'Tahunan', arah:'tinggi' },
    ]
  },
  {
    id: 'pelanggan', label: 'Pelanggan & Layanan', bobot: '25%',
    color: '#22c55e', colorLight: '#22c55e20', dotClass: 'dot-green',
    kpi: [
      { no:10, nama:'Kontinuitas Layanan Air (Service Continuity)', desc:'Rata-rata jam per hari air mengalir secara aktif ke sambungan pelanggan.',
        formula:'Total jam aliran air / Jumlah hari dalam periode', satuan:'Jam/hari', bobot:'5%', target:'≥20 jam/hari',
        scoring:'5=24 jam; 4=20-23 jam; 3=16-19 jam; 2=12-15 jam; 1=<12 jam', periode:'Bulanan', arah:'tinggi' },
      { no:11, nama:'Tingkat Penyelesaian Keluhan (Complaint Resolution Rate)', desc:'Persentase keluhan pelanggan yang berhasil diselesaikan dari total keluhan yang masuk dalam periode.',
        formula:'(Keluhan Diselesaikan / Total Keluhan Masuk) × 100%', satuan:'%', bobot:'4%', target:'≥95%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Bulanan', arah:'tinggi' },
      { no:12, nama:'Waktu Penyelesaian Keluhan (Average Resolution Time)', desc:'Rata-rata waktu yang dibutuhkan untuk menyelesaikan satu keluhan pelanggan sejak diterima.',
        formula:'Total waktu penyelesaian semua keluhan / Jumlah keluhan diselesaikan', satuan:'Jam', bobot:'3%', target:'≤24 jam',
        scoring:'5=≤8 jam; 4=8-24 jam; 3=24-48 jam; 2=48-72 jam; 1=>72 jam', periode:'Bulanan', arah:'rendah' },
      { no:13, nama:'Pertumbuhan Jumlah Pelanggan Baru (New Customer Growth)', desc:'Jumlah sambungan rumah (SR) baru yang berhasil dipasang dalam periode tertentu.',
        formula:'Jumlah SR baru terpasang dalam periode', satuan:'SR/bulan', bobot:'3%', target:'≥50 SR/bln',
        scoring:'5=≥100 SR; 4=75-99 SR; 3=50-74 SR; 2=25-49 SR; 1=<25 SR', periode:'Bulanan', arah:'tinggi' },
      { no:14, nama:'Cakupan Pelayanan (Service Coverage)', desc:'Persentase penduduk dalam wilayah konsesi yang telah memperoleh akses layanan air PDAM.',
        formula:'(Jumlah Penduduk Terlayani / Total Penduduk Wilayah Konsesi) × 100%', satuan:'%', bobot:'4%', target:'≥80%',
        scoring:'5=≥90%; 4=80-89%; 3=70-79%; 2=60-69%; 1=<60%', periode:'Tahunan', arah:'tinggi' },
      { no:15, nama:'Tingkat Akurasi Meteran (Meter Accuracy Rate)', desc:'Persentase meter air pelanggan yang berfungsi dengan baik dan memberikan pembacaan akurat.',
        formula:'(Jumlah Meter Akurat / Total Meter Terpasang) × 100%', satuan:'%', bobot:'2%', target:'≥95%',
        scoring:'5=≥98%; 4=95-97%; 3=90-94%; 2=85-89%; 1=<85%', periode:'Triwulanan', arah:'tinggi' },
      { no:16, nama:'Waktu Pemasangan SR Baru (Time to Connect)', desc:'Rata-rata waktu yang dibutuhkan sejak permohonan SR baru diajukan hingga air mengalir.',
        formula:'Total hari proses seluruh SR baru / Jumlah SR baru dipasang', satuan:'Hari kerja', bobot:'2%', target:'≤10 hari',
        scoring:'5=≤5 hari; 4=6-10 hari; 3=11-15 hari; 2=16-20 hari; 1=>20 hari', periode:'Bulanan', arah:'rendah' },
      { no:17, nama:'Net Promoter Score (NPS)', desc:'Mengukur loyalitas pelanggan - seberapa besar kemungkinan pelanggan merekomendasikan layanan PDAM.',
        formula:'% Promoter (skor 9-10) - % Detractor (skor 0-6)', satuan:'Skor', bobot:'1%', target:'≥40',
        scoring:'5=≥60; 4=40-59; 3=20-39; 2=0-19; 1=<0 (Negatif)', periode:'Tahunan', arah:'tinggi' },
      { no:18, nama:'Jumlah Pelanggan Aktif vs. Target', desc:'Membandingkan total pelanggan aktif terhadap target yang ditetapkan dalam RKAP.',
        formula:'(Jumlah Pelanggan Aktif / Target Pelanggan) × 100%', satuan:'%', bobot:'1%', target:'≥100%',
        scoring:'5=≥105%; 4=100-104%; 3=90-99%; 2=80-89%; 1=<80%', periode:'Triwulanan', arah:'tinggi' },
    ]
  },
  {
    id: 'operasional', label: 'Operasional & Teknis', bobot: '25%',
    color: '#f97316', colorLight: '#f9731620', dotClass: 'dot-orange',
    kpi: [
      { no:19, nama:'Non-Revenue Water / Air Tak Berekening (NRW/ATR)', desc:'Persentase air diproduksi yang tidak menghasilkan pendapatan akibat kebocoran fisik, pencurian, atau kesalahan administrasi.',
        formula:'((Air Diproduksi - Air Berekening) / Air Diproduksi) × 100%', satuan:'%', bobot:'6%', target:'≤20%',
        scoring:'5=≤15%; 4=15-20%; 3=20-25%; 2=25-30%; 1=>30%', periode:'Bulanan', arah:'rendah' },
      { no:20, nama:'Kualitas Air - Kepatuhan Baku Mutu', desc:'Persentase sampel uji air yang memenuhi standar Permenkes No.2/2023 tentang persyaratan kualitas air minum.',
        formula:'(Sampel Lulus Uji / Total Sampel Diuji) × 100%', satuan:'%', bobot:'6%', target:'100%',
        scoring:'5=100%; 4=98-99%; 3=95-97%; 2=90-94%; 1=<90%', periode:'Bulanan', arah:'tinggi' },
      { no:21, nama:'Efisiensi Produksi (Production Efficiency)', desc:'Rasio volume air yang berhasil didistribusikan ke jaringan terhadap kapasitas produksi terpasang.',
        formula:'(Volume Air Produksi Aktual / Kapasitas Produksi Terpasang) × 100%', satuan:'%', bobot:'4%', target:'≥85%',
        scoring:'5=≥95%; 4=85-94%; 3=75-84%; 2=65-74%; 1=<65%', periode:'Bulanan', arah:'tinggi' },
      { no:22, nama:'Tingkat Ketersediaan Pompa & Peralatan', desc:'Persentase waktu pompa dan peralatan utama beroperasi normal dibandingkan total waktu operasional yang direncanakan.',
        formula:'((Total Jam Rencana - Jam Downtime) / Total Jam Rencana) × 100%', satuan:'%', bobot:'4%', target:'≥95%',
        scoring:'5=≥98%; 4=95-97%; 3=90-94%; 2=85-89%; 1=<85%', periode:'Bulanan', arah:'tinggi' },
      { no:23, nama:'Mean Time to Repair (MTTR) - Kebocoran Pipa', desc:'Rata-rata waktu yang dibutuhkan tim lapangan untuk merespon dan memperbaiki laporan kebocoran pipa.',
        formula:'Total jam perbaikan seluruh kebocoran / Jumlah kasus kebocoran', satuan:'Jam', bobot:'3%', target:'≤4 jam',
        scoring:'5=≤2 jam; 4=2-4 jam; 3=4-6 jam; 2=6-12 jam; 1=>12 jam', periode:'Bulanan', arah:'rendah' },
      { no:24, nama:'Frekuensi Gangguan Distribusi', desc:'Jumlah gangguan tidak terencana pada sistem distribusi air yang menyebabkan aliran terhenti per 100 SR.',
        formula:'(Jumlah Gangguan / Jumlah SR Aktif) × 100', satuan:'Kasus/100 SR', bobot:'3%', target:'≤2 kasus/bln',
        scoring:'5=≤0,5; 4=0,5-2; 3=2-4; 2=4-6; 1=>6', periode:'Bulanan', arah:'rendah' },
      { no:25, nama:'Tekanan Air Minimum di Ujung Jaringan', desc:'Tekanan air minimum yang terukur di titik ujung jaringan distribusi (titik kritis). Standar minimal 1,0 bar.',
        formula:'Rata-rata tekanan minimum terukur di titik kritis (sampling)', satuan:'Bar', bobot:'2%', target:'≥1,0 Bar',
        scoring:'5=≥1,5 bar; 4=1,0-1,4 bar; 3=0,7-0,9 bar; 2=0,5-0,6 bar; 1=<0,5 bar', periode:'Bulanan', arah:'tinggi' },
      { no:26, nama:'Realisasi Program Pemeliharaan Rutin', desc:'Persentase program pemeliharaan preventif yang terlaksana sesuai jadwal yang telah ditetapkan.',
        formula:'(PM Terlaksana / PM Direncanakan) × 100%', satuan:'%', bobot:'2%', target:'≥90%',
        scoring:'5=≥95%; 4=90-94%; 3=80-89%; 2=70-79%; 1=<70%', periode:'Triwulanan', arah:'tinggi' },
      { no:27, nama:'Cakupan Wilayah Pengambilan Sampel Air', desc:'Persentase titik pengambilan sampel uji kualitas air yang sudah tercakup dari seluruh titik wajib sesuai regulasi.',
        formula:'(Titik Sampling Tercakup / Total Titik Wajib) × 100%', satuan:'%', bobot:'2%', target:'100%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Bulanan', arah:'tinggi' },
      { no:28, nama:'Efektivitas Penggunaan Bahan Kimia', desc:'Mengukur ketepatan dosis bahan kimia (klorin, koagulan, dll.) dibandingkan dengan standar proses.',
        formula:'(Pemakaian Kimia Aktual / Standar Pemakaian Kimia) × 100%', satuan:'%', bobot:'2%', target:'95-105%',
        scoring:'5=98-102%; 4=95-97% atau 103-105%; 3=90-94%; 2=85-89%; 1=<85% atau >115%', periode:'Bulanan', arah:'range' },
      { no:29, nama:'Penurunan Kasus Kerusakan Pipa', desc:'Persentase penurunan jumlah kasus kerusakan pipa dibandingkan periode yang sama tahun sebelumnya.',
        formula:'((Kasus Tahun Lalu - Kasus Tahun Ini) / Kasus Tahun Lalu) × 100%', satuan:'%', bobot:'1%', target:'≥10% turun',
        scoring:'5=≥20% turun; 4=10-19% turun; 3=0-9% turun; 2=0-9% naik; 1=>10% naik', periode:'Tahunan', arah:'tinggi' },
      { no:30, nama:'Kepatuhan Laporan Operasional', desc:'Ketepatan waktu dan kelengkapan penyerahan laporan operasional harian, bulanan, dan triwulanan.',
        formula:'(Laporan Tepat Waktu & Lengkap / Total Laporan Wajib) × 100%', satuan:'%', bobot:'1%', target:'100%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Bulanan', arah:'tinggi' },
    ]
  },
  {
    id: 'sdm', label: 'SDM & Organisasi', bobot: '12%',
    color: '#8b5cf6', colorLight: '#8b5cf620', dotClass: 'dot-purple',
    kpi: [
      { no:31, nama:'Tingkat Kehadiran Karyawan (Attendance Rate)', desc:'Persentase hari kerja efektif karyawan yang hadir dari total hari kerja yang dijadwalkan.',
        formula:'(Hari Hadir Aktual / Hari Kerja Dijadwalkan) × 100%', satuan:'%', bobot:'3%', target:'≥97%',
        scoring:'5=≥99%; 4=97-98,9%; 3=94-96,9%; 2=90-93,9%; 1=<90%', periode:'Bulanan', arah:'tinggi' },
      { no:32, nama:'Realisasi Jam Pelatihan & Pengembangan per Karyawan', desc:'Jumlah jam pelatihan teknis, manajerial, atau pengembangan soft skill yang diikuti karyawan per tahun.',
        formula:'Total jam pelatihan karyawan bersangkutan per tahun', satuan:'Jam/tahun', bobot:'2%', target:'≥40 jam/tahun',
        scoring:'5=≥60 jam; 4=40-59 jam; 3=25-39 jam; 2=15-24 jam; 1=<15 jam', periode:'Tahunan', arah:'tinggi' },
      { no:33, nama:'Pencapaian Target Individu (Individual KPI Achievement)', desc:'Rata-rata persentase pencapaian target KPI individu terhadap seluruh indikator yang ditetapkan.',
        formula:'Rata-rata (Realisasi / Target) × 100% untuk semua KPI individu', satuan:'%', bobot:'3%', target:'≥90%',
        scoring:'5=≥100%; 4=90-99%; 3=75-89%; 2=60-74%; 1=<60%', periode:'Triwulanan', arah:'tinggi' },
      { no:34, nama:'Indeks Disiplin Kerja', desc:'Mengukur kepatuhan karyawan terhadap peraturan perusahaan: ketepatan waktu, SOP, tata tertib, dan etika kerja.',
        formula:'100 - (Jumlah Pelanggaran × Bobot Pelanggaran)', satuan:'Skor', bobot:'2%', target:'≥90',
        scoring:'5=95-100; 4=90-94; 3=80-89; 2=70-79; 1=<70', periode:'Triwulanan', arah:'tinggi' },
      { no:35, nama:'Tingkat Turnover Karyawan (Voluntary Turnover Rate)', desc:'Persentase karyawan yang mengundurkan diri dari total karyawan aktif.',
        formula:'(Karyawan Mengundurkan Diri / Rata-rata Karyawan Aktif) × 100%', satuan:'%', bobot:'2%', target:'≤5%/tahun',
        scoring:'5=≤2%; 4=2-5%; 3=5-8%; 2=8-12%; 1=>12%', periode:'Tahunan', arah:'rendah' },
      { no:36, nama:'Indeks Kepuasan Karyawan (Employee Engagement / eNPS)', desc:'Mengukur tingkat keterlibatan dan kepuasan karyawan berdasarkan survei internal tahunan.',
        formula:'Rata-rata skor survei engagement (skala 1-100) atau eNPS', satuan:'Skor', bobot:'2%', target:'≥70',
        scoring:'5=≥85; 4=70-84; 3=55-69; 2=40-54; 1=<40', periode:'Tahunan', arah:'tinggi' },
      { no:37, nama:'Sertifikasi & Kompetensi Teknis', desc:'Persentase karyawan teknis yang memiliki sertifikasi kompetensi yang relevan dan masih berlaku.',
        formula:'(Karyawan Bersertifikat / Total Karyawan Teknis) × 100%', satuan:'%', bobot:'1%', target:'≥80%',
        scoring:'5=≥90%; 4=80-89%; 3=70-79%; 2=60-69%; 1=<60%', periode:'Tahunan', arah:'tinggi' },
    ]
  },
  {
    id: 'inovasi', label: 'Inovasi & Keberlanjutan', bobot: '8%',
    color: '#14b8a6', colorLight: '#14b8a620', dotClass: 'dot-teal',
    kpi: [
      { no:38, nama:'Implementasi Digitalisasi Layanan', desc:'Mengukur tingkat adopsi sistem digital dalam layanan pelanggan, operasional, dan administrasi (SCADA, e-payment, mobile app).',
        formula:'(Fitur/Sistem Digital Aktif / Target Roadmap Digital) × 100%', satuan:'%', bobot:'3%', target:'≥80%',
        scoring:'5=≥100%; 4=80-99%; 3=60-79%; 2=40-59%; 1=<40%', periode:'Tahunan', arah:'tinggi' },
      { no:39, nama:'Jumlah Inovasi / Perbaikan Proses (Continuous Improvement)', desc:'Jumlah proposal inovasi, ide perbaikan proses, atau proyek efisiensi yang diusulkan dan diimplementasikan.',
        formula:'Jumlah inovasi terimplementasi dalam setahun', satuan:'Inovasi', bobot:'2%', target:'≥2 per unit/tahun',
        scoring:'5=≥5; 4=3-4; 3=2; 2=1; 1=0', periode:'Tahunan', arah:'tinggi' },
      { no:40, nama:'Tingkat Kepatuhan Regulasi & Perizinan', desc:'Persentase kewajiban regulasi, perizinan, dan standar teknis yang terpenuhi tepat waktu.',
        formula:'(Kewajiban Terpenuhi / Total Kewajiban Regulasi) × 100%', satuan:'%', bobot:'2%', target:'100%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Triwulanan', arah:'tinggi' },
      { no:41, nama:'Pengurangan Emisi & Jejak Lingkungan', desc:'Mengukur upaya pengurangan dampak lingkungan: emisi CO₂, penggunaan energi terbarukan, pengelolaan limbah sludge.',
        formula:'(Realisasi Target Lingkungan / Target Rencana Lingkungan) × 100%', satuan:'%', bobot:'2%', target:'≥90%',
        scoring:'5=≥100%; 4=90-99%; 3=80-89%; 2=70-79%; 1=<70%', periode:'Tahunan', arah:'tinggi' },
      { no:42, nama:'Program CSR & Pemberdayaan Masyarakat', desc:'Persentase program tanggung jawab sosial perusahaan yang terlaksana dari rencana CSR tahunan.',
        formula:'(Program CSR Terlaksana / Program CSR Direncanakan) × 100%', satuan:'%', bobot:'1%', target:'≥90%',
        scoring:'5=≥100%; 4=90-99%; 3=75-89%; 2=60-74%; 1=<60%', periode:'Tahunan', arah:'tinggi' },
    ]
  }
];

// ─── MONITORING DATA ──────────────────────────────────────────
let monitoringData = [
  { periode:'Jan 2025', nrw:25.1, kualitas:99.2, penagihan:94.5, ikp:79, kehadiran:96.8 },
  { periode:'Feb 2025', nrw:24.7, kualitas:99.5, penagihan:95.1, ikp:80, kehadiran:97.1 },
  { periode:'Mar 2025', nrw:23.9, kualitas:99.6, penagihan:95.8, ikp:81, kehadiran:97.4 },
  { periode:'Apr 2025', nrw:23.5, kualitas:99.7, penagihan:96.0, ikp:81, kehadiran:97.2 },
  { periode:'Mei 2025', nrw:23.2, kualitas:99.8, penagihan:96.3, ikp:82, kehadiran:97.5 },
  { periode:'Jun 2025', nrw:22.8, kualitas:99.8, penagihan:96.1, ikp:82, kehadiran:97.6 },
  { periode:'Jul 2025', nrw:23.4, kualitas:99.9, penagihan:95.9, ikp:82, kehadiran:97.8 },
  { periode:'Agu 2025', nrw:23.1, kualitas:99.8, penagihan:96.2, ikp:83, kehadiran:97.3 },
  { periode:'Sep 2025', nrw:23.0, kualitas:99.8, penagihan:96.0, ikp:82, kehadiran:97.5 },
];

// ─── CHART INSTANCES ──────────────────────────────────────────
let chartInstances = {};

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDate();
  initNavigation();
  initDashboardCharts();
  buildFormTable();
  buildKpiList();
  buildMonitoringTable();
  initMonitoringCharts();
  initFormEvents();
  initModalEvents();
  initPrintBtn();
  initSidebarPerspektifLinks();
});

// ─── DATE ─────────────────────────────────────────────────────
function initDate() {
  const d = new Date();
  document.getElementById('currentDate').textContent =
    d.toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' });
  document.getElementById('tglPenilaian').value = d.toISOString().split('T')[0];
  document.getElementById('tglValidasi').value = d.toISOString().split('T')[0];
}

// ─── NAVIGATION ───────────────────────────────────────────────
const PAGES = { dashboard:'Dashboard Monitoring KPI', form:'Form Penilaian KPI', 'kpi-list':'Daftar KPI Lengkap', monitoring:'Monitoring Kinerja', panduan:'Panduan Penggunaan' };

function initNavigation() {
  document.querySelectorAll('.nav-item[data-page]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); navigateTo(el.dataset.page); });
  });
  document.getElementById('menuBtn').addEventListener('click', toggleSidebar);
  document.getElementById('sidebarClose').addEventListener('click', closeSidebar);
  document.getElementById('overlay').addEventListener('click', closeSidebar);
}

function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  const navEl = document.getElementById('nav-' + pageId);
  if (navEl) navEl.classList.add('active');
  document.getElementById('topbarTitle').textContent = PAGES[pageId] || '';
  closeSidebar();
  if (pageId === 'dashboard') refreshDashboardCharts();
  if (pageId === 'monitoring') refreshMonitoringCharts();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function initSidebarPerspektifLinks() {
  document.querySelectorAll('.nav-item[data-filter]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigateTo('kpi-list');
      setTimeout(() => {
        document.getElementById('kpiFilter').value = el.dataset.filter;
        filterKpiList();
      }, 100);
    });
  });
}

// ─── DASHBOARD CHARTS ─────────────────────────────────────────
const CHART_DEFAULTS = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } } }
};

function initDashboardCharts() {
  // Perspektif Trend Line
  chartInstances.perspektif = new Chart(document.getElementById('perspektifChart'), {
    type: 'line',
    data: {
      labels: ['Q1','Q2','Q3'],
      datasets: [
        { label:'Keuangan', data:[3.8,4.0,3.7], borderColor:'#0ea5e9', backgroundColor:'#0ea5e920', tension:.4, fill:true, pointRadius:4 },
        { label:'Pelanggan', data:[3.5,3.6,3.4], borderColor:'#22c55e', backgroundColor:'#22c55e10', tension:.4, fill:false, pointRadius:4 },
        { label:'Operasional', data:[3.2,3.5,3.3], borderColor:'#f97316', backgroundColor:'#f9731610', tension:.4, fill:false, pointRadius:4 },
        { label:'SDM', data:[4.0,4.1,3.9], borderColor:'#8b5cf6', backgroundColor:'#8b5cf610', tension:.4, fill:false, pointRadius:4 },
        { label:'Inovasi', data:[3.6,3.7,3.8], borderColor:'#14b8a6', backgroundColor:'#14b8a610', tension:.4, fill:false, pointRadius:4 },
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        x: { ticks:{ color:'#64748b' }, grid:{ color:'#1e3a5f40' } },
        y: { min:2.5, max:5, ticks:{ color:'#64748b' }, grid:{ color:'#1e3a5f40' } }
      },
      plugins: { ...CHART_DEFAULTS.plugins, annotation: {} }
    }
  });

  // Bobot Doughnut
  chartInstances.bobot = new Chart(document.getElementById('bobotChart'), {
    type: 'doughnut',
    data: {
      labels: ['Keuangan & Efisiensi 30%','Pelanggan & Layanan 25%','Operasional & Teknis 25%','SDM & Organisasi 12%','Inovasi & Keberlanjutan 8%'],
      datasets: [{ data:[30,25,25,12,8], backgroundColor:['#0ea5e9','#22c55e','#f97316','#8b5cf6','#14b8a6'], borderWidth:2, borderColor:'#111827', hoverBorderWidth:3 }]
    },
    options: {
      ...CHART_DEFAULTS,
      cutout: '65%',
      plugins: { legend: { position:'bottom', labels:{ color:'#94a3b8', font:{ size:10 }, padding:10, boxWidth:12 } } }
    }
  });

  // Radar
  chartInstances.radar = new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
      labels: ['Keuangan','Pelanggan','Operasional','SDM','Inovasi'],
      datasets: [
        { label:'Realisasi', data:[3.83,3.50,3.33,4.00,3.70], backgroundColor:'#0ea5e930', borderColor:'#0ea5e9', pointBackgroundColor:'#0ea5e9', pointRadius:4 },
        { label:'Target', data:[3.5,3.5,3.5,3.5,3.5], backgroundColor:'transparent', borderColor:'#ffffff30', borderDash:[4,4], pointRadius:0 }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        r: {
          min:0, max:5,
          ticks:{ color:'#64748b', stepSize:1, backdropColor:'transparent' },
          grid:{ color:'#1e3a5f60' }, angleLines:{ color:'#1e3a5f60' },
          pointLabels:{ color:'#94a3b8', font:{ size:11 } }
        }
      }
    }
  });
}

function refreshDashboardCharts() {
  Object.values(chartInstances).forEach(c => { if (c && c.update) c.update(); });
}

// ─── FORM TABLE ───────────────────────────────────────────────
function buildFormTable() {
  const tbody = document.getElementById('formTableBody');
  let html = '';
  PERSPEKTIF.forEach(p => {
    html += `<tr class="perspektif-header"><td colspan="9">Perspektif: ${p.label} — Bobot ${p.bobot}</td></tr>`;
    p.kpi.forEach(k => {
      const bobotNum = parseFloat(k.bobot);
      html += `<tr data-no="${k.no}" data-bobot="${bobotNum}">
        <td style="text-align:center;font-weight:700;color:${p.color}">${k.no}</td>
        <td>
          <div style="font-weight:600;font-size:12px;color:#e2e8f0;line-height:1.4">${k.nama}</div>
          <div style="font-size:11px;color:#64748b;margin-top:3px">${k.formula}</div>
        </td>
        <td><span style="font-size:12px;color:#94a3b8">${k.target}</span></td>
        <td><input type="number" step="0.01" placeholder="0" class="realisasi-input" id="r_${k.no}" oninput="calcRow(${k.no})" /></td>
        <td><div class="capai-display" id="capai_${k.no}">—</div></td>
        <td><div class="nilai-display" id="nilai_${k.no}" style="color:#64748b">—</div></td>
        <td><div class="bobot-display">${k.bobot}</div></td>
        <td><div class="tertimbang-display" id="tert_${k.no}" style="color:#64748b">—</div></td>
        <td><input type="text" placeholder="Bukti/catatan..." id="cat_${k.no}" style="font-size:11px" /></td>
      </tr>`;
    });
  });
  tbody.innerHTML = html;
}

function calcRow(no) {
  const kpi = getAllKpi().find(k => k.no === no);
  if (!kpi) return;
  const realisasiEl = document.getElementById('r_' + no);
  const val = parseFloat(realisasiEl.value);
  if (isNaN(val)) {
    document.getElementById('capai_' + no).textContent = '—';
    document.getElementById('nilai_' + no).textContent = '—';
    document.getElementById('nilai_' + no).style.color = '#64748b';
    document.getElementById('tert_' + no).textContent = '—';
    return;
  }
  const capai = calcCapai(kpi, val);
  const nilai = calcNilai(kpi, val);
  const tert = ((nilai * parseFloat(kpi.bobot)) / 100).toFixed(2);
  document.getElementById('capai_' + no).textContent = capai;
  const nEl = document.getElementById('nilai_' + no);
  nEl.textContent = nilai;
  nEl.style.color = nilaiColor(nilai);
  document.getElementById('tert_' + no).textContent = tert;
  document.getElementById('tert_' + no).style.color = nilaiColor(nilai);
}

function calcCapai(kpi, val) {
  if (kpi.arah === 'rendah') {
    const tgt = parseFloat(kpi.target.replace(/[^0-9.]/g, '')) || 1;
    return ((tgt / val) * 100).toFixed(1) + '%';
  }
  const tgt = parseFloat(kpi.target.replace(/[^0-9.]/g, '')) || 1;
  return ((val / tgt) * 100).toFixed(1) + '%';
}

function calcNilai(kpi, val) {
  // Simplified scoring based on target percentage
  const tgt = parseFloat(kpi.target.replace(/[^0-9.]/g, '')) || 1;
  let ratio = kpi.arah === 'rendah' ? tgt / val : val / tgt;
  if (ratio >= 1.0) return 5;
  if (ratio >= 0.95) return 4;
  if (ratio >= 0.85) return 3;
  if (ratio >= 0.70) return 2;
  return 1;
}

function nilaiColor(n) {
  if (n >= 5) return '#22c55e';
  if (n >= 4) return '#84cc16';
  if (n >= 3) return '#eab308';
  if (n >= 2) return '#f97316';
  return '#ef4444';
}

function getAllKpi() {
  return PERSPEKTIF.flatMap(p => p.kpi);
}

function initFormEvents() {
  document.getElementById('hitungBtn').addEventListener('click', hitungTotal);
  document.getElementById('resetFormBtn').addEventListener('click', resetForm);
  document.getElementById('printFormBtn').addEventListener('click', () => window.print());
  document.getElementById('atasan').addEventListener('input', e => {
    document.getElementById('ttdAtasan').textContent = e.target.value || '__________________';
  });
}

function hitungTotal() {
  let total = 0, count = 0;
  getAllKpi().forEach(k => {
    const tEl = document.getElementById('tert_' + k.no);
    if (tEl && tEl.textContent !== '—') {
      total += parseFloat(tEl.textContent) || 0;
      count++;
    }
  });
  if (count === 0) { showToast('⚠ Isi minimal satu realisasi KPI terlebih dahulu!', 'warn'); return; }
  const rounded = total.toFixed(2);
  document.getElementById('totalNilai').textContent = rounded;
  const predikat = getPredikat(total);
  document.getElementById('predikatKinerja').textContent = predikat.label;
  document.getElementById('predikatKinerja').style.color = predikat.color;

  // show hasil section
  const hasilSection = document.getElementById('hasilSection');
  hasilSection.style.display = 'flex';
  document.getElementById('hasilScore').textContent = rounded;
  document.getElementById('hasilScore').style.color = predikat.color;
  document.getElementById('hasilPredikat').textContent = predikat.label;
  document.getElementById('hasilPredikat').style.color = predikat.color;
  document.getElementById('hasilDesc').textContent = predikat.desc;

  buildHasilChart(total);
  hasilSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('✓ Perhitungan KPI selesai! Total: ' + rounded);
}

function getPredikat(score) {
  if (score >= 4.5) return { label:'⭐ SANGAT BAIK', color:'#22c55e', desc:'Kinerja melampaui target secara konsisten. Karyawan layak dipertimbangkan untuk promosi atau penghargaan.' };
  if (score >= 3.5) return { label:'✅ BAIK', color:'#84cc16', desc:'Kinerja memenuhi dan umumnya melampaui target. Lanjutkan program pengembangan yang ada.' };
  if (score >= 2.5) return { label:'🔵 CUKUP', color:'#eab308', desc:'Kinerja memenuhi ekspektasi minimum. Perlu program coaching dan action plan perbaikan.' };
  if (score >= 1.5) return { label:'⚠ KURANG', color:'#f97316', desc:'Kinerja di bawah ekspektasi. Perlu program pembinaan intensif dan monitoring ketat.' };
  return { label:'❌ SANGAT KURANG', color:'#ef4444', desc:'Kinerja sangat jauh dari target. Perlu evaluasi menyeluruh termasuk kemungkinan mutasi atau sanksi.' };
}

function buildHasilChart(score) {
  if (chartInstances.hasil) chartInstances.hasil.destroy();
  chartInstances.hasil = new Chart(document.getElementById('hasilChart'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, 5 - score],
        backgroundColor: [nilaiColor(score), '#1e2d42'],
        borderWidth: 0,
        circumference: 270, rotation: 225
      }]
    },
    options: {
      ...CHART_DEFAULTS, cutout: '72%',
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}

function resetForm() {
  document.querySelectorAll('.realisasi-input').forEach(i => i.value = '');
  document.querySelectorAll('[id^="capai_"],[id^="nilai_"],[id^="tert_"]').forEach(el => {
    el.textContent = '—';
    el.style.color = '#64748b';
  });
  document.getElementById('totalNilai').textContent = '—';
  document.getElementById('predikatKinerja').textContent = '—';
  document.getElementById('hasilSection').style.display = 'none';
  showToast('✓ Form telah direset.');
}

// ─── KPI LIST PAGE ────────────────────────────────────────────
function buildKpiList() {
  const container = document.getElementById('kpiListContainer');
  let html = '';
  PERSPEKTIF.forEach((p, pi) => {
    html += `<div class="perspektif-group" id="pg_${p.id}" data-perspektif="${p.id}">
      <div class="perspektif-group-header" style="border-bottom-color:${p.color}" onclick="toggleGroup('${p.id}')">
        <span class="dot" style="background:${p.color};width:10px;height:10px"></span>
        <span class="ph-title" style="color:${p.color}">${p.label}</span>
        <span class="ph-count">${p.kpi.length} KPI</span>
        <span class="ph-bobot" style="color:${p.color}">${p.bobot}</span>
        <span class="ph-toggle">▾</span>
      </div>
      <div class="kpi-cards-grid" id="pgc_${p.id}">`;
    p.kpi.forEach(k => {
      html += `<div class="kpi-card" data-kpi-name="${k.nama.toLowerCase()}" data-perspektif="${p.id}">
        <div class="kpi-card-header">
          <div class="kpi-card-no" style="background:${p.colorLight};color:${p.color}">${k.no}</div>
          <div class="kpi-card-name">${k.nama}</div>
          <div class="kpi-card-bobot" style="background:${p.colorLight};color:${p.color};border:1px solid ${p.color}40">${k.bobot}</div>
        </div>
        <div class="kpi-card-desc">${k.desc}</div>
        <div class="kpi-card-meta">
          <span class="kpi-meta-item">📐 ${k.satuan}</span>
          <span class="kpi-meta-item">🎯 ${k.target}</span>
          <span class="kpi-meta-item">🗓 ${k.periode}</span>
          <span class="kpi-meta-item">${k.arah === 'tinggi' ? '↑ Lebih tinggi lebih baik' : k.arah === 'rendah' ? '↓ Lebih rendah lebih baik' : '↔ Rentang optimal'}</span>
        </div>
        <div class="kpi-card-scoring"><strong>📊 Panduan Scoring:</strong>${k.scoring}</div>
        <div style="margin-top:8px;font-size:11px;color:#64748b"><strong style="color:#94a3b8">Formula:</strong> ${k.formula}</div>
      </div>`;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;

  document.getElementById('kpiSearch').addEventListener('input', filterKpiList);
  document.getElementById('kpiFilter').addEventListener('change', filterKpiList);
}

function toggleGroup(id) {
  document.getElementById('pg_' + id).classList.toggle('collapsed');
  const grid = document.getElementById('pgc_' + id);
  grid.style.display = grid.style.display === 'none' ? '' : 'none';
}

function filterKpiList() {
  const q = document.getElementById('kpiSearch').value.toLowerCase();
  const f = document.getElementById('kpiFilter').value;
  document.querySelectorAll('.perspektif-group').forEach(pg => {
    const pid = pg.dataset.perspektif;
    if (f && pid !== f) { pg.style.display = 'none'; return; }
    pg.style.display = '';
    let visible = 0;
    pg.querySelectorAll('.kpi-card').forEach(card => {
      const match = !q || card.dataset.kpiName.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    pg.style.display = visible === 0 ? 'none' : '';
  });
}

// ─── MONITORING TABLE ─────────────────────────────────────────
function buildMonitoringTable() {
  const tbody = document.getElementById('monitoringBody');
  tbody.innerHTML = monitoringData.map((d, i) => {
    const nrwOk = d.nrw <= 20;
    const kOk = d.kualitas >= 99;
    const pOk = d.penagihan >= 95;
    const allOk = nrwOk && kOk && pOk;
    return `<tr>
      <td><strong>${d.periode}</strong></td>
      <td><span style="color:${d.nrw<=20?'#22c55e':d.nrw<=25?'#eab308':'#ef4444'};font-weight:700">${d.nrw}%</span></td>
      <td><span style="color:${d.kualitas>=99?'#22c55e':'#eab308'};font-weight:700">${d.kualitas}%</span></td>
      <td><span style="color:${d.penagihan>=95?'#22c55e':'#f97316'};font-weight:700">${d.penagihan}%</span></td>
      <td><span style="color:${d.ikp>=80?'#22c55e':'#eab308'};font-weight:700">${d.ikp}</span></td>
      <td><span style="color:${d.kehadiran>=97?'#22c55e':'#eab308'};font-weight:700">${d.kehadiran}%</span></td>
      <td><span class="status-badge ${allOk?'good':'warning'}">${allOk?'✓ Memenuhi':'⚠ Perhatian'}</span></td>
      <td><button class="btn-delete" onclick="deleteMonData(${i})" title="Hapus">🗑</button></td>
    </tr>`;
  }).join('');
  document.getElementById('dataCount').textContent = monitoringData.length + ' entri data';
}

function deleteMonData(i) {
  if (!confirm('Hapus data ' + monitoringData[i].periode + '?')) return;
  monitoringData.splice(i, 1);
  buildMonitoringTable();
  refreshMonitoringCharts();
  showToast('✓ Data berhasil dihapus.');
}

// ─── MONITORING CHARTS ────────────────────────────────────────
function initMonitoringCharts() {
  const labels = monitoringData.map(d => d.periode);

  chartInstances.nrw = new Chart(document.getElementById('nrwChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label:'NRW (%)', data:monitoringData.map(d=>d.nrw), borderColor:'#ef4444', backgroundColor:'#ef444420', tension:.4, fill:true, pointRadius:4 },
        { label:'Target ≤20%', data:monitoringData.map(()=>20), borderColor:'#22c55e80', borderDash:[6,3], pointRadius:0 }
      ]
    },
    options: { ...CHART_DEFAULTS, scales: { x:{ticks:{color:'#64748b'},grid:{color:'#1e3a5f40'}}, y:{ticks:{color:'#64748b'},grid:{color:'#1e3a5f40'}} } }
  });

  chartInstances.kualitas = new Chart(document.getElementById('kualitasChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label:'Kualitas Air (%)', data:monitoringData.map(d=>d.kualitas), backgroundColor:monitoringData.map(d=>d.kualitas>=99?'#22c55e90':'#eab30890'), borderRadius:4 },
        { label:'Target 100%', data:monitoringData.map(()=>100), type:'line', borderColor:'#ffffff40', borderDash:[4,4], pointRadius:0 }
      ]
    },
    options: { ...CHART_DEFAULTS, scales: { x:{ticks:{color:'#64748b'},grid:{color:'#1e3a5f40'}}, y:{min:98,ticks:{color:'#64748b'},grid:{color:'#1e3a5f40'}} } }
  });

  chartInstances.penagihan = new Chart(document.getElementById('penagihanChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label:'Penagihan (%)', data:monitoringData.map(d=>d.penagihan), borderColor:'#8b5cf6', backgroundColor:'#8b5cf620', tension:.4, fill:true, pointRadius:4 },
        { label:'Target ≥95%', data:monitoringData.map(()=>95), borderColor:'#22c55e80', borderDash:[6,3], pointRadius:0 }
      ]
    },
    options: { ...CHART_DEFAULTS, scales: { x:{ticks:{color:'#64748b'},grid:{color:'#1e3a5f40'}}, y:{min:90,ticks:{color:'#64748b'},grid:{color:'#1e3a5f40'}} } }
  });

  chartInstances.trendNilai = new Chart(document.getElementById('trendNilaiChart'), {
    type: 'bar',
    data: {
      labels: ['Q1 2025','Q2 2025','Q3 2025','Q4 2025'],
      datasets: [
        { label:'Total Tertimbang', data:[3.57,3.73,3.56,null], backgroundColor:['#0ea5e9','#22c55e','#0ea5e9','#1e3a5f'], borderRadius:6 },
        { label:'Target ≥3.5', data:[3.5,3.5,3.5,3.5], type:'line', borderColor:'#eab30880', borderDash:[4,4], pointRadius:0 }
      ]
    },
    options: { ...CHART_DEFAULTS, scales: { x:{ticks:{color:'#64748b'},grid:{color:'#1e3a5f40'}}, y:{min:2.5,max:5,ticks:{color:'#64748b'},grid:{color:'#1e3a5f40'}} } }
  });
}

function refreshMonitoringCharts() {
  const labels = monitoringData.map(d => d.periode);
  if (chartInstances.nrw) {
    chartInstances.nrw.data.labels = labels;
    chartInstances.nrw.data.datasets[0].data = monitoringData.map(d => d.nrw);
    chartInstances.nrw.data.datasets[1].data = monitoringData.map(() => 20);
    chartInstances.nrw.update();
  }
  if (chartInstances.kualitas) {
    chartInstances.kualitas.data.labels = labels;
    chartInstances.kualitas.data.datasets[0].data = monitoringData.map(d => d.kualitas);
    chartInstances.kualitas.data.datasets[0].backgroundColor = monitoringData.map(d => d.kualitas >= 99 ? '#22c55e90' : '#eab30890');
    chartInstances.kualitas.data.datasets[1].data = monitoringData.map(() => 100);
    chartInstances.kualitas.update();
  }
  if (chartInstances.penagihan) {
    chartInstances.penagihan.data.labels = labels;
    chartInstances.penagihan.data.datasets[0].data = monitoringData.map(d => d.penagihan);
    chartInstances.penagihan.data.datasets[1].data = monitoringData.map(() => 95);
    chartInstances.penagihan.update();
  }
}

// ─── MODAL ────────────────────────────────────────────────────
function initModalEvents() {
  document.getElementById('addDataBtn').addEventListener('click', () => {
    document.getElementById('addDataModal').style.display = 'flex';
  });
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('cancelModal').addEventListener('click', closeModal);
  document.getElementById('addDataModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
  document.getElementById('saveMonData').addEventListener('click', saveMonitoringData);
}

function closeModal() {
  document.getElementById('addDataModal').style.display = 'none';
}

function saveMonitoringData() {
  const nrw = parseFloat(document.getElementById('monNrw').value);
  const kualitas = parseFloat(document.getElementById('monKualitas').value);
  const penagihan = parseFloat(document.getElementById('monPenagihan').value);
  const periode = document.getElementById('monPeriode').value;
  if (isNaN(nrw) || isNaN(kualitas) || isNaN(penagihan)) {
    showToast('⚠ Lengkapi semua field data!', 'warn'); return;
  }
  monitoringData.push({ periode, nrw, kualitas, penagihan, ikp:80, kehadiran:97 });
  buildMonitoringTable();
  refreshMonitoringCharts();
  closeModal();
  showToast('✓ Data monitoring berhasil disimpan!');
}

// ─── PRINT ────────────────────────────────────────────────────
function initPrintBtn() {
  document.getElementById('printBtn').addEventListener('click', () => window.print());
}

// ─── TOAST ────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderColor = type === 'warn' ? '#f97316' : '#22c55e';
  toast.innerHTML = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
