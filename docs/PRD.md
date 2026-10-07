# PRD: Portfolio Life Points

Tanggal: 7 Oktober 2026  
Versi: 2.3
Status: Life Points disusun sebagai cerita perjalanan personal dalam lima bab, bukan daftar proyek. Tidak ada eyebrow, nomor, kategori, label bukti, atau screenshot proyek di bagian ini. Satu jalur 3D besar mengalir dari atas ke bawah, dimulai di dalam frame lalu mencapai batas Works; jalur berada di atas kolase tetapi tetap di belakang copy. Setiap bab memiliki tiga tile ASCII yang dibentuk menurut luminance gambar. Ring marker selalu terlihat. Motif jaring tetap terpisah. Arah responsive, motion, reuse, Hero sebagai acuan, dan kanvas putih tetap berlaku.
Pemilik produk dan sumber cerita: Alfi Tsani

Dokumen terkait: [rancangan arah](portfolio-about-life-points-design.md), [guideline desain](DESIGN.md), [Brand Guidelines](BRAND_GUIDELINES.md), [Design System](DESIGN_SYSTEM.md), dan [SRS](SRS.md). Usulan backend/data terpisah ada di [PRD Backend](PRD_BACKEND.md); dokumen itu berstatus draft dan tidak mengubah scope redesign ini.

## 1. Ringkasan produk

Tujuan utama Alfi adalah membuat portfolio pribadi dilirik banyak orang dan meninggalkan kesan bahwa Alfi punya karya serta cara penyajian yang menarik. Pengunjung diharapkan mengingat Alfi dan ingin melihat karya atau perjalanan pribadinya lebih jauh. Ini adalah hasil yang ingin dicapai, bukan klaim bahwa redesign pasti meningkatkan traffic.

Improvement ini membuat About menjadi perkenalan singkat tentang Alfi sekarang, dilanjutkan Timeline / My Journey yang menceritakan perjalanan dari awal kuliah sampai sekarang. Pengunjung mengikuti milestone melalui scroll dan melihat bagaimana ketertarikan, kemampuan, dan tanggung jawab Alfi berkembang. About dan Timeline menyatu secara pengalaman.

Life Points menceritakan perjalanan Alfi dari eksplorasi awal kuliah, titik saat frontend mulai terasa cocok, pengalaman membantu web di KBMDSI, proyek kompetisi, hingga rasa ingin tahu terhadap full-stack. Projects tetap menjadi tempat untuk melihat nama proyek dan screenshot-nya. Tiap bab memakai judul naratif dan cerita singkat tanpa nomor, eyebrow, kategori, proof label, atau screenshot proyek. Scroll menggambar satu jalur 3D yang mengalir dari atas ke bawah dan mengungkap bab satu per satu. Tiga tile ASCII per bab menjadi placeholder visual sementara; karakternya mengikuti luminance bentuk grayscale atau foto pilihan. Motif jaring menjadi elemen cerita terpisah dan masih dieksplor.

Fokus perubahan awal adalah kartu informasi di kiri bawah hero dan pengalaman About/Timeline. Layout serta opening hero yang sudah disukai Alfi dipertahankan, dengan kartu “Exploring / Focus” dihapus. Struktur seluruh homepage sudah disepakati sebagaimana bagian 6. Penetapan struktur ini belum menentukan redesign detail setiap section.

Pendekatan motion memakai Lenis untuk rasa scroll halaman, GSAP dengan ScrollTrigger untuk scene scroll Life Points, dan Framer Motion yang sudah dipakai proyek untuk transisi komponen. Flip Text dari ObsidianUI menjadi pola bagi beberapa label interaktif. Transisi UI dibuat ringkas, sedangkan gerak scroll mengikuti progres cerita; keduanya punya tujuan dan menghormati reduced motion. Keberadaan GSAP tidak berarti setiap lapisan harus bergerak atau setiap scene harus dipin.

## 2. Masalah yang ingin diselesaikan

- About saat ini menarik di desktop, tetapi komposisi teks dan visual di dalam scroll hero yang panjang menyulitkan adaptasi ke layar kecil.
- Kartu “Exploring / Focus” di kiri bawah hero terasa dipaksakan dan menambah kepadatan visual.
- Daftar proyek dan bio singkat belum cukup menjelaskan perjalanan pribadi Alfi dari awal kuliah sampai sekarang.
- Efek visual membutuhkan rules yang konsisten agar perhatian pengunjung mengikuti cerita dan tampilannya tidak terasa generik.
- Komponen lintas section perlu dipakai ulang berdasarkan tanggung jawab yang sama; sekadar meletakkan komponen di folder shared belum menjamin ada yang menggunakannya.

