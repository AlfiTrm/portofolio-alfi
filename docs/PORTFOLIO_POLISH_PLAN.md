# Skema polish portfolio Alfi

Tanggal: 7 Oktober 2026  
Status: implementasi lokal selesai dan diverifikasi; belum di-deploy.  
Sumber: arahan Alfi dalam percakapan, komponen saat ini, dan dokumen desain proyek.  
Antislop: during, pilihan Alfi untuk sesi ini.

## Tujuan

Membuat portfolio terasa lebih berkesan melalui kedalaman visual, tempo scroll, interaksi yang jelas, dan konten pribadi. Polish mencakup delapan area yang sudah dibahas. Angka animasi di bawah merupakan titik awal tuning, bukan hasil pengujian.

Skema ini tidak menambahkan backend, database, atau sistem CMS. Konten tetap bisa disimpan pada data lokal dan media proyek. Enam foto asli untuk dua titik awal timeline sudah tersedia; kebutuhan media lain dan kontribusi yang belum terkonfirmasi tetap ditandai sebagai kebutuhan konten.

## Kebutuhan pengunjung

1. Sebagai pengunjung, saya ingin cahaya dan bayangan yang konsisten supaya bentuk garis, ring, dan wadah mudah dipahami.
2. Sebagai pengunjung, saya ingin cerita mengikuti scroll saya supaya saya dapat membaca dengan tempo sendiri.
3. Sebagai pengunjung, saya ingin navigasi terbaru langsung menjadi tujuan supaya klik cepat tidak mengantre perjalanan halaman.
4. Sebagai pengunjung, saya ingin kartu terlihat masuk ke wadah supaya adegan Works terasa punya kedalaman.
5. Sebagai pengunjung, saya ingin preview dan teks proyek tetap jelas selama scene berjalan supaya saya dapat menilai karya.
6. Sebagai pengunjung, saya ingin membuka website dari preview proyek supaya aksi utamanya mudah ditemukan.
7. Sebagai pengunjung, saya ingin mengetahui kontribusi Alfi yang spesifik supaya saya memahami perannya pada karya tersebut.
8. Sebagai pengunjung, saya ingin melihat foto di balik ASCII dengan mouse, keyboard, atau touch supaya dokumentasi dapat dinikmati lewat perangkat saya.
9. Sebagai pengunjung, saya ingin Exploring menunjukkan proses belajar yang nyata supaya saya mengenal arah Alfi sekarang.
10. Sebagai pengunjung, saya ingin membuka email atau menyalin alamat dengan feedback yang benar supaya saya dapat menghubungi Alfi.
11. Sebagai pengunjung di layar kecil atau zoom besar, saya ingin seluruh cerita, media, dan kontrol tetap terjangkau supaya komposisi tidak menghambat pembacaan.
12. Sebagai pengunjung dengan reduced motion atau WebGL tidak tersedia, saya ingin konten lengkap melalui tampilan yang lebih sederhana supaya efek tidak menjadi syarat akses.
13. Sebagai pengunjung yang kembali/reload, saya ingin posisi dan keadaan adegan sesuai konteks supaya saya tidak kehilangan bagian yang sedang dilihat.
14. Sebagai pengunjung, saya ingin media dan klaim yang jujur supaya placeholder atau eksplorasi tidak disalahartikan sebagai dokumentasi/hasil yang sudah ada.

## Keputusan yang menjadi baseline

