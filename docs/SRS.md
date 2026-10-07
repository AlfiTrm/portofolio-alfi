# SRS: Portfolio Life Points

Tanggal: 7 Oktober 2026  
Versi: 2.3
Status: Life Points memakai lima bab cerita personal tanpa eyebrow, nomor, kategori, proof label, atau screenshot proyek. Satu jalur 3D mengikuti daftar dan berakhir tepat pada batas Works; awalnya tetap masuk ke frame. Tiga tile kotak ASCII per bab memetakan luminance placeholder atau foto ke karakter. Ring marker selalu terlihat. Motif jaring tetap terpisah; responsive acceptance berlaku untuk seluruh homepage.

Dokumen terkait: [PRD](PRD.md), [PRD Backend (draft terpisah)](PRD_BACKEND.md), [guideline desain](DESIGN.md), [Brand Guidelines](BRAND_GUIDELINES.md), [Design System](DESIGN_SYSTEM.md), dan [rancangan arah](portfolio-about-life-points-design.md).

## 1. Tujuan dan batas sistem

SRS ini menetapkan perilaku yang diperlukan untuk hero, aset logo, sistem motion Lenis / GSAP / Framer Motion, dan pengalaman About berupa perjalanan personal yang bercerita saat scroll. Chapter Life Points tetap mengalir dalam dokumen; satu jalur besar membentang dari bagian atas sampai batas Works dan menyesuaikan proyeksinya dengan ukuran stage. Chapter masuk satu per satu. Nama dan screenshot proyek tetap berada pada Selected Work, bukan diulang di Life Points. Setiap chapter memiliki tiga tile ASCII abstrak sebagai placeholder visual, bukan rekonstruksi peristiwa; karakter pada tile mengikuti luminance sumber gambar. Motif jaring adalah elemen visual terpisah; topology dan lokasi web masih menunggu review art direction. Spesifikasi berlaku pada homepage portfolio yang ada. Tidak diperlukan layanan backend, CMS, database, atau API baru untuk scope ini.

PRD menetapkan tujuan dan pengalaman pengunjung. SRS menjadi acuan perilaku sistem serta penerimaan implementasi. Implementasi visual berjalan berdasarkan arah yang disepakati; angka performa tetap harus diukur sebelum dinyatakan lulus.

## 2. Istilah

| Istilah | Arti |
| --- | --- |
| Life point / milestone | Satu kejadian atau perubahan nyata dalam perjalanan Alfi, dengan judul naratif dan cerita singkat. |
| Chapter / adegan | Penyajian satu milestone dalam pengalaman scroll. |
| Jalur penuh | Jalur visual mengikuti tinggi daftar milestone dan bergerak di belakang isi dalam alur dokumen. |
| Progres scroll | Nilai posisi scroll dalam section yang digunakan bersama oleh teks, media, dan visual timeline. |
| Parallax | Perbedaan perpindahan antar lapisan visual yang mengikuti progres scroll. |
| Fallback | Penyajian cerita yang lengkap ketika visual 3D atau motion utama tidak digunakan. |

## 3. Konteks dan asumsi

Homepage memakai Next.js, React, Tailwind CSS, Framer Motion, Lenis, GSAP, OGL, dan Three.js. Lenis mengelola scroll dokumen; GSAP / ScrollTrigger di-load secara dinamis untuk membaca progres Life Points; Framer Motion menangani reveal milestone dan transisi komponen existing. Three.js di-load terpisah untuk jalur abstrak Timeline, sementara OGL tetap dipakai oleh efek Lightfall. Cerita milestone berada di HTML dan visual memiliki fallback SVG. Fakta perjalanan pribadi yang belum dikonfirmasi Alfi tetap perlu diverifikasi sebelum copy final dipublikasikan.

Asumsi kerja: milestone dikelola melalui data lokal dan aset proyek. Copy saat ini berbahasa Inggris dan mengikuti detail cerita dari Alfi; wording akhir masih menunggu review Alfi sebelum publish. Layout mendukung panjang teks tanpa mengecilkan font secara paksa. Pengunjung memakai native scroll, touch, atau keyboard.

## 4. Batas komponen dan kontrak integrasi