## 3. Tujuan dan ukuran keberhasilan

| ID | Tujuan | Bukti keberhasilan saat review |
| --- | --- | --- |
| G-01 | Menjelaskan perkembangan Alfi | Pengunjung dapat mengikuti urutan waktu dan memahami perubahan yang terjadi pada tiap milestone. |
| G-02 | Menarik perhatian melalui storytelling | Tiap adegan memiliki fokus yang jelas; gerak dan media mendukung milestone yang sedang dibaca. |
| G-03 | Membuat pengalaman responsif | Semua section dan kontrol homepage dapat digunakan lintas ukuran layar; komposisi berubah dengan sengaja tanpa konten terpotong, hilang, atau overflow horizontal. |
| G-04 | Membuat scroll terasa smooth | Scroll tetap mengikuti input pengguna, bergerak dua arah, dan keluar menuju Projects tanpa terjebak. |
| G-05 | Menjaga identitas visual | Opening hero tetap familiar; mark logo dan variannya konsisten; About memakai font dan palet yang nyambung dengan portfolio. |
| G-06 | Menjaga cerita tetap dapat diakses | Cerita utuh tersedia ketika gerak dikurangi, 3D gagal, atau visual pendukung belum tersedia. |
| G-07 | Membuat Alfi diingat dan mengundang rasa penasaran | Setelah mencoba portfolio, reviewer dapat menyebut unsur yang mereka ingat tentang Alfi dan tertarik melihat karya atau cerita berikutnya. Catat respons asli, termasuk bila kesan tersebut belum tercapai. |
| G-08 | Menjaga konsistensi saat section berkembang | Section yang berbagi fungsi visual/interaksi memakai komponen atau token yang sama; komposisi unik tetap dimiliki feature dan tidak dipaksa menjadi komponen generik. |
| G-09 | Membuat scene 3D terasa selesai dan dirancang | Bentuk, material/texture, cahaya, bayangan, dan transisi membentuk satu treatment yang konsisten dengan cerita serta visual brand; scene tidak berakhir sebagai prototype dengan geometry atau material default. |
| G-10 | Membuat section terasa sebagai satu cerita | Motif jaring berkembang sesuai peran section dan membantu pengunjung menghubungkan perjalanan, karya, eksplorasi, dan kontak. |

Pengukuran awal menggunakan review pengalaman pengunjung dan pemeriksaan layout. Scope ini tidak menambahkan pelacakan analytics baru atau menjanjikan angka peningkatan engagement yang belum memiliki baseline.

Review tujuan utama memakai pertanyaan terbuka: apa yang paling diingat, siapa pemilik portfolio, dan bagian apa yang ingin dilihat lebih jauh? Catat jawaban tanpa mengarahkan reviewer untuk memuji. Bila reviewer hanya mengingat efek animasinya, penyajian perlu diperbaiki agar identitas Alfi dan karyanya ikut diingat. Strategi distribusi atau promosi untuk menjangkau lebih banyak orang merupakan pekerjaan terpisah dari scope desain ini.

### Arti “best practice” untuk portfolio ini

Istilah ini berarti kualitas yang dapat dijelaskan dan diperiksa, bukan gaya visual yang sedang tren. Portfolio perlu membantu pengunjung mengenali Alfi, memahami perjalanan yang faktual, melihat bukti karya, menemukan langkah berikutnya, dan menggunakan halaman dengan nyaman pada ukuran layar serta cara input yang berbeda. Motion atau 3D hanya dipakai bila memperjelas cerita atau fokus. Setiap aturan harus dapat ditelusuri ke tujuan pengunjung, standar aksesibilitas yang dipilih, atau keputusan desain Alfi; pilihan seperti font, warna, dan bentuk tombol adalah aturan brand proyek ini, bukan hukum universal.

Review recall di G-07 memeriksa apakah kualitas itu tercapai secara kualitatif. Hasil beberapa review tidak diklaim sebagai bukti statistik atau jaminan bahwa portfolio akan menjangkau lebih banyak orang.

