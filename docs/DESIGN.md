# Guideline desain portfolio Alfi

Tanggal: 7 Oktober 2026  
Status: Arah visual diperbarui setelah review Alfi. Hero menjadi acuan sistem; Life Points bercerita lewat bab tanpa nomor, kategori, proof label, maupun screenshot proyek. Satu jalur 3D besar mengalir dari atas sampai batas Works. Motif web dipisahkan dari Life Points dan masih dieksplor. Acceptance responsif berlaku untuk seluruh homepage.  
Sumber arah: brief dan pilihan Alfi dalam percakapan  
Antislop: During, pilihan untuk sesi ini; belum disimpan sebagai preferensi global

Dokumen terkait: [PRD](PRD.md), [SRS](SRS.md), [Brand Guidelines](BRAND_GUIDELINES.md), [Design System](DESIGN_SYSTEM.md), dan [rancangan awal](portfolio-about-life-points-design.md).

## 1. Tujuan dan arah dari Alfi

Alfi ingin portfolio pribadinya dilirik banyak orang, memberi kesan bahwa dirinya punya karya serta penyajian yang menarik, dan membuat pengunjung penasaran melihat lebih jauh. Kesan tersebut harus terhubung dengan Alfi dan karyanya. Review pengalaman pengunjung menentukan apakah arah itu berhasil.

Arahan yang sudah diberikan Alfi:

- Hero saat ini disukai; perubahan di hero adalah penghapusan kartu kiri bawah.
- Mark abstrak bergaya spark dengan kesan A yang dinamis dipilih sebagai identitas simbol Alfi; bentuknya mengikuti aset utama yang disepakati, bukan logo baru untuk tiap section.
- Logo utama tersedia dalam SVG putih dan versi hitam; ikon browser/perangkat memakai mark yang sama dalam wadah gelap.
- Hero existing menjadi acuan bahasa visual; gunakan keluarga hitam, ivory/off-white, dan neutral lembut. About memakai latar putih. Hindari aksen hue dekoratif; foto dan artefak asli mempertahankan warna sumbernya.
- About setelah hero memakai latar putih dan storytelling perjalanan sejak awal kuliah sampai sekarang.
- Struktur homepage disepakati: Hero → About → Timeline / My Journey → Selected Work → What I’m Into → Get in Touch.
- About menjadi perkenalan singkat yang mengalir ke Timeline; parallax storytelling dan kemungkinan 3D ditempatkan di Timeline. Works menyediakan akses langsung ke proyek.
- Storytelling merespons scroll dan dapat memakai parallax dengan gerak yang terasa smooth.
- Jalur Timeline menjadi visual besar yang mengalir sepanjang komposisi milestone; tidak memakai stage sticky terpisah.
- Responsif dan sederhana dalam penggunaan tetap menjadi prioritas.
- Sistem motion dibagi menurut tugasnya: Lenis untuk rasa scroll halaman, GSAP / ScrollTrigger untuk adegan scroll storytelling, dan Framer Motion yang sudah dipakai proyek untuk transisi komponen.
- Flip Text dari ObsidianUI dipilih untuk beberapa label link atau aksi, bukan seluruh teks.
- Komposisi khas tetap dimiliki section-nya; elemen yang benar-benar berbagi fungsi dan bentuk perilaku memakai implementasi bersama.
- Satu garis 3D yang melengkung dan asimetris menjadi visual Life Points; scroll menggambar jalur dan mengungkap bab cerita satu per satu. Motif web menjadi elemen terpisah; topology dan penempatannya menunggu eksplorasi visual lebih lanjut.

Geometri, marker, treatment permukaan, timing, dan komposisi per milestone akan ditinjau selama development. Detail visual tidak boleh diasumsikan sebagai fakta biografi atau menggantikan konfirmasi cerita.

## 2. Design Read dan dials

Reading this as: portfolio pribadi untuk pengunjung umum, recruiter, dan calon kolaborator, dengan visual tegas dan storytelling sinematik, dial ENERGY 3 / RHYTHM 3 / MOTION 3.