| Tanggung jawab | Kontrak yang diusulkan |
| --- | --- |
| Komposisi homepage | Menempatkan Hero, About, Timeline / My Journey, Selected Work, What I’m Into, dan Get in Touch sesuai PRD. Projects, Exploring, dan Contact existing menjadi pemetaan tiga section terakhir. |
| Hero | Mempertahankan opening yang sekarang dan menghapus kartu informasi kiri bawah. |
| Life Points | Memiliki data cerita, urutan chapter, layout responsif, dan progres scroll section. |
| Presentasi HTML | Menampilkan konten milestone yang lengkap dan dapat diakses. |
| Visual timeline / 3D | Scene Three.js menampilkan satu garis 3D kontinu bersapuan lebar di belakang seluruh daftar; fallback SVG mempertahankan jalur dan marker. Tile berada di belakang garis; copy berubah kontras sesuai permukaan di belakangnya. Ring marker selalu tampil dan ekor jalur mencapai batas Works. Motif web berada di luar Timeline. Kegagalan visual tidak memblokir presentasi HTML atau gambar terkait. |
| Navigasi | Anchor About menuju awal perkenalan dan tetap bekerja pada semua mode presentasi; Works menuju Selected Work secara langsung. |
| Komponen shared dan feature | Komponen feature-local menjadi default. Periksa pola existing sebelum menambah komponen; gunakan shared ketika kontrak dan tanggung jawabnya dipakai lintas konteks nyata. |

Satu sumber data harus menghasilkan narasi HTML dan marker visual. Progres scroll dibatasi pada Life Points sehingga scroll dan motion pada section lain tidak ikut berubah. Pemisahan hero dan About perlu mempertahankan timing opening serta interaksi resume yang sudah ada.

## 5. Functional requirements

