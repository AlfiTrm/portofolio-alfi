# Brand Guidelines: Alfi Tsani

Tanggal: 5 Oktober 2026  
Status: Baseline brand guidelines siap untuk review Alfi  
Tujuan: menjaga identitas portfolio tetap sederhana dan konsisten saat halaman berkembang.

Dokumen terkait: [PRD](PRD.md), [SRS](SRS.md), [guideline pengalaman](DESIGN.md), dan [Design System](DESIGN_SYSTEM.md).

## 1. Arah brand

Portfolio harus membuat pengunjung cepat mengenali Alfi, mengingat karya atau perjalanan yang ditampilkan, lalu ingin melihat lebih jauh. Kesan itu dibangun dengan mark yang khas, typography yang tegas, konten yang faktual, serta motion yang punya tujuan.

Aturan inti: gunakan bahasa visual Hero sebagai sumber sistem—dasar gelap, type ivory/off-white, dan neutrals lembut—dengan About berlatar putih. Isi tetap personal dan jelas; setiap efek harus membantu pengunjung memahami sesuatu.

Hero existing menjadi referensi sistem visual portfolio. Jangan menambahkan aksen hue dekoratif di luar bahasa warna tersebut. Nilai token terperinci ada di Design System.

## 2. Logo

Mark abstrak Alfi adalah simbol utama di seluruh portfolio.

| Aset | Penggunaan |
| --- | --- |
| `public/logo/logo.svg` | Mark putih pada permukaan gelap. |
| `public/logo/logo-black.svg` | Mark hitam pada permukaan terang. |
| `public/icon.svg` dan ikon browser/perangkat | Gunakan mark yang sama sesuai aset final yang tersedia. |

- Pilih varian dengan kontras jelas terhadap latar.
- Pertahankan rasio dan bentuk SVG. Jangan miringkan, meregangkan, memberi outline, filter, bayangan, atau warna baru.
- Beri ruang di sekeliling logo agar tidak bertabrakan dengan teks atau tepi.
- Jangan menggambar ulang simbol atau membuat varian khusus section.
- Ukuran minimum dan clear-space numerik belum ditetapkan; tentukan setelah aset dipakai pada header dan ikon berukuran kecil.

## 3. Warna

| Token brand | Nilai | Penggunaan |
| --- | --- | --- |
| Hitam | `#000000` | Teks utama dan tombol pada permukaan terang. |
| Putih | `#FFFFFF` | Kanvas About, teks atau tombol pada permukaan gelap. |
| Dasar Hero | `#12110D` | Permukaan gelap dari Hero existing; menjadi acuan untuk konteks gelap. |
| Ivory Hero | `#F0E7D4` | Teks display Hero existing; digunakan sebagai off-white dari aset visual yang sudah disetujui. |
| Tingkat perantara | Opacity/tint hitam atau putih | Teks sekunder, garis pembatas, dan state yang memerlukan hierarchy. Periksa kontras untuk setiap penggunaan teks. |

Jangan menambahkan warna hue lain sebagai aksen UI. Foto, screenshot proyek, dan artefak asli mempertahankan warna sumbernya; warna media tersebut bukan token brand.

## 4. Typography

| Peran | Typeface | Aturan |
| --- | --- | --- |
| Display | Akira | Hero dan judul display pendek. Hindari untuk paragraf, label kecil, atau kontrol. |
| Narasi dan UI | Geist | Bio, milestone, navigasi, tombol, label, dan seluruh teks fungsional. |
| Flip Text | Typeface dari label yang dianimasikan | Flip Text adalah efek interaksi ObsidianUI, bukan font ketiga. Terapkan pada label link atau aksi yang dipilih saja. |

Jaga hierarchy melalui ukuran, berat, dan ruang. Judul display boleh ekspresif, sementara isi panjang harus tetap mudah dibaca dan dapat membesar saat zoom.

## 5. Layout dan ruang

