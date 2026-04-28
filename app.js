/* ============================================================
   KPI PERUMDA Tirta Rangga - Main Application JavaScript
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
      { no:2, nama:'Umur Piutang (Days Sales Outstanding / DSO)', desc:'Rata-rata jumlah hari yang dibutuhkan PERUMDA Tirta Rangga untuk menagih piutang pelanggannya.',
        formula:'(Rata-rata Piutang / Total Pendapatan) × 365', satuan:'Hari', bobot:'3%', target:'≤60 hari',
        scoring:'5=≤30 hari; 4=31-45 hari; 3=46-60 hari; 2=61-90 hari; 1=>90 hari', periode:'Triwulanan', arah:'rendah' },
      { no:3, nama:'Rasio Pendapatan Operasional terhadap Biaya Operasional (OPEX Ratio)', desc:'Mengukur efisiensi operasional perusahaan: seberapa besar biaya yang dikeluarkan per rupiah pendapatan.',
        formula:'(Biaya Operasional / Pendapatan Operasional) × 100%', satuan:'%', bobot:'4%', target:'≤85%',
        scoring:'5=≤70%; 4=70-85%; 3=85-95%; 2=95-105%; 1=>105%', periode:'Triwulanan', arah:'rendah' },
      { no:4, nama:'Return on Assets (ROA)', desc:'Kemampuan perusahaan menghasilkan laba dari seluruh aset yang dimiliki.',
        formula:'(Laba Bersih / Total Aset) × 100%', satuan:'%', bobot:'3%', target:'≥3%',
        scoring:'5=≥8%; 4=5-7,9%; 3=3-4,9%; 2=1-2,9%; 1=<1%', periode:'Tahunan', arah:'tinggi' },
      { no:5, nama:'Rasio Likuiditas (Current Ratio)', desc:'Kemampuan perusahaan memenuhi kewajiban jangka pendek menggunakan aset lancar.',
        formula:'(Aset Lancar / Kewajiban Lancar)', satuan:'Rasio', bobot:'3%', target:'≥1,5x',
        scoring:'5=≥2,5x; 4=2-2,4x; 3=1,5-1,9x; 2=1-1,4x; 1=<1x', periode:'Triwulanan', arah:'tinggi' },
      { no:6, nama:'Pertumbuhan Pendapatan Tarif Air (Revenue Growth)', desc:'Persentase pertumbuhan total pendapatan dari penjualan air dibandingkan periode yang sama tahun sebelumnya.',
        formula:'((Pendapatan Tahun Ini - Pendapatan Tahun Lalu) / Pendapatan Tahun Lalu) × 100%', satuan:'%', bobot:'2%', target:'≥5%',
        scoring:'5=≥15%; 4=10-14%; 3=5-9%; 2=0-4%; 1=<0% (turun)', periode:'Tahunan', arah:'tinggi' },
      { no:7, nama:'Realisasi Investasi & Belanja Modal (CapEx Realization)', desc:'Persentase realisasi program investasi dan belanja modal yang telah dianggarkan dalam RKAP.',
        formula:'(Realisasi CapEx / Anggaran CapEx) × 100%', satuan:'%', bobot:'3%', target:'≥85%',
        scoring:'5=≥95%; 4=85-94%; 3=70-84%; 2=55-69%; 1=<55%', periode:'Tahunan', arah:'tinggi' },
      { no:8, nama:'Efisiensi Biaya Energi per M³ Air Diproduksi', desc:'Biaya energi listrik yang dikeluarkan untuk memproduksi setiap meter kubik air.',
        formula:'Total Biaya Energi / Total Volume Air Diproduksi (m³)', satuan:'Rp/m³', bobot:'2%', target:'≤1.800 Rp/m³',
        scoring:'5=≤1.500; 4=1.500-1.800; 3=1.800-2.100; 2=2.100-2.500; 1=>2.500', periode:'Bulanan', arah:'rendah' },
      { no:9, nama:'Efisiensi Biaya Bahan Kimia per M³ Air', desc:'Biaya pengolahan bahan kimia yang dikeluarkan untuk setiap meter kubik air diproduksi.',
        formula:'Total Biaya Bahan Kimia / Total Volume Air Diproduksi (m³)', satuan:'Rp/m³', bobot:'2%', target:'≤250 Rp/m³',
        scoring:'5=≤150; 4=151-200; 3=201-250; 2=251-300; 1=>300', periode:'Bulanan', arah:'rendah' },
      { no:10, nama:'Debt Service Coverage Ratio (DSCR)', desc:'Kemampuan perusahaan membayar kewajiban hutang menggunakan arus kas operasional.',
        formula:'(EBITDA / Total Kewajiban Hutang Jatuh Tempo)', satuan:'Rasio', bobot:'1%', target:'≥1,2x',
        scoring:'5=≥2x; 4=1,5-1,9x; 3=1,2-1,4x; 2=1,0-1,1x; 1=<1x', periode:'Tahunan', arah:'tinggi' },
      { no:54, nama:'Rasio Utang terhadap Modal (DER)', desc:'Mengukur proporsi hutang perusahaan terhadap ekuitas untuk menilai leverage keuangan.',
        formula:'Total Hutang / Total Ekuitas', satuan:'Rasio', bobot:'1%', target:'≤1.5x',
        scoring:'5=≤0.8x; 4=0.8-1.5x; 3=1.5-2x; 2=2-2.5x; 1=>2.5x', periode:'Tahunan', arah:'rendah' },
      { no:55, nama:'Efisiensi Biaya Penagihan (Billing Cost Ratio)', desc:'Proporsi biaya administrasi penagihan terhadap total pendapatan tagihan.',
        formula:'(Biaya Penagihan / Total Pendapatan) × 100%', satuan:'%', bobot:'1%', target:'≤3%',
        scoring:'5=≤1.5%; 4=1.5-3%; 3=3-5%; 2=5-7%; 1=>7%', periode:'Triwulanan', arah:'rendah' },
      { no:56, nama:'Realisasi Anggaran vs RKAP', desc:'Persentase realisasi anggaran operasional terhadap yang direncanakan dalam RKAP.',
        formula:'(Realisasi Anggaran / Anggaran RKAP) × 100%', satuan:'%', bobot:'1%', target:'90–105%',
        scoring:'5=95-105%; 4=90-94% atau 106-110%; 3=85-89%; 2=80-84%; 1=<80% atau >110%', periode:'Triwulanan', arah:'range' }
    ]
  },
  {
    id: 'pelanggan', label: 'Pelanggan & Layanan', bobot: '25%',
    color: '#22c55e', colorLight: '#22c55e20', dotClass: 'dot-green',
    kpi: [
      { no:11, nama:'Indeks Kepuasan Pelanggan / IKP', desc:'Rata-rata skor kepuasan pelanggan dari survei berkala yang mengukur kualitas layanan PERUMDA Tirta Rangga.',
        formula:'Rata-rata skor survei kepuasan (skala 0-100)', satuan:'Skor', bobot:'3%', target:'≥80/100',
        scoring:'5=≥90; 4=80-89; 3=70-79; 2=60-69; 1=<60', periode:'Triwulanan', arah:'tinggi' },
      { no:12, nama:'Kontinuitas Layanan Air (Service Continuity)', desc:'Rata-rata jam per hari air mengalir secara aktif ke sambungan pelanggan.',
        formula:'Total jam aliran air / Jumlah hari dalam periode', satuan:'Jam/hari', bobot:'2%', target:'≥20 jam/hari',
        scoring:'5=24 jam; 4=20-23 jam; 3=16-19 jam; 2=12-15 jam; 1=<12 jam', periode:'Bulanan', arah:'tinggi' },
      { no:13, nama:'Tingkat Penyelesaian Keluhan Umum', desc:'Persentase keluhan pelanggan yang berhasil diselesaikan dari total keluhan yang masuk dalam periode.',
        formula:'(Keluhan Diselesaikan / Total Keluhan Masuk) × 100%', satuan:'%', bobot:'3%', target:'≥95%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Bulanan', arah:'tinggi' },
      { no:14, nama:'Rasio Kecepatan Respons Pengaduan (First Response Time)', desc:'Waktu respon awal tim lapangan/CS sejak keluhan pelanggan diterima sebelum tindakan perbaikan fisik dilakukan.',
        formula:'Rata-rata waktu respon (Jam)', satuan:'Jam', bobot:'3%', target:'≤2 jam',
        scoring:'5=≤1 jam; 4=1-2 jam; 3=2-4 jam; 2=4-6 jam; 1=>6 jam', periode:'Bulanan', arah:'rendah' },
      { no:15, nama:'Penyelesaian Pengaduan Kualitas Air', desc:'Persentase keluhan terkait air keruh, bau, atau kotor yang berhasil diselesaikan sesuai SLA (Service Level Agreement).',
        formula:'(Pengaduan Kualitas Air Diselesaikan Sesuai SLA / Total Pengaduan Kualitas Air) × 100%', satuan:'%', bobot:'2%', target:'100%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Bulanan', arah:'tinggi' },
      { no:16, nama:'Waktu Penyelesaian Keluhan (Average Resolution Time)', desc:'Rata-rata waktu yang dibutuhkan untuk menyelesaikan satu keluhan pelanggan secara fisik.',
        formula:'Total waktu penyelesaian semua keluhan / Jumlah keluhan diselesaikan', satuan:'Jam', bobot:'2%', target:'≤24 jam',
        scoring:'5=≤8 jam; 4=8-24 jam; 3=24-48 jam; 2=48-72 jam; 1=>72 jam', periode:'Bulanan', arah:'rendah' },
      { no:17, nama:'Cakupan Pelayanan (Service Coverage)', desc:'Persentase penduduk dalam wilayah konsesi yang telah memperoleh akses layanan air PERUMDA Tirta Rangga.',
        formula:'(Jumlah Penduduk Terlayani / Total Penduduk Wilayah Konsesi) × 100%', satuan:'%', bobot:'2%', target:'≥80%',
        scoring:'5=≥90%; 4=80-89%; 3=70-79%; 2=60-69%; 1=<60%', periode:'Tahunan', arah:'tinggi' },
      { no:18, nama:'Pertumbuhan Jumlah Pelanggan Baru', desc:'Jumlah sambungan rumah (SR) baru yang berhasil dipasang dalam periode tertentu.',
        formula:'Jumlah SR baru terpasang dalam periode', satuan:'SR/bulan', bobot:'2%', target:'≥50 SR/bln',
        scoring:'5=≥100 SR; 4=75-99 SR; 3=50-74 SR; 2=25-49 SR; 1=<25 SR', periode:'Bulanan', arah:'tinggi' },
      { no:19, nama:'Waktu Pemasangan SR Baru (Time to Connect)', desc:'Rata-rata waktu yang dibutuhkan sejak permohonan SR baru disetujui hingga air mengalir.',
        formula:'Total hari proses seluruh SR baru / Jumlah SR baru dipasang', satuan:'Hari', bobot:'1%', target:'≤10 hari',
        scoring:'5=≤5 hari; 4=6-10 hari; 3=11-15 hari; 2=16-20 hari; 1=>20 hari', periode:'Bulanan', arah:'rendah' },
      { no:20, nama:'Net Promoter Score (NPS)', desc:'Mengukur loyalitas pelanggan - seberapa besar kemungkinan pelanggan merekomendasikan layanan PERUMDA Tirta Rangga.',
        formula:'% Promoter - % Detractor', satuan:'Skor', bobot:'1%', target:'≥40',
        scoring:'5=≥60; 4=40-59; 3=20-39; 2=0-19; 1=<0', periode:'Tahunan', arah:'tinggi' },
      { no:21, nama:'Jumlah Pelanggan Aktif vs. Target', desc:'Membandingkan total pelanggan aktif terhadap target yang ditetapkan dalam RKAP.',
        formula:'(Jumlah Pelanggan Aktif / Target Pelanggan) × 100%', satuan:'%', bobot:'1%', target:'≥100%',
        scoring:'5=≥105%; 4=100-104%; 3=90-99%; 2=80-89%; 1=<80%', periode:'Triwulanan', arah:'tinggi' },
      { no:57, nama:'Ketepatan Waktu Baca Meter', desc:'Persentase meter air yang berhasil dibaca tepat pada jadwal yang telah ditetapkan.',
        formula:'(Meter Terbaca Tepat Waktu / Total Meter Aktif) × 100%', satuan:'%', bobot:'1%', target:'≥98%',
        scoring:'5=100%; 4=98-99%; 3=95-97%; 2=90-94%; 1=<90%', periode:'Bulanan', arah:'tinggi' },
      { no:58, nama:'Akurasi Tagihan Rekening (Zero Billing Error)', desc:'Persentase tagihan rekening air yang diterbitkan tanpa kesalahan dan tidak memerlukan koreksi.',
        formula:'(Tagihan Tanpa Koreksi / Total Tagihan Diterbitkan) × 100%', satuan:'%', bobot:'1%', target:'≥99%',
        scoring:'5=100%; 4=99-99.9%; 3=97-98.9%; 2=95-96.9%; 1=<95%', periode:'Bulanan', arah:'tinggi' },
      { no:59, nama:'Tingkat Keluhan per 1000 Sambungan Rumah', desc:'Jumlah pengaduan yang masuk per 1000 SR aktif sebagai ukuran kualitas layanan secara keseluruhan.',
        formula:'(Total Keluhan / SR Aktif) × 1000', satuan:'Keluhan', bobot:'1%', target:'≤5 keluhan/1000 SR',
        scoring:'5=≤2; 4=3-5; 3=6-10; 2=11-15; 1=>15', periode:'Bulanan', arah:'rendah' }
    ]
  },
  {
    id: 'operasional', label: 'Operasional & Teknis', bobot: '25%',
    color: '#f97316', colorLight: '#f9731620', dotClass: 'dot-orange',
    kpi: [
      { no:22, nama:'Non-Revenue Water (NRW)', desc:'Persentase air diproduksi yang tidak menghasilkan pendapatan.',
        formula:'((Air Diproduksi - Air Berekening) / Air Diproduksi) × 100%', satuan:'%', bobot:'3%', target:'≤20%',
        scoring:'5=≤15%; 4=15-20%; 3=20-25%; 2=25-30%; 1=>30%', periode:'Bulanan', arah:'rendah' },
      { no:23, nama:'Kualitas Air - Kepatuhan Baku Mutu', desc:'Persentase sampel uji air yang memenuhi standar Permenkes.',
        formula:'(Sampel Lulus Uji / Total Sampel Diuji) × 100%', satuan:'%', bobot:'2%', target:'100%',
        scoring:'5=100%; 4=98-99%; 3=95-97%; 2=90-94%; 1=<90%', periode:'Bulanan', arah:'tinggi' },
      { no:24, nama:'Efisiensi Produksi', desc:'Rasio volume air yang berhasil didistribusikan ke jaringan terhadap kapasitas produksi.',
        formula:'(Volume Air Produksi Aktual / Kapasitas Produksi Terpasang) × 100%', satuan:'%', bobot:'2%', target:'≥85%',
        scoring:'5=≥95%; 4=85-94%; 3=75-84%; 2=65-74%; 1=<65%', periode:'Bulanan', arah:'tinggi' },
      { no:25, nama:'Ketersediaan Pompa & Peralatan Utama', desc:'Persentase waktu pompa beroperasi normal dibandingkan waktu operasional yang direncanakan.',
        formula:'((Waktu Rencana - Downtime) / Waktu Rencana) × 100%', satuan:'%', bobot:'1%', target:'≥95%',
        scoring:'5=≥98%; 4=95-97%; 3=90-94%; 2=85-89%; 1=<85%', periode:'Bulanan', arah:'tinggi' },
      { no:26, nama:'MTTR Kebocoran Pipa', desc:'Rata-rata waktu perbaikan laporan kebocoran pipa utama.',
        formula:'Total jam perbaikan / Jumlah kasus kebocoran', satuan:'Jam', bobot:'1%', target:'≤4 jam',
        scoring:'5=≤2 jam; 4=2-4 jam; 3=4-6 jam; 2=6-12 jam; 1=>12 jam', periode:'Bulanan', arah:'rendah' },
      { no:27, nama:'Tingkat Akurasi Meteran', desc:'Persentase meter air yang berfungsi dengan baik dan akurat.',
        formula:'(Meter Akurat / Total Meter) × 100%', satuan:'%', bobot:'2%', target:'≥95%',
        scoring:'5=≥98%; 4=95-97%; 3=90-94%; 2=85-89%; 1=<85%', periode:'Triwulanan', arah:'tinggi' },
      { no:28, nama:'Frekuensi Gangguan Distribusi', desc:'Jumlah gangguan tidak terencana per 100 SR.',
        formula:'(Jumlah Gangguan / SR Aktif) × 100', satuan:'Kasus', bobot:'1%', target:'≤2 kasus',
        scoring:'5=≤0.5; 4=0.6-2; 3=2.1-4; 2=4.1-6; 1=>6', periode:'Bulanan', arah:'rendah' },
      { no:29, nama:'Tekanan Air Minimum di Ujung Jaringan', desc:'Tekanan air minimum di titik kritis jaringan distribusi.',
        formula:'Tekanan terukur rata-rata', satuan:'Bar', bobot:'1%', target:'≥1.0 Bar',
        scoring:'5=≥1.5; 4=1.0-1.4; 3=0.7-0.9; 2=0.5-0.6; 1=<0.5', periode:'Bulanan', arah:'tinggi' },
      { no:30, nama:'Realisasi Pemeliharaan Rutin', desc:'Persentase program preventive maintenance yang terlaksana.',
        formula:'(PM Terlaksana / PM Rencana) × 100%', satuan:'%', bobot:'1%', target:'≥90%',
        scoring:'5=≥95%; 4=90-94%; 3=80-89%; 2=70-79%; 1=<70%', periode:'Triwulanan', arah:'tinggi' },
      { no:31, nama:'Cakupan Sampel Air', desc:'Persentase titik uji kualitas air yang sudah tercakup.',
        formula:'(Titik Tercakup / Total Wajib) × 100%', satuan:'%', bobot:'1%', target:'100%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Bulanan', arah:'tinggi' },
      { no:32, nama:'Efektivitas Penggunaan Bahan Kimia', desc:'Ketepatan dosis bahan kimia dibandingkan standar.',
        formula:'(Aktual / Standar) × 100%', satuan:'%', bobot:'1%', target:'95-105%',
        scoring:'5=98-102%; 4=95-97% atau 103-105%; 3=90-94%; 2=85-89%; 1=<85% atau >115%', periode:'Bulanan', arah:'range' },
      { no:33, nama:'Penurunan Kasus Kerusakan Pipa', desc:'Persentase penurunan kerusakan pipa vs tahun lalu.',
        formula:'((Tahun Lalu - Tahun Ini) / Tahun Lalu) × 100%', satuan:'%', bobot:'1%', target:'≥10% turun',
        scoring:'5=≥20%; 4=10-19%; 3=0-9%; 2=-9 s.d -1%; 1=<-10% (naik)', periode:'Tahunan', arah:'tinggi' },
      { no:34, nama:'Kepatuhan Laporan Operasional', desc:'Ketepatan waktu laporan operasional.',
        formula:'(Laporan Tepat Waktu / Total Laporan) × 100%', satuan:'%', bobot:'1%', target:'100%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Bulanan', arah:'tinggi' },
      { no:35, nama:'Realisasi Penggantian Meter Air Usang', desc:'Persentase meter air berusia di atas batas toleransi (>5 tahun) yang diganti.',
        formula:'(Meter Diganti / Target Meter Usang) × 100%', satuan:'%', bobot:'1%', target:'≥20%',
        scoring:'5=≥25%; 4=20-24%; 3=15-19%; 2=10-14%; 1=<10%', periode:'Tahunan', arah:'tinggi' },
      { no:36, nama:'Kualitas Air Jaringan Distribusi (Sisa Klorin)', desc:'Pemenuhan standar sisa klorin di ujung jaringan.',
        formula:'Rata-rata sisa klorin', satuan:'mg/L', bobot:'1%', target:'≥0.2 mg/L',
        scoring:'5=≥0.5; 4=0.2-0.49; 3=0.1-0.19; 2=0.01-0.09; 1=0', periode:'Bulanan', arah:'tinggi' },
      { no:37, nama:'Waktu Pemulihan Aliran Air (Recovery Time)', desc:'Waktu yang dibutuhkan aliran air kembali normal setelah pipa diperbaiki.',
        formula:'Total jam pemulihan / jumlah perbaikan', satuan:'Jam', bobot:'1%', target:'≤6 Jam',
        scoring:'5=≤2 jam; 4=3-6 jam; 3=7-12 jam; 2=13-24 jam; 1=>24 jam', periode:'Bulanan', arah:'rendah' },
      { no:60, nama:'Efisiensi Penggunaan Air Baku (Source Utilization)', desc:'Perbandingan volume air yang berhasil diolah terhadap total air baku yang diambil dari sumber.',
        formula:'(Volume Air Diolah / Volume Air Baku Diambil) × 100%', satuan:'%', bobot:'1%', target:'≥92%',
        scoring:'5=≥97%; 4=92-96%; 3=87-91%; 2=80-86%; 1=<80%', periode:'Bulanan', arah:'tinggi' },
      { no:61, nama:'Pengelolaan Lumpur & Backwash WTP', desc:'Persentase volume lumpur/backwash dari proses WTP yang berhasil dikelola sesuai standar lingkungan.',
        formula:'(Volume Lumpur Terkelola / Total Volume Lumpur) × 100%', satuan:'%', bobot:'1%', target:'≥80%',
        scoring:'5=100%; 4=80-99%; 3=60-79%; 2=40-59%; 1=<40%', periode:'Bulanan', arah:'tinggi' },
      { no:62, nama:'Realisasi Flushing Jaringan Distribusi', desc:'Persentase titik flushing yang terlaksana dari total titik yang direncanakan dalam program pemeliharaan.',
        formula:'(Titik Flushing Terlaksana / Target Titik Flushing) × 100%', satuan:'%', bobot:'1%', target:'≥90%',
        scoring:'5=100%; 4=90-99%; 3=80-89%; 2=70-79%; 1=<70%', periode:'Triwulanan', arah:'tinggi' },
      { no:63, nama:'Deteksi & Peta Kebocoran Aktif (Leak Survey)', desc:'Persentase panjang pipa yang telah disurvei deteksi kebocoran menggunakan alat ukur dibandingkan rencana.',
        formula:'(Panjang Pipa Disurvei / Target Pipa Disurvei) × 100%', satuan:'%', bobot:'1%', target:'≥85%',
        scoring:'5=≥95%; 4=85-94%; 3=70-84%; 2=55-69%; 1=<55%', periode:'Tahunan', arah:'tinggi' }
    ]
  },
  {
    id: 'sdm', label: 'SDM & Organisasi', bobot: '12%',
    color: '#8b5cf6', colorLight: '#8b5cf620', dotClass: 'dot-purple',
    kpi: [
      { no:38, nama:'Tingkat Kehadiran Karyawan (Attendance Rate)', desc:'Persentase hari kerja efektif karyawan yang hadir.',
        formula:'(Hari Hadir / Hari Dijadwalkan) × 100%', satuan:'%', bobot:'1%', target:'≥97%',
        scoring:'5=≥99%; 4=97-98.9%; 3=94-96.9%; 2=90-93.9%; 1=<90%', periode:'Bulanan', arah:'tinggi' },
      { no:39, nama:'Realisasi Jam Pelatihan per Karyawan', desc:'Jumlah jam pelatihan yang diikuti per karyawan per tahun.',
        formula:'Total jam pelatihan / jumlah karyawan', satuan:'Jam', bobot:'1%', target:'≥40 jam',
        scoring:'5=≥60; 4=40-59; 3=25-39; 2=15-24; 1=<15', periode:'Tahunan', arah:'tinggi' },
      { no:40, nama:'Pencapaian Target Individu', desc:'Rata-rata pencapaian KPI individu seluruh staf.',
        formula:'Rata-rata % pencapaian individu', satuan:'%', bobot:'1%', target:'≥90%',
        scoring:'5=≥100%; 4=90-99%; 3=75-89%; 2=60-74%; 1=<60%', periode:'Triwulanan', arah:'tinggi' },
      { no:41, nama:'Indeks Disiplin Kerja', desc:'Mengukur kepatuhan karyawan terhadap peraturan perusahaan.',
        formula:'100 - Skor pelanggaran', satuan:'Skor', bobot:'1%', target:'≥90',
        scoring:'5=95-100; 4=90-94; 3=80-89; 2=70-79; 1=<70', periode:'Triwulanan', arah:'tinggi' },
      { no:42, nama:'Tingkat Turnover Karyawan', desc:'Persentase karyawan yang mengundurkan diri sukarela.',
        formula:'(Karyawan Resign / Total Karyawan) × 100%', satuan:'%', bobot:'1%', target:'≤5%',
        scoring:'5=≤2%; 4=3-5%; 3=6-8%; 2=9-12%; 1=>12%', periode:'Tahunan', arah:'rendah' },
      { no:43, nama:'Indeks Kepuasan Karyawan (eNPS)', desc:'Survei tingkat keterlibatan karyawan.',
        formula:'Skor survei eNPS (0-100)', satuan:'Skor', bobot:'1%', target:'≥70',
        scoring:'5=≥85; 4=70-84; 3=55-69; 2=40-54; 1=<40', periode:'Tahunan', arah:'tinggi' },
      { no:44, nama:'Sertifikasi & Kompetensi Teknis', desc:'Persentase karyawan dengan sertifikasi relevan aktif.',
        formula:'(Karyawan Tersertifikasi / Karyawan Teknis) × 100%', satuan:'%', bobot:'1%', target:'≥80%',
        scoring:'5=≥90%; 4=80-89%; 3=70-79%; 2=60-69%; 1=<60%', periode:'Tahunan', arah:'tinggi' },
      { no:45, nama:'Zero Accident (K3)', desc:'Jumlah kecelakaan kerja yang menghilangkan jam kerja (Lost Time Injury).',
        formula:'Jumlah insiden', satuan:'Insiden', bobot:'1%', target:'0',
        scoring:'5=0; 4=1 (minor); 3=2 (minor); 2=1 (mayor); 1=>1 (mayor)', periode:'Tahunan', arah:'rendah' },
      { no:46, nama:'Rasio Pegawai per 1000 Pelanggan', desc:'Efektivitas jumlah pegawai dibandingkan jumlah pelanggan.',
        formula:'(Jumlah Pegawai / (Jumlah Pelanggan / 1000))', satuan:'Rasio', bobot:'1%', target:'≤6.0',
        scoring:'5=≤4.0; 4=4.1-6.0; 3=6.1-8.0; 2=8.1-10.0; 1=>10.0', periode:'Tahunan', arah:'rendah' },
      { no:64, nama:'Realisasi Rekrutmen Sesuai Kebutuhan', desc:'Persentase posisi yang kosong/dibutuhkan berhasil diisi sesuai target waktu dan kualifikasi.',
        formula:'(Posisi Terisi / Posisi Dibutuhkan) × 100%', satuan:'%', bobot:'1%', target:'100%',
        scoring:'5=100%; 4=90-99%; 3=75-89%; 2=60-74%; 1=<60%', periode:'Tahunan', arah:'tinggi' },
      { no:65, nama:'Ketepatan Pelaksanaan Penilaian Kinerja', desc:'Persentase karyawan yang mendapat penilaian kinerja formal sesuai jadwal yang ditetapkan.',
        formula:'(Penilaian Tepat Waktu / Total Karyawan) × 100%', satuan:'%', bobot:'1%', target:'100%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=70-84%; 1=<70%', periode:'Tahunan', arah:'tinggi' },
      { no:66, nama:'Indeks Budaya & Nilai Perusahaan', desc:'Skor asesmen penerapan nilai-nilai dan budaya perusahaan oleh seluruh karyawan.',
        formula:'Rata-rata skor asesmen budaya perusahaan (0-100)', satuan:'Skor', bobot:'1%', target:'≥75',
        scoring:'5=≥90; 4=75-89; 3=60-74; 2=45-59; 1=<45', periode:'Tahunan', arah:'tinggi' }
    ]
  },
  {
    id: 'inovasi', label: 'Inovasi & Keberlanjutan', bobot: '8%',
    color: '#14b8a6', colorLight: '#14b8a620', dotClass: 'dot-teal',
    kpi: [
      { no:47, nama:'Implementasi Digitalisasi Layanan', desc:'Tingkat adopsi sistem digital (SCADA, e-payment, app).',
        formula:'(Sistem Aktif / Target Roadmap) × 100%', satuan:'%', bobot:'1%', target:'≥80%',
        scoring:'5=≥100%; 4=80-99%; 3=60-79%; 2=40-59%; 1=<40%', periode:'Tahunan', arah:'tinggi' },
      { no:48, nama:'Jumlah Inovasi / Perbaikan Proses', desc:'Proyek efisiensi yang diimplementasikan.',
        formula:'Jumlah inovasi', satuan:'Inovasi', bobot:'1%', target:'≥2',
        scoring:'5=≥5; 4=3-4; 3=2; 2=1; 1=0', periode:'Tahunan', arah:'tinggi' },
      { no:49, nama:'Kepatuhan Regulasi & Perizinan', desc:'Pemenuhan izin teknis dan legal tepat waktu.',
        formula:'(Kewajiban Terpenuhi / Total Wajib) × 100%', satuan:'%', bobot:'1%', target:'100%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Triwulanan', arah:'tinggi' },
      { no:50, nama:'Pengurangan Jejak Lingkungan', desc:'Pencapaian target penurunan emisi atau pengelolaan limbah.',
        formula:'(Realisasi / Target) × 100%', satuan:'%', bobot:'1%', target:'≥90%',
        scoring:'5=≥100%; 4=90-99%; 3=80-89%; 2=70-79%; 1=<70%', periode:'Tahunan', arah:'tinggi' },
      { no:51, nama:'Program CSR & Pemberdayaan Masyarakat', desc:'Realisasi program tanggung jawab sosial.',
        formula:'(CSR Terlaksana / CSR Direncanakan) × 100%', satuan:'%', bobot:'1%', target:'≥90%',
        scoring:'5=≥100%; 4=90-99%; 3=75-89%; 2=60-74%; 1=<60%', periode:'Tahunan', arah:'tinggi' },
      { no:52, nama:'Penyelesaian Temuan Audit (BPKP/KAP)', desc:'Tindak lanjut temuan auditor eksternal maupun internal.',
        formula:'(Temuan Diselesaikan / Total Temuan) × 100%', satuan:'%', bobot:'1%', target:'100%',
        scoring:'5=100%; 4=95-99%; 3=85-94%; 2=75-84%; 1=<75%', periode:'Tahunan', arah:'tinggi' },
      { no:53, nama:'Indeks Tata Kelola Perusahaan (GCG)', desc:'Skor pemenuhan standar Good Corporate Governance.',
        formula:'Skor Asesmen GCG', satuan:'Skor', bobot:'1%', target:'≥85',
        scoring:'5=≥90; 4=85-89.9; 3=75-84.9; 2=60-74.9; 1=<60', periode:'Tahunan', arah:'tinggi' },
      { no:67, nama:'Ketersediaan Data Kinerja Digital Real-Time', desc:'Persentase indikator KPI perusahaan yang data realisasinya tersedia secara digital dan dapat diakses secara real-time.',
        formula:'(KPI Terekam Digital / Total KPI Wajib) × 100%', satuan:'%', bobot:'1%', target:'≥80%',
        scoring:'5=100%; 4=80-99%; 3=60-79%; 2=40-59%; 1=<40%', periode:'Triwulanan', arah:'tinggi' }
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



// ─── DATE ─────────────────────────────────────────────────────
function initDate() {
  const d = new Date();
  document.getElementById('currentDate').textContent =
    d.toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' });
  document.getElementById('tglPenilaian').value = d.toISOString().split('T')[0];
  document.getElementById('tglValidasi').value = d.toISOString().split('T')[0];
}

// ─── NAVIGATION ───────────────────────────────────────────────
const PAGES = { dashboard:'Dashboard Monitoring KPI', form:'Form Penilaian KPI', 'kpi-list':'Daftar KPI Lengkap', monitoring:'Monitoring Kinerja', riwayat:'Riwayat Penilaian KPI', panduan:'Panduan Penggunaan' };

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
  const notifPanel = document.querySelector('.notif-panel');
  if (notifPanel) notifPanel.remove();
  closeSidebar();
  if (pageId === 'dashboard') { refreshDashboardCharts(); updateQuickStats(); }
  if (pageId === 'monitoring') refreshMonitoringCharts();
  if (pageId === 'riwayat') buildRiwayatPage();
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
  plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, boxWidth: 10, padding: 14 } } }
};
const GRID_COLOR = 'rgba(0,212,255,0.06)';
const TICK_COLOR = '#475569';

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
        x: { ticks:{ color:TICK_COLOR }, grid:{ color:GRID_COLOR } },
        y: { min:2.5, max:5, ticks:{ color:TICK_COLOR }, grid:{ color:GRID_COLOR } }
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
          ticks:{ color:TICK_COLOR, stepSize:1, backdropColor:'transparent' },
          grid:{ color:'rgba(0,212,255,0.1)' }, angleLines:{ color:'rgba(0,212,255,0.1)' },
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
  const unitBagian = document.getElementById('unitBagian')?.value || '';
  
  const unitMapping = {
    'Teknik & Operasional': ['operasional', 'sdm'],
    'Keuangan & Akuntansi': ['keuangan', 'sdm'],
    'Pelayanan Pelanggan': ['pelanggan', 'sdm'],
    'SDM & Umum': ['sdm', 'inovasi'],
    'Perencanaan & IT': ['inovasi', 'operasional', 'sdm'],
    'Internal Audit': ['keuangan', 'inovasi', 'sdm']
  };
  
  const allowedIds = unitMapping[unitBagian] || ['keuangan', 'pelanggan', 'operasional', 'sdm', 'inovasi'];
  const filteredPerspektif = PERSPEKTIF.filter(p => allowedIds.includes(p.id));
  
  let totalOriginalBobot = 0;
  filteredPerspektif.forEach(p => p.kpi.forEach(k => totalOriginalBobot += parseFloat(k.bobot)));
  const faktorPengali = totalOriginalBobot > 0 ? (100 / totalOriginalBobot) : 1;
  
  let html = '';
  filteredPerspektif.forEach(p => {
    let pOriginalBobot = 0;
    p.kpi.forEach(k => pOriginalBobot += parseFloat(k.bobot));
    const effectivePBobot = (pOriginalBobot * faktorPengali).toFixed(1) + '%';

    html += `<tr class="perspektif-header"><td colspan="9">Perspektif: ${p.label} — Bobot Efektif ${effectivePBobot}</td></tr>`;
    p.kpi.forEach(k => {
      const bobotNum = parseFloat(k.bobot);
      const effectiveBobot = (bobotNum * faktorPengali).toFixed(2);
      
      html += `<tr data-no="${k.no}" data-bobot="${effectiveBobot}">
        <td style="text-align:center;font-weight:700;color:${p.color}">${k.no}</td>
        <td>
          <div style="font-weight:600;font-size:12px;color:#e2e8f0;line-height:1.4">${k.nama}</div>
          <div style="font-size:11px;color:#64748b;margin-top:3px">${k.formula}</div>
        </td>
        <td><span style="font-size:12px;color:#94a3b8">${k.target}</span></td>
        <td><input type="number" step="0.01" placeholder="0" class="realisasi-input" id="r_${k.no}" oninput="calcRow(${k.no})" /></td>
        <td><div class="capai-display" id="capai_${k.no}">—</div></td>
        <td><div class="nilai-display" id="nilai_${k.no}" style="color:#64748b">—</div></td>
        <td><div class="bobot-display" title="Bobot Asli: ${k.bobot}">${effectiveBobot}%</div></td>
        <td><div class="tertimbang-display" id="tert_${k.no}" style="color:#64748b">—</div></td>
        <td><input type="text" placeholder="Bukti/catatan..." id="cat_${k.no}" style="font-size:11px" /></td>
      </tr>`;
    });
  });
  tbody.innerHTML = html;
  filteredPerspektif.forEach(p => p.kpi.forEach(k => calcRow(k.no)));
}

function calcRow(no) {
  const kpi = getAllKpi().find(k => k.no === no);
  if (!kpi) return;
  const realisasiEl = document.getElementById('r_' + no);
  if (!realisasiEl) return;
  const val = parseFloat(realisasiEl.value);
  if (isNaN(val)) {
    document.getElementById('capai_' + no).textContent = '—';
    document.getElementById('nilai_' + no).textContent = '—';
    document.getElementById('nilai_' + no).style.color = TICK_COLOR;
    document.getElementById('tert_' + no).textContent = '—';
    return;
  }
  const capai = calcCapai(kpi, val);
  const nilai = calcNilai(kpi, val);
  
  const tr = document.querySelector(`tr[data-no="${no}"]`);
  const effectiveBobot = tr ? parseFloat(tr.getAttribute('data-bobot')) : parseFloat(kpi.bobot);
  
  const tert = ((nilai * effectiveBobot) / 100).toFixed(2);
  
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
  document.getElementById('simpanFormBtn').addEventListener('click', simpanPenilaian);
  document.getElementById('atasan').addEventListener('input', e => {
    document.getElementById('ttdAtasan').textContent = e.target.value || '__________________';
  });
  document.getElementById('unitBagian').addEventListener('change', () => {
    buildFormTable();
    document.getElementById('totalNilai').textContent = '—';
    document.getElementById('predikatKinerja').textContent = 'Belum Dihitung';
    document.getElementById('predikatKinerja').style.color = '#94a3b8';
    document.getElementById('hasilSection').style.display = 'none';
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
  if (count === 0) { showToast('⚠️ Isi minimal satu realisasi KPI terlebih dahulu!', 'warn'); return; }
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
  buildBreakdownSection();
  hasilSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('✓ Perhitungan KPI selesai! Total: ' + rounded);
}

function getPredikat(score) {
  if (score >= 4.5) return { label:'â­ SANGAT BAIK', color:'#22c55e', desc:'Kinerja melampaui target secara konsisten. Karyawan layak dipertimbangkan untuk promosi atau penghargaan.' };
  if (score >= 3.5) return { label:'✅ BAIK', color:'#84cc16', desc:'Kinerja memenuhi dan umumnya melampaui target. Lanjutkan program pengembangan yang ada.' };
  if (score >= 2.5) return { label:'🔵 CUKUP', color:'#eab308', desc:'Kinerja memenuhi ekspektasi minimum. Perlu program coaching dan action plan perbaikan.' };
  if (score >= 1.5) return { label:'⚠️ KURANG', color:'#f97316', desc:'Kinerja di bawah ekspektasi. Perlu program pembinaan intensif dan monitoring ketat.' };
  return { label:'âŒ SANGAT KURANG', color:'#ef4444', desc:'Kinerja sangat jauh dari target. Perlu evaluasi menyeluruh termasuk kemungkinan mutasi atau sanksi.' };
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
    el.style.color = TICK_COLOR;
  });
  document.getElementById('totalNilai').textContent = '—';
  document.getElementById('predikatKinerja').textContent = '—';
  document.getElementById('hasilSection').style.display = 'none';
  const bs = document.getElementById('breakdownSection');
  if (bs) bs.style.display = 'none';
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
          <span class="kpi-meta-item">📏 ${k.satuan}</span>
          <span class="kpi-meta-item">🎯 ${k.target}</span>
          <span class="kpi-meta-item">📆 ${k.periode}</span>
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
      <td><span class="status-badge ${allOk?'good':'warning'}">${allOk?'✓ Memenuhi':'⚠️ Perhatian'}</span></td>
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
    options: { ...CHART_DEFAULTS, scales: { x:{ticks:{color:TICK_COLOR},grid:{color:GRID_COLOR}}, y:{ticks:{color:TICK_COLOR},grid:{color:GRID_COLOR}} } }
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
    options: { ...CHART_DEFAULTS, scales: { x:{ticks:{color:TICK_COLOR},grid:{color:GRID_COLOR}}, y:{min:98,ticks:{color:TICK_COLOR},grid:{color:GRID_COLOR}} } }
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
    options: { ...CHART_DEFAULTS, scales: { x:{ticks:{color:TICK_COLOR},grid:{color:GRID_COLOR}}, y:{min:90,ticks:{color:TICK_COLOR},grid:{color:GRID_COLOR}} } }
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
    options: { ...CHART_DEFAULTS, scales: { x:{ticks:{color:TICK_COLOR},grid:{color:GRID_COLOR}}, y:{min:2.5,max:5,ticks:{color:TICK_COLOR},grid:{color:GRID_COLOR}} } }
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
  document.getElementById('exportCsvBtn')?.addEventListener('click', exportCSV);
  document.getElementById('closeDetailModal')?.addEventListener('click', () => { const m = document.getElementById('detailModal'); if (m) m.style.display = 'none'; });
  document.getElementById('closeDetailModal2')?.addEventListener('click', () => { const m = document.getElementById('detailModal'); if (m) m.style.display = 'none'; });
  document.getElementById('clearRiwayatBtn')?.addEventListener('click', () => {
    if (confirm('Hapus SEMUA riwayat penilaian?')) {
      localStorage.removeItem('kpi_riwayat');
      buildRiwayatPage(); updateRiwayatBadge(); updateQuickStats();
      showToast('✓ Semua riwayat dihapus.');
    }
  });
  document.getElementById('riwayatSearch')?.addEventListener('input', buildRiwayatPage);
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
    showToast('⚠️ Lengkapi semua field data!', 'warn'); return;
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

// ─── LOCALSTORAGE ─────────────────────────────────────────────
function saveMonitoringToStorage() {
  localStorage.setItem('kpi_monitoring', JSON.stringify(monitoringData));
}
function loadFromStorage() {
  const saved = localStorage.getItem('kpi_monitoring');
  if (saved) {
    try {
      const d = JSON.parse(saved);
      if (Array.isArray(d) && d.length) { monitoringData.length = 0; monitoringData.push(...d); }
    } catch(e) {}
  }
}

// ─── EXPORT CSV ───────────────────────────────────────────────
function exportCSV() {
  const header = 'Periode,NRW (%),Kualitas Air (%),Penagihan (%),IKP,Kehadiran (%)';
  const rows = monitoringData.map(d => `${d.periode},${d.nrw},${d.kualitas},${d.penagihan},${d.ikp},${d.kehadiran}`);
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'monitoring_kpi_perumdatrs_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click(); URL.revokeObjectURL(url);
  showToast('📥 Data berhasil diexport ke CSV!');
}

// ─── SIMPAN PENILAIAN ─────────────────────────────────────────
function simpanPenilaian() {
  const nama = document.getElementById('namaKaryawan').value.trim();
  const totalEl = document.getElementById('totalNilai');
  if (!nama) { showToast('⚠️ Isi Nama Karyawan terlebih dahulu!', 'warn'); return; }
  if (totalEl.textContent === '—') { showToast('⚠️ Hitung Nilai terlebih dahulu!', 'warn'); return; }
  const record = {
    id: Date.now(), nama,
    nik: document.getElementById('nikKaryawan').value,
    jabatan: document.getElementById('jabatan').value,
    unit: document.getElementById('unitBagian').value,
    cabang: document.getElementById('cabang')?.value || '',
    atasan: document.getElementById('atasan').value,
    periode: document.getElementById('periodeForm').value,
    tglPenilaian: document.getElementById('tglPenilaian').value,
    total: parseFloat(totalEl.textContent),
    predikat: document.getElementById('predikatKinerja').textContent,
    savedAt: new Date().toISOString(),
    kpiData: getAllKpi().filter(k => document.querySelector(`tr[data-no="${k.no}"]`)).map(k => ({
      no: k.no, nama: k.nama,
      realisasi: document.getElementById('r_' + k.no)?.value || '',
      nilai: document.getElementById('nilai_' + k.no)?.textContent || '—',
      tert: document.getElementById('tert_' + k.no)?.textContent || '—',
      catatan: document.getElementById('cat_' + k.no)?.value || ''
    }))
  };
  const existing = JSON.parse(localStorage.getItem('kpi_riwayat') || '[]');
  existing.unshift(record);
  localStorage.setItem('kpi_riwayat', JSON.stringify(existing));
  updateRiwayatBadge(); updateQuickStats();
  showToast('💾 Penilaian berhasil disimpan ke Riwayat!');
}

// ─── BREAKDOWN PER PERSPEKTIF ─────────────────────────────────
function buildBreakdownSection() {
  const bs = document.getElementById('breakdownSection');
  const grid = document.getElementById('breakdownGrid');
  if (!bs || !grid) return;
  let html = '';
  PERSPEKTIF.forEach(p => {
    let pTotal = 0, pCount = 0;
    let pEffectiveBobot = 0;
    p.kpi.forEach(k => {
      const tEl = document.getElementById('tert_' + k.no);
      if (tEl && tEl.textContent !== '—') { pTotal += parseFloat(tEl.textContent) || 0; pCount++; }
      const tr = document.querySelector(`tr[data-no="${k.no}"]`);
      if (tr) pEffectiveBobot += parseFloat(tr.getAttribute('data-bobot'));
    });
    if (pCount === 0) return;
    const maxPossible = (pEffectiveBobot / 100) * 5;
    const pct = maxPossible > 0 ? Math.min(100, (pTotal / maxPossible) * 100) : 0;
    const ratio = pTotal / maxPossible;
    const color = ratio >= 0.8 ? '#22c55e' : ratio >= 0.5 ? '#eab308' : '#ef4444';
    html += `<div class="breakdown-item" style="border-top-color:${p.color}">
      <div class="breakdown-label" style="color:${p.color}">${p.label}</div>
      <div class="breakdown-score" style="color:${color}">${pTotal.toFixed(2)}</div>
      <div class="breakdown-bar-wrap"><div class="breakdown-bar" style="width:${pct}%;background:${p.color}"></div></div>
      <div class="breakdown-meta">${pCount} KPI diisi · Bobot Efektif ${pEffectiveBobot.toFixed(1)}%</div>
    </div>`;
  });
  grid.innerHTML = html;
  bs.style.display = html ? 'block' : 'none';
}

// ─── RIWAYAT PAGE ─────────────────────────────────────────────
function buildRiwayatPage() {
  const data = JSON.parse(localStorage.getItem('kpi_riwayat') || '[]');
  const q = document.getElementById('riwayatSearch')?.value?.toLowerCase() || '';
  const filtered = q ? data.filter(r => r.nama.toLowerCase().includes(q)) : data;
  const grid = document.getElementById('riwayatGrid');
  const empty = document.getElementById('riwayatEmpty');
  if (!grid) return;
  if (filtered.length === 0) { grid.innerHTML = ''; if (empty) empty.style.display = 'block'; return; }
  if (empty) empty.style.display = 'none';
  const colorMap = { 'SANGAT BAIK':'#22c55e','BAIK':'#84cc16','CUKUP':'#eab308','KURANG':'#f97316','SANGAT KURANG':'#ef4444' };
  grid.innerHTML = filtered.map(r => {
    const color = Object.entries(colorMap).find(([k]) => r.predikat?.includes(k))?.[1] || '#94a3b8';
    const tgl = r.tglPenilaian ? new Date(r.tglPenilaian).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}) : '—';
    const saved = new Date(r.savedAt).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'});
    return `<div class="riwayat-card" style="border-top:3px solid ${color}">
      <div class="riwayat-card-header">
        <div><div class="riwayat-nama">${r.nama}</div><div class="riwayat-nik">NIK: ${r.nik||'—'}</div></div>
        <span class="riwayat-badge" style="background:${color}20;color:${color};border:1px solid ${color}40">${r.predikat||'—'}</span>
      </div>
      <div class="riwayat-meta">
        <span class="riwayat-meta-item">📌 ${r.jabatan||'—'}</span>
        <span class="riwayat-meta-item">🏢 ${r.unit||'—'}</span>
        <span class="riwayat-meta-item">📆 ${r.periode||'—'}</span>
      </div>
      <div class="riwayat-score-row">
        <div class="riwayat-score-big" style="color:${color}">${r.total?.toFixed(2)||'—'}</div>
        <div class="riwayat-score-info">
          <div class="riwayat-predikat" style="color:${color}">${r.predikat||'—'}</div>
          <div class="riwayat-tgl">Dinilai: ${tgl} · Disimpan: ${saved}</div>
        </div>
      </div>
      <div class="riwayat-actions">
        <button class="riwayat-btn" onclick="lihatDetailRiwayat(${r.id})">🔍 Lihat Detail</button>
        <button class="riwayat-btn danger" onclick="hapusRiwayat(${r.id})">🗑 Hapus</button>
      </div>
    </div>`;
  }).join('');
}

function lihatDetailRiwayat(id) {
  const data = JSON.parse(localStorage.getItem('kpi_riwayat') || '[]');
  const r = data.find(x => x.id === id); if (!r) return;
  const colorMap = {'SANGAT BAIK':'#22c55e','BAIK':'#84cc16','CUKUP':'#eab308','KURANG':'#f97316','SANGAT KURANG':'#ef4444'};
  const color = Object.entries(colorMap).find(([k]) => r.predikat?.includes(k))?.[1] || '#94a3b8';
  document.getElementById('detailModalTitle').textContent = 'Detail Penilaian — ' + r.nama;
  let html = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
    <div style="background:var(--bg-dark);border:1px solid var(--border);border-radius:8px;padding:12px"><div style="font-size:11px;color:#64748b">Nama</div><div style="font-weight:700">${r.nama}</div></div>
    <div style="background:var(--bg-dark);border:1px solid var(--border);border-radius:8px;padding:12px"><div style="font-size:11px;color:#64748b">NIK</div><div style="font-weight:700">${r.nik||'—'}</div></div>
    <div style="background:var(--bg-dark);border:1px solid var(--border);border-radius:8px;padding:12px"><div style="font-size:11px;color:#64748b">Jabatan</div><div style="font-weight:700">${r.jabatan||'—'}</div></div>
    <div style="background:var(--bg-dark);border:1px solid var(--border);border-radius:8px;padding:12px"><div style="font-size:11px;color:#64748b">Periode</div><div style="font-weight:700">${r.periode||'—'}</div></div>
  </div>
  <div style="text-align:center;padding:20px;background:var(--bg-dark);border-radius:8px;margin-bottom:16px">
    <div style="font-size:48px;font-weight:900;color:${color}">${r.total?.toFixed(2)||'—'}</div>
    <div style="font-size:16px;font-weight:700;color:${color}">${r.predikat||'—'}</div>
  </div>
  <table class="kpi-table"><thead><tr><th>No</th><th>Indikator KPI</th><th>Realisasi</th><th>Nilai</th><th>Tertimbang</th><th>Catatan</th></tr></thead><tbody>`;
  (r.kpiData||[]).filter(k=>k.realisasi).forEach(k => {
    html += `<tr><td>${k.no}</td><td style="font-size:12px">${k.nama}</td><td>${k.realisasi}</td><td style="font-weight:700">${k.nilai}</td><td>${k.tert}</td><td style="font-size:11px;color:#64748b">${k.catatan||'—'}</td></tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('detailModalBody').innerHTML = html;
  document.getElementById('detailModal').style.display = 'flex';
}

function hapusRiwayat(id) {
  if (!confirm('Hapus data penilaian ini?')) return;
  let data = JSON.parse(localStorage.getItem('kpi_riwayat') || '[]');
  data = data.filter(x => x.id !== id);
  localStorage.setItem('kpi_riwayat', JSON.stringify(data));
  buildRiwayatPage(); updateRiwayatBadge(); updateQuickStats();
  showToast('✓ Data penilaian berhasil dihapus.');
}

function updateRiwayatBadge() {
  const count = JSON.parse(localStorage.getItem('kpi_riwayat') || '[]').length;
  const badge = document.getElementById('riwayatBadge');
  if (badge) badge.textContent = count;
}

function updateQuickStats() {
  const data = JSON.parse(localStorage.getItem('kpi_riwayat') || '[]');
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('qsTotalPenilaian', data.length);
  setEl('qsSangatBaik', data.filter(r => r.total >= 4.5).length);
  setEl('qsBaik', data.filter(r => r.total >= 3.5 && r.total < 4.5).length);
  setEl('qsCukup', data.filter(r => r.total >= 2.5 && r.total < 3.5).length);
  setEl('qsKurang', data.filter(r => r.total < 2.5).length);
  const avg = data.length ? (data.reduce((s,r) => s + r.total, 0) / data.length).toFixed(2) : '—';
  setEl('qsAvgScore', avg);
}

// ─── DARK/LIGHT MODE TOGGLE ───────────────────────────────────
function initModeToggle() {
  const btn = document.getElementById('modeToggleBtn');
  if (!btn) return;
  if (localStorage.getItem('kpi_mode') === 'light') setLightMode(true);
  btn.addEventListener('click', () => setLightMode(!document.body.classList.contains('light-mode')));
}
function setLightMode(on) {
  const icon = document.getElementById('modeIcon');
  if (on) {
    document.body.classList.add('light-mode');
    if (icon) icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
    localStorage.setItem('kpi_mode', 'light');
  } else {
    document.body.classList.remove('light-mode');
    if (icon) icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    localStorage.setItem('kpi_mode', 'dark');
  }
}

// ─── NOTIFIKASI PANEL ─────────────────────────────────────────
const NOTIF_ITEMS = [
  { color:'#ef4444', text:'NRW 23% melebihi target ≤20%. Tindakan segera diperlukan untuk mengurangi kebocoran pipa.', time:'Hari ini' },
  { color:'#f97316', text:'Penyelesaian Keluhan 93% masih di bawah target ≥95%. Tingkatkan respons tim layanan.', time:'Hari ini' },
  { color:'#eab308', text:'Evaluasi Triwulan III dijadwalkan akhir September 2025. Pastikan semua data KPI sudah dikumpulkan.', time:'3 hari lagi' },
  { color:'#0ea5e9', text:'Efisiensi Produksi Q3 mencapai 87%. Pertahankan performa operasional yang sudah membaik.', time:'Minggu ini' },
];
function initNotifPanel() {
  const btn = document.getElementById('notifBtn');
  if (!btn) return;
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const existing = document.querySelector('.notif-panel');
    if (existing) { existing.remove(); return; }
    const panel = document.createElement('div');
    panel.className = 'notif-panel';
    panel.innerHTML = `<div class="notif-panel-header"><span>🔔 Notifikasi KPI</span><span style="font-size:10px;color:#64748b">${NOTIF_ITEMS.length} item</span></div>` +
      NOTIF_ITEMS.map(n => `<div class="notif-item"><div class="notif-dot" style="background:${n.color}"></div><div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div></div>`).join('');
    document.body.appendChild(panel);
    setTimeout(() => document.addEventListener('click', () => { const p = document.querySelector('.notif-panel'); if (p) p.remove(); }, { once:true }), 100);
  });
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
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
  initModeToggle();
  initNotifPanel();
  updateRiwayatBadge();
  updateQuickStats();
});