| ID | Requirement |
| --- | --- |
| FR-01 | Sistem harus menghapus kartu “Exploring / Focus” pada hero desktop dan mobile. |
| FR-02 | Sistem harus mempertahankan komposisi opening hero serta fungsi navigasi dan resume di luar perubahan kartu tersebut. |
| FR-03 | Homepage harus mengikuti urutan Hero, About, Timeline / My Journey, Selected Work, What I’m Into, dan Get in Touch. About merupakan perkenalan singkat yang mengalir ke Timeline. Anchor About menuju awal perkenalan; navigasi Works harus dapat menuju Selected Work secara langsung. |
| FR-04 | Sistem harus menampilkan milestone dalam urutan kronologis yang ditetapkan oleh data yang sudah dikonfirmasi. |
| FR-05 | Setiap chapter harus menyampaikan momen personal dengan judul naratif dan cerita ringkas. Jangan gunakan eyebrow, nomor, kategori, proof label, judul proyek, atau screenshot proyek. Beberapa tile ASCII abstrak boleh dipakai sebagai placeholder sampai foto asli dipilih Alfi; karakter mengikuti luminance sumber. |
| FR-06 | Daftar cerita dan jalur visual berada dalam alur section yang sama. Jalur membentang dari awal sampai akhir daftar, menyapu lebar komposisi di sekitar chapter, dan mengikuti progres scroll turun maupun naik. Layout tidak memakai stage sticky. |
| FR-07 | Jika parallax dipilih, lapisan terpilih harus mengikuti progres scroll yang sama dengan amplitudo yang sesuai; narasi tetap terbaca. Tidak ada kewajiban menganimasikan semua lapisan. |
| FR-08 | Perpindahan chapter harus menjaga narasi dapat dibaca dan tidak menampilkan dua chapter sebagai fokus utama yang saling bertabrakan. |
| FR-09 | Jalur visual berakhir bersama daftar milestone setelah chapter terakhir dan berlanjut sampai batas section Works, tempat section berikutnya menutupi ujung tabung. Scroll ke atas harus bekerja tanpa jebakan dalam semua mode. |
| FR-10 | Pada semua ukuran layar, seluruh cerita harus tersedia dan dapat dibaca tanpa kehilangan konten. Jalur mengikuti tinggi daftar dan posisi chapter; awalnya menyisakan ruang aman dari frame, sedangkan ekornya mencapai batas Works. Proyeksi horizontal menyesuaikan rasio stage dan tetap dekat ke gutter pada layar kecil. Copy dan kolase tile berubah komposisi agar nyaman dibaca. |
| FR-11 | Saat reduced motion aktif, sistem harus mengurangi gerak scroll dan menyajikan seluruh milestone secara berurutan tanpa ketergantungan pada perpindahan 3D. |
| FR-12 | Scene Three.js Life Points harus menampilkan satu garis kontinu berukuran besar yang membentang sepanjang daftar dan menyapu kiri-kanan di antara chapter. Jalur dan titik cerita memakai urutan data yang sama dengan HTML, dengan lekuk asimetris dan perubahan kedalaman yang terukur. Framing mengikuti rasio stage dan posisi chapter; awal jalur masuk ke frame, sedangkan ekornya berlanjut ke batas Works. Jalur serta bayangannya berada di atas tile dan di bawah teks. Ring marker selalu terlihat meski progres jalur belum mencapainya. SVG fallback menunjukkan perilaku yang sama. |
| FR-13 | Teks penting, link, dan narasi harus tetap berada di HTML; canvas tidak boleh menjadi satu-satunya tempat informasi milestone tersedia. |
| FR-14 | Bila WebGL tidak tersedia, context hilang, atau scene gagal dimuat, sistem harus mempertahankan timeline HTML yang lengkap dan dapat digunakan. |
| FR-15 | Resize viewport dan perubahan orientasi harus memperbarui layout serta scene tanpa mengubah urutan cerita atau menghilangkan konten aktif. |
| FR-16 | Chapter tanpa foto tetap tampil utuh dengan judul dan narasi. Tile abstrak atau foto memakai karakter ASCII berdasarkan luminance agar bentuk gambar tetap terbaca. Jangan membuat foto atau artefak yang menyiratkan kenangan nyata. Kegagalan media tidak boleh menghalangi chapter berikutnya. |
| FR-17 | Data dan aset milestone harus dapat diperbarui tanpa menduplikasi narasi pada renderer HTML dan renderer visual. |
| FR-18 | Jika media dimuat atau gagal, sistem harus mempertahankan narasi HTML dan navigasi. Data kosong harus ditangani tanpa stage visual kosong atau chapter buatan; isi fallback hanya memakai bio yang sudah dikonfirmasi. |
| FR-19 | Mark utama harus tersedia di `public/logo/logo.svg`, versi hitam di `public/logo/logo-black.svg`, dan metadata browser/perangkat harus merujuk pada ikon yang menggunakan mark yang sama. |
| FR-20 | Scroll halaman harus memakai satu instance Lenis root dan mempertahankan alur dokumen, anchor, scroll keyboard/touch, serta arah scroll ke atas dan ke bawah. Saat `prefers-reduced-motion` aktif, smoothing dinonaktifkan dan gerak programatik diminimalkan. |
| FR-21 | Scene scroll Life Points harus memakai GSAP / ScrollTrigger dengan satu progres section sebagai sumber gerak; sinkronisasi Lenis dan GSAP memakai satu ticker bersama. |
| FR-22 | Label link atau aksi yang dipilih dapat memakai Flip Text terinspirasi ObsidianUI; gerak karakter satu kali dimulai saat hover atau keyboard `focus-visible`, tanpa mengubah tujuan kontrol atau nama aksesibelnya. |
| FR-23 | Motif jaring, bila dipakai, harus menjadi elemen terpisah dari jalur Timeline. Setiap strand harus terhubung dalam struktur web yang terbaca; bentuk tidak boleh bergantung pada garis silang acak, ujung lepas tanpa tujuan, atau echo bayangan ganda. Lokasi dan bentuk akhir menunggu review art direction. |
| FR-24 | Setiap chapter Life Points harus mulai terungkap saat memasuki viewport satu per satu dengan urutan yang jelas. Narasi tetap berupa HTML dan seluruh item tetap tersedia saat reduced motion aktif. |
| FR-25 | Life Points harus terasa sebagai satu perjalanan personal. Pengunjung melihat bab seperti “When it all started” dan lanjut ke momen berikutnya; bagian ini tidak menjadi galeri atau pengulangan Selected Work. |
| FR-26 | Scroll reveal About, Timeline, Selected Work, dan Contact berjalan saat elemen terkait masuk viewport lalu tetap terlihat ketika pengunjung scroll naik. Reveal direset saat scroll kembali ke area atas/Hero dan diputar ulang pada kunjungan turun berikutnya. Entrance Hero mempertahankan state persisten yang sudah ada; pada reduced motion, isi tampil tanpa menunggu animasi. |