## 4. Pengunjung dan kebutuhan mereka

Pengunjung mencakup orang yang menemukan atau menerima tautan portfolio, recruiter, calon kolaborator, serta orang yang ingin mengenal Alfi. Mereka perlu memahami siapa Alfi, bagaimana perjalanan belajarnya, kontribusi yang pernah dibuat, dan arah yang sedang ditekuni. Cerita harus cukup singkat untuk diikuti sambil scroll, dengan bukti yang relevan bila tersedia.

## 5. Scope

### Termasuk

- Menghapus kartu “Exploring / Focus” di hero.
- Menetapkan struktur homepage: Hero, About, Timeline / My Journey, Selected Work, What I’m Into, dan Get in Touch.
- Menata About sebagai perkenalan singkat yang mengalir ke Timeline setelah hero.
- Life Points pribadi dari awal kuliah sampai sekarang, ditulis sebagai bab cerita dan tidak mengulang penyajian proyek dari Selected Work.
- Storytelling yang merespons scroll dan evaluasi parallax yang mendukung pembacaan.
- Memakai satu jalur 3D besar di Timeline, dengan sapuan asimetris kiri-kanan yang membentang dari atas sampai bawah dan mengikuti progres scroll.
- Mengungkap setiap isi milestone secara bertahap saat memasuki viewport; narasi tetap berupa HTML.
- Mengeksplor motif jaring sebagai elemen cerita terpisah dari Timeline. Jaring harus memiliki bentuk yang dikenali dan struktur benang yang terhubung; komposisi akhir direview sebelum diterapkan lintas section.
- Rules typography, warna, layout, motion, dan penggunaan bukti visual.
- Menetapkan sistem motion: Lenis untuk scroll halaman, GSAP / ScrollTrigger untuk storytelling berbasis scroll, dan Framer Motion untuk transisi komponen yang sudah ada.
- Memakai pola Flip Text dari ObsidianUI pada sejumlah label interaktif yang dipilih.
- Menetapkan aturan batas feature-local dan shared agar section baru mencari serta memakai pola yang sudah ada sebelum menambah implementasi duplikat.
- Menyusun Brand Guidelines dan Design System dengan Hero sebagai acuan bahasa visual (gelap, ivory/off-white, netral tenang), tanpa memaksakan latar gelap Hero ke section lain; About memakai kanvas putih.
- Menetapkan `public/logo/logo.svg` sebagai mark utama, menyediakan versi hitam, dan memakai aset ikon yang sudah dibuat untuk browser serta perangkat.
- Adaptasi responsif, reduced motion, dan fallback visual.
- Menjaga scene 3D tetap feature-local dan lazy-loaded. Jangan mengulang jaring 2D acak sebagai jejak lintas section.
- Menjaga navigasi About dan alur keluar ke Projects bekerja.

### Di luar scope

- Redesign menyeluruh untuk Projects, Exploring, Contact, chat, resume, dan halaman lain.
- Redesign menyeluruh identitas brand di luar mark logo dan varian yang tercantum dalam scope.
- Memigrasikan seluruh animasi existing dari Framer Motion ke GSAP.
- Refactor menyeluruh komponen dan style section yang tidak disentuh scope improvement ini.
- Membuat component framework generik untuk setiap pola visual satu kali pakai.
- CMS, editor milestone, database, dan API baru.
- Menulis pengalaman pribadi, tanggal, atau pencapaian yang belum dikonfirmasi Alfi.
- Menambahkan kontrol game, free camera, atau interaksi 3D yang mengharuskan pengunjung mempelajari cara penggunaan.
- Menjanjikan hasil performa atau dampak audience sebelum pemeriksaan runtime dan review pengunjung dilakukan.

## 6. Alur pengalaman

### Struktur homepage yang disepakati

| Urutan | Section | Peran dan isi |
| --- | --- | --- |
| 1 | Hero | Menarik perhatian melalui identitas dan karakter visual Alfi; mempertahankan opening existing tanpa kartu kiri bawah. |
| 2 | About | Mengenalkan siapa Alfi sekarang, fokusnya, dan cara memandang pekerjaan melalui perkenalan singkat. |
| 3 | Timeline / My Journey | Menceritakan momen sejak awal kuliah, titik perubahan, pengalaman, dan pelajaran; menjadi tempat storytelling parallax serta kemungkinan 3D. |
| 4 | Selected Work | Membuktikan kemampuan melalui proyek pilihan, masalah yang dihadapi, kontribusi Alfi, hasil yang dapat dibuktikan, dan visual asli. |
| 5 | What I’m Into | Menunjukkan rasa ingin tahu serta sisi personal melalui hal yang sedang dipelajari, dieksplorasi, atau diminati. |
| 6 | Get in Touch / Contact | Memudahkan kontak melalui ajakan singkat, email, dan tautan sosial yang relevan. |