- Urutan halaman: Hero → About → Timeline → Works → Exploring → Contact.
- Hero menjadi acuan: hitam, putih/ivory, foto berwarna, Akira untuk display dan Geist untuk narasi.
- Logo menggunakan aset Alfi yang sudah tersedia. Wordmark masuk ke logo ketika hover atau keluar dari Hero, lalu keluar lagi ketika kembali ke Hero.
- Timeline mengalir bersama halaman; jalurnya besar dan solid. Ring tebal, pas terhadap garis, selalu ada, serta tidak terpotong frame.
- Gambar timeline berupa kotak asimetris yang berada di atas jalur supaya tidak tertutup. Copy singkat, alami, tanpa eyebrow pada tiap milestone.
- Bayangan garis timeline baru disederhanakan menjadi satu shadow; jangan mengembalikan contact shadow terpisah yang terlihat sebagai garis kedua.
- Works memakai wadah grafit fisik. Wadah terlihat sejak awal pada posisi tetap, sedikit di atas komposisi tengah; tidak naik dari bawah atau fade in.
- Ray Works berasal dari bahasa visual ray Hero. Judul WORKS terbuka mengikuti peningkatan cahaya dengan reveal yang sedikit tertunda.
- Kartu proyek kecil dan berulang masuk ke wadah. Opacity penuh selama jatuh.
- Judul dan wadah tetap pinned selama galeri berjalan. Galeri berada di depan scene dan tersusun bergantian kiri/kanan.
- Muka depan wadah solid sehingga menutupi bagian kartu yang sudah masuk. Saat galeri berjalan, judul dan kartu mini meredup, cahaya tinggal tipis.
- Di ujung proyek terakhir, judul, wadah, isi, dan ray menghilang melalui fade. Scene sudah hilang ketika section berikutnya masuk; tidak keluar dengan bergeser ke atas.
- Tidak ada section inspirasi.

## Kondisi kode saat skema dibuat

| Area | Yang sudah ada | Implikasi untuk polish |
| --- | --- | --- |
| Timeline | Three.js, SVG fallback, satu shadow, render berdasarkan visibility/perubahan state | Tuning material dan shadow memakai jalur render yang tersedia. |
| ASCII | Sampling luminance lewat canvas, aktivasi dekat viewport, redraw saat resize, dukungan foto lewat src | Efek sudah tersedia. Tambahkan interaksi dan konten; tidak perlu renderer baru. |
| Works | Scene sticky, progress intro dan progress section, 9 kartu dari 3 sumber, galeri berisi 4 proyek | Rapikan batas fase berdasarkan posisi konten agar tahan perubahan ukuran dan jumlah proyek. |
| Galeri | Hover zoom tipis dan tombol panah menuju live website | Preview belum merupakan tautan. Selaraskan aksi dan feedback seluruh kartu. |
| Navigasi | Lenis, durasi sesuai jarak, hash/history dan penyimpanan posisi scroll | Pertahankan perilaku reload/history saat mengatur perpindahan cepat. |
| Exploring | Empat kartu bidang dengan copy umum dan horizontal scroll | Ubah menjadi presentasi proses belajar yang lebih personal, berdasarkan bukti yang tersedia. |
| Contact | Map, email mailto, socials; sebagian copy masih langsung di komponen | Satukan copy di sumber data dan tambahkan aksi salin email yang nyata. |
| Pengujian | Tes Node membaca source; sebagian timeline masih mengacu komponen lama yang sudah dihapus | Catat baseline. Tes lama tersebut bukan bukti bahwa motion/layout baru benar. |

Belum ada pengukuran baru yang menunjukkan bottleneck utama. Biaya geometry, blur, canvas, dan pembacaan layout merupakan kandidat pemeriksaan, bukan hasil benchmark.

## 1. Cahaya, material, dan bayangan

**Hasil yang dituju:** garis, ring, foto, dan wadah terasa berada dalam ruang yang sama.

- Cahaya utama datang dari atas dengan bias ringan ke kiri; bayangan jatuh ke bawah/kanan. Ray tetap mengikuti komposisi Hero yang disukai.
- Garis memakai badan hitam opak dengan highlight memanjang yang lembut. Bayangan hanya satu, cukup bergeser untuk memberi jarak dari dinding putih.
- Ring lebih reflektif daripada garis, tetapi highlight tidak menjadi putih penuh di seluruh permukaan. Jangan menurunkan opacity badan garis untuk menampilkan ring.
- Tile foto tetap punya shadow solid sesuai arahan Alfi. Shadow diffuse boleh mendukung kedalaman jika tidak terbaca sebagai salinan kedua tile.
- Wadah memakai grafit gelap, highlight bibir yang tipis, dan tekstur permukaan berkontras rendah. Muka depan tetap opak selama fase aktif.
- Saat galeri masuk, kurangi intensitas cahaya pada material wadah untuk meredupkannya. Hindari membuat muka depan tembus pandang sebelum fade keluar.
- Nilai cahaya yang benar-benar dipakai bersama boleh menjadi konfigurasi kecil lintas section. Detail material dan geometry tetap milik feature masing-masing.