## 6. Data requirements

Model berikut adalah kontrak konseptual, bukan kode implementasi final:

| Field | Wajib | Aturan |
| --- | --- | --- |
| ID | Ya | Stabil dan unik untuk chapter. |
| Urutan | Ya | Menentukan kronologi; tidak bergantung pada parsing label periode. |
| Periode | Tidak | Tidak ditampilkan sebagai eyebrow atau label pada bab. Bila suatu saat dipakai di copy, konteks waktu harus sudah dikonfirmasi Alfi. |
| Judul | Ya | Judul bab naratif; bukan nama proyek atau kategori. |
| Narasi | Ya | Menceritakan pengalaman dan pergeseran minat/perspektif dengan fakta yang Alfi setujui. |
| Tile visual | Tidak | Beberapa tile ASCII abstrak sebagai placeholder; foto asli dari Alfi dapat menggantikan tile dan dipetakan dengan karakter menurut luminance. Screenshot proyek disimpan untuk Selected Work. |
| Deskripsi foto | Bila foto informatif ada | Alt text menjelaskan foto secara akurat, tanpa mengklaim bahwa foto menggambarkan masa/momen lain. |

Data lokal menyimpan copy dan tile yang dipakai komponen; penyuntingan dilakukan lewat source, bukan UI pengelolaan konten. Wording akhir dan fakta diperiksa Alfi sebelum publish. Sistem tidak memerlukan status publikasi atau CMS; klaim yang belum diverifikasi tidak boleh ditampilkan.

## 7. Kontrak motion dan progression

- Lenis menjadi lapisan smoothing global untuk scroll dokumen; ia tidak mengganti struktur native scroll atau mengunci input pengunjung.
- GSAP / ScrollTrigger menjadi pengendali khusus untuk scene scroll Life Points. Framer Motion dipertahankan untuk transisi UI komponen existing, bukan dimigrasikan secara menyeluruh.
- Sinkronkan Lenis dengan GSAP melalui ticker GSAP bersama dan satu instance Lenis; kirim update scroll ke ScrollTrigger dan jangan membuat beberapa loop frame untuk memajukan scroll yang sama.
- Flip Text mengadaptasi perilaku ObsidianUI pada label interaktif yang dipilih melalui komponen `TextRoll` berbasis `motion/react`. Gunakan trigger hover/`focus-visible`, flip karakter dengan stagger singkat, animasi satu kali, dan teks aksesibel yang utuh; jangan menambah dependency animasi lain hanya untuk efek ini.
- Properti animasi pada satu target dimiliki satu sistem pada satu waktu. CSS dipakai untuk transisi state sederhana.
- Section menghasilkan satu progres yang dapat dipetakan ke urutan milestone dan posisi visual.
- Scroll ke bawah dan ke atas menghasilkan progression yang konsisten. Tidak menggunakan timer sebagai sumber utama perpindahan chapter.
- Jika gerak scroll dipilih, hubungan antara copy, visual tile, dan marker didokumentasikan; narasi bergerak paling sedikit agar tetap terbaca.
- Jalur dan daftar dimulai serta berakhir pada batas Life Points. Navigasi anchor harus menuju awal cerita.
- Gerak masuk, progression, dan gerak keluar tidak boleh menumpuk transform yang menyebabkan lompatan atau perpindahan posisi yang tak terduga.
- Mode reduced motion serta fallback menyajikan seluruh chapter sebagai alur baca. Konten tidak boleh terhapus karena opacity atau clipping dari mode animasi.
- Tinggi visual mengikuti panjang alami daftar dan menyesuaikan dengan perubahan layout responsif.

## 8. Nonfunctional requirements