Urutan ini disepakati Alfi. Timeline mendahului Work agar pengunjung mengenal perjalanan sebelum melihat hasilnya. Navigasi Works menyediakan akses langsung ke proyek bagi pengunjung yang ingin segera melihat bukti kemampuan.

About dan Timeline memiliki fungsi berbeda tetapi terasa sebagai satu cerita yang mengalir di latar putih. About tidak mengulang seluruh milestone; Timeline mengembangkan perjalanan yang diperkenalkan About. Selected Work memetakan section Projects existing, What I’m Into memetakan Exploring, dan Get in Touch memetakan Contact. Label copy final serta detail komposisi section tersebut masih dapat diperinci saat review.

### Perjalanan scroll

1. Pengunjung melihat hero dengan komposisi yang sekarang, tanpa kartu kiri bawah.
2. Scroll membawa pengunjung ke About berlatar putih untuk perkenalan singkat, lalu mengalir ke Timeline dan awal perjalanan kuliah.
3. Bab perjalanan menampilkan judul naratif dan cerita singkat. Tiga tile abstrak menemani tiap bab; nama serta screenshot proyek tetap berada di Selected Work.
4. Scroll menggambar rute besar dari awal ke akhir cerita. Bab muncul satu per satu; rute melintasi komposisi, berada di atas kolase, dan tetap di belakang copy. Ujungnya diteruskan sampai batas Works agar section berikutnya menutupi potongan tabung.
5. Scroll ke atas mengembalikan milestone sebelumnya sesuai posisi scroll.
6. Bagian akhir Timeline menunjukkan keadaan atau fokus Alfi sekarang, lalu melepaskan adegan menuju Selected Work.
7. Setelah proyek pilihan, pengunjung melihat What I’m Into dan dapat menghubungi Alfi melalui Get in Touch.

Rute visual merupakan latar yang membentang sepanjang milestone list, bukan panel terpisah. Semua viewport menyediakan cerita lengkap dan alur scroll yang dapat dikendalikan. Jalur tetap dekoratif-semantik dan tidak menggantikan narasi HTML.

## 7. User stories

1. Sebagai pengunjung pertama, saya ingin melihat hero yang jelas agar langsung memahami identitas portfolio.
2. Sebagai pengunjung, saya ingin About muncul setelah hero agar alur perkenalan mudah diikuti.
3. Sebagai pengunjung, saya ingin melihat milestone dalam urutan waktu agar memahami perkembangan Alfi.
4. Sebagai pengunjung, saya ingin membaca perubahan atau pelajaran pada tiap milestone agar mengetahui arti pengalaman tersebut.
5. Sebagai recruiter, saya ingin melihat bukti yang relevan agar bisa menghubungkan cerita dengan kontribusi nyata.
6. Sebagai pengunjung, saya ingin scroll menggerakkan adegan dengan konsisten agar fokus visual mengikuti cerita.
7. Sebagai pengunjung, saya ingin scroll ke atas mengembalikan cerita sebelumnya agar dapat membaca ulang.
8. Sebagai pengguna ponsel, saya ingin teks dan media tersusun nyaman agar cerita dapat dibaca pada layar kecil.
9. Sebagai pengguna layar pendek atau zoom, saya ingin semua isi tetap terjangkau agar tidak kehilangan bagian cerita.
10. Sebagai pengguna reduced motion, saya ingin cerita tersedia dengan gerak minimal agar nyaman dibaca.
11. Sebagai pengguna perangkat tanpa WebGL yang berfungsi, saya ingin tetap melihat timeline lengkap agar pengalaman tidak berhenti pada layar kosong.
12. Sebagai pengguna keyboard atau pembaca layar, saya ingin urutan cerita dan tautan dapat diikuti agar About bisa digunakan tanpa pointer.
13. Sebagai pengunjung, saya ingin navigasi About membawa saya ke awal cerita agar dapat langsung mengakses section tersebut.
14. Sebagai pengunjung, saya ingin melanjutkan ke Projects setelah cerita selesai agar dapat melihat hasil kerja Alfi.
15. Sebagai Alfi, saya ingin memperbarui milestone melalui data yang terstruktur agar cerita dan visual tetap sesuai.
16. Sebagai Alfi yang merawat portfolio, saya ingin section baru memakai komponen bersama hanya untuk pola yang benar-benar sama agar tampilan konsisten tanpa membatasi komposisi khas tiap section.