Ini adalah interpretasi brief Alfi untuk scope hero/About. Dials menjadi acuan storyboard dan implementasi berikutnya, dengan adaptasi mobile serta reduced motion yang disebutkan di bawah.

| Dial | Interpretasi | Bukti yang dicari dalam desain |
| --- | --- | --- |
| ENERGY 3 | Menarik perhatian dengan cepat | Satu fokus dominan, judul yang punya karakter, dan media yang terasa dipilih dengan sengaja. |
| RHYTHM 3 | Komposisi bervariasi mengikuti cerita | Adegan perkenalan, momen perubahan, dan bukti pekerjaan memiliki penekanan berbeda; urutan baca tetap konsisten. |
| MOTION 3 | Scroll menggerakkan cerita secara sinematik | Jalur besar dan reveal milestone memperkenalkan perjalanan aktif tanpa mengunci scroll atau menutupi copy. |

Energy tidak ditentukan oleh jumlah efek. Rhythm tidak mengharuskan tiap adegan mengganti semua posisi. Motion tetap memberi waktu membaca dan mengikuti input pengunjung.

## 3. Identitas dan hierarki

Mark logo abstrak milik Alfi menjadi simbol identitas lintas halaman. Gunakan SVG putih pada latar gelap dan SVG hitam pada latar terang; jangan mengubah proporsi, menambahkan efek, atau menggambar ulang mark per section. Ikon browser/perangkat mempertahankan mark yang sama. Aset final berada di `public/logo/logo.svg`, `public/logo/logo-black.svg`, `public/icon.svg`, dan ikon terkait yang dirujuk oleh metadata.

Akira dipakai pada hero dan judul display pendek; Geist dipakai untuk narasi serta seluruh UI, termasuk navigasi, tombol, dan label. Akira mengikat section dengan hero yang sudah disukai, sementara Geist menjaga isi dan kontrol tetap ringkas serta mudah dibaca. Flip Text menganimasikan label terpilih tanpa mengganti typeface.

Setiap adegan memiliki satu fokus utama. Tanggal dan teks pendukung membantu pengunjung memahami fokus tersebut. Jika parallax dipilih, gunakan pada lapisan yang menambah kedalaman tanpa mengganggu narasi; tidak semua lapisan perlu bergerak. Komposisi final mengikuti storyboard yang direview.

Visual Life Points memakai satu garis graphite yang membentuk sapuan besar kiri-kanan dari atas sampai bawah dan berubah kedalaman untuk memberi bentuk 3D. Awal garis tetap masuk ke dalam frame; ujungnya diteruskan ke batas Works agar section berikutnya menutupi ujung tabung. Garis dan ring marker berada di atas kolase, sedangkan copy memakai difference blending agar hitam di bidang putih dan putih saat jalur melintas di belakangnya. Ring selalu terlihat sejak awal reveal. Bayangan padat dan lembut pada tile memberi kesan menempel di dinding. Tile ASCII memakai karakter yang mengikuti luminance bentuk grayscale atau foto, bukan glyph berulang yang menutupi seluruh tile. Tidak ada garis cabang atau jaring pada cerita ini. Nama dan screenshot proyek tetap berada di Selected Work.

Motif web tidak dipakai pada Timeline. Eksplorasi bentuk web berikutnya harus menunjukkan struktur yang terbaca: strand utama bertumpu pada anchor yang jelas, ada pusat yang sengaja tidak di tengah, dan benang penghubung mengikuti pola yang tersusun. Bentuknya dapat terlipat dan tidak simetris, tetapi setiap crossing harus terasa sebagai bagian dari struktur. Hindari kurva bebas tanpa hubungan, ujung lepas acak, dan bayangan duplikat yang membuat coretan. Baca [catatan eksplorasi web](spider-web-visual-research.md) untuk hasil referensi dan konsep awal.

## 4. Alasan keputusan besar