| ID | Requirement dan kondisi penerimaan |
| --- | --- |
| NFR-01 | Reflow untuk seluruh homepage: konten biasa tetap tersedia tanpa scroll dua arah pada lebar 320 CSS px, layar pendek, orientasi landscape, dan pembesaran. Tidak ada copy/control terpotong, media melewati container, atau halaman bergeser horizontal. Ini mengikuti [WCAG 2.2 SC 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html); pengecualian untuk konten dua dimensi mengikuti kriteria WCAG. |
| NFR-02 | Keterbacaan dan typography: Akira dipakai untuk hero dan judul display pendek; Geist untuk narasi dan seluruh UI. Narasi memiliki lebar baris nyaman serta tetap terbaca pada latar hitam maupun putih. |
| NFR-03 | Aksesibilitas: gunakan section, heading, dan urutan DOM yang sesuai kronologi; semua link dapat dipakai dengan keyboard dan memiliki focus yang terlihat. Flip Text harus terbaca sebagai satu nama kontrol dan dapat dipicu melalui keyboard `focus-visible`. |
| NFR-04 | Motion: hormati preferensi reduced motion, gunakan native scroll, hindari kontrol yang mengambil alih wheel atau touch scrolling, dan tampilkan teks statis pada perangkat touch bila hover tidak tersedia. |
| NFR-05 | Performa: GSAP / ScrollTrigger berada di chunk Life Points dan inisialisasinya ditunda sampai section dibutuhkan; scene 3D tidak memblokir opening hero. Hentikan gerak yang tidak diperlukan ketika section tidak aktif. |
| NFR-06 | Canvas: ukuran render mengikuti area tampilan dan kualitas disesuaikan untuk viewport/perangkat. Jangan mengasumsikan seluruh perangkat perlu render pada pixel ratio maksimum. Jika bayangan real-time dipakai, batasi sumber bayangan dan resolusinya sesuai hasil profiling; evaluasi teknis dilakukan selama development. |
| NFR-07 | Ketahanan: HTML tetap dapat dibaca saat renderer atau aset gagal; kegagalan visual tidak boleh menggagalkan homepage. |
| NFR-08 | Maintainability: satu data source dan satu kontrak progression; renderer visual dapat diganti tanpa menulis ulang narasi. Komponen feature-local dan shared mengikuti batas tanggung jawab yang sama di seluruh section. |
| NFR-09 | Konsistensi visual: gunakan Hero existing sebagai acuan visual (dasar gelap, type ivory/off-white, dan neutrals lembut); About memakai kanvas putih. Jangan menambah aksen hue dekoratif. Foto serta artefak asli tetap mempertahankan warna sumbernya. Font dan gerak mengikuti keputusan yang disetujui; efek visual harus mempunyai peran terhadap cerita. |
| NFR-10 | Integrasi: fungsi navbar, resume, chat, Projects, Exploring, dan Contact tetap tersedia setelah perubahan alur hero/About. |
| NFR-11 | Identitas: visual mengikuti guideline DESIGN.md dan interpretasi ENERGY 3 / RHYTHM 3 / MOTION 3. Keputusan typography, warna, layout, spacing, dan motion memiliki alasan tertulis. Kesan pengunjung diperiksa melalui G-07 di PRD, bukan dianggap terbukti dari implementasi animasi. |
| NFR-12 | Aksesibilitas visual: normal text memenuhi kontras minimal 4.5:1, large text 3:1, serta indikator fokus dan kontrol penting 3:1 terhadap warna di sekitarnya. Periksa pasangan warna aktual, termasuk area foto yang dilewati teks. Target interaksi internal 44px menjadi baseline brand, bukan klaim minimum WCAG AA; [WCAG 2.2 AA SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) menetapkan 24 × 24 CSS px dengan pengecualian, sedangkan [SC 2.5.5](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) menetapkan 44 × 44 CSS px pada tingkat AAA. Teks tetap terbaca pada zoom 200%. |
| NFR-13 | Kepemilikan motion: satu properti pada satu elemen tidak boleh dikendalikan bersamaan oleh GSAP, Framer Motion, dan CSS animation. Efek Flip Text tidak boleh berulang tanpa interaksi baru. |
| NFR-14 | Reuse komponen: sebelum menambah komponen, pencarian inventory existing harus dilakukan. Komposisi unik tetap feature-local; shared dipakai untuk tanggung jawab yang berulang pada minimal dua konteks nyata atau fungsi dasar lintas halaman. Setiap komponen shared memiliki consumer aktif atau peran global terdokumentasi. Tokenisasi dibatasi pada nilai visual yang berulang. |
| NFR-15 | Konsistensi kontrol: gunakan tombol utama solid, aksi sekunder berupa tautan teks, tombol ikon hanya untuk aksi yang jelas, sudut 0–2px, focus state terlihat, dan target internal 44px. Ukuran tersebut adalah baseline brand, bukan klaim minimum WCAG 2.2 AA. |
| NFR-16 | Organisasi CSS: `src/app/globals.css` menjadi entrypoint dan mengimpor file global berdasarkan fungsi (warna, typography, spacing, motion, base/accessibility, utilities). Aturan khusus section tetap di feature stylesheet; utilities global harus memiliki consumer nyata. |
| NFR-17 | Spacing dan layout: skala 4px `[4, 8, 12, 16, 24, 32, 48, 64, 96, 128]` disepakati. Gutter 20–64px, lebar konten maksimal 1440px, dan lebar baca narasi sekitar 65ch menjadi baseline Design System; review pada isi aktual dapat menyetel komposisi. Jarak section mengikuti kebutuhan konten. |
| NFR-18 | Layout responsif untuk seluruh homepage: sediakan komposisi sempit, menengah, dan lebar. Breakpoint dipilih saat konten memerlukan perubahan; tidak memakai daftar device sebagai breakpoint. Jangan menyembunyikan isi penting atau memaksa kolom ketika lebar layar tidak cukup. Timeline tetap non-sticky dan mempertahankan jalur sepanjang seluruh daftar. Titik matriks adalah sampel review, bukan nilai breakpoint. |
| NFR-19 | Finish visual 3D: jalur Timeline memiliki proporsi, lekuk, depth, titik milestone, dan lighting yang disengaja serta konsisten dengan kanvas putih dan palet netral. Bila web 3D dipakai, topology, material/texture, cahaya, bayangan, dan pergerakannya membentuk satu treatment matang. Prototype mentah tidak menjadi hasil final; Alfi meninjau keadaan aktif dan transisi selama development. |
| NFR-20 | Continuity visual: jalur Timeline menjelaskan urutan perjalanan tanpa menambah jaring pada daftar; motif web terpisah hanya dipakai bila bentuk terhubung dan mendukung cerita lintas section. Visual menjaga ruang baca dan memiliki fallback bila WebGL/reduced motion membatasi scene. |