## 8. Kebutuhan produk

| ID | Kebutuhan | Kriteria penerimaan |
| --- | --- | --- |
| P-01 | Hero dirapikan | Kartu “Exploring / Focus” hilang pada semua ukuran layar; opening hero tetap sesuai baseline yang direview. |
| P-02 | Struktur homepage mengikuti alur yang disepakati | Urutan halaman adalah Hero → About → Timeline / My Journey → Selected Work → What I’m Into → Get in Touch. About singkat mengalir ke Timeline; Works dapat diakses langsung dari navigasi. |
| P-03 | Milestone mengandung cerita nyata | Tiap milestone memuat judul naratif dan cerita yang menjelaskan kejadian serta perubahan; fakta dikonfirmasi Alfi. Tidak ada eyebrow atau label periode. |
| P-04 | Cerita mengikuti scroll | Daftar milestone tetap dalam alur dokumen. Satu garis besar melengkung dari atas sampai bawah dan melewati seluruh komposisi. Progress mengikuti scroll dua arah tanpa mengambil alih input atau menjebak pengunjung. |
| P-05 | Gerak visual mendukung cerita | Parallax dapat diterapkan pada lapisan terpilih bila membantu fokus dan kedalaman; tidak ada kewajiban menggerakkan semua lapisan. Narasi tetap terbaca dan gerak dapat dikurangi. |
| P-06 | Jalur 3D memperjelas perjalanan | Satu jalur 3D kontinu memakai sapuan lebar kiri-kanan sepanjang seluruh daftar, depth yang terukur, dan marker yang sejalan dengan urutan HTML. Garis terungkap mengikuti scroll dan menonjolkan milestone aktif. Kegagalan renderer tidak menghilangkan konten. |
| P-07 | Pengalaman cerita responsif | Cerita lengkap dan urutan baca tetap tersedia pada layar sempit/pendek, serta layout tidak bergantung pada hover. Jalur menyusut menjadi SVG yang tetap membentang sepanjang urutan; teks dan media tersusun dalam kolom yang nyaman. |
| P-08 | Pengalaman tetap tersedia tanpa gerak | Reduced motion dan fallback visual menampilkan semua milestone secara berurutan. |
| P-09 | Navigasi dan kontinuitas bekerja | Anchor About menuju awal perjalanan; bagian terakhir dapat dilanjutkan ke Projects melalui scroll biasa. |
| P-10 | Identitas menarik dan mudah diingat | Storyboard dan hasil implementasi direview terhadap G-07 serta guideline desain; identitas, cerita, atau karya Alfi ikut diingat bersama efek visualnya. |
| P-11 | Logo tersedia konsisten di seluruh kebutuhan dasar | Mark utama dan versi hitam tersedia sebagai SVG; ikon browser/perangkat memakai mark yang sama dan metadata mengarah ke aset yang tersedia. |
| P-12 | Motion terasa konsisten dan tetap dapat dikendalikan | Lenis, GSAP/ScrollTrigger, dan Framer Motion memiliki peran terpisah; scroll dua arah, anchor, keyboard, touch, serta reduced motion tetap berfungsi tanpa scroll trap atau gerak tanpa tujuan. |
| P-13 | Flip Text memberi umpan balik pada label terpilih | Flip hanya berjalan pada hover atau keyboard focus, satu kali per interaksi; teks tetap terbaca, tidak berulang terus-menerus, dan tampil statis pada touch atau reduced motion. |
| P-14 | Reuse komponen menjaga konsistensi tanpa over-abstraction | Sebelum menambah komponen, pola existing diperiksa; tanggung jawab yang berulang memakai satu implementasi bersama, sedangkan scene unik tetap feature-local. Tidak ada komponen baru yang dimasukkan ke shared tanpa consumer atau peran lintas halaman yang jelas. |
| P-15 | Palet UI mengacu pada Hero | Gunakan bahasa visual Hero sebagai acuan: dasar gelap, type ivory/off-white, dan neutrals lembut untuk hierarchy; About memakai kanvas putih seperti yang sudah diminta. Jangan menambah aksen hue dekoratif; foto serta artefak asli mempertahankan warna sumbernya. Nilai token detail ditetapkan di Design System. |
| P-16 | Hierarki font mengikuti peran yang konsisten | Akira dipakai pada hero dan judul display pendek; Geist dipakai untuk narasi serta seluruh UI. Flip Text memakai font yang sama, bukan typeface baru. |
| P-17 | Kontrol mudah dikenali dan digunakan | Baseline visual: tombol utama solid, aksi sekunder berupa tautan teks, tombol ikon hanya untuk aksi yang jelas, sudut 0–2px, target 44px, dan focus state kontras. Kriteria aksesibilitas dijelaskan terpisah dari preferensi estetika. |
| P-18 | Global CSS mudah ditemukan dan dipelihara | `globals.css` menjadi entrypoint; aturan global dipisah berdasarkan fungsi. Aturan khusus section tetap dekat dengan feature pemiliknya. |
| P-19 | Layout memakai spacing yang teratur | Skala 4px disepakati. Gutter 20–64px, max-width 1440px, dan lebar baca sekitar 65ch menjadi baseline Design System; jarak section mengikuti kebutuhan konten. |
| P-20 | Seluruh homepage memiliki layout responsif yang disengaja | Rancang keadaan sempit, menengah, dan lebar; breakpoint mengikuti saat konten perlu berubah komposisi. Periksa semua section pada titik viewport di Design System serta rentang di antaranya. Konten tetap utuh, dapat diakses, dan urutan baca konsisten. |
| P-21 | Scene 3D memiliki finish yang siap dipublikasikan | Review geometry, material/texture, cahaya, bayangan, dan transisi sebagai satu treatment. Efek mendukung cerita dan identitas visual; tidak ada material default, placeholder, atau bagian scene yang masih tampak seperti prototype. |
| P-22 | Reveal mengikuti satu kunjungan scroll | Entrance section berjalan saat pertama masuk viewport, tetap terlihat ketika scroll naik, lalu direset hanya saat kembali ke area Hero/paling atas agar perjalanan turun berikutnya memutar reveal lagi. Animasi yang langsung terikat ke progres scroll tetap bergerak dua arah; state entrance Hero tidak ikut direset. |