**Selesai ketika:** shadow tidak membentuk tepi dobel; gambar tidak terlihat menembus garis; ring utuh; permukaan tidak tampak plastik putih; Hero tetap sesuai komposisi baseline.

## 2. Tempo scroll dan navigasi

**Hasil yang dituju:** motion terasa dramatis sekaligus langsung mengikuti input.

### Fase Works

| Fase | Scene | Kartu | Konten galeri |
| --- | --- | --- | --- |
| Masuk | Kanvas hitam masuk, wadah sudah terlihat | Masih di luar viewport | Belum melintasi scene |
| Cahaya naik | Ray bertambah kuat; WORKS muncul sedikit setelah cahaya mulai terbaca | Jatuh bergiliran setelah adegan terbentuk | Tetap dalam alur scroll |
| Kartu mendarat | Judul dan wadah pinned | Opacity 1, berhenti dalam tumpukan | Mendekati viewport |
| Galeri | Ray sekitar 6–10% dari puncak; judul redup; muka wadah solid | Kartu mini sekitar 15–22% opacity setelah semuanya mendarat | Kartu utama opak, bergantian kiri/kanan |
| Proyek terakhir selesai | Seluruh scene fade serempak | Ikut fade | Proyek terakhir tetap terbaca |
| Keluar | Scene sepenuhnya hilang | Hilang | Exploring mulai masuk |

- Progress diturunkan dari scroll, tanpa timer yang memaksa pengunjung menunggu suatu adegan selesai.
- Awal dimming mengikuti masuknya galeri. Akhir fade mengikuti batas proyek terakhir dan handoff section. Hindari mengandalkan persentase section yang tetap ketika jumlah proyek atau tinggi copy berubah.
- Fade akhir memakai ruang scroll yang cukup singkat untuk tetap terasa menyatu: titik awal tuning sekitar 0.15–0.25 tinggi viewport.
- Saat scroll dibalik, fase mengembalikan pose yang sesuai; tidak memulai ulang kartu dengan posisi acak.
- Klik navigasi terbaru menggantikan tujuan scroll sebelumnya. Wheel/touch pengguna dapat mengambil alih; tidak ada antrean navigasi yang selesai satu per satu.
- Active nav mengikuti section yang benar-benar terlihat. Logo tidak berkedip atau berganti state berulang saat melewati batas Hero.
- Reload, deep link, Back/Forward, dan aturan replay saat kembali ke paling atas tetap mengikuti runtime yang tersedia.
- Reduced motion memakai reveal opacity sederhana, kartu dalam pose mendarat, dan perpindahan native/minimal. Ray juga tipis selama galeri pada mode ini.

**Selesai ketika:** scroll cepat, scroll balik, dan klik Home → Works → About cepat tetap menghasilkan posisi akhir yang benar; tidak ada flash putih, lonjakan layout, atau scene tertinggal di Exploring.

## 3. ASCII dan foto pribadi

**Hasil yang dituju:** gambar menambah cerita tentang Alfi sekaligus mempertahankan tekstur ASCII.