Target frame rate, berat asset, dan durasi load belum memiliki baseline pengukuran. Nilai numeriknya harus ditetapkan melalui penilaian visual/renderer dan perangkat sasaran sebelum dianggap sebagai acceptance threshold; SRS ini tidak mengklaim performa yang belum diukur.

## 9. Implementasi renderer 3D

Scene Life Points memakai Three.js untuk satu garis kontinu yang membentang sepanjang daftar chapter dan menempatkan titik pada tinggi chapter. Awal tabung berada di dalam frame; ekornya diteruskan melewati batas putih dan tertutup oleh Works. Bayangan jalur dan tile menambah kedalaman, gambar berada di belakang jalur, dan teks memakai difference blending agar hitam di bidang putih serta putih di atas jalur. Ring marker selalu tampil walau progres garis belum sampai. Tile ASCII merender karakter menurut luminance sumber gambar, termasuk foto yang dipilih kemudian. Narasi tetap berupa HTML dan terungkap bertahap. SVG statis mempertahankan urutan, ring, reveal jalur, kontras, dan handoff sebagai fallback untuk reduced motion, WebGL yang gagal, atau viewport yang tidak mengaktifkan scene. Web topology tidak menjadi bagian dari renderer Life Points dan dirancang sebagai keputusan terpisah setelah studi visual direview.

