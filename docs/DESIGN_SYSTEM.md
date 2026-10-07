# Design System: Portfolio Alfi

Tanggal: 6 Oktober 2026  
Status: Baseline design system diperbarui setelah review Alfi. Hero menjadi acuan visual dan acceptance responsif mencakup seluruh homepage. Life Points memakai bab naratif tanpa nomor dan screenshot proyek; satu jalur 3D besar mengalir dari atas ke bawah dan satu portrait sementara muncul di bab terkini. Motif jaring terpisah dan masih dieksplor.  
Dokumen sumber: [PRD](PRD.md), [SRS](SRS.md), [Brand Guidelines](BRAND_GUIDELINES.md), dan [guideline pengalaman](DESIGN.md).

Dokumen ini menerjemahkan keputusan brand ke aturan interface dan codebase. Implementasi harus mengikuti kontrak di sini; perubahan visual yang disengaja dicatat kembali pada dokumen ini.

## 1. Arah yang sudah dikonfirmasi

| Area | Aturan |
| --- | --- |
| Warna | Hero menjadi acuan visual: dasar gelap, type ivory/off-white, dan neutrals lembut; About memakai kanvas putih. Hindari aksen hue dekoratif. Media asli mempertahankan warna sumber. |
| Font | Akira untuk hero dan judul display pendek; Geist untuk narasi serta seluruh UI. Flip Text adalah efek pada label terpilih, bukan font tambahan. |
| Spacing | Skala 4px `[4, 8, 12, 16, 24, 32, 48, 64, 96, 128]`. |
| Motion | Lenis untuk scroll halaman, GSAP / ScrollTrigger untuk cerita scroll, Framer Motion untuk transisi komponen existing. Hormati reduced motion. |
| CSS | `src/app/globals.css` tetap menjadi entrypoint. Aturan global dipisah berdasarkan fungsi; style section tetap dekat dengan feature-nya. |
| Reuse | Cari inventory sebelum menambah komponen. Shared memerlukan kontrak yang sama dan penggunaan lintas konteks yang nyata. |

## 1.1 Baseline implementasi dan refinement

Gunakan nilai berikut sebagai baseline. Review saat development boleh menyesuaikannya bila konten, responsif, atau aksesibilitas menunjukkan alasan yang jelas:

- Tombol utama solid, tautan sekunder berupa teks, tombol ikon untuk aksi yang jelas, dan sudut 0–2px.
- Target sentuh 44px sebagai preferensi internal; ini lebih besar dari minimum WCAG 2.2 AA dan tidak boleh disebut sebagai ambang minimum WCAG AA.
- Gutter 20–64px (mulai dengan `clamp(20px, 4vw, 64px)`), max-width 1440px, dan lebar baca narasi sekitar 65ch.
- Komposisi berubah mengikuti ruang baca. Timeline tetap berada dalam alur dokumen tanpa stage sticky.
- Jalur Life Points adalah satu garis 3D besar yang membentang dari atas ke bawah dan menyapu kiri-kanan di sekitar bab cerita. Proyeksi jalur mengikuti rasio stage supaya tidak terpotong; layer-nya berada di atas gutter dan di belakang copy. Framer Motion mengungkap bab satu per satu. Nama dan screenshot proyek tetap di Selected Work; untuk sementara satu portrait Alfi muncul di bab masa kini. SVG responsif menjadi fallback. Motif jaring terpisah dari Timeline dan menunggu review tersendiri.
- Opacity/tint abu-abu diperiksa terhadap kontras pada permukaan aktual sebelum dipakai untuk teks atau kontrol.

Skala 4px tetap menjadi keputusan spacing yang telah dipilih. Acceptance responsif berlaku untuk seluruh homepage; titik pada matriks adalah sampel pemeriksaan, bukan breakpoint.

## 2. Token warna

Nama token berikut adalah usulan untuk implementasi; maknanya mengikuti aturan brand.

| Token semantik | Permukaan terang | Permukaan gelap |
| --- | --- | --- |
| `canvas` | `#FFFFFF` | `#12110D` (Hero existing) |
| `ink` | `#000000` | `#F0E7D4` (display text Hero existing) |
| `text-secondary` | Hitam dengan opacity yang cukup untuk kontras teks | Putih dengan opacity yang cukup untuk kontras teks |
| `border-subtle` | Hitam dengan opacity rendah | Putih dengan opacity rendah |
| `focus` | Hitam, dengan outline yang terlihat | Putih, dengan outline yang terlihat |