- Gunakan struktur media yang sudah tersedia: identitas stabil, sumber foto opsional, alt yang sesuai, dan artwork fallback.
- Pilihan awal 2–3 foto per milestone: satu gambar utama dan satu/dua pendamping, tetap berbentuk kotak dan asimetris.
- Foto yang cocok: kegiatan kuliah, proses membangun antarmuka, kerja organisasi, atau dokumentasi kompetisi yang benar-benar dimiliki Alfi. Jangan menciptakan foto seolah menjadi dokumentasi kejadian nyata.
- Default foto tampil sebagai ASCII. Hover desktop dan focus keyboard membuka foto grayscale melalui crossfade sekitar 250–400 ms. Samakan crop foto dan hasil ASCII; tile harus berada di atas jalur agar gambar tidak tertutup.
- Pada touch, sediakan kontrol toggle yang jelas untuk melihat foto/ascii. Jangan memakai hover sebagai satu-satunya cara mengakses foto.
- Media dengan sumber asli memakai semantics kontrol yang sesuai. Placeholder tidak memiliki aksi palsu untuk membuka foto yang belum ada.
- Sampling ASCII dilakukan setelah sumber siap/dekat viewport, lalu digunakan kembali. Hover hanya mengganti opacity; tidak menghitung glyph setiap frame.
- Alt menjelaskan isi foto; canvas tetap dekoratif. Jika sumber gagal, tampilkan fallback yang jujur.

**Selesai ketika:** foto dan ASCII memiliki crop yang sama tanpa loncat ukuran; reveal bisa dipakai dengan mouse, keyboard, dan touch; tile tidak tertutup jalur; render tidak berjalan terus ketika gambar diam.

**Kebutuhan konten:** tiga foto dari masing-masing folder `public/img/timeline/start`, `semfour`, `kbm`, dan `compe` sudah dipasang pada empat milestone yang sesuai. Milestone terakhir masih memakai 3 tile ASCII placeholder sampai tersedia foto yang cocok.

## 4. Kartu jatuh dan pendaratan

**Hasil yang dituju:** mini preview terasa seperti cetakan kertas yang masuk ke wadah.

- Pertahankan jumlah awal 9 kartu dan pengulangan 3 proyek. Susunan akhir mengikuti posisi deterministic berdasarkan id/index, bukan random saat render.
- Kartu kecil memakai frame kertas netral, ketebalan tipis, dan shadow ringan. Screenshot tetap jelas, tidak dibuat transparan selama jatuh.
- Satu kartu memimpin lalu kartu berikutnya menyusul dengan stagger berbasis scroll. Variasi tilt dan drift cukup kecil untuk menambah berat tanpa membuat gerak berantakan.
- Beri satu koreksi tilt kecil ketika mendarat; tidak ada bounce berulang. Pada reduced motion, tampilkan tumpukan akhir.
- Bagian kartu di atas mulut wadah masih terlihat. Bagian yang masuk di bawah muka depan tertutup oleh permukaan opak.
- Occlusion mengikuti silhouette wadah, bukan clipping seluruh area wadah yang juga memotong kartu saat masih di udara.
- Tumpukan punya variasi tinggi dan rotasi, tidak membentuk pagar preview yang seragam.
- Dimming gallery terjadi setelah pendaratan, bukan di tengah lintasan.
- Gunakan transform yang ada; tidak perlu physics engine atau WebGL scene tambahan untuk kertas.

**Selesai ketika:** tidak ada kartu muncul menembus muka wadah, terpotong saat masih di udara, atau berubah pose setelah reload/scroll balik; foto tetap opacity penuh saat jatuh.

## 5. Galeri proyek dan aksi

**Hasil yang dituju:** karya mudah dilihat, kontribusi Alfi jelas, dan area yang bisa diklik terbaca.

- Pertahankan list bergantian kiri/kanan, judul yang sekarang lebih kecil, dan variasi lebar yang disengaja. Gunakan beberapa pola stabil, bukan random setiap kunjungan.
- Jadikan preview, judul, dan panah satu tujuan interaktif menuju live website ketika URL tersedia. Susun dengan tautan semantik tanpa nested link atau tombol panah yang menumpuk di dalam link.
- Hover/focus menggerakkan preview sedikit, menaikkan kontras judul/frame, dan menggeser panah sekitar 2–4 px. Titik awal durasi 250–400 ms; jangan menambah efek cursor custom.
- Reduced motion mempertahankan feedback warna/focus tanpa zoom atau perpindahan.
- Tiap proyek menampilkan judul, periode, dan satu kalimat kontribusi yang spesifik. Hasil/angka hanya ditambahkan jika terkonfirmasi.
- Preview mempertahankan rasio dan tidak menghilangkan bagian penting screenshot. Sesuaikan sizes image dengan lebar nyata kartu, termasuk kartu desktop terbesar.
- URL tidak tersedia berarti kartu statis tanpa panah/aksi palsu. Destination tab baru diumumkan pada nama aksesibel.