Acceptance responsif berlaku untuk seluruh homepage. Reflow pada 320 CSS px, keyboard/focus, reduced motion, serta layout sempit/menengah/lebar menjadi kriteria review; ukuran viewport di Design System adalah sampel pemeriksaan, bukan breakpoint final. Breakpoint mengikuti kebutuhan konten. Timeline tetap berada dalam alur dokumen dan jalur visual mengikuti tinggi daftar.

## 9. Rules desain

Guideline lengkap berada di [DESIGN.md](DESIGN.md). Antislop dipakai dalam mode During untuk sesi ini. Arah berasal dari brief Alfi; setiap teknik membutuhkan tujuan tertulis sesuai antislop. Interpretasi brief untuk scope improvement adalah ENERGY 3 / RHYTHM 3 / MOTION 3. Angka tersebut adalah skala arah desain, bukan statistik produk.

| Area | Aturan |
| --- | --- |
| Fokus | Satu milestone aktif memiliki satu judul utama dan maksimal satu media pendukung dominan. |
| Warna | Gunakan Hero sebagai acuan: dasar gelap, type ivory/off-white, dan neutrals lembut. About memakai kanvas putih. Hindari aksen hue dekoratif; foto dan artefak asli mempertahankan warna sumbernya. |
| Typography | Akira untuk hero dan judul display pendek; Geist untuk narasi, navigasi, tombol, dan seluruh UI. Flip Text menerapkan motion pada typeface yang sama. |
| Button | Usulan pola: tombol utama solid dengan warna hitam/putih terbalik sesuai latar; aksi sekunder memakai teks; tombol ikon digunakan hanya untuk aksi yang jelas. Sudut dan target sentuh final menunggu Design System review. |
| Spacing | Skala 4px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128) disepakati. Gutter 20–64px, max-width 1440px, dan copy sekitar 65ch menjadi baseline layout; jarak section mengikuti kebutuhan konten. |
| Layout | Desktop boleh asimetris; mobile mempunyai urutan baca vertikal yang jelas. Teks penting tidak menumpuk di atas gambar yang ramai. |
| Motion | Semua lapisan merespons progres scroll yang sama. Narasi bergerak lebih sedikit daripada media atau jalur timeline. |
| Sistem motion | Lenis menangani scroll halaman; GSAP / ScrollTrigger menangani progres jalur Timeline; Framer Motion menangani reveal milestone dan transisi komponen yang sudah ada. Satu elemen tidak dikendalikan dua sistem animasi sekaligus. |
| Reveal viewport | Elemen di section yang belum dijangkau scroll tidak autoplay. Reveal section diulang saat target kembali masuk viewport setelah keluar; entrance Hero tetap memakai state persisten yang ada. Proyek mulai muncul ketika pusat gambar mendekati tengah viewport dan tetap terlihat sampai kartu keluar. |
| Flip Text | Terapkan inspirasi Flip Text ObsidianUI pada karakter label link atau aksi terpilih dengan stagger singkat; satu kali saat hover atau keyboard `focus-visible`, tanpa loop. Label tetap statis pada touch dan reduced motion. |
| Komponen | Section unik tetap berada di feature-nya. Cek komponen shared sebelum membuat baru; gunakan atau ekstrak komponen hanya untuk tanggung jawab/struktur yang sama dan benar-benar dipakai ulang. Jangan membuat abstraction generik untuk satu scene unik. |
| Token visual | Sentralisasi nilai warna, type, spacing, radius, dan motion yang berulang; nilai komposisi khusus tetap lokal pada feature. |
| Ritme | Jarak antar milestone menyediakan ruang untuk membaca. Rute visual memberi sapuan besar di antara item tanpa memaksa panel sticky atau menutupi copy. |
| 3D dan finish visual | Timeline memakai satu jalur 3D yang abstrak; jaring menjadi konsep terpisah yang masih dieksplor. Garis, simpul milestone, web topology, material/texture, cahaya, dan bayangan harus terasa intentional, koheren, serta selaras dengan cerita. |
| Media | Utamakan foto atau artefak proyek milik Alfi. Milestone tetap dapat tampil kuat dengan teks bila media belum ada. |
| Responsif | Sesuaikan komposisi dan amplitudo gerak per ukuran layar; jangan sekadar mengecilkan scene desktop. Breakpoint mengikuti kebutuhan konten dan seluruh section homepage masuk review. |
| Aksesibilitas | Teks tetap berupa HTML, memiliki kontras jelas, dan dapat dibaca tanpa WebGL atau parallax. |