Nilai opacity final belum dikunci. Setiap nilai teks sekunder harus lulus kontras minimal `4.5:1` untuk teks normal dan `3:1` untuk teks besar. Border tidak boleh menjadi satu-satunya penanda state penting. Hindari membuat ramp abu-abu yang tidak memiliki pemakaian.

## 3. Token typography

| Token semantik | Sumber font | Pemakaian |
| --- | --- | --- |
| `font-display` | Akira | Hero dan judul pendek yang membawa identitas. |
| `font-body` | Geist | Narasi, deskripsi proyek, dan isi halaman. |
| `font-ui` | Geist | Navigasi, tombol, label, field, dan instruksi. |

Pemetaan font token ke file CSS belum diterapkan. Saat implementasi, token display harus merujuk font Akira yang sudah diregistrasikan proyek; token body/UI menggunakan Geist. Layout dan `globals.css` perlu ditinjau bersama agar nama variable tidak mengarah ke dirinya sendiri.

Skala berikut adalah titik awal yang diusulkan untuk review, bukan keputusan final per ukuran:

| Peran | Ukuran awal | Catatan |
| --- | --- | --- |
| Hero/display | `clamp(48px, 9vw, 128px)` | Ukur ulang untuk bentuk huruf Akira dan lebar layar. |
| Heading section | `clamp(32px, 5vw, 72px)` | Hindari judul panjang dalam Akira. |
| Subheading | `clamp(24px, 3vw, 40px)` | Akira hanya jika judul tetap pendek; selain itu Geist. |
| Body | `16px` atau lebih | Line-height awal `1.5–1.7`; utamakan keterbacaan. |
| Label | `12–14px` | Geist, kontras cukup, tracking secukupnya. |

## 4. Token spacing dan layout

Skala yang dipilih Alfi:

| Token | Nilai |
| --- | ---: |
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-24` | 96px |
| `space-32` | 128px |

Aturan layout:

- Gutter halaman memakai nilai responsif `clamp(20px, 4vw, 64px)` sebagai baseline dan disesuaikan saat konten memerlukan komposisi baru.
- Lebar konten utama maksimal `1440px`.
- Copy panjang dibatasi sekitar `65ch`.
- Section memakai jarak dari skala yang sama tetapi tidak harus sama satu sama lain. Tentukan jarak dari hubungan isi dan ritme baca.
- Breakpoint mengikuti saat komposisi tidak lagi muat atau urutan baca mulai membingungkan; jangan menetapkan breakpoint hanya untuk menyesuaikan satu screenshot.

## 5. Kontrak kontrol

| Jenis | Appearance | Aturan penggunaan |
| --- | --- | --- |
| Aksi utama | Fill solid hitam di latar putih atau fill putih di latar hitam; teks dibalik. | Satu aksi utama per konteks; tidak memakai gradient atau shadow dekoratif. |
| Aksi sekunder | Tautan teks dengan focus/hover state terlihat. | Untuk aksi lanjutan yang bukan prioritas utama. |
| Aksi ikon | Ikon tanpa label visual. | Hanya saat ikon cukup jelas; nama aksesibel dan target interaksi tetap tersedia. |

Gunakan sudut `0–2px`, target interaksi minimal `44 × 44px`, dan focus indicator yang kontras. Jangan memakai tombol sebagai dekorasi atau membuat link nonaktif tampak sebagai aksi.

## 6. Motion dan Flip Text

| Tanggung jawab | Sistem |
| --- | --- |
| Scroll halaman | Satu instance Lenis root, dengan native scroll, anchor, touch, keyboard, dan scroll dua arah tetap berfungsi. |
| Hero entrance | Mulai setelah halaman dan font siap. Pertahankan komposisi dan state entrance persisten; choreograph lockup, wordmark, portrait, lalu copy dalam alur sekitar 10 detik. Reduced motion menampilkan hero langsung. Timing terpusat di `src/features/home/hero/heroMotion.ts`. |
| Jalur Life Points | Satu garis 3D melengkung mengalir dari atas ke bawah di sekitar bab cerita. Proyeksi disesuaikan dengan rasio stage, aman dari tepi frame, dan berada di atas gutter tetapi di belakang copy. Progress mengikuti GSAP / ScrollTrigger; narasi HTML terungkap dengan Framer Motion. SVG menjaga fallback. |
| Handoff Journey → Selected Work | Jalur Timeline berhenti pada terminal vertikal di batas section. Kanvas berubah bersih dari putih ke hitam tanpa meneruskan garis 3D ke Works. Judul pembuka Works muncul ketika scene mendekati 80% viewport dan reveal dapat diputar ulang; reduced motion menampilkan judul langsung. |
| Motif web | Motif web terpisah dari jalur Timeline. Gunakan web yang mempunyai anchor dan susunan strand yang terbaca; tiap crossing harus tergabung dalam pola yang sengaja dirancang. Penempatan dan model visual masih menunggu review. |
| Transisi komponen existing | Framer Motion tetap menangani bagian yang sudah menggunakannya. Tidak ada migrasi menyeluruh ke GSAP. |
| Reveal section | Reveal berjalan saat section masuk viewport dan tetap pada state akhir ketika pengguna scroll naik. State section di-reset hanya ketika scroll kembali ke area paling atas/Hero; kunjungan turun berikutnya memutar reveal lagi. Untuk section full-height, mulai reveal sekitar 80% terlihat. Hero mempertahankan state entrance persisten yang sudah ada. Reduced motion menampilkan isi langsung. Adegan yang terikat langsung pada progres scroll tetap mengikuti progres naik dan turun. |
| Selected Work | Setiap proyek memakai komposisi eksplisit dari data: lebar gambar, posisi copy, rasio media, dan offset dapat bervariasi tanpa pola kiri-kanan yang seragam. Reveal ditautkan ke titik tengah gambar dan bertahan saat scroll naik; kartu di-reset saat kembali ke area Hero, lalu diputar lagi pada kunjungan turun berikutnya. Jarak yang lebih besar memberi waktu melihat tiap proyek. |
| Label interaktif terpilih | Flip Text satu kali saat hover atau `focus-visible`, tanpa loop. Pada touch atau reduced motion, teks statis. |

> Satu properti animasi pada satu elemen memiliki satu pemilik. Gerak harus mengikuti input, tidak menghalangi membaca, dan menyediakan versi reduced motion yang tetap menampilkan semua isi.

### Finish visual scene Timeline 3D

- Scene akhir memiliki bentuk, proporsi, dan transisi yang dirancang; geometri placeholder atau material default tidak diterima sebagai hasil final.
- Material/texture mendapat treatment yang sengaja dipilih. Permukaan dapat halus atau memiliki detail tekstur yang sangat terkontrol; hindari noise generik atau tekstur yang mengganggu bacaan.
- Cahaya membentuk hierarki dan bayangan memberi kontak/kedalaman. Keadaan milestone aktif terbaca tanpa mengubah setiap chapter menjadi lighting show tersendiri.
- Tinjau scene pada keadaan awal, milestone aktif, dan satu transisi. Alfi memberi feedback visual selama development; refinement termasuk dalam pekerjaan sampai hasil siap dipublikasikan.
- Arah warna tetap gelap/netral di kanvas putih dan mengikuti Hero sebagai sumber hierarchy serta restraint; media asli mempertahankan warna sumbernya.
- Jaring adalah penghubung naratif, bukan lapisan yang menutup copy atau bukti proyek. Kepadatan dan arah serat berubah sesuai cerita yang dibawa tiap section.

## 7. Aturan komponen

1. Cari komponen dan pola yang sudah ada sebelum membuat yang baru.
2. Gunakan komponen existing jika semantics, behavior, aksesibilitas, dan kontraknya sesuai.
3. Biarkan scene atau komposisi khusus tinggal di feature pemiliknya.
4. Ekstrak ke shared bila tanggung jawab yang sama benar-benar dipakai pada sedikitnya dua konteks, atau merupakan fondasi lintas halaman yang perlu konsisten.
5. Setiap komponen shared harus memiliki consumer aktif atau peran global yang dijelaskan.
6. Tokenisasikan nilai yang berulang dan perlu berubah bersama; jangan membuat utility atau token tanpa consumer.

Modular berarti satu tanggung jawab punya satu implementasi yang digunakan ulang. Memindahkan file ke folder `shared` tanpa consumer tidak memenuhi aturan reuse.

## 8. Struktur CSS global

`src/app/globals.css` tetap menjadi entrypoint. File itu diimpor dari root layout dan mengimpor stylesheet global berdasarkan fungsi:

| File yang direncanakan | Tanggung jawab |
| --- | --- |
| `src/app/styles/colors.css` | Token semantik untuk permukaan gelap Hero, teks ivory/off-white, netral tenang, serta kanvas putih About; nilai teks dan opacity diperiksa pada permukaan aktual. |
| `src/app/styles/typography.css` | Peran font, token type, dan hierarchy global. |
| `src/app/styles/spacing.css` | Skala spacing, gutter, batas konten, dan token layout global. |
| `src/app/styles/motion.css` | Easing/duration global yang dipakai lintas komponen serta aturan reduced motion. |
| `src/app/styles/base.css` | Reset ringan, elemen dasar, focus, dan accessibility baseline. |
| `src/app/styles/utilities.css` | Helper global yang mempunyai consumer nyata. |

Urutan import yang diusulkan: import framework (`tailwindcss` dan stylesheet plugin yang sudah digunakan), lalu colors, typography, spacing, motion, base, dan utilities. Konfirmasi urutan aktual saat implementasi supaya token tersedia sebelum dipakai dan aturan framework existing tidak tertimpa.

Style khusus hero, About, atau Timeline tetap di stylesheet milik feature. Jangan memindahkan selector satu section ke global hanya demi menambah jumlah file. Next.js mendukung import CSS global dari root layout; Tailwind `@theme` digunakan untuk token yang memang perlu menghasilkan utility, sedangkan CSS variable biasa cocok untuk semantic token tanpa utility terkait. Lihat dokumentasi [Next.js App Router CSS](https://nextjs.org/learn/dashboard-app/css-styling) dan [Tailwind theme variables](https://tailwindcss.com/docs/theme).

## 9. Responsif dan aksesibilitas

Responsif adalah perubahan komposisi sesuai ruang yang tersedia. Mobile punya komposisi yang dirancang sendiri; layout tidak sekadar dikecilkan dari desktop.

### Aturan layout

- Mulai dari lebar sempit, lalu lebarkan layout. Tambahkan breakpoint saat copy, media, navigasi, atau kontrol mulai tidak muat dengan baik; jangan mengikat breakpoint pada model perangkat tertentu.
- Rancang tiga keadaan komposisi: sempit, menengah, dan lebar. Keadaan menengah harus punya keputusan sendiri, bukan kolom mobile yang melebar berlebihan atau grid desktop yang dipadatkan.
- Urutan DOM mengikuti urutan baca dan kronologi. Jangan menyembunyikan informasi penting pada layar kecil atau memindah urutan visual hingga bertentangan dengan urutan keyboard/pembaca layar.
- Gunakan lebar fluid dan konten yang dapat membungkus. Media tidak melewati container atau terdistorsi. Hindari lebar tetap pada elemen yang harus menyusut; jangan memakai `overflow: hidden` untuk menutupi kegagalan layout.
- Terapkan gutter responsif 20–64px dan skala spacing yang disepakati. Ruang section pada layar sempit dapat memakai langkah yang lebih kecil; jangan membawa padding 96–128px ke semua viewport tanpa alasan konten.
- Body copy tetap minimal 16px sebagai nilai awal; gunakan `clamp()` untuk display bila perlu dan pastikan pembesaran teks tidak memotong isi. Narasi panjang tetap sekitar 65ch.
- Pertahankan minimal `44 × 44px` untuk area kontrol dan beri jarak yang cukup agar target berdekatan tidak mudah salah tekan.
- Navigasi memiliki susunan compact yang jelas; jangan mengecilkan row desktop sampai link bertumpuk atau tersembunyi tanpa penanda. Bila ada elemen fixed/sticky, sediakan ruang konten dan safe-area yang dibutuhkan agar konten serta keyboard focus tidak tertutup.
- Setiap aksi harus bekerja dengan pointer, keyboard, dan touch. Jangan menjadikan hover satu-satunya cara membuka isi atau menjalankan kontrol.

### Perilaku section

| Section | Sempit | Menengah | Lebar |
| --- | --- | --- | --- |
| Hero | Pertahankan identitas dan hierarchy; atur ulang ukuran/posisi agar nama, portrait, dan navigasi tidak bertabrakan. Tombol Resume tetap satu kontrol dengan tampilan konsisten di ponsel dan desktop. Kartu kiri bawah tetap dihapus. | Ubah komposisi saat ruang mulai cukup; jangan memaksakan layout sempit yang melebar atau desktop yang belum muat. | Pertahankan opening yang sudah disukai; CTA Resume terlihat sebagai tombol yang jelas, bukan label kecil di tengah gambar. |
| About | Perkenalan tersusun vertikal: judul lalu narasi, dengan jarak cukup untuk dibaca. | Pertahankan urutan vertikal sampai lebar memberi judul dan narasi ruang baca yang cukup; setelah itu beralih ke grid 12 kolom dengan offset vertikal kecil. | Pertahankan komposisi dua titik fokus yang seimbang; hindari jarak kosong ekstrem atau pergeseran besar. |
| Timeline | Gunakan rail graphite yang cukup terlihat di gutter kiri; setiap bab menata copy dan portrait ke urutan vertikal. Konten tidak bergantung pada hover atau WebGL. | Kecilkan lebar sapuan jalur ketika item mulai kehilangan ruang baca. Copy tetap punya jarak jelas dari rail. | Gunakan progressive enhancement Three.js; akhiri segmen terakhir lurus di batas section. SVG memberi jalur dan marker yang setara bila WebGL tidak dipakai atau gagal. |
| Selected Work, What I’m Into, Contact | Selected Work menata gambar dan copy dalam variasi yang sengaja dipilih per proyek; jeda vertikal tetap terasa pada stack sempit. What I’m Into mempertahankan scroll horizontal yang dapat disentuh. Contact menjaga semua tautan sosial terlihat dan mudah dijangkau. | Biarkan proyek bergeser dari stack ke komposisi asimetris saat kolom mulai muat; jangan memaksakan grid desktop yang sempit. | Biarkan komposisi melebar sampai max-width 1440px; jangan memanjangkan paragraf mengikuti layar. Tautan GitHub, LinkedIn, dan Instagram berasal dari satu daftar sosial. |

Acceptance responsif berlaku untuk seluruh homepage. Tabel perilaku layout memberi rekomendasi komposisi; matriks viewport memberi titik pemeriksaan yang disepakati, bukan breakpoint CSS. Pilih breakpoint ketika konten memerlukan komposisi baru. Gunakan tinggi viewport dan orientasi saat menilai kolom, ruang media, dan panjang cerita.

### Matriks pemeriksaan responsif

Lebar berikut adalah titik review, bukan nilai breakpoint. Resize melewati seluruh rentang dan periksa area di antara titik-titik itu.

| Skenario | Viewport CSS untuk review | Hasil yang diharapkan |
| --- | --- | --- |
| Ponsel ringkas | 320, 360, 390, dan 430px | Satu alur baca, kontrol mudah disentuh, teks tidak terpotong, tanpa scroll horizontal halaman. |
| Rentang menengah | 600, 768, 900, dan 1024px | Layout punya keadaan transisi yang disengaja; kolom teks/media hanya muncul ketika isi tetap nyaman dibaca. |
| Layar lebar | 1280, 1440, dan 1920px | Konten berhenti di max-width 1440px; narasi tetap sekitar 65ch; ruang tambahan tidak memperbesar semua elemen. |
| Tinggi pendek / landscape | Contoh 568 × 320px dan 844 × 390px | Tidak ada panel yang memaksa seluruh copy masuk satu viewport; Timeline tetap mengalir normal tanpa stage sticky. |
| Reflow / pembesaran | 320 CSS px; 400% zoom dari viewport awal 1280px; pembesaran teks 200% | Informasi dan fungsi tetap tersedia tanpa scroll dua arah untuk konten biasa, tanpa kehilangan fokus atau kontrol. |

WCAG 2.2 Reflow memakai lebar 320 CSS px sebagai acuan untuk konten yang dibaca vertikal. Pedoman responsive web juga menyarankan breakpoint mengikuti titik ketika konten butuh perubahan layout, bukan daftar ukuran perangkat. Rujukan: [W3C: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [web.dev: media queries dan content-based breakpoints](https://web.dev/learn/design/media-queries), dan [web.dev: responsive web design basics](https://web.dev/articles/responsive-web-design-basics).

### Aksesibilitas lintas ukuran

- Gunakan HTML untuk narasi meskipun scene visual memakai canvas.
- Teks normal memenuhi kontras `4.5:1`; teks besar `3:1`; kontrol/focus penting `3:1`.
- Semua aksi dapat dijangkau keyboard dan memiliki nama aksesibel. Pastikan focus ring tidak tertutup header, scene visual, atau tombol mengambang.
- Jangan menonaktifkan zoom. Periksa reflow pada 320 CSS px dan pembesaran teks 200%.
- Pada reduced motion, matikan smoothing dan sajikan cerita secara linear dengan gerak minimal.
- Pertahankan kontras kontrol saat permukaan berpindah dari putih ke hitam.

## 10. Checklist sebelum menambah pola UI

- Apakah ada pola atau komponen dengan tanggung jawab yang sama?
- Apakah pola ini muncul di lebih dari satu konteks nyata?
- Bila dibuat shared, siapa consumer-nya sekarang?
- Apakah warna, type, spacing, dan motion mengikuti token yang sudah disepakati?
- Apakah kontrol punya tujuan jelas, focus terlihat, dan ukuran target cukup?
- Apakah versi mobile dan reduced motion tetap menyampaikan isi yang sama?

Opacity dan komposisi akhir dapat disesuaikan saat implementasi; perubahan harus tetap memenuhi kontras, hierarki, serta aturan finish visual. Breakpoint mengikuti kebutuhan konten, bukan angka per device. Motif web tidak dianggap final sampai topology, lighting, dan penempatannya direview Alfi.