**Selesai ketika:** seluruh area yang tampil interaktif memiliki aksi; proyek dapat dibuka dengan keyboard; judul tidak pecah di tengah kata; copy tetap terbaca saat melintasi scene pinned.

**Kebutuhan konten:** gunakan focus yang sudah ada sebagai baseline. Klaim dari description lama perlu dicocokkan dengan kontribusi Alfi sebelum ditampilkan sebagai copy baru; jangan otomatis memakai semua klaim tersebut.

## 6. Exploring yang lebih personal

**Hasil yang dituju:** pengunjung melihat proses belajar Alfi, bukan hanya daftar nama bidang.

- Arahan terbaru Alfi: kembalikan tampilan sebelumnya, yaitu empat kartu horizontal dengan snap dan aksen hover.
- Pertahankan label dan copy empat kartu versi sebelumnya; jangan mengganti dengan catatan editorial tiga blok.
- Exploring tetap setelah Works dan mempertahankan latar/transisi yang sudah dipakai.
- Data eksperimen personal baru boleh ditambahkan jika Alfi memberikan artefak dan copy-nya.

**Selesai ketika:** empat kartu lama kembali, snap horizontal berfungsi, dan scroll halaman tidak melebar ke samping.

**Kebutuhan konten:** copy kartu lama dipertahankan sampai Alfi memberi arahan untuk memperbaruinya.

## 7. Contact dan penutup

**Hasil yang dituju:** halaman berakhir dengan ajakan yang sederhana dan aksi email yang jelas.

- Pertahankan map dan email sebagai komposisi utama; arahkan perhatian ke email melalui kontras dan ruang, bukan tambahan dekorasi.
- Satukan title dan copy di contactData agar komponen tidak memakai versi teks yang berbeda.
- Usulan copy awal: “Have a project in mind?” diikuti ajakan singkat mengirim email. Ini merupakan draft, bukan pernyataan availability baru.
- Aksi utama email membuka mailto. Tambahkan aksi terpisah untuk salin alamat dengan label/ikon yang jelas.
- Setelah salin sukses, tampilkan feedback singkat dan live announcement. Jika Clipboard API gagal, alamat tetap dapat dipilih dan disalin manual; jangan memberi feedback sukses palsu.
- Hover/focus panah dan tautan sosial memakai tempo interaksi yang konsisten dengan galeri.
- Domain email, socials, dan copyright tidak bertabrakan pada viewport pendek atau narrow screen.

**Selesai ketika:** email bisa dibuka/disalin, feedback benar, focus terlihat, dan copy tidak menjanjikan hal yang belum dikonfirmasi.

## 8. Responsif dan performa

**Hasil yang dituju:** komposisi dan interaksi tetap berkesan pada ukuran layar/perangkat berbeda.

### Responsif

- Pemeriksaan minimal: 360×800, 390×844, 768×1024, 1024×768, 1440×900, dan 1920×1080; tambah 320 CSS px, viewport landscape pendek, dan zoom 200%.
- Timeline mobile menggunakan jalur yang disesuaikan dengan kolom baca, ring yang tetap jelas, dan media yang tidak menutup narasi.
- Works mobile memakai judul/wadah lebih kompak dan intro lebih pendek daripada desktop. Galeri tetap berurutan dengan offset kiri/kanan ringan; lebar kartu mengutamakan keterbacaan.
- Tidak ada horizontal overflow akibat ring, logo, judul, atau paper card. Jangan menyembunyikan teks penting untuk menutup overflow.
- Jangan mengandalkan hover untuk aksi penting. Focus, tap target, dan label tetap jelas.
- Reduced motion dan WebGL unavailable tetap menampilkan cerita lengkap, gallery link, dan jalan keluar section.