| Keputusan | Alasan satu kalimat | Status |
| --- | --- | --- |
| Mempertahankan opening hero | Alfi sudah menyukai komposisi dan karakter visual opening sekarang. | Arahan Alfi |
| Menghapus kartu kiri bawah | Alfi menilai kartu tersebut dipaksakan dan mengurangi kejernihan hero. | Arahan Alfi |
| Memakai mark logo abstrak sebagai identitas | Bentuk spark/A yang dipilih memberi simbol ringkas yang dapat dipakai konsisten pada logo dan ikon. | Disepakati Alfi |
| Membagi peran library motion | Lenis, GSAP, dan Framer Motion menangani jenis gerak yang berbeda tanpa migrasi luas atau dua pengendali pada elemen yang sama. | Disepakati Alfi |
| Flip Text pada label terpilih | Flip karakter memberi respons yang terasa saat pengunjung berinteraksi dengan link atau aksi penting. | Disepakati Alfi; adaptasi dari [ObsidianUI Flip Text](https://www.obsidianui.dev/docs/flip-text) |
| Feature-first dengan reuse terukur | Struktur scene boleh unik; shared dipakai untuk tanggung jawab yang konsisten agar perubahan bersama tidak membuat abstraction yang tidak terpakai. | Disepakati Alfi |
| About putih dengan teks gelap | Alfi meminta latar putih agar cerita setelah hero terasa lebih bersih dan mudah dibaca. | Arahan Alfi |
| Judul display memakai Akira | Typeface existing menghubungkan judul pendek dengan identitas hero yang disukai. | Disepakati Alfi |
| Narasi dan UI memakai Geist | Satu sans family untuk isi dan kontrol menjaga keterbacaan serta konsistensi antarsection. | Disepakati Alfi |
| Hero sebagai acuan visual | Hero memberi sumber untuk hierarchy, typography, kontras, dan palet netral; About memakai kanvas putih. | Arahan Alfi |
| Whitespace mengikuti fokus cerita | Ruang memisahkan narasi dari visual yang bergerak agar perhatian tidak terpecah. | Usulan turunan |
| Satu milestone aktif per adegan | Pengunjung dapat memahami satu perubahan hidup sebelum berpindah ke periode berikutnya. | Usulan turunan |
| Timeline sebelum Selected Work | Pengunjung mengenal perjalanan Alfi sebelum melihat bukti hasil kerjanya. | Disepakati Alfi |
| About singkat mengalir ke Timeline | Perkenalan dan perjalanan punya fungsi berbeda tanpa mengulang narasi milestone. | Disepakati Alfi |
| Works dapat diakses langsung | Pengunjung yang ingin segera menilai proyek dapat menjangkaunya melalui navigasi. | Disepakati Alfi |
| Storytelling scroll dan parallax | Alfi meminta storytelling setelah hero yang merespons scroll dengan parallax sederhana dan smooth. | Arahan Alfi; jalur Timeline asimetris dan reveal bertahap disetujui, web dipisahkan untuk eksplorasi visual |
| Layout mobile tersendiri | Pengunjung layar kecil perlu narasi penuh dan urutan baca yang nyaman. | Turunan prioritas responsif |
| Tile visual perjalanan | Tiap bab memakai tile abstrak ASCII yang membentuk gambar lewat luminance. Foto asli dapat menggantikannya nanti; screenshot proyek tetap berada di Selected Work. | Arahan Alfi; placeholder sementara disetujui |
| Jalur abstrak Life Points | Satu garis besar melintasi seluruh komposisi dari atas sampai bawah; bab naratif bergantian kiri-kanan di sekitarnya, tanpa nomor dan label ala project card. Tidak memakai stage sticky. | Diperbarui dari arahan Alfi; motion dan finish dipoles melalui review visual |
| Motif jaring | Web berada terpisah dari visual Timeline. Hasil sebelumnya dihentikan karena terbaca sebagai garis acak. | Arah pemisahan disetujui; topology dan lokasi akhir masih dieksplor |

Teknik tambahan seperti gradient, glass, shadow, ikon, atau card harus mempunyai alasan yang sama jelas. Antislop menguji kegunaan teknik tersebut; guideline ini tidak menyamakan desain yang menarik dengan daftar teknik yang dilarang.

## 5. Warna, typography, dan spacing

- Latar About putih; teks utama gelap; teks pendukung tetap memenuhi kontras yang diperlukan.
- Hero menjadi referensi bahasa visual: bidang gelap, tipografi ivory/off-white, dan netral yang tenang. Terapkan hierarki dan restraint yang sama tanpa memaksakan latar gelap Hero ke section lain; About tetap memakai kanvas putih dengan permukaan dan teks hitam/netral. Hindari aksen hue dekoratif.
- Foto dan artefak proyek mempertahankan warna sumbernya. Warna pada media asli bukan warna token UI.
- Nilai abu-abu dan opacity final mengikuti pemeriksaan kontras pada latar aktual, termasuk teks serta focus state.
- Akira digunakan pada hero dan judul display pendek. Geist digunakan untuk narasi, navigasi, tombol, dan label UI. Skala judul mengikuti viewport; narasi dapat wrap serta zoom tanpa terpotong.
- Skala spacing 4px (4, 8, 12, 16, 24, 32, 48, 64, 96, dan 128px) telah dipilih. Gutter 20–64px, max-width 1440px, dan lebar narasi sekitar 65ch menjadi baseline; sesuaikan dengan isi dan responsif. Jarak judul ke narasi lebih dekat daripada jarak ke milestone berikutnya sebagai hierarchy.
- Radius dan shadow menandai fungsi atau kedalaman tertentu bila diperlukan; Hero existing dan tile abstrak menjadi titik awal untuk menjaga rasa visual tetap konsisten.

## 6. Rules motion dan 3D

- Lenis menghaluskan input scroll halaman tanpa mengambil alih perilaku scroll browser; konfigurasi menghormati `prefers-reduced-motion`.
- GSAP / ScrollTrigger mengatur progres jalur Life Points. Framer Motion mengungkap item milestone satu per satu; properti animasi pada satu elemen memiliki satu pemilik.
- Framer Motion tetap dipakai untuk transisi komponen yang telah menggunakannya. CSS cukup untuk state sederhana seperti hover warna atau underline. Jangan migrasikan seluruh site atau biarkan lebih dari satu library mengubah properti animasi yang sama.
- Selaraskan Lenis dengan ticker GSAP saat keduanya mengendalikan pengalaman scroll agar progres dan animasi tidak berjalan pada loop frame yang saling berlomba.
- Satu progres scroll menjadi sumber untuk adegan aktif dan gerak parallax terpilih agar animasi tidak berjalan sendiri-sendiri.
- Setiap perubahan transform atau opacity punya tujuan: memperkenalkan milestone, memisahkan kedalaman, mengalihkan fokus, atau melepaskan adegan menuju Projects.
- Lapisan terpilih boleh merespons scroll bila mendukung cerita. Gerak pendukung lebih halus dan tidak menyaingi narasi aktif.
- Scroll ke atas mengembalikan progression sebelumnya. Gerak mengikuti input dan tidak memaksa pengguna menunggu timer untuk melanjutkan.
- Flip Text terinspirasi komponen ObsidianUI dan hanya dipakai pada label interaktif yang dipilih. Efek ini menganimasikan typeface yang sudah ditetapkan, bukan menambah font. Flip karakter dengan stagger singkat sekali ketika hover atau `focus-visible`; jangan membuat loop. Berikan nama aksesibel yang tetap terbaca sebagai satu frasa. Pada layar touch dan reduced motion, tampilkan label statis.
- Animasi sederhana memakai easing yang halus dan berakhir tanpa pantulan. Hindari animasi dekoratif yang terus berjalan atau menumpuk pada satu target.
- Jalur visual Timeline dan cerita berada pada stage daftar yang sama; tidak ada panel sticky terpisah.
- Scene Three.js menampilkan satu garis gelap yang melengkung dalam ruang, tebal, dan bersapuan lebar di sepanjang daftar. Copy/media menempati komposisi bergantian dan tetap terbaca. Ring marker selalu terlihat; SVG fallback mempertahankan kurva, marker, kontras, dan handoff ke Works. Motif web terpisah dan tidak ikut dirender oleh stage Timeline.
- Narasi tetap HTML yang dapat dipilih dan dibaca; scene visual mengikuti data yang sama.
- Mode reduced motion memakai alur cerita lengkap dengan gerak minimal. Kualitas renderer boleh dikurangi tanpa mengurangi isi cerita.

Rujukan integrasi: [Lenis](https://github.com/darkroomengineering/lenis), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), dan [ObsidianUI Flip Text](https://www.obsidianui.dev/docs/flip-text). Contoh Flip Text diadaptasi ke Framer Motion existing agar tidak menambah dependency motion terpisah.

## 7. Responsif dan interaksi

Acceptance responsif berlaku pada semua section homepage. Pertahankan karakter Hero sebagai acuan visual. Timeline tetap non-sticky; item dan media mengalir secara vertikal saat layar menyempit dan jalur mengikuti seluruh tinggi daftar. Parallax tambahan hanya dipakai bila membantu cerita; breakpoint mengikuti kebutuhan konten.

Breakpoint ditentukan ketika konten memerlukan perubahan komposisi, bukan dari nama atau lebar model perangkat. Hindari hanya menyediakan layout ponsel dan desktop sambil membiarkan tablet/small laptop menjadi state yang tidak terancang. Periksa juga viewport pendek, landscape, urutan keyboard, zoom, dan reflow 320 CSS px. [Design System bagian 9](DESIGN_SYSTEM.md#9-responsif-dan-aksesibilitas) memuat keadaan layout serta matriks lebar untuk review.

Usulan kontrol memakai tombol utama solid dengan warna hitam/putih terbalik sesuai latar, tautan sekunder berupa teks, dan tombol ikon hanya untuk aksi yang memang ikon-only. Sudut tombol 0–2px serta target sentuh 44px adalah nilai awal untuk review Design System, dengan focus state terlihat dan tanpa efek dekoratif tanpa tujuan. Flip Text digunakan hanya pada label terpilih.

Usulan checklist responsif mencakup tinggi viewport, perubahan orientasi, zoom 200%, dan rentang ukuran di antara breakpoint. Jangan menutupi overflow konten penting hanya untuk membuat screenshot terlihat rapi. Semua kontrol mempunyai tujuan nyata dan focus keyboard yang terlihat; target sentuh 44px adalah nilai internal yang masih menunggu Design System review.

Kontras teks normal minimal 4.5:1, teks besar 3:1, dan penanda fokus/kontrol penting 3:1 terhadap area yang bersebelahan. Pasangan warna perlu dihitung; teks yang melewati foto diperiksa pada seluruh area lintasannya.

## 8. Konten dan kondisi visual

| Kondisi | Pengalaman yang dirancang |
| --- | --- |
| Chapter terkonfirmasi tersedia | Tampilkan judul naratif dan cerita singkat tanpa eyebrow, nomor, atau kategori. |
| Foto pribadi belum tersedia | Tampilkan tile abstrak ASCII sebagai dummy visual dengan karakter berdasarkan luminance. Jangan membuat kesan bahwa tile tersebut menggambarkan kenangan atau event tertentu. |
| Scene 3D sedang dimuat | HTML cerita dan navigasi tersedia; loading visual hanya menjelaskan visual yang belum siap bila diperlukan. |
| Scene/asset gagal | Pertahankan cerita HTML dan alur ke Projects; gunakan fallback tanpa menghentikan scrolling. |
| Data milestone kosong | Jangan memin layar kosong; pakai bio yang sudah dikonfirmasi jika tersedia dan pertahankan alur halaman. |
| Reduced motion | Tampilkan milestone berurutan dengan gerak minimal dan seluruh copy terjangkau. |

Copy menyebut pengalaman dan kontribusi secara spesifik. Bahasa final mengikuti suara Alfi serta review cerita. Klaim skill, hasil proyek, tanggal, dan pencapaian berasal dari informasi yang dikonfirmasi; reaksi kagum pengunjung merupakan tujuan review, bukan testimonial yang boleh dibuat.

## 9. Cara memakai antislop

Versi skill terpasang digunakan sebagai filter: core, UI, copywriting, human, dan layoutmobile. [Repository antislop](https://github.com/miqdadbadjuber/anti-slop) menjelaskan pembagian arah desain dan filter serta mode During.

Untuk scope ini, arah berasal dari brief Alfi dan interpretasi yang dilabeli di dokumen. Setiap keputusan besar ditulis alasannya, kemudian hasil diperiksa melalui empat blok Delivery Gate: Hard Gate, Purpose-Gate, Liveliness, serta Craftsmanship/Quality Locks.

Sebelum memberikan implementasi, catat bukti runtime: layout pada berbagai viewport, kontras aktual, keyboard, anchor About, resume, perpindahan chapter, reduced motion, fallback, dan jalan keluar menuju Projects. Review guideline tidak membuktikan aplikasi sudah lulus pemeriksaan tersebut.

## 10. Aturan komponen dan konsistensi

Susunan kode mengikuti batas tanggung jawab, bukan target agar semua file terlihat modular. Komponen yang merangkai cerita atau komposisi unik tinggal di feature pemiliknya. Komponen shared melayani perilaku lintas section yang sama.

| Lokasi | Tempatkan komponen di sini ketika |
| --- | --- |
| `src/features/<feature>/components` | Komponen mengatur satu section, scene, atau pola khusus feature yang belum punya pemakaian lintas bagian. |
| `src/shared/components/ui` | Elemen kontrol memiliki semantics, behavior, dan kebutuhan aksesibilitas yang sama di beberapa konteks. |
| `src/shared/components/text` / `motion` | Pola tipografi atau animasi memiliki kontrak yang sama dan benar-benar digunakan ulang; jangan membuat variasi kedua hanya karena section baru. |
| `src/shared/components/layout` | Struktur navigasi atau kerangka halaman dipakai lintas section/halaman. |

`src/app/globals.css` menjadi entrypoint style dan mengimpor file global berdasarkan fungsi di `src/app/styles/`: `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `base.css`, dan `utilities.css`. Import order dibuat jelas. `utilities.css` hanya memuat helper yang memiliki consumer nyata; style khusus section tetap di `src/features/<feature>/styles/`. Jangan memecah selector satu kali pakai menjadi global atau menambah layer yang tidak menyelesaikan kebutuhan.

Sebelum membuat komponen, cari nama dan tanggung jawab serupa di feature serta `shared`. Gunakan komponen existing jika kontraknya sesuai. Ekstrak komponen saat pola dan tanggung jawabnya muncul pada dua atau lebih konteks nyata, atau saat fungsi dasarnya memang harus konsisten lintas halaman. Kesamaan warna atau markup kecil saja tidak cukup untuk membuat abstraksi baru.

Komponen reusable memiliki API kecil dan nama variant yang menjelaskan fungsi. Gunakan data untuk mengisi pola berulang; jangan menambahkan banyak props untuk mengendalikan seluruh layout agar satu komponen bisa menjadi semua hal. Komponen shared memiliki consumer aktif atau peran global yang terdokumentasi. Periksa kandidat tanpa consumer sebelum menambah abstraksi lain; jangan otomatis memaksa komponen lama yang tak terpakai ke desain baru.

Warna, type, spacing, radius, dan motion dijadikan token hanya ketika nilai tersebut berulang dan perlu berubah bersama. Nilai khusus yang membentuk satu scene boleh tetap berada di feature. Audit serta refactor dibatasi pada bagian yang disentuh scope ini; aturan ini tidak mewajibkan migrasi semua section sekaligus.

## 11. Status keputusan dan review

Guideline ini menjadi baseline kerja. PRD menyimpan tujuan, SRS menyimpan perilaku, dan dokumen ini menyimpan arah serta alasan visual. Mark logo, pembagian peran motion, pola Flip Text, batas reuse komponen, referensi visual Hero, peran font, skala spacing 4px, dan organisasi global CSS sudah dibahas. Jalur abstrak Timeline dan reveal bertahap disetujui. Motif web, bentuk final, serta posisinya pada alur homepage masih dalam eksplorasi dan akan ditinjau terpisah.

Preferensi antislop During berlaku pada sesi ini; file global pengaturan skill tidak diubah.

Lihat [laporan review dokumen](antislop-document-review.md) untuk hasil pemeriksaan guideline dan requirement. Pemeriksaan aplikasi dicatat terpisah ketika implementasi tersedia.
