import type { BlogPost } from '@/types'

export const seedBlogs: BlogPost[] = [
  {
    id: 'b1',
    title: 'Kenapa Kami Menyeduh Cold Brew Selama 18 Jam',
    excerpt:
      'Proses lambat bukan tanpa alasan — ini cerita di balik cold brew andalan Bokvra dan kenapa kesabaran itu penting.',
    content: `Cold brew bukan sekadar kopi yang diseduh dengan air dingin. Prosesnya jauh lebih sabar dari itu.

Di Bokvra, biji kopi pilihan kami giling kasar lalu direndam air suhu ruang selama 18 jam penuh. Tidak ada panas yang dipakai sama sekali, sehingga senyawa asam yang biasanya membuat kopi terasa tajam tidak banyak terekstrak.

Hasilnya adalah kopi yang halus, rendah asam, dengan rasa manis alami yang muncul dari gula-gula dalam biji kopi itu sendiri. Cocok diminum tanpa gula tambahan, atau dengan sedikit susu untuk yang suka creamy.

Kami percaya proses yang tidak terburu-buru menghasilkan rasa yang lebih jujur. Itu juga filosofi yang kami bawa ke seluruh menu — ngopi senyaman rumah, tanpa terburu-buru.`,
    author: 'Tim Bokvra',
    authorId: 'system',
    publishedAt: '2026-05-12',
    tags: ['Kopi', 'Di Balik Layar'],
  },
  {
    id: 'b2',
    title: 'Panduan Singkat Memilih Menu Non-Coffee di Bokvra',
    excerpt:
      'Tidak semua orang cocok dengan kafein. Berikut pilihan non-coffee favorit pelanggan kami dan kapan waktu terbaik menikmatinya.',
    content: `Tidak semua tamu yang datang ke Bokvra mencari kafein. Beberapa datang untuk suasana, beberapa untuk menu non-coffee kami yang dibuat dengan perhatian yang sama seperti kopi.

Matcha latte adalah favorit utama — bubuk matcha ceremonial grade yang dikocok manual sebelum dicampur susu segar, menghasilkan rasa earthy yang lembut dan tidak terlalu manis.

Untuk yang mencari sesuatu yang lebih ringan, teh racikan kami cocok dinikmati sore hari saat matahari mulai turun dan suasana kafe berubah lebih santai.

Apapun pilihannya, kami ingin setiap tamu merasa menu non-coffee bukan sekadar pengganti, tapi pilihan yang setara enaknya.`,
    author: 'Tim Bokvra',
    authorId: 'system',
    publishedAt: '2026-04-02',
    tags: ['Non-Coffee', 'Panduan'],
  },
  {
    id: 'b3',
    title: 'Di Balik Desain Interior Bokvra: Rumah yang Bisa Dikunjungi Siapa Saja',
    excerpt:
      'Tagline kami "Ngopi Senyaman Rumah" bukan sekadar slogan. Ini cerita bagaimana ruang Bokvra dirancang untuk terasa akrab.',
    content: `Ketika merancang ruang Bokvra, kami mulai dari satu pertanyaan sederhana: bagaimana rasanya duduk di ruang tamu rumah sendiri?

Jawabannya bukan soal ukuran atau kemewahan, tapi soal kehangatan. Karena itu kami memilih material kayu untuk banyak sudut kafe, jendela besar yang membiarkan cahaya sore masuk, dan tempat duduk yang cukup nyaman untuk ditempati berjam-jam.

Lantai dua sengaja kami buat lebih terbuka dengan balkon kecil, tempat tamu bisa menikmati udara luar sambil tetap merasa privat.

Bagi kami, kafe yang baik bukan cuma soal kopi enak, tapi juga ruang yang membuat orang ingin kembali lagi.`,
    author: 'Tim Bokvra',
    authorId: 'system',
    publishedAt: '2026-02-20',
    tags: ['Cerita Kami', 'Interior'],
  },
]
