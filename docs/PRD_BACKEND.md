# PRD: Backend dan Data Portfolio

- **Tanggal:** 6 Oktober 2026
- **Versi:** 0.1
- **Status:** Draft rekomendasi untuk review; belum menjadi persetujuan implementasi.
- **Pemilik produk:** Alfi Tsani

Dokumen ini adalah proposal terpisah dari [PRD Portfolio Life Points](PRD.md). PRD utama dan [SRS](SRS.md) tetap mengatur scope redesign homepage; dokumen ini mengusulkan lapisan backend dan data untuk pengembangan selanjutnya.

## 1. Ringkasan

Portfolio berjalan sebagai aplikasi Next.js. Konten profil, timeline, skills, dan project masih berasal dari modul TypeScript lokal. Backend yang ada saat ini adalah route chat Next.js yang memanggil Sumopod AI; contact masih memakai tautan `mailto:`. Belum ada database atau ORM di repo.

Usulan arsitektur adalah **NestJS di Vercel dan PostgreSQL di Supabase, dalam satu repo Git**. NestJS memang didukung langsung oleh Vercel. Satu aplikasi Nest dijalankan sebagai satu Vercel Function, sehingga cocok untuk endpoint HTTP seperti chat dan contact, tetapi bukan server yang terus hidup untuk menyimpan state lokal atau menjalankan worker terus-menerus. Satu repo dapat dihubungkan ke beberapa Vercel Project dengan root directory masing-masing, sehingga web dan API tetap dapat dirilis terpisah. [Deploy NestJS ke Vercel](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel) · [Deploy monorepo di Vercel](https://vercel.com/docs/monorepos)

Untuk tahap pertama, pertahankan konten portfolio yang jarang berubah sebagai data TypeScript. Supabase dipakai hanya saat ada alur tulis yang nyata. Rekomendasi MVP adalah menyimpan pesan contact dan memindahkan chat API yang ada ke NestJS, tanpa membuat CMS atau menyimpan transcript chat.

## 2. Konteks dan masalah

Pengunjung perlu cara menghubungi Alfi dan memakai chat portfolio. Pemilik portfolio perlu menerima pesan tanpa membuka akses baca publik ke data tersebut. Saat ini contact mengarahkan pengunjung ke aplikasi email, sedangkan chat berjalan pada satu route Next.js dengan rate limit berbasis memori proses. Rate limit lokal seperti itu tidak menjadi state bersama ketika fungsi berjalan pada beberapa instance.

Memindahkan semua teks portfolio ke database belum menyelesaikan masalah pengunjung. Data itu hanya perlu masuk database bila Alfi ingin mengubahnya melalui workflow editor tanpa deploy. Karena itu, kebutuhan menulis dan membaca data harus dipisahkan dari konten statis.

## 3. Tujuan dan ukuran keberhasilan

| ID | Tujuan | Bukti keberhasilan |
| --- | --- | --- |
| G-01 | Menyediakan API terstruktur untuk fitur server-side portfolio | Route chat dan contact memiliki kontrak request/response yang terdokumentasi dan perilaku error yang konsisten. |
| G-02 | Menerima pesan contact secara andal | Pesan valid tersimpan; pengunjung tidak dapat membaca pesan yang tersimpan. |
| G-03 | Menjaga pengalaman portfolio tetap tersedia | Beranda, About, Timeline, dan Works tetap bisa dirender ketika API atau database sedang bermasalah. |
| G-04 | Menjaga data dan kredensial server | Kunci AI dan kredensial database tidak dikirim ke browser atau ditulis ke log. |
| G-05 | Menjaga ruang lingkup kecil | Konten read-only tetap lokal sampai ada kebutuhan pengelolaan konten yang terkonfirmasi. |

Ukuran ini memeriksa perilaku, bukan menjanjikan angka traffic atau uptime yang belum punya baseline.

## 4. Pengguna dan kebutuhan

- **Pengunjung portfolio:** ingin bertanya tentang Alfi dan mengirim pesan dengan alur singkat, jelas, serta mendapat konfirmasi atau pesan gagal yang bisa ditindaklanjuti.
- **Alfi sebagai pemilik:** ingin menerima pesan, mengelola kredensial AI dan database dengan aman, serta memperbarui portfolio tanpa membuat infrastruktur lebih berat dari kebutuhannya.

## 5. Rekomendasi arsitektur

```text
Browser
  └─ Next.js (UI, konten portfolio read-only, client API)
       └─ NestJS di Vercel (chat, contact, validasi, aturan akses)
            └─ Supabase PostgreSQL (pesan contact)
```

Struktur repo yang diusulkan:

```text
portofolio-alfi/
├── src/                         # Next.js sekarang; tidak perlu dipindahkan dulu
├── apps/api/                    # NestJS
├── packages/portfolio-content/  # fakta yang dipakai UI dan konteks chat, bila perlu
└── supabase/migrations/         # perubahan skema database yang ditinjau
```

`packages/portfolio-content` hanya dibuat jika UI dan NestJS benar-benar membutuhkan satu sumber fakta yang sama. Paket kontrak API terpisah, Turborepo, dan Nest CLI monorepo mode ditunda sampai kebutuhan sharing/build membenarkannya. NestJS membedakan standard mode untuk satu app dari monorepo mode untuk beberapa app/library Nest; pilihan mode CLI ini berbeda dari keputusan menyimpan Next dan Nest pada repo Git yang sama, dan dapat ditunda. [NestJS workspace modes](https://docs.nestjs.com/cli/monorepo)

Di Vercel, Next dan Nest diimpor sebagai dua Project dari repo yang sama. Project Next menunjuk root repo saat ini; project API menunjuk `apps/api`. Masing-masing mendapat environment variables dan deployment sendiri. Jika API memakai package di luar `apps/api`, konfigurasi build harus mengizinkan sumber di luar root directory atau menggunakan konfigurasi workspace yang sesuai. Rute dan domain API, CORS untuk production/preview, serta opsi proxy same-origin ditetapkan saat rancangan implementasi.

Kontrak route awal yang diusulkan:

| Method | Route | Kegunaan |
| --- | --- | --- |
| `GET` | `/health` | Pemeriksaan kesehatan tanpa detail sensitif. |
| `POST` | `/v1/chat` | Chat portfolio melalui provider AI. |
| `POST` | `/v1/contact` | Validasi dan penyimpanan pesan contact. |

### Pilihan koneksi database

NestJS menjadi satu-satunya jalur aplikasi untuk menulis contact. Browser tidak menulis langsung ke tabel Supabase. Nest menggunakan koneksi PostgreSQL server-side; mekanisme ORM/driver dipilih sebelum implementasi. Karena Nest berjalan sebagai Vercel Function, koneksi Supabase perlu mengikuti pola serverless: transaction pooler untuk koneksi singkat, pool aplikasi kecil, SSL, dan konfigurasi yang tidak mengandalkan prepared statements jika driver memakai transaction mode. Supabase menjelaskan bahwa transaction mode ditujukan untuk serverless dan tidak mendukung prepared statements. [Panduan koneksi PostgreSQL Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres)

Database runtime memakai role dan kredensial yang dibatasi pada kebutuhan aplikasi; kredensial migrasi tidak dipakai saat melayani request. Jika tabel kelak diakses melalui Supabase Data API, konfigurasi exposure, grants, dan RLS harus ditinjau eksplisit mengikuti default Supabase yang berlaku saat implementasi. Kunci `service_role`, secret database, dan API key AI tidak boleh memakai prefix `NEXT_PUBLIC_` atau muncul pada client bundle.

## 6. Scope MVP yang direkomendasikan

### Termasuk dalam proposal

- Menjalankan satu NestJS API di Vercel dari `apps/api`.
- Menyediakan health endpoint yang tidak mengungkap secret, konfigurasi, atau detail database.
- Memindahkan fungsi chat dari route Next.js ke NestJS tanpa mengubah pengalaman chat yang terlihat pengunjung. Integrasi Sumopod tetap server-side; transcript percakapan tidak disimpan.
- Menambahkan form contact sebagai alternatif yang lebih langsung dari `mailto:` dan menyimpan pesan valid ke Supabase PostgreSQL.
- Menyimpan fakta portfolio dalam TypeScript lokal; bila data profil/project dipakai sebagai konteks chat, satukan sumber data yang dipakai kedua app tanpa menjadikan database sebagai CMS.
- Membatasi input, mengembalikan error yang aman, dan menyediakan fallback agar pengunjung tetap dapat menghubungi Alfi jika API gagal.
- Menyimpan migrasi database sebagai file yang dapat direview dan dijalankan untuk environment terpisah.

### Tidak termasuk dalam MVP

- CMS atau dashboard admin khusus untuk mengubah bio, timeline, skills, dan projects.
- Login pengunjung atau akun pengguna.
- Menyimpan transcript chat, IP mentah, atau user-agent sebagai riwayat.
- Upload dan pengelolaan gambar portfolio melalui database; aset tetap statis.
- WebSocket, worker yang berjalan terus-menerus, atau scheduler in-process.
- Mengubah desain besar homepage yang sudah diatur oleh PRD Life Points.

## 7. Alur produk

### Chat

1. Pengunjung mengirim pesan melalui UI yang ada.
2. Next mengirim pesan ke endpoint NestJS yang terversi.
3. Nest memvalidasi jumlah pesan, role, dan batas panjang; memeriksa topik portfolio; lalu memanggil Sumopod.
4. Nest mengembalikan jawaban atau error ringkas. Secret provider tidak pernah dikirim ke browser.
5. Pesan tidak disimpan di database. Jika provider atau API gagal, UI menampilkan error yang bisa dimengerti dan tidak menghilangkan percakapan yang sudah ada di browser.

### Contact

1. Pengunjung mengisi nama, email, dan pesan; email serta pesan wajib, nama opsional.
2. Nest memvalidasi dan membatasi payload, menerapkan perlindungan spam, lalu menyimpan record.
3. UI menampilkan konfirmasi hanya setelah penyimpanan berhasil; saat gagal, nilai form tetap tersedia untuk dicoba lagi dan tautan email langsung tetap dapat digunakan.
4. Pada MVP, Alfi memeriksa pesan melalui akses owner Supabase Dashboard. Tidak ada endpoint publik untuk membaca, mencari, atau mengubah pesan.

Notifikasi email dan dashboard contact buatan sendiri dapat menjadi iterasi berikutnya bila alur pemeriksaan manual tidak cukup.

## 8. Kebutuhan data

### `contact_submissions` — kandidat tabel MVP

| Field | Aturan |
| --- | --- |
| `id` | UUID, primary key. |
| `name` | Text opsional, panjang dibatasi. |
| `email` | Wajib, divalidasi dan panjang dibatasi. |
| `message` | Wajib, panjang dibatasi. |
| `created_at` | Timestamp server, bukan waktu yang dipercaya dari browser. |

Jangan menyimpan transcript chat atau identitas teknis tambahan pada tabel ini tanpa kebutuhan yang disetujui. Aturan retensi/penghapusan pesan perlu ditentukan sebelum form dibuka untuk publik.

### Konten portfolio

Profile, project, timeline, skills, dan contact links tetap menjadi data read-only TypeScript. Tambahkan tabel konten dan autentikasi admin hanya jika kebutuhan mengedit tanpa deploy disetujui terpisah.

## 9. Kebutuhan fungsional

| ID | Requirement |
| --- | --- |
| FR-01 | API harus memiliki namespace versi yang konsisten untuk endpoint produk. |
| FR-02 | Chat NestJS harus mempertahankan validasi dan batas jawaban yang sudah digunakan UI, sambil menyediakan respons error 4xx/5xx yang konsisten. |
| FR-03 | Chat memanggil provider AI hanya dari server dan tidak menyimpan transcript dalam MVP. |
| FR-04 | Contact menerima field sesuai skema, menolak payload invalid/terlalu besar, menyimpan timestamp dari server, dan hanya memberi konfirmasi sukses setelah database mengonfirmasi write. |
| FR-05 | Tidak ada akses publik untuk membaca atau mengubah pesan contact yang tersimpan. |
| FR-06 | Jika contact gagal disimpan, UI mempertahankan input dan menyediakan fallback `mailto:`. |
| FR-07 | Health endpoint tidak menampilkan credentials, SQL, host database, atau konfigurasi rahasia. |
| FR-08 | Kegagalan API tidak menghalangi render konten portfolio yang statis. |
| FR-09 | Kebijakan rate limit tidak bergantung pada `Map` atau state proses lokal sebagai mekanisme produksi bersama. Pilihan shared store atau proteksi platform diputuskan sebelum API publik diluncurkan. |
| FR-10 | CORS/route proxy hanya mengizinkan origin frontend yang ditetapkan untuk production dan preview; tidak memakai wildcard untuk membawa credentials. |

## 10. Kualitas dan keamanan

- Nest berjalan pada model serverless/Fluid compute di Vercel. Jangan mengandalkan proses selalu hidup, cron in-process, WebSocket, atau state dalam memori sebagai state lintas request. Gunakan Vercel Cron atau penyedia yang sesuai bila kebutuhan terjadwal muncul. [Vercel tentang NestJS di Functions](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel)
- Koneksi Supabase harus sesuai dengan runtime serverless dan batas connection pool; konfigurasi client dibuat untuk dipakai ulang pada warm instance, bukan dibuat ulang setiap request. [Panduan koneksi Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres)
- Public API menerapkan validasi server-side, batas ukuran request, error aman, dan kontrol penyalahgunaan yang berlaku lintas instance.
- Secret AI, secret database, dan migrasi hanya tersedia pada project/environment yang membutuhkannya; pisahkan credentials preview dan production.
- Message body, alamat email, token, dan secrets tidak ditulis ke log observability.
- Tabel data pengguna tidak memiliki jalur baca publik. Akses runtime dan akses owner menggunakan hak minimum yang dibutuhkan.
- Preview deployment harus memakai database/environment non-production atau data uji yang aman; jangan mengirim pesan uji ke data production.
- Proposal ini memakai NestJS sebagai jalur database, bukan akses tulis langsung dari browser melalui Data API. Supabase mengubah default exposure tabel: tabel baru tidak otomatis diekspos pada project baru mulai 30 Mei 2026, dan perubahan diberlakukan pada semua project mulai 30 Oktober 2026. Jika Data API dipakai kemudian, atur exposure/grants dan RLS secara eksplisit; periksa status perubahan saat implementasi. [Perubahan exposure tabel Supabase](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically) · [Keamanan Data API](https://supabase.com/docs/guides/api/securing-your-api)

## 11. Acceptance criteria

| ID | Skenario penerimaan |
| --- | --- |
| AC-01 | Deploy preview dan production berhasil untuk web dan API dari satu repo, dengan root directory dan environment variables yang tepat. |
| AC-02 | Memuat homepage tidak memerlukan API atau query database untuk menampilkan About, Timeline, Works, dan konten statis lainnya. |
| AC-03 | Chat memberikan pengalaman yang tetap berfungsi setelah pindah ke NestJS; secret tidak ada di browser/network response dan transcript tidak masuk database. |
| AC-04 | Submit contact valid membuat satu record; submit invalid ditolak; respons sukses baru muncul setelah record tersimpan. |
| AC-05 | Request anonim untuk membaca atau mengubah record contact ditolak dan tidak mengembalikan data pesan. |
| AC-06 | Kegagalan Nest, Sumopod, atau Supabase menghasilkan feedback yang bisa ditindaklanjuti tanpa merusak isi form atau halaman. |
| AC-07 | Rate limit pada production tidak menganggap memori satu Vercel Function sebagai state global. |
| AC-08 | Perubahan schema bisa dijalankan berulang pada environment baru melalui migration yang direview; preview tidak menulis ke database production. |

## 12. Rilis bertahap

1. **Konfirmasi scope dan kebijakan data:** setujui contact form/persistensi, lama retensi pesan, domain API, dan kebijakan rate limit.
2. **Fondasi API:** buat Nest app, health endpoint, environment preview, dan deployment Vercel terpisah; belum mengubah UI.
3. **Migrasi chat:** pindahkan endpoint dan secrets ke Nest, lalu verifikasi kompatibilitas UI sebelum menghapus Next route lama.
4. **Contact persistence:** tambah form, migration `contact_submissions`, write path Nest, perlindungan spam, dan fallback email.
5. **Review publikasi:** verifikasi privacy notice/retensi, akses Supabase, domain/CORS, observability redaction, serta batas penyalahgunaan.

## 13. Keputusan yang perlu dikonfirmasi

1. Apakah MVP benar mencakup form contact yang menyimpan pesan, atau Nest awalnya hanya memindahkan chat?
2. Berapa lama pesan contact disimpan, dan apakah Supabase Dashboard cukup sebagai inbox awal?
3. Apakah API memakai subdomain terpisah atau diakses melalui path same-origin di domain web?
4. Pilihan rate limit untuk production perlu ditetapkan sebelum endpoint publik dibuka. ORM/driver dipilih setelah model data awal disetujui dan diuji dengan pooler serverless.

## 14. Keputusan teknis yang ditunda

- ORM/driver PostgreSQL dan strategi migrasi final.
- Shared store atau proteksi platform untuk rate limit.
- Email notification dan admin inbox app.
- CMS, Supabase Auth, dan tabel untuk konten portfolio.
- Shared API contracts package dan orkestrasi build (npm workspaces/Turborepo), di luar kebutuhan minimal untuk men-deploy app terpisah.

Keputusan yang ditunda tidak boleh dianggap sudah dipilih hanya karena disebut sebagai opsi di dokumen ini.