### Pengukuran dan optimasi

- Ambil baseline production build sebelum tuning: first load Hero, scroll Timeline, masuk/keluar Works, navigasi cepat, serta jumlah render saat diam/offscreen.
- Target proyek: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 pada lingkungan uji yang dicatat. Sasaran scroll mendekati 60 fps pada desktop referensi; angka ini merupakan target, bukan klaim hasil saat ini.
- Kandidat pemeriksaan: geometry jalur/marker, luas layer blur dan filter, sampling/resize canvas ASCII, ukuran media, pembacaan layout saat scroll, dan frame loop aktif.
- Timeline saat ini memakai minimal 1.200 segment longitudinal dan 16 segment radial untuk route dan shadow. Kurangi geometry hanya jika profiling menunjukkan manfaat serta kurva/ring tetap mulus.
- Pertahankan render Three.js berdasarkan kebutuhan dan visibility. Tab tersembunyi/offscreen tidak menjalankan animasi dekoratif; cleanup melepas geometry, material, context, observer, dan RAF.
- ASCII dirender ulang hanya ketika sumber/ukuran relevan berubah. Batasi resolusi sesuai tile, bukan ukuran foto asli.
- Ray mempertahankan bentuk melalui layer yang ada; kurangi luas/blur mahal jika terbukti dominan. Hindari animate filter yang luas ketika opacity/transform sudah cukup.
- Hero boleh memprioritaskan aset utama. Media bawah fold tetap lazy; sesuaikan sizes dengan layout aktual. Jangan preload semua foto/kartu demi menutupi timing yang salah.
- Aktifkan scene sebelum memasuki viewport sesuai kebutuhan, lalu berhenti ketika tidak terlihat. Dynamic import yang tersedia tidak dianggap bukti bahwa seluruh feature baru dimuat saat terlihat.
- Untuk navigasi, pertimbangkan observer/state yang berubah hanya saat perlu jika profiling menunjukkan repeated layout reads sebagai biaya berarti.
- Catat kondisi viewport, browser, perangkat, mode build, dan sebelum/sesudah. HTTP 200 tidak membuktikan kualitas visual atau kelancaran animasi.

**Selesai ketika:** tidak ada regresi layout/interaksi; biaya yang dominan sudah diukur dan ditangani; hasil dicatat dengan bukti. Jangan menyatakan peningkatan persentase tanpa baseline.

## Pembagian modul ketika eksekusi

Pecah berdasarkan tanggung jawab setelah perilaku disetujui, bukan semata jumlah baris:

- TimelineVisualCluster mengatur komposisi; TimelineAsciiTile mengatur sumber, canvas, dan reveal; artwork fallback tetap terpisah dari foto asli.
- WorksDropStage mengatur komposisi; progress scene mengatur fase; ProjectDrop mengatur pose paper; wadah menjadi komponen visual tersendiri jika pemisahan mengurangi kerumitan orkestrasi.
- HeroLightRays tetap dipakai bersama. Jika perlu dipindahkan ke shared, pastikan Hero dan Works benar-benar menjadi consumer dari kontrak yang sama.
- ProjectCard menangani satu kartu dan satu tujuan tautan. projectsData menyimpan fakta/copy.
- Exploring memisahkan data dari layout. Contact menggunakan contactData untuk seluruh teks dan alamat.
- SmoothScroll tetap menjadi pemilik navigasi/restore; hindari membuat runtime scroll kedua.
- Shared config hanya untuk nilai yang mempunyai beberapa consumer. Jangan membuat framework tema/animasi baru untuk satu penggunaan.

## Urutan eksekusi

