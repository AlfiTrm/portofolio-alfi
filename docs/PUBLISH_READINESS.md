# Portfolio Publish Readiness

Tanggal: 7 Oktober 2026  
Status: Implementasi saat ini siap untuk review Alfi; belum dinyatakan siap publish.

Dokumen ini memisahkan pekerjaan desain/kode yang sudah disiapkan dari konfirmasi konten dan pemeriksaan rilis yang masih diperlukan. Checklist yang belum dijalankan tidak dianggap lulus.

## Siap direview di browser

| Bagian | Perubahan yang tersedia | Status |
| --- | --- | --- |
| Hero | Komposisi utama dipertahankan. Resume memakai satu tombol yang lebih jelas pada desktop dan mobile. | Siap direview |
| About | Layout desktop memakai grid 12 kolom dengan offset kecil; layar sempit menata judul lalu narasi. Copy bersumber dari `aboutData`. | Siap direview; copy perlu konfirmasi pemilik |
| Timeline | Lima bab tanpa eyebrow atau format kartu proyek. Jalur graphite berakhir pada batas Works; ring tampil terus, teks beradaptasi dengan latar jalur, dan tile ASCII mengikuti luminance gambar. SVG menjaga fallback; scene Three.js menjadi enhancement layar lebar. | Siap direview; copy, fakta, dan perilaku renderer perlu konfirmasi |
| Works | Galeri memakai komposisi asimetris yang dipilih per proyek, jarak lebih lapang, dan reveal saat gambar mendekati tengah viewport. Layout stack tetap mengikuti urutan baca pada layar sempit. | Siap direview; klaim proyek dan tautan perlu konfirmasi |
| Get in Touch | GitHub, LinkedIn, dan Instagram ditampilkan dari satu sumber `contactData`. | Siap direview; pastikan akun Instagram benar |

## Perlu konfirmasi Alfi sebelum publish

- Pastikan narasi About dan timeline sesuai pengalaman pribadi, termasuk tanggal kuliah, kontribusi organisasi, dan event.
- Pastikan akun Instagram `https://www.instagram.com/alfi_tsan/` adalah akun publik yang memang ingin ditampilkan.
- Buka Resume dan pastikan `public/home/file/CV_Alfi.pdf` versi terbaru serta boleh dibagikan publik. Repository juga memiliki `public/CV.pdf` yang tidak dirujuk modal; cek apakah salinan itu masih diperlukan dan pastikan hanya versi CV terbaru yang tersisa sebelum rilis.
- Konfirmasi judul, peran, deskripsi, screenshot, dan URL setiap proyek. Hindari klaim hasil yang belum punya bukti.
- Tile ASCII timeline masih berupa placeholder abstrak; ganti dengan foto asli bila sudah dipilih dan cocok dengan babnya.
- Konfirmasi alamat email `alfitsani.10@gmail.com` dan lokasi yang digunakan pada data Contact bila lokasi nanti ditampilkan.

## Pemeriksaan rilis yang belum ditandai lulus

Jalankan pemeriksaan ini pada build yang akan dipublikasikan dan catat hasilnya:

- Resize seluruh homepage melewati 320, 360, 390, 430, 600, 768, 900, 1024, 1120, 1280, 1440, dan 1920 CSS px; periksa juga layar pendek dan landscape.
- Pastikan tidak ada horizontal page overflow, teks terpotong, gambar terdistorsi, atau kontrol tertutup safe-area pada seluruh section.
- Coba navigasi anchor Home/About/Works/Exploring/Contact dari scroll atas, tengah, bawah, reload dengan hash, serta browser back/forward.
- Pastikan Timeline bergerak mulus ketika scroll naik maupun turun, jalur berakhir tepat pada batas section, marker sesuai bab aktif, dan cerita tetap utuh saat WebGL tidak tersedia.
- Gulir turun lalu naik melewati About, tiap bab Timeline, setiap gambar proyek, dan Contact; pastikan reveal tetap terlihat saat naik. Kembali ke paling atas, lalu turun lagi untuk memastikan reveal diputar ulang pada siklus berikutnya.
- Aktifkan `prefers-reduced-motion`; semua narasi dan aksi harus tetap tersedia tanpa animasi yang mengganggu.
- Gunakan keyboard untuk navigasi, membuka/menutup Resume dan chat, melihat focus ring, serta mengembalikan fokus ke kontrol pembuka.
- Buka dan unduh CV; cek email, GitHub, LinkedIn, Instagram, dan tautan proyek pada perangkat desktop serta sentuh.
- Periksa kontras, pembesaran teks, metadata, console/build produksi, dan aset yang gagal dimuat.

## Sumber implementasi

Konten tetap terpisah dari komposisi visual supaya pembaruan tidak menyalin ulang markup:

| Data | Source of truth |
| --- | --- |
| About | `src/features/home/about/data/aboutData.ts` |
| Timeline | `src/features/home/about/data/timelineData.ts` |
| Projects | `src/features/home/projects/data/projectsData.ts` |
| Email dan tautan sosial | `src/features/home/contact/data/contactData.ts` |
| Perilaku section | Komponen dalam feature masing-masing |
| Token global | `src/app/styles/` dengan `src/app/globals.css` sebagai entrypoint |

Komponen shared hanya ditambahkan untuk perilaku yang benar-benar dipakai lintas konteks. Komposisi About, Timeline, Work, dan Contact tetap berada di feature masing-masing.

Prototipe About lama yang tidak dirender telah dihapus bersama style pendukung yang hanya dipakai prototipe tersebut. Komposisi About yang aktif sekarang punya satu jalur implementasi.

## Keputusan publish

Saat ini belum ada bagian yang ditandai “terverifikasi siap publish”: perubahan kode baru perlu dilihat langsung oleh Alfi, sementara konfirmasi konten dan pemeriksaan rilis di atas belum tuntas. Setelah review visual dan konfirmasi pemilik selesai, checklist dapat diperbarui per bagian tanpa mengulang pekerjaan desain.