Scene dimuat terpisah dari opening Hero, menyesuaikan ukuran host, menghentikan frame saat tidak terlihat, dan membersihkan resource saat unmount. Kualitas visual dan biaya render shadow tetap ditinjau pada perangkat sasaran. Panduan resmi Three.js tentang [responsive canvas](https://threejs.org/manual/pages/responsive.html), [biaya banyak objek](https://threejs.org/manual/pages/optimize-lots-of-objects.html), dan [pembersihan resource](https://threejs.org/manual/pages/how-to-dispose-of-objects.html) menjadi acuan implementasi.

## 10. Traceability dan acceptance scenarios

| Produk | Sistem | Skenario penerimaan |
| --- | --- | --- |
| P-01 | FR-01, FR-02 | Buka homepage desktop/mobile; kartu kiri bawah hilang, opening hero dan resume sesuai baseline. |
| P-02 | FR-03 | Periksa urutan enam section sesuai PRD; pilih About untuk masuk ke perkenalan, lalu Works untuk menuju Selected Work secara langsung. |
| P-03 | FR-04, FR-05, FR-17, FR-25 | Periksa bab cerita terhadap fakta yang dikonfirmasi. Pastikan judul dan copy terbaca sebagai perjalanan, tanpa nomor/kategori/proof label atau pengulangan screenshot proyek; HTML dan marker mengikuti urutan yang sama. |
| P-04 | FR-06, FR-08, FR-09 | Scroll turun, naik, masuk lewat anchor, dan lanjut ke Projects; chapter sesuai posisi dan tidak ada scroll trap. |
| P-05 | FR-07 | Jika parallax dipilih, periksa lapisan terpilih pada tiap chapter; narasi tetap nyaman dibaca. |
| P-06 | FR-12, FR-13, FR-14, FR-23, NFR-19, NFR-20 | Review siluet jalur, perubahan depth, ring yang selalu terlihat, kontras teks, bayangan, dan transisi milestone pada beberapa posisi scroll. Pastikan ujung jalur menyentuh batas Works dan bentuknya tetap terbaca sebagai satu garis, tidak menjadi kumpulan silang. Jika motif web diimplementasikan nanti, review sebagai elemen terpisah dari Timeline. Periksa fallback saat renderer gagal. |
| P-07 | FR-10, FR-15, FR-16, NFR-01, NFR-18 | Periksa cerita dan seluruh homepage pada layar kecil/pendek, 320 CSS px, landscape, zoom, serta media tidak tersedia; isi tetap utuh dan urutan baca jelas. |
| P-08 | FR-11, FR-13, FR-14, NFR-03, NFR-04 | Aktifkan reduced motion dan gunakan keyboard/pembaca layar; cerita lengkap dan urut. |
| P-09 | FR-03, FR-09, NFR-10 | Gunakan navbar dan lanjutkan ke section lain; fungsi halaman tetap tersedia. |
| P-10 | NFR-09, NFR-11 | Gunakan pertanyaan G-07 untuk mencatat apakah pengunjung mengingat Alfi, satu detail/karya, dan apa yang ingin mereka lihat selanjutnya; jika hanya efek yang diingat, revisi storytelling. |
| P-11 | FR-19 | Periksa kedua SVG logo, ikon yang tercantum di metadata, favicon, dan manifest; semua aset tersedia serta memakai mark yang sama. |
| P-12 | FR-20, FR-21, NFR-04, NFR-05, NFR-13 | Uji scroll dua arah, anchor, keyboard, touch, reduced motion, serta jalur Three.js/SVG; pastikan scroll dan GSAP sinkron tanpa scroll trap atau animasi berulang. |
| P-13 | FR-22, NFR-03, NFR-04, NFR-13 | Uji Flip Text dengan pointer dan keyboard; pastikan satu label aksesibel, animasi satu kali, serta tampilan statis pada touch/reduced motion. |
| P-14 | NFR-08, NFR-14 | Saat menambah atau mengubah komponen, tinjau inventory; pastikan komposisi unik berada di feature, penggunaan bersama merujuk pada satu kontrak, dan setiap komponen shared punya consumer atau peran global yang jelas. |
| P-15 | NFR-09 | Periksa Hero sebagai sumber visual, About pada latar putih, dan section gelap/terang; foto dan artefak asli tidak diubah menjadi token warna brand. |
| P-16 | NFR-02, FR-22 | Periksa peran font Akira dan Geist di seluruh UI; Flip Text menganimasikan label terpilih tanpa mengganti typeface atau nama kontrol aksesibel. |
| P-17 | NFR-12, NFR-15 | Periksa warna, bentuk, target sentuh, fokus keyboard, dan tautan sekunder sesuai baseline kontrol; kriteria aksesibilitas tetap berlaku terpisah. |
| P-18 | NFR-08, NFR-14, NFR-16 | Periksa `globals.css` sebagai entrypoint, pemisahan stylesheet global berdasarkan fungsi, serta lokasi feature stylesheet dan consumer utilities. |
| P-19 | NFR-17 | Periksa skala spacing 4px serta baseline gutter, batas lebar konten, dan lebar baca narasi pada beberapa ukuran. |
| P-20 | FR-03, FR-10, NFR-01, NFR-18 | Review seluruh section pada sampel viewport Design System dan resize di antaranya; pastikan isi lengkap dan setiap rentang punya komposisi yang disengaja. |
| P-21 | NFR-19 | Minta review visual Alfi selama development pada scene aktif dan transisinya. Catat perbaikan untuk finish permukaan, lighting, shadow, dan integrasi ke cerita; jangan menerima prototype mentah sebagai hasil final. |

FR-18 melengkapi P-06 sampai P-08 untuk kondisi loading, error, dan data kosong. NFR-01/NFR-12/NFR-18 dan P-20 berlaku sebagai acceptance responsif untuk seluruh homepage. FR-10 memastikan jalur dan cerita Life Points tetap utuh dalam alur normal pada semua ukuran.

## 11. Keputusan verifikasi

Seam verifikasi utama yang diusulkan adalah perjalanan pengunjung di homepage dari opening hero, masuk ke About, membaca milestone, lalu keluar ke Projects. Ini menilai perilaku yang terlihat pengguna pada batas integrasi tertinggi.

Review harus mencakup desktop, tablet, ponsel, viewport pendek, reduced motion, keyboard, serta fallback WebGL. Pemeriksaan copy menggunakan fakta dan aset yang disetujui Alfi. Snapshot visual hero yang disetujui menjadi acuan untuk menjaga opening. Review finish scene 3D berlangsung selama development pada keadaan awal, milestone aktif, dan transisi.

Gunakan empat blok Delivery Gate antislop: Hard Gate, Purpose-Gate, Liveliness, serta Craftsmanship/Quality Locks. Sertakan alasan keputusan dan bukti hasil runtime untuk implementasi. Review dokumen atau rencana visual tidak membuktikan bahwa layout, performa, atau interaksi aplikasi sudah lulus. Evaluasi kesan pengunjung mengikuti G-07 di PRD.

SRS 2.3 menetapkan Life Points sebagai cerita personal tanpa eyebrow, nomor, kategori, format project-card, atau screenshot proyek. Satu jalur 3D membentang dari ujung atas hingga batas Works; awalnya tetap masuk ke frame. Ring marker selalu terlihat. Tile ASCII membentuk detail gambar lewat luminance, dan copy beradaptasi dengan permukaan di belakangnya. Acceptance responsif tetap mencakup seluruh homepage. Bentuk web 3D terpisah masih menunggu review visual. Dokumen ini bukan bukti verifikasi runtime; skenario penerimaan dipakai untuk review implementasi.

## 12. Catatan konten dan refinement selama development

Requirement baseline menetapkan cerita personal dalam bab tanpa eyebrow, nomor, kategori, proof label, atau screenshot proyek; satu jalur 3D besar yang menyentuh batas Works; serta tile ASCII berdasarkan luminance sebagai pengganti sementara foto. Acceptance responsif mencakup seluruh homepage, Hero menjadi acuan visual, dan About/Life Points memakai kanvas putih. Motif web terpisah dan masih dieksplor; jangan memulihkan garis acak. Placeholder tidak boleh disajikan sebagai foto historis. Logo (FR-19), motion (FR-20–22), reuse, CSS, dan skala 4px tetap menjadi baseline implementasi.