| Batch | Pekerjaan | Status |
| --- | --- | --- |
| 0 | Snapshot state/viewport, klasifikasi tes lama, daftar aset tersedia | Dilakukan. Baseline performa sebelum perubahan tidak tersedia. |
| 1 | Cahaya/material + tempo/pin/fade + pendaratan kertas | Diimplementasikan dan diverifikasi di browser. |
| 2 | Interaksi ASCII + galeri/link/copy | Diimplementasikan; 12 foto untuk empat milestone pertama sudah dipasang, milestone terakhir masih memakai 3 tile abstrak. |
| 3 | Exploring + Contact | Diimplementasikan dengan copy dari fakta yang tersedia. |
| 4 | Tuning lintas viewport, profiling ulang, fallback/reduced motion, modularisasi akhir | Diimplementasikan dan diverifikasi; snapshot performa bukan perbandingan sebelum/sesudah. |

Responsif, semantics, dan penghematan render dikerjakan pada setiap batch. Batch 4 merupakan review menyeluruh, bukan pertama kali mempertimbangkan mobile.

## Kriteria verifikasi

Gunakan halaman nyata sebagai tempat verifikasi utama. Jangan menguji string nama komponen atau jumlah div sebagai pengganti perilaku.

1. Catat baseline tes Node yang sudah ada. Tes cinematic lama masih membaca komponen yang sudah dihapus dan metadata yang sudah berubah; klasifikasikan sebagai legacy. Jangan mengembalikan desain lama hanya untuk memenuhi assertion tersebut.
2. Jalankan type check, lint pada area yang berubah, dan production build setelah implementasi; pisahkan kegagalan yang sudah ada dari regresi baru.
3. Ambil screenshot pada viewport uji dan titik fase Works yang sama: opening, cahaya penuh, pendaratan, gallery pertama, proyek terakhir, dan Exploring.
4. Uji scroll lambat/cepat/balik, klik nav berulang, hash langsung, reload saat di Timeline/Works, dan Back/Forward.
5. Uji mouse, keyboard, touch, copy email sukses/gagal, link proyek, image failure, reduced motion, serta fallback WebGL.
6. Rekam performance trace pada alur yang sama sebelum/sesudah. Periksa aktivitas saat halaman diam, offscreen, dan tab tidak aktif.

Tambahkan tes perilaku hanya untuk kontrak yang membutuhkan regresi otomatis, misalnya navigation interruption atau copy feedback. Gunakan harness browser yang tersedia jika ada; jangan menambahkan dependency uji besar hanya untuk memeriksa polish sederhana.

## Batas scope dan handoff

- Implementasi UI sudah berada di workspace lokal; tidak ada deploy atau perubahan konten eksternal.
- Tidak termasuk pembuatan backend/database, case-study platform, physics engine, logo baru, cursor khusus, sound effect, atau section inspirasi.
- Foto asli, artefak Exploring, dan kontribusi tambahan proyek tidak boleh dikarang. Tiga foto untuk milestone pertama sudah tersedia; media lain dan klaim tambahan tetap pending.
- Workspace mempunyai banyak perubahan lokal dari iterasi sebelumnya. Eksekutor membaca status dan file aktual sebelum mengedit; jangan reset, hapus, atau menimpa perubahan lain.
- Arahan Alfi terbaru dalam chat mengungguli dokumen yang tertinggal. Perubahan perilaku besar dari baseline harus dijelaskan sebelum diterapkan.

### Brief eksekusi awal (arsip)

“Baca skema polish ini beserta DESIGN.md, DESIGN_SYSTEM.md, dan aturan repo. Kerjakan delapan area sesuai urutan batch, dengan antislop during. Pertahankan keputusan visual baseline dan runtime scroll/restore. Gunakan konten yang terkonfirmasi; siapkan dukungan foto/eksperimen tanpa mengarang aset atau klaim. Verifikasi halaman nyata pada fase scene dan viewport yang ditentukan, ukur kandidat bottleneck, lalu laporkan perubahan, bukti, dan kebutuhan konten yang masih pending. Modularisasi mengikuti tanggung jawab komponen. Jangan reset perubahan lokal atau deploy.”

## Catatan implementasi dan verifikasi

