# MathQuest: Gamified Adaptive Learning

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Theme: Accessible & Adaptive Learning](https://img.shields.io/badge/Theme-Accessible_%26_Adaptive_Learning-blue)](https://sdgs.un.org/goals/goal4)

## Latar Belakang Proyek

Dalam beberapa tahun terakhir, terdapat tren penurunan minat dan pemahaman siswa terhadap mata pelajaran **Matematika**. Banyak siswa menganggap matematika sebagai subjek yang membosankan, kaku, dan sulit dipahami. Hal ini sering kali disebabkan oleh metode pembelajaran konvensional yang kurang interaktif dan gagal menyesuaikan dengan kecepatan belajar masing-masing individu.

**MathQuest** hadir sebagai solusi teknologi di bawah tema **Accessible & Adaptive Learning**. Kami percaya bahwa pendidikan berkualitas harus inklusif dan personal. Dengan mengintegrasikan elemen **Gamifikasi**, kami mengubah proses belajar matematika yang tadinya menegangkan menjadi sebuah petualangan yang interaktif dan menyenangkan, membantu siswa meningkatkan pemahaman mereka melalui pengalaman belajar yang adaptif.

---

## Solusi: Gamifikasi Pembelajaran

Aplikasi ini dirancang untuk menciptakan ekosistem belajar yang:

- **Interaktif:** Menggunakan mekanisme permainan (poin, level, dan tantangan) untuk memicu keterlibatan siswa.
- **Adaptif:** Menyesuaikan tingkat kesulitan berdasarkan kemampuan individu.
- **Inklusif:** Memudahkan akses belajar di mana saja dan kapan saja.

---

## Anggota Kelompok

Kami adalah tim multidisiplin yang berdedikasi untuk meningkatkan kualitas pendidikan melalui teknologi:

| Nama | Learning Path |
| :--- | :--- |
| **Ahmad Huda Wattuqa** | AI Engineer & Ketua |
| **Ara Rosalia Safitri** | AI Engineer |
| **Arham Athillah** | Full-Stack Web Developer As Front-End |
| **Fahmi Fathurrohman** | Full-Stack Web Developer As Back-End |
| **Khalif Umar Al Faruq** | Data Scientist |
| **Hannah Khairunnisa Filzah** | Data Scientist |

---

## Fitur Utama

- **Adaptive Pathing:** Materi belajar yang menyesuaikan dengan progres pengguna berdasarkan hasil analisis AI.
- **Reward System:** Dapatkan badge/achievement dan naikkan peringkat di Leaderboard.
- **AI Recommendation:** Rekomendasi modul belajar yang dipersonalisasi berdasarkan hasil pretest.
- **Interactive Quiz:** Latihan soal dengan sistem XP berbasis kecepatan jawaban.
- **Quest Map:** Peta perjalanan belajar yang menampilkan seluruh modul, kuis, dan statusnya secara visual.

---

## Alur Penggunaan Aplikasi

### 1. Register

Pengguna baru membuat akun dengan mengisi form registrasi yang mencakup nama lengkap, email, dan password. Validasi yang diterapkan:
- Nama: 2–100 karakter
- Email: format valid
- Password: minimal 8 karakter dan mengandung setidaknya 1 angka

Setelah berhasil mendaftar, akun langsung aktif dan siap digunakan.

### 2. Login

Pengguna masuk menggunakan email dan password yang telah didaftarkan. Sistem akan mengeluarkan **JWT Token** (berlaku 7 hari) yang digunakan untuk autentikasi pada setiap permintaan berikutnya. Token dikirim melalui header `Authorization: Bearer <token>`.

### 3. Pilih Jenjang

Setelah login, pengguna memilih jenjang pendidikan yang sesuai:

 Jenjang |
 :--- |
 SD (Sekolah Dasar) |
 SMP (Sekolah Menengah Pertama) |
 SMA (Sekolah Menengah Atas) |

Pilihan jenjang menentukan soal pretest, modul, dan kuis yang akan diterima pengguna selama proses pembelajaran.

### 4. Pretest

Sebelum masuk ke materi utama, pengguna mengerjakan **pretest** untuk mengukur kemampuan awal. Soal pretest diambil dari **3 modul pertama** pada setiap jenjang yang dipilih, mencakup berbagai topik matematika dasar. Alur pretest:

1. Buat sesi pretest → `POST /api/pretest/sessions`
2. Ambil soal-soal dalam sesi tersebut → `GET /api/pretest/sessions/:id/questions`
3. Kirim jawaban satu per satu beserta waktu pengerjaan → `POST /api/pretest/sessions/:id/answer`
4. Selesaikan sesi → `POST /api/pretest/sessions/:id/finish`
5. Lihat hasil analisis → `GET /api/pretest/sessions/:id/result`

Hasil pretest (jawaban benar/salah, topik, dan waktu pengerjaan) digunakan sebagai input untuk sistem rekomendasi AI.

### 5. Rekomendasi AI

Setelah pretest selesai, pengguna dapat meminta **rekomendasi modul** dari AI. Sistem mengirim data hasil pretest ke layanan AI eksternal yang dibuat oleh tim AI Engineer dan AI mengembalikan topik-topik yang perlu diprioritaskan. Sistem kemudian memetakan topik tersebut ke modul yang relevan di database.

**Alur Mekanisme Rekomendasi AI:**

```
Pengguna tekan "Lihat Rekomendasi"
       │
       ▼
POST /api/recommendations/sessions/:sessionId
       │
       ▼
Backend membangun payload dari jawaban pretest:
{
  "records": [
    {
      "user_id": "...",
      "no_soal": 1,
      "materi": "Aljabar",
      "benar_salah": 0,        // 0 = salah, 1 = benar
      "waktu_pengerjaan": 25   // dalam detik (minimal 1)
    },
    ...
  ]
}
       │
       ▼
Request ke AI Service (POST ke AI_SERVICE_URL)
       │
       ▼
AI Service merespons:
{
  "weak_topics": ["Aljabar", "Geometri"],
  "confidence": 0.91
}
       │
       ▼
Backend memetakan setiap weak_topic ke modul
yang sesuai (berdasarkan topic + jenjang user)
       │
       ▼
Simpan rekomendasi terbaik (confidence tertinggi)
ke database (tabel AiRecommendation)
       │
       ▼
Response ke pengguna:
{
  "user_id": "...",
  "session_id": "...",
  "recommendations": [
    {
      "weak_topic": "Aljabar",
      "confidence": 0.91,
      "module": {
        "id": "...",
        "title": "Pengantar Aljabar",
        "topic": "Aljabar",
        "educationLevel": "middle",
        "orderIndex": 1,
        "xpReward": 150
      }
    }
  ]
}
```

> **Catatan:** Rekomendasi hanya dapat diminta sekali per sesi pretest. Jika sudah ada, sistem akan mengembalikan error `409 Conflict`. Gunakan `GET /api/recommendations/sessions/:sessionId` untuk mengambil rekomendasi yang sudah tersimpan.

### 6. Quest Map

Setelah mendapat rekomendasi, pengguna diarahkan ke halaman **Quest Map** — peta perjalanan belajar yang menampilkan seluruh modul dan kuis secara visual. Informasi yang ditampilkan pada setiap modul:
- Judul, topik dan deskripsi modul
- Status modul (belum dimulai / sedang dikerjakan / selesai)
- Progres halaman (misal: halaman 3 dari 10)
- Jumlah XP yang akan didapat jika modul diselesaikan
- Kuis terkait beserta statusnya (terkunci / tersedia / selesai)

### 7. Mengerjakan Modul

Pengguna memilih modul dari Quest Map dan mulai membaca materi. Materi disajikan per halaman. Sistem menyimpan progres halaman terakhir yang dibaca agar pengguna dapat melanjutkan dari posisi sebelumnya.

### 8. Menyelesaikan Kuis & Perhitungan XP

Di akhir setiap modul, pengguna mengerjakan **kuis** dengan batas waktu per soal. XP yang didapatkan dihitung berdasarkan kecepatan menjawab:

```javascript
const calculateQuestionXp = (baseXp, timeLimitSeconds, timeTakenSeconds) => {
  if (timeTakenSeconds >= timeLimitSeconds) return Math.floor(baseXp * 0.5);
  const timeBonus = 1 - timeTakenSeconds / timeLimitSeconds;
  return Math.floor(baseXp * (0.5 + 0.5 * timeBonus));
};
```

**Penjelasan logika:**
- Jika waktu habis (`timeTaken >= timeLimit`), pengguna tetap mendapat **50% dari baseXP**.
- Semakin cepat menjawab, semakin besar **time bonus** yang didapat (hingga 100% baseXP).
- Formula: `XP = baseXP × (0.5 + 0.5 × timeBonus)`, di mana `timeBonus = 1 - timeTaken / timeLimit`.

**Contoh perhitungan (baseXP = 100, timeLimit = 30 detik):**

| Time Taken | Time Bonus | XP Diperoleh |
|-----------|-----------|--------------|
| 0 detik (instan) | 1.0 | 100 XP |
| 10 detik | 0.67 | 83 XP |
| 15 detik | 0.5 | 75 XP |
| 30 detik (habis) | — | 50 XP |

### 8a. Pembahasan Soal oleh AI
 
Setiap kali pengguna menjawab soal kuis, sistem secara otomatis menyediakan **pembahasan/penjelasan jawaban**. Pembahasan diambil dari dua sumber secara berurutan:
 
**Prioritas 1 — Database:** Jika penjelasan sudah tersimpan di database (kolom `explanation` pada opsi jawaban), sistem langsung menggunakannya tanpa memanggil AI.
 
**Prioritas 2 — Generate AI:** Jika penjelasan di database kosong atau `null`, sistem memanggil layanan AI eksternal (`GEN_AI_SERVICE_URL`) untuk men-generate pembahasan secara real-time. Hasil pembahasan dari AI kemudian **disimpan ke database** agar permintaan berikutnya tidak perlu memanggil AI lagi (caching otomatis).
 
**Alur lengkap:**
 
```
Pengguna menjawab soal
       │
       ▼
Backend memeriksa kolom explanation pada opsi yang dipilih
       │
       ├─ Sudah ada → langsung kembalikan ke client
       │
       └─ Kosong/null → panggil AI Service
              │
              ▼
       Backend memetakan semua opsi ke format huruf (A, B, C, D)
       lalu menentukan key jawaban siswa dan key jawaban benar
              │
              ▼
       POST ke GEN_AI_SERVICE_URL:
       {
         "user_id": "...",
         "soal": "Berapakah hasil dari 2x + 5 = 15?",
         "pilihan": {
           "A": "x = 3",
           "B": "x = 5",
           "C": "x = 7",
           "D": "x = 10"
         },
         "jawaban_siswa": "A",
         "jawaban_benar": "B",
         "materi": "Persamaan Linear",
         "jenjang": "sma"
       }
              │
              ▼
       AI Service merespons:
       {
         "pembahasan": "Untuk menyelesaikan 2x + 5 = 15,
                        pindahkan 5 ke ruas kanan menjadi
                        2x = 10, lalu bagi kedua ruas
                        dengan 2 sehingga x = 5 (pilihan B)."
       }
              │
              ▼
       Pembahasan disimpan ke database (explanation)
              │
              ▼
       Kembalikan ke client
```
 
**Response ke client setelah menjawab soal:**
```json
{
  "questionId": "uuid",
  "selectedOptionId": "uuid",
  "isCorrect": false,
  "xpEarned": 0,
  "explanation": "Untuk menyelesaikan 2x + 5 = 15, ...",
  "correctOption": {
    "id": "uuid",
    "optionText": "x = 5"
  }
}
```
 
> **Catatan:**
> - Jika jawaban **benar**, field `correctOption` bernilai `null` (tidak perlu ditampilkan).
> - Jika jawaban **salah**, `correctOption` berisi opsi yang benar agar pengguna tahu jawaban yang tepat.
> - Jika AI service gagal dipanggil, `explanation` tetap `null` dan tidak mengganggu alur pengerjaan kuis.
> - XP hanya diberikan jika jawaban **benar**; jawaban salah mendapat `xpEarned: 0`.
 
---

### 9. Mendapat XP & Naik Level

Setelah menyelesaikan kuis, total XP dijumlahkan dan ditambahkan ke profil pengguna. Ketika XP mencapai ambang batas tertentu, pengguna secara otomatis **naik level**. Sistem juga mencatat streak harian — jumlah hari berturut-turut pengguna aktif belajar.

### 10. Mendapat Achievement

Sistem memantau aktivitas pengguna dan secara otomatis memberikan **badge/achievement** berdasarkan pencapaian tertentu. Di halaman Achievement, pengguna dapat melihat:
- Daftar semua achievement yang tersedia di platform
- Status tiap achievement: sudah diraih atau belum
- Jumlah XP bonus yang diperoleh dari achievement
- Progres menuju achievement yang belum tercapai
- Total achievement yang sudah diraih vs keseluruhan

### 11. Leaderboard

Di halaman Leaderboard, pengguna dapat melihat **peringkat 20 pengguna teratas** berdasarkan total XP. Tersedia filter jenjang:

| Filter | Keterangan |
| :--- | :--- |
| Semua | Menampilkan semua jenjang |
| SD | Hanya pengguna jenjang SD |
| SMP | Hanya pengguna jenjang SMP |
| SMA | Hanya pengguna jenjang SMA |

Saat pengguna pertama masuk ke halaman leaderboard, peringkat yang muncul duluan tergantung dari jenjang pengguna, misalnya jika pengguna memiliki jenjang SD maka awal yang akan muncul peringkat 20 terbesar untuk jenjang SD.

### 12. Halaman Profil

Halaman profil menampilkan ringkasan lengkap perkembangan pengguna:
- Level saat ini dan total XP
- XP yang masih dibutuhkan untuk naik ke level berikutnya
- Jumlah achievement yang diraih vs total achievement
- Jumlah streak (hari aktif berturut-turut)
- Progres modul: jumlah modul yang telah diselesaikan
- **5 aktivitas terakhir**, mencakup: penyelesaian modul, penyelesaian kuis, dan perolehan achievement

### 13. Mekanisme Streak Harian
 
Streak adalah penghitung hari aktif belajar secara berturut-turut. Sistem streak bekerja dengan aturan berikut:
 
**Kapan streak bertambah:**
Streak bertambah (+1) ketika pengguna melakukan salah satu aktivitas belajar berikut dalam satu hari:
- Membaca / melanjutkan halaman modul
- Menyelesaikan kuis

**Hari pertama streak:**
Streak mulai dihitung **H+1 setelah pengguna mendaftar**. Artinya, hari registrasi tidak dihitung sebagai hari pertama streak — pengguna harus aktif belajar pada hari berikutnya untuk memulai streak.
 
**Contoh skenario:**
 
| Hari | Aktivitas | Streak |
| :--- | :--- | :--- |
| Senin (hari register) | Daftar akun | 0 |
| Selasa | Membaca modul | 1 |
| Rabu | Menyelesaikan kuis | 2 |
| Kamis | Tidak ada aktivitas | 0 (reset) |
| Jumat | Membaca modul | 1 |
 
**Aturan reset:**
Jika pengguna tidak melakukan aktivitas belajar apapun dalam satu hari penuh, streak akan **direset ke 0** dan harus dibangun kembali dari awal.  

---

## Teknologi yang Digunakan

### Backend

| Teknologi | Keterangan |
| :--- | :--- |
| **Node.js** | Runtime JavaScript server-side |
| **Express.js v5** | Framework web minimalis dan fleksibel untuk membangun REST API |
| **Prisma ORM** | ORM modern untuk manajemen database dan query yang type-safe |
| **Nodemon** | Utilitas development yang secara otomatis me-restart server saat ada perubahan file, mempercepat iterasi pengembangan |
| **JSON Web Token (JWT)** | Autentikasi stateless berbasis token (expire: 7 hari) |
| **bcryptjs** | Enkripsi password yang aman menggunakan algoritma bcrypt |
| **Helmet** | Pengamanan HTTP response header dari serangan umum |
| **Morgan** | HTTP request logger untuk keperluan debugging |
| **CORS** | Middleware untuk mengizinkan cross-origin requests dari frontend |
| **express-validator** | Validasi dan sanitasi input request secara deklaratif |
| **date-fns** | Library utilitas manipulasi dan format tanggal |
| **dotenv** | Manajemen environment variable dari file `.env` |

### Frontend

| Teknologi | Keterangan |
| :--- | :--- |
| **React 19** | Library UI berbasis component |
| **Vite** | Build tool dan dev server modern yang sangat cepat |
| **React Router DOM v7** | Client-side routing untuk SPA |
| **Axios** | HTTP client untuk komunikasi dengan API backend |
| **Tailwind CSS** | Utility-first CSS framework |
| **Lucide React** | Library ikon yang ringan dan konsisten |

---

## Cara Menjalankan Proyek

### Prasyarat

Pastikan sudah terinstal:
- **Node.js** (versi 18 atau lebih baru)
- **npm**
- **Git**

### 1. Clone Repository

```bash
git clone https://github.com/arhmath/Capstone-Project.git
cd Capstone-Project
```

Struktur folder proyek:
```
Capstone-Project/
├── backend/
└── frontend/
```

---

### 2. Menjalankan Backend

```bash
# Masuk ke folder backend
cd backend

# Install semua dependensi
npm install

# Salin file konfigurasi environment
cp .env.example .env
```

Buka file `.env` dan isi setiap variabel sesuai konfigurasi lokal:

```env
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
PORT=
NODE_ENV=
FRONTEND_URL=
AI_SERVICE_URL=
GEN_AI_SERVICE_URL=
```

| Variabel | Keterangan |
| :--- | :--- |
| `DATABASE_URL` | Connection string database (PostgreSQL/MySQL/SQLite) |
| `JWT_SECRET` | Secret key untuk signing JWT token |
| `JWT_EXPIRES_IN` | Durasi kedaluwarsa token (contoh: `7d`) |
| `PORT` | Port server backend berjalan |
| `NODE_ENV` | Mode environment (`development` atau `production`) |
| `FRONTEND_URL` | URL aplikasi frontend (untuk konfigurasi CORS) |
| `AI_SERVICE_URL` | URL endpoint layanan AI untuk prediksi topik lemah |
| `GEN_AI_SERVICE_URL` | URL endpoint layanan AI untuk pembahasan soal |

```bash
# Generate Prisma client dari schema
npx prisma generate

# (Opsional) Jalankan migrasi database
npx prisma migrate dev

# Jalankan server backend
npm start
```

Server backend berjalan menggunakan **nodemon** dan dapat diakses di `http://localhost:<PORT>`.

---

### 3. Menjalankan Frontend

```bash
# Dari root proyek, masuk ke folder frontend
cd frontend

# Install semua dependensi
npm install
```

> **Catatan:** Tidak perlu menyalin file `.env` untuk frontend. Satu-satunya environment variable di frontend adalah URL API backend yang sudah dikonfigurasi secara default untuk mengarah ke server lokal.

```bash
# Jalankan development server
npm run dev
```

Aplikasi frontend dapat diakses di `http://localhost:5173` (port default Vite).

---

## Daftar Endpoint API

Base URL: `http://localhost:<PORT>/api`

Semua endpoint yang membutuhkan autentikasi harus menyertakan header:
```
Authorization: Bearer <token>
```

---

### Auth — `/api/auth`

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Registrasi akun pengguna baru |
| `POST` | `/auth/login` | Public | Login dan mendapatkan JWT token |
| `GET` | `/auth/me` | Auth | Mendapatkan data profil pengguna yang sedang login |
| `POST` | `/auth/logout` | Auth | Logout dari sesi aktif |
| `PATCH` | `/auth/profile` | Auth | Memperbarui nama atau avatar pengguna |

---

### Jenjang — `/api/education-levels`

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/education-levels/select` |  Auth | Menyimpan pilihan jenjang pengguna (SD, SMP, SMA) |

---

### Pretest — `/api/pretest`

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/pretest/sessions` | Auth | Membuat sesi pretest baru berdasarkan jenjang pengguna |
| `GET` | `/pretest/sessions/:id/questions` | Auth | Mengambil soal-soal dalam sesi pretest (dari 3 modul pertama jenjang) |
| `POST` | `/pretest/sessions/:id/answer` | Auth | Mengirim jawaban satu soal beserta waktu pengerjaan |
| `POST` | `/pretest/sessions/:id/finish` | Auth | Menyelesaikan sesi pretest |
| `GET` | `/pretest/sessions/:id/result` | Auth | Mengambil hasil dan analisis sesi pretest |

---

### Rekomendasi AI — `/api/recommendations`

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/recommendations/sessions/:sessionId` | Auth | Meminta rekomendasi modul dari AI berdasarkan hasil pretest (hanya bisa 1x per sesi) |
| `GET` | `/recommendations/sessions/:sessionId` | Auth | Mengambil rekomendasi yang sudah tersimpan untuk sesi tersebut |

**Alur request rekomendasi (POST):**

Backend membangun payload dari data jawaban pretest lalu mengirimkannya ke layanan AI eksternal:

```json
// Payload ke AI Service
{
  "records": [
    { "user_id": "...", "no_soal": 1, "materi": "Aljabar", "benar_salah": 0, "waktu_pengerjaan": 25 },
    { "user_id": "...", "no_soal": 2, "materi": "Geometri", "benar_salah": 1, "waktu_pengerjaan": 10 }
  ]
}

// Response dari AI Service
{
  "weak_topics": ["Aljabar"],
  "confidence": 0.91
}

// Response ke client
{
  "user_id": "...",
  "session_id": "...",
  "recommendations": [
    {
      "weak_topic": "Aljabar",
      "confidence": 0.91,
      "module": {
        "id": "...",
        "title": "Pengantar Aljabar",
        "topic": "Aljabar",
        "educationLevel": "middle",
        "orderIndex": 1,
        "xpReward": 150
      }
    }
  ]
}
```

---

### Modul — `/api/modules`

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/modules` | Auth | Mendapatkan semua modul sesuai jenjang pengguna (untuk Quest Map) |
| `GET` | `/modules/:id` | Auth | Mendapatkan detail modul (judul, topik, jumlah halaman, XP reward, progres) |
| `GET` | `/modules/:id/pages/:pageNumber` | Auth | Mendapatkan konten halaman tertentu dari modul |
| `PUT` | `/modules/:id/progress` | Auth | Menyimpan progres halaman terakhir yang dibaca |

**Body untuk `PUT /modules/:id/progress`:**
```json
{ "last_page": 5 }
```

---

### Kuis — `/api/quizzes`

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/quizzes/:id` | Auth | Mendapatkan detail kuis berdasarkan ID |
| `POST` | `/quizzes/:id/sessions` | Auth | Membuat sesi pengerjaan kuis baru |
| `POST` | `/quizzes/sessions/:sid/answer` | Auth | Mengirim jawaban satu soal beserta waktu pengerjaan |
| `POST` | `/quizzes/sessions/:sid/finish` | Auth | Menyelesaikan sesi kuis dan menghitung total XP |
| `GET` | `/quizzes/sessions/:sid/result` | Auth | Mendapatkan hasil kuis beserta rincian XP per soal |

**Body untuk `POST /quizzes/sessions/:sid/answer`:**
```json
{
  "questionId": "uuid",
  "optionId": "uuid",
  "timeTaken": 12
}
```

---

### Gamifikasi — `/api/gamification`

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/gamification/xp/me` | Auth | Mendapatkan total XP dan level saat ini pengguna |
| `GET` | `/gamification/xp/log` | Auth | Mendapatkan riwayat perolehan XP pengguna |
| `GET` | `/gamification/streak/me` | Auth | Mendapatkan data streak harian pengguna |
| `GET` | `/gamification/leaderboard` | Auth | Mendapatkan 20 pengguna teratas (filter opsional via `?educationLevel=middle`) |
| `GET` | `/gamification/dashboard` | Auth | Mendapatkan data ringkasan untuk halaman profil (XP, level, streak, progres modul, 5 aktivitas terakhir) |

**Query params untuk `/gamification/leaderboard`:**

| Param | Wajib | Contoh | Keterangan |
| :--- | :--- | :--- | :--- |
| `educationLevel` | Tidak | `middle` | Filter jenjang (`primary`, `middle`, `high`) |
| `limit` | Tidak | `20` | Jumlah data (maks. 100, default 20) |

---

### Achievement — `/api/progress`

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/progress/progress` | Auth | Mendapatkan progres belajar pengguna (modul selesai, dll) |
| `GET` | `/progress/achievements` | Auth | Mendapatkan semua achievement beserta status perolehan pengguna |

---

### Badge — `/api/achievements`

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/achievements/my-badges` | Auth | Mendapatkan daftar badge/achievement yang sudah diraih pengguna |

---

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).