- Gunakan skala spacing 4px yang disepakati: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`.
- Gunakan gutter halaman `clamp(20px, 4vw, 64px)`, lebar konten maksimal `1440px`, serta narasi sekitar `65ch` sebagai baseline layout. Sesuaikan saat konten atau aksesibilitas memerlukan perubahan.
- Pilih jarak sesuai hubungan isi. Jarak judul ke paragraf lebih dekat daripada jarak ke topik berikutnya; jangan membuat semua section memakai jarak vertikal yang sama.
- Susun ulang komposisi untuk layar sempit; buat keadaan layout menengah yang memang muat, lalu lebarkan untuk layar luas. Jangan hanya mengecilkan layout desktop atau memakai satu breakpoint yang membiarkan ukuran tablet menjadi state yang tidak dirancang.
- Pilih breakpoint saat isi mulai sulit dibaca atau kontrol tidak muat, bukan berdasarkan nama perangkat.
- Pertahankan isi dan urutan baca di semua ukuran layar. Jangan menyembunyikan konten penting atau memakai scroll horizontal untuk membaca cerita.
- Aturan pin, short viewport, safe area, dan matriks review ada di [Design System bagian 9](DESIGN_SYSTEM.md#9-responsif-dan-aksesibilitas).

## 6. Kontrol dan interaksi

- Aksi utama memakai fill solid hitam atau putih, dengan warna teks terbalik sesuai latar.
- Aksi sekunder berupa tautan teks. Tombol ikon hanya untuk aksi yang jelas tanpa label terlihat.
- Sudut kontrol `0–2px`; target interaktif minimal `44 × 44px`.
- Focus keyboard harus terlihat. Pastikan kontras teks normal minimal `4.5:1`, teks besar minimal `3:1`, serta indikator penting minimal `3:1`.
- Hindari gradient, glass effect, shadow dekoratif, dan gerak tanpa fungsi.
- Flip Text hanya pada label terpilih, bergerak sekali saat hover atau `focus-visible`, tanpa loop. Tampilkan label statis pada touch dan reduced motion.

## 7. Foto, karya, dan cerita

- Gunakan foto, screenshot, atau artefak yang benar-benar berkaitan dengan Alfi dan milestone.
- Jangan membuat bukti visual, tanggal, tanggung jawab, atau hasil proyek yang belum dikonfirmasi.
- Jika media belum tersedia, narasi faktual tetap cukup untuk menyajikan milestone.
- Gunakan bahasa orang pertama yang langsung, ringkas, dan spesifik. Hindari klaim yang melebih-lebihkan kemampuan atau hasil.

Jaring Life Points 3D memiliki standar finish yang sama dengan identitas visual lainnya: geometri, material/texture, lighting, shadow, serta perpindahan antarchapter harus tampak dirancang dan matang. Permukaan halus atau woven texture boleh dipilih jika menjadi treatment yang disengaja; jangan menampilkan model, tekstur, atau pencahayaan default sebagai hasil final. Detailnya diperbaiki lewat review visual bersama Alfi selama development.

## 8. Motion

Motion mengikuti sistem yang sudah disepakati di PRD/SRS: Lenis untuk scroll halaman, GSAP / ScrollTrigger untuk scene Life Points, dan Framer Motion untuk transisi komponen yang sudah dipakai. Satu elemen tidak menerima kontrol transform dari beberapa sistem secara bersamaan. Jaring 3D memakai polish pass pada material/texture, lighting, shadow, dan perpindahan milestone sebelum dipublikasikan.

Gerak scroll menunjukkan urutan cerita dan kedalaman lapisan. Jaring tegangan menjadi benang visual dari About ke Life Points, Works, Exploring, lalu Contact; kepadatan serta bentuknya berkembang sesuai bagian yang sedang diceritakan. Life Points memakai scene Three.js, sementara jejak di section lain memberi continuity tanpa mengambil perhatian dari isi. Sediakan waktu membaca, scroll dua arah, dan jalur reduced motion yang tetap memuat semua isi.

## 9. Menjaga konsistensi

Gunakan aset dan peran typeface yang telah ditetapkan. Sebelum menambah pola baru, cari apakah komponen atau token dengan tanggung jawab yang sama sudah tersedia. Buat komponen bersama saat pola tersebut benar-benar dipakai di lebih dari satu konteks atau merupakan fondasi yang perlu konsisten.

Jika keputusan baru mengubah warna, typography, logo, atau kontrol, perbarui dokumen ini dan [Design System](DESIGN_SYSTEM.md) dalam perubahan yang sama.