Implementasi dikerjakan langsung di workspace `main` yang sudah berisi banyak perubahan lokal. Perubahan sebelumnya dipertahankan; tidak ada commit atau deploy.

### Yang sudah masuk

- Works mempertahankan alur cahaya, judul, wadah, kartu jatuh, galeri bergantian, dan fade akhir yang sudah disetujui. `WorksBowl` dipisah dari orkestrasi fase; ukuran `sizes` preview disesuaikan dengan lebar kartu. Shadow fallback Timeline disederhanakan supaya WebGL tidak menghasilkan bayangan ganda.
- Hero memakai file portrait WebP yang sama dengan bootstrap preload agar tidak mengunduh variant Next Image kedua.
- Tile ASCII dipisah menjadi unit interaksi dan artwork fallback. Sumber foto asli dapat di-reveal lewat hover dan tombol toggle keyboard/touch; placeholder tidak menampilkan kontrol palsu.
- Seluruh area preview proyek menjadi satu tautan semantik bila URL tersedia. Kontak memakai satu sumber copy dan tombol salin email dengan status sukses/gagal.
- Setelah arahan terbaru, Exploring dikembalikan ke empat kartu horizontal sebelumnya; komposisi desktop, mobile, dan landscape pendek tetap berada dalam viewport tanpa melebar ke samping.
- Komponen timeline, Works, dan Exploring dipisah mengikuti tanggung jawab. File `TechStackTransition.tsx` yang tidak lagi punya consumer dan bergantung pada modul yang sudah dihapus dibersihkan.

### Bukti

- `npm run build` sukses pada salinan build terisolasi dari source terbaru; server development workspace tidak disentuh.
- `npx tsc --noEmit` sukses. ESLint untuk file implementasi terkait sukses tanpa issue. Tes copy-email: 2 lulus.
- Production Firefox headless sebelum pengembalian Exploring diperiksa pada 320×740, 390×844, 844×390, 768×1024, 1024×768, 1440×900, dan 1920×1080. Setelah Exploring dikembalikan, Firefox dev diperiksa di 390×844, 844×390, dan 1440×900: empat kartu tampil, tidak ada page overflow atau error runtime. Build production ulang mencakup versi Exploring yang sudah dikembalikan.
- Reduced motion tetap menampilkan tautan dan konten. Saat WebGL dinonaktifkan, fallback SVG Timeline tampil.
- Snapshot Firefox lokal tanpa throttling setelah implementasi: CLS 0, 0 long task, 38 resource, sekitar 639 KB transfer. Resource transfer turun sekitar 126 KB dari snapshot build sebelumnya karena request variant portrait yang duplikat hilang. LCP lokal berubah-ubah (174–315 ms), jadi tidak dipakai sebagai klaim perbandingan. Ini pengukuran browser lokal, bukan hasil lapangan.
- Tidak ada baseline sebelum polish, sehingga hasil di atas hanya perbandingan antar-build lokal dan bukan klaim total peningkatan performa.

### Yang masih pending

- Tiga foto masing-masing untuk empat milestone pertama sudah dipasang. Tiga tile di milestone terakhir masih memakai artwork abstrak sampai fotonya tersedia.
- Artefak eksplorasi tambahan dan rincian kontribusi proyek perlu dikonfirmasi Alfi sebelum menjadi klaim baru.
- `node --test tests/*.test.mjs` berakhir dengan 8 lulus dan 11 gagal. Sebelas kegagalan sudah ada sebelum implementasi (baseline awal: 6 lulus, 11 gagal) dan berasal dari assertion lama untuk shortcut chat, struktur cinematic timeline/hero, dan navbar yang sudah berubah/dihapus.
- Full `npm run lint` masih memiliki 6 error dan 1 warning pada area di luar file polish: `PageScrollCycle.tsx`, `text-roll.tsx`, `useShatteredImage.ts`, `useSnakeGame.ts`, `MagneticButton.tsx`, dan `SmoothScroll.tsx`. Lint pada file perubahan terkait lulus.