## 10. Kebutuhan konten

Rangkaian lima bab mengikuti cerita Alfi: eksplorasi awal kuliah, frontend mulai terasa cocok di semester empat, kontribusi kecil pada web KBMDSI, beberapa proyek kompetisi dengan AI sebagai alat, lalu minat untuk memahami backend dan full-stack. Setiap bab memakai judul dan narasi orang pertama tanpa eyebrow, nomor, atau kategori. Copy Inggris di implementasi siap direview sebelum dianggap final untuk publish.

Belum ada foto personal untuk timeline. Setiap bab memakai tiga tile ASCII abstrak sebagai placeholder visual, bukan rekonstruksi peristiwa. Foto asli dapat menggantikannya nanti setelah Alfi memilih gambar dan momen yang sesuai; renderer memetakan luminance foto ke karakter ASCII.

## 11. Keputusan terbuka dan kesiapan implementasi

| ID | Keputusan | Status dan langkah penyelesaian |
| --- | --- | --- |
| D-01 | Urutan milestone dan arah copy | Mengikuti cerita yang disampaikan Alfi; copy Inggris di implementasi perlu review Alfi sebelum publish. Tanggal tambahan atau klaim baru tetap perlu konfirmasi. |
| D-02 | Bentuk storytelling Life Points | Diperbarui: bab cerita tanpa nomor atau label kategori/proof, satu jalur 3D besar mengalir dari atas sampai bawah, dan proyek tidak diulang di sini. Awal garis masuk ke frame; ekornya berlanjut sampai batas Works dan tertutup section berikutnya. Tile berada di belakang jalur, copy memakai difference blending, dan ring selalu terlihat. Tidak memakai jaring atau stage sticky. |
| D-03 | Motif jaring dan renderer | Jaring adalah elemen terpisah dari Timeline. Percobaan garis acak dihentikan. Struktur akhir masih dieksplor dengan referensi web asli dan model/texture; setelah topology serta finish visual direview, tentukan lokasi, renderer, dan fallback. Three.js tetap digunakan untuk jalur Timeline; OGL tetap digunakan untuk efek Lightfall yang ada. |
| D-04 | Responsif | Disetujui: acceptance responsif berlaku untuk seluruh homepage dengan aturan reflow, akses input, dan reduced motion. Timeline menjaga jalur besar di balik komposisi; tidak bergantung pada stage sticky. |
| D-05 | Aset visual perjalanan | Gunakan tiga tile abstrak ASCII per bab sebagai placeholder dengan karakter berdasarkan luminance. Tiap tile dapat diganti dengan foto Alfi bila tersedia dan cocok dengan bab; screenshot proyek tetap berada di Selected Work. |
| D-06 | Storyboard dan detail identitas | Review interpretasi dial dan alasan keputusan di DESIGN.md; bentuk metafora, timing, serta komposisi final mengikuti konten dan review Alfi. |
| D-07 | Mark logo dan varian dasar | Disepakati Alfi: `public/logo/logo.svg` sebagai mark utama, `logo-black.svg` sebagai versi hitam, dan ikon browser/perangkat yang memakai mark yang sama. |
| D-08 | Sistem motion | Disepakati Alfi: Lenis untuk scroll halaman, GSAP / ScrollTrigger untuk scene storytelling, dan Framer Motion untuk transisi komponen yang sudah ada; tidak ada migrasi menyeluruh ke GSAP. |
| D-09 | Flip Text | Pola disepakati Alfi untuk label interaktif terpilih; adaptasi satu kali pada hover/keyboard focus, statis pada touch/reduced motion, dan tanpa loop. Elemen spesifik dipilih saat komposisi UI direview. |
| D-10 | Batas komponen dan reuse | Disepakati Alfi: feature-first; periksa inventory sebelum menambah komponen, promosikan ke shared hanya untuk tanggung jawab lintas pemakaian yang nyata, dan sentralisasi token hanya untuk nilai visual berulang. |
| D-11 | Arah warna brand dan UI | Hero existing menjadi acuan sistem visual, termasuk dasar gelap, type ivory/off-white, dan neutrals lembut. About memakai latar putih; jangan menambah aksen hue dekoratif. Nilai token ditetapkan di Design System. |
| D-12 | Peran font | Disepakati Alfi: Akira untuk hero dan judul display pendek; Geist untuk narasi dan seluruh UI. Flip Text dari ObsidianUI menjadi motion pada label terpilih, bukan font tambahan. |
| D-13 | Pola tombol | Baseline Design System: tombol utama solid, aksi sekunder berupa teks, tombol ikon hanya untuk aksi yang jelas, sudut 0–2px, dan target interaksi 44px; tinjau dalam layout nyata tanpa menyebut 44px sebagai minimum WCAG AA. |
| D-14 | Organisasi global CSS | Disepakati Alfi: pertahankan `globals.css` sebagai entrypoint dan pisahkan aturan global berdasarkan tanggung jawab; stylesheet khusus section tetap berada di feature pemiliknya. |
| D-15 | Skala spacing dan layout | Skala 4px disepakati. Gutter 20–64px, max-width 1440px, dan lebar baca sekitar 65ch menjadi baseline Design System yang dapat disetel lewat review viewport. |

PRD 2.3 menetapkan Life Points sebagai rangkaian lima bab perjalanan personal, tanpa eyebrow, format project-card, atau pengulangan screenshot proyek. Jalur 3D mengalir di seluruh section; awalnya tetap masuk ke frame dan ekornya mencapai batas Works. Ring selalu terlihat, gambar berada di belakang jalur, dan teks beradaptasi dengan latar. Tile ASCII memetakan luminance bentuk atau foto ke karakter. Acceptance responsif berlaku untuk seluruh homepage. Bentuk akhir jaring tetap menunggu review Alfi setelah studi visual terdokumentasi; percobaan garis acak tidak dipakai. Fakta cerita diverifikasi sebelum dipublikasikan. Brand Guidelines dan Design System menjadi acuan visual implementasi.
