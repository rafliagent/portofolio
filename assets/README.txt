ASSET WEBSITE PORTFOLIO — CATATAN UPLOAD FOTO & FILE

1. FOTO PROFIL (Home)
   assets/profile.jpg

2. CV
   assets/cv.pdf

3. FOTO PROJECT (cover + galeri dokumentasi otomatis bergulir)
   >>> FOLDER BARU per project: assets/projects/<nama-project>/
   Simpan:
     - cover.jpg   → foto sampul yang tampil di card project
     - 1.jpg, 2.jpg, 3.jpg, dst → foto dokumentasi yang tampil di galeri
       saat card diklik (galeri akan bergulir otomatis ke kanan)
   Project yang tersedia saat ini: smartumkm, portfolio, photography
   Contoh: assets/projects/smartumkm/cover.jpg, assets/projects/smartumkm/1.jpg
   Jika foto belum ada, otomatis muncul placeholder "ADD PHOTO".
   Mau tambah/kurangi jumlah foto dokumentasi? Edit array images di object
   projectData pada script.js.

4. DATA DIRI
   Ganti nama, link sosial media, pendidikan, pencapaian, dan skill sesuai data
   pribadi pada index.html / script.js.

5. FOTO KARTU DI HALAMAN ABOUT (kartu kecil yang berganti tiap tab)
   Simpan di folder assets/about/ dengan nama:
     - education.jpg    (foto untuk tab "Pendidikan")
     - achievement.jpg  (foto untuk tab "Pencapaian")
     - skills.jpg       (foto untuk tab "Keterampilan")
   Gunakan foto berorientasi horizontal (landscape), karena kartu ini
   ditampilkan tanpa kemiringan dengan rasio lebar 16:10.
   Jika file belum ada, kartu otomatis menampilkan placeholder "ADD PHOTO".

6. FOTO GALERI "LIHAT DOKUMENTASI" DI ABOUT (galeri melengkung, bisa digulir kiri/kanan)
   >>> FOLDER: assets/about/documentation/
   Simpan 5 foto per kategori dengan nama:
     - education-1.jpg  s/d  education-5.jpg
     - achievement-1.jpg  s/d  achievement-5.jpg
     - skills-1.jpg  s/d  skills-5.jpg
   Boleh kurang dari 5, foto yang belum ada otomatis jadi placeholder "ADD PHOTO".
   Mau tambah/kurangi jumlah foto? Edit array images di object aboutDocData
   pada script.js.

   Setiap foto di galeri ini punya tombol "Lihat Detail". Saat diklik, akan
   terbuka foto tersebut dalam ukuran besar + caption + foto tambahan lain
   terkait foto itu. Simpan foto tambahan dengan nama:
     - education-1-detail-1.jpg, education-1-detail-2.jpg, dst (untuk foto ke-1)
     - education-2-detail-1.jpg, dst (untuk foto ke-2)
     - pola yang sama untuk achievement-X-detail-Y.jpg dan skills-X-detail-Y.jpg
   Caption dan jumlah foto tambahan per foto bisa diatur/diisi di array
   "detail" dan "caption" pada object aboutDocData di script.js.

   Keterangan (teks) yang tampil di kolom kiri saat tab Pendidikan /
   Pencapaian / Keterampilan diklik — juga sudah berbeda-beda kontennya.
   Isi/ubah teksnya di object aboutData pada script.js (array "items").

7. ICON APLIKASI DI BAGIAN SKILLS (icon melayang yang bisa diklik)
   >>> FOLDER: assets/skills/
   Simpan (format .png transparan disarankan):
     - html.png, css.png, js.png, figma.png, vscode.png, canva.png, github.png
   Jika icon belum ada, otomatis muncul teks nama tool sebagai fallback.
   Klik icon membuka detail + contoh karya — edit di object skillData
   pada script.js (kicker, title, description, tags, images).

RINGKASAN FOLDER assets/ SETELAH LENGKAP:
assets/
├── profile.jpg
├── cv.pdf
├── projects/
│   ├── smartumkm/
│   │   ├── cover.jpg
│   │   └── 1.jpg ... 5.jpg
│   ├── portfolio/
│   │   ├── cover.jpg
│   │   └── 1.jpg ... 4.jpg
│   └── photography/
│       ├── cover.jpg
│       └── 1.jpg ... 5.jpg
├── about/
│   ├── education.jpg
│   ├── achievement.jpg
│   ├── skills.jpg
│   └── documentation/
│       ├── education-1.jpg ... education-5.jpg
│       ├── achievement-1.jpg ... achievement-5.jpg
│       └── skills-1.jpg ... skills-5.jpg
└── skills/
    ├── html.png
    ├── css.png
    ├── js.png
    ├── figma.png
    ├── vscode.png
    ├── canva.png
    └── github.png

Catatan: fitur "theme song" pada versi sebelumnya sudah dihapus dari
website ini, jadi file assets/theme-song.mp3 tidak lagi diperlukan.
