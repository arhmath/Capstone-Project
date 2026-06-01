const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding modules...');

    const modules = [
        {
            title: 'Penjumlahan Dan Pengurangan Sampai 20',
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_20',
            description:
                'Mempelajari konsep penjumlahan dan pengurangan bilangan sampai 20 dalam kehidupan sehari-hari.',
            orderIndex: 3,
            xpReward: 50,
            isPublished: true,
            pages: [
                {
                    pageNumber: 1,
                    sceneTitle: 'Cerita Di Kebun Buah',
                    storyContent:
                        'Pada suatu pagi, Budi membantu ibunya memanen buah mangga di kebun. Mereka berhasil mengumpulkan 10 buah mangga. Setelah itu, ayah datang membawa 5 buah mangga lagi. Budi penasaran berapa jumlah seluruh mangga yang mereka miliki. Saat menghitung bersama, ternyata ada 15 buah mangga. Dari kegiatan sederhana tersebut, Budi belajar bahwa penjumlahan membantu kita mengetahui jumlah benda yang bertambah.',
                    pageType: 'story',
                },

                {
                    pageNumber: 2,
                    sceneTitle: 'Apa Itu Penjumlahan?',
                    storyContent:
                        'Penjumlahan adalah operasi hitung yang digunakan untuk menggabungkan dua bilangan atau lebih sehingga menghasilkan jumlah yang lebih besar.',
                    pageType: 'explanation',
                },

                {
                    pageNumber: 3,
                    sceneTitle: 'Contoh Penjumlahan',
                    storyContent:
                        'Contoh:\n10 + 5 = 15\n\nBilangan pertama disebut angka awal, sedangkan bilangan kedua adalah angka yang ditambahkan.',
                    pageType: 'explanation',
                },

                {
                    pageNumber: 4,
                    sceneTitle: 'Apa Itu Pengurangan?',
                    storyContent:
                        'Pengurangan adalah operasi hitung yang digunakan untuk mengurangi suatu bilangan sehingga nilainya menjadi lebih kecil.',
                    pageType: 'explanation',
                },

                {
                    pageNumber: 5,
                    sceneTitle: 'Contoh Pengurangan',
                    storyContent:
                        'Contoh:\n18 - 5 = 13\n\nArtinya, dari 18 benda diambil 5 benda sehingga tersisa 13 benda.',
                    pageType: 'explanation',
                },

                {
                    pageNumber: 6,
                    sceneTitle: 'Penjumlahan Dalam Kehidupan Sehari-hari',
                    storyContent:
                        'Penjumlahan digunakan saat menghitung jumlah uang, jumlah buku, jumlah buah, atau jumlah teman yang hadir di kelas.',
                    pageType: 'explanation',
                },

                {
                    pageNumber: 7,
                    sceneTitle: 'Pengurangan Dalam Kehidupan Sehari-hari',
                    storyContent:
                        'Pengurangan digunakan saat menghitung sisa uang setelah belanja, sisa makanan, atau jumlah barang yang tersisa setelah digunakan.',
                    pageType: 'explanation',
                },

                {
                    pageNumber: 8,
                    sceneTitle: 'Latihan Contoh 1',
                    storyContent:
                        'Rina memiliki 12 permen. Ia mendapat 4 permen lagi.\n\n12 + 4 = 16\n\nJadi jumlah permen Rina sekarang adalah 16 permen.',
                    pageType: 'explanation',
                },

                {
                    pageNumber: 9,
                    sceneTitle: 'Latihan Contoh 2',
                    storyContent:
                        'Di dalam kotak terdapat 15 pensil. Sebanyak 3 pensil digunakan.\n\n15 - 3 = 12\n\nJadi sisa pensil adalah 12 buah.',
                    pageType: 'explanation',
                },

                {
                    pageNumber: 10,
                    sceneTitle: 'Tips Menghitung Cepat',
                    storyContent:
                        'Gunakan jari tangan, benda di sekitar, atau garis bilangan untuk membantu melakukan penjumlahan dan pengurangan sampai 20.',
                    pageType: 'explanation',
                },

                {
                    pageNumber: 11,
                    sceneTitle: 'Rangkuman Materi',
                    storyContent:
                        '• Penjumlahan digunakan untuk menambah jumlah.\n• Pengurangan digunakan untuk mengurangi jumlah.\n• Contoh penjumlahan: 10 + 5 = 15.\n• Contoh pengurangan: 18 - 5 = 13.\n• Operasi hitung ini sering digunakan dalam kehidupan sehari-hari.',
                    pageType: 'summary',
                },
            ],
        }, {
            title: 'Ayo Membilang Sampai 100',
            educationLevel: 'primary',
            topic: 'ayo_membilang_sampai_100',
            description:
                'Mempelajari cara membaca, menulis, membandingkan, dan mengurutkan bilangan sampai 100.',
            orderIndex: 4,
            xpReward: 50,
            isPublished: true,
            pages: [
                {
                    pageNumber: 1,
                    sceneTitle: 'Menghitung Koleksi Mainan',
                    storyContent:
                        'Dina memiliki banyak mainan di kamarnya. Ia mencoba menghitung semuanya satu per satu. Setelah selesai, ternyata ada 65 mainan. Dina belajar bahwa setiap jumlah benda dapat dituliskan dalam bentuk bilangan sehingga lebih mudah dibaca dan dipahami.',
                    pageType: 'story',
                },
                {
                    pageNumber: 2,
                    sceneTitle: 'Mengenal Bilangan Sampai 100',
                    storyContent:
                        'Bilangan digunakan untuk menyatakan jumlah benda. Bilangan sampai 100 terdiri dari satuan dan puluhan.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 3,
                    sceneTitle: 'Membaca Lambang Bilangan',
                    storyContent:
                        'Contoh:\n25 = dua puluh lima\n65 = enam puluh lima\n89 = delapan puluh sembilan',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 4,
                    sceneTitle: 'Nilai Tempat',
                    storyContent:
                        'Bilangan 82 terdiri dari 8 puluhan dan 2 satuan.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 5,
                    sceneTitle: 'Puluhan dan Satuan',
                    storyContent:
                        '57 = 5 puluhan + 7 satuan\n34 = 3 puluhan + 4 satuan',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 6,
                    sceneTitle: 'Membandingkan Bilangan',
                    storyContent:
                        '78 lebih besar dari 74.\nDitulis: 78 > 74',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 7,
                    sceneTitle: 'Mengurutkan Bilangan',
                    storyContent:
                        'Contoh urutan dari kecil ke besar:\n12, 25, 36, 49, 60',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 8,
                    sceneTitle: 'Bilangan Sebelum dan Sesudah',
                    storyContent:
                        'Bilangan sebelum 90 adalah 89.\nBilangan sesudah 90 adalah 91.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 9,
                    sceneTitle: 'Contoh Soal',
                    storyContent:
                        '5 puluhan + 7 satuan = 57\nKarena 50 + 7 = 57.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 10,
                    sceneTitle: 'Penerapan Dalam Kehidupan',
                    storyContent:
                        'Bilangan digunakan saat menghitung uang, jumlah siswa, jumlah buku, dan banyak benda lainnya.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 11,
                    sceneTitle: 'Rangkuman',
                    storyContent:
                        '• Bilangan sampai 100 terdiri dari puluhan dan satuan.\n• Bilangan dapat dibandingkan dan diurutkan.\n• Nilai tempat membantu membaca bilangan dengan benar.\n• Bilangan digunakan dalam kehidupan sehari-hari.',
                    pageType: 'summary',
                },
            ],
        },

        {
            title: 'Bilangan Cacah Sampai 1000',
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            description:
                'Mempelajari bilangan cacah sampai 1000, nilai tempat, dan perbandingan bilangan.',
            orderIndex: 5,
            xpReward: 60,
            isPublished: true,
            pages: [
                {
                    pageNumber: 1,
                    sceneTitle: 'Gudang Buku Sekolah',
                    storyContent:
                        'Pak Budi sedang menghitung jumlah buku di gudang sekolah. Ada ratusan buku yang harus dicatat. Agar lebih mudah, beliau menggunakan bilangan ratusan seperti 315, 500, dan 872. Dengan bilangan tersebut, pencatatan menjadi lebih cepat dan teratur.',
                    pageType: 'story',
                },
                {
                    pageNumber: 2,
                    sceneTitle: 'Apa Itu Bilangan Cacah?',
                    storyContent:
                        'Bilangan cacah adalah bilangan yang dimulai dari 0, 1, 2, 3, dan seterusnya.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 3,
                    sceneTitle: 'Nilai Tempat',
                    storyContent:
                        'Pada bilangan 872:\n8 = ratusan\n7 = puluhan\n2 = satuan',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 4,
                    sceneTitle: 'Bentuk Panjang Bilangan',
                    storyContent:
                        '456 = 400 + 50 + 6',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 5,
                    sceneTitle: 'Membaca Bilangan',
                    storyContent:
                        '315 dibaca tiga ratus lima belas.\n902 dibaca sembilan ratus dua.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 6,
                    sceneTitle: 'Membandingkan Bilangan',
                    storyContent:
                        '345 < 354 karena nilai ratusannya sama, tetapi puluhan 4 lebih kecil dari 5.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 7,
                    sceneTitle: 'Mengurutkan Bilangan',
                    storyContent:
                        '254 > 234 > 214',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 8,
                    sceneTitle: 'Menentukan Bilangan Di Antara',
                    storyContent:
                        'Bilangan di antara 567 dan 569 adalah 568.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 9,
                    sceneTitle: 'Contoh Soal',
                    storyContent:
                        '400 + 50 + 6 = 456',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 10,
                    sceneTitle: 'Penerapan Bilangan Cacah',
                    storyContent:
                        'Bilangan cacah digunakan untuk menghitung jumlah siswa, jumlah kendaraan, jumlah buku, dan berbagai benda lainnya.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 11,
                    sceneTitle: 'Rangkuman',
                    storyContent:
                        '• Bilangan cacah dimulai dari 0.\n• Bilangan memiliki nilai tempat satuan, puluhan, dan ratusan.\n• Bilangan dapat dibandingkan dan diurutkan.\n• Bentuk panjang membantu memahami nilai tempat.',
                    pageType: 'summary',
                },
            ],
        }, {
            title: 'Penjumlahan Dan Pengurangan Sampai 1000',
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_1000',
            description:
                'Mempelajari operasi penjumlahan dan pengurangan bilangan sampai 1000 serta penerapannya dalam kehidupan sehari-hari.',
            orderIndex: 6,
            xpReward: 60,
            isPublished: true,
            pages: [
                {
                    pageNumber: 1,
                    sceneTitle: 'Persediaan Beras Di Gudang',
                    storyContent:
                        'Pak Hasan memiliki 345 kg beras di gudangnya. Kemudian datang kiriman baru sebanyak 123 kg. Untuk mengetahui total persediaan beras, Pak Hasan harus melakukan penjumlahan. Dalam kehidupan sehari-hari, penjumlahan dan pengurangan sering digunakan untuk menghitung stok barang.',
                    pageType: 'story',
                },
                {
                    pageNumber: 2,
                    sceneTitle: 'Penjumlahan Bilangan Sampai 1000',
                    storyContent:
                        'Penjumlahan digunakan untuk menggabungkan dua bilangan atau lebih menjadi jumlah yang lebih besar.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 3,
                    sceneTitle: 'Contoh Penjumlahan',
                    storyContent:
                        '345 + 123 = 468',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 4,
                    sceneTitle: 'Pengurangan Bilangan Sampai 1000',
                    storyContent:
                        'Pengurangan digunakan untuk mencari selisih atau sisa dari suatu bilangan.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 5,
                    sceneTitle: 'Contoh Pengurangan',
                    storyContent:
                        '560 - 240 = 320',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 6,
                    sceneTitle: 'Penjumlahan Bersusun',
                    storyContent:
                        'Penjumlahan dapat dilakukan secara bersusun untuk mempermudah perhitungan bilangan besar.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 7,
                    sceneTitle: 'Pengurangan Bersusun',
                    storyContent:
                        'Pengurangan bersusun membantu menghitung selisih dengan lebih rapi dan mudah.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 8,
                    sceneTitle: 'Contoh Soal Cerita',
                    storyContent:
                        'Ibu membeli 250 gram terigu dan 150 gram gula.\nTotal berat = 400 gram.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 9,
                    sceneTitle: 'Penerapan Dalam Kehidupan',
                    storyContent:
                        'Operasi hitung digunakan saat menghitung uang, berat barang, jarak, dan persediaan barang.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 10,
                    sceneTitle: 'Latihan Perhitungan',
                    storyContent:
                        '458 + 215 = 673\n700 - 325 = 375',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 11,
                    sceneTitle: 'Rangkuman',
                    storyContent:
                        '• Penjumlahan digunakan untuk menambah jumlah.\n• Pengurangan digunakan untuk mencari selisih.\n• Operasi hitung sampai 1000 sering digunakan dalam kehidupan sehari-hari.',
                    pageType: 'summary',
                },
            ],
        },

        {
            title: 'Pecahan',
            educationLevel: 'primary',
            topic: 'pecahan',
            description:
                'Mempelajari konsep pecahan, pecahan senilai, perbandingan pecahan, dan bentuk desimal sederhana.',
            orderIndex: 7,
            xpReward: 75,
            isPublished: true,
            pages: [
                {
                    pageNumber: 1,
                    sceneTitle: 'Membagi Pizza Bersama Teman',
                    storyContent:
                        'Sinta dan temannya membeli satu pizza. Mereka membagi pizza tersebut menjadi dua bagian sama besar. Setiap orang mendapatkan setengah bagian. Dari situ Sinta belajar tentang pecahan.',
                    pageType: 'story',
                },
                {
                    pageNumber: 2,
                    sceneTitle: 'Pengertian Pecahan',
                    storyContent:
                        'Pecahan digunakan untuk menyatakan bagian dari keseluruhan.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 3,
                    sceneTitle: 'Bagian Pecahan',
                    storyContent:
                        'Pada pecahan 1/2:\n1 disebut pembilang\n2 disebut penyebut.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 4,
                    sceneTitle: 'Pecahan Senilai',
                    storyContent:
                        '1/2 = 2/4 = 4/8',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 5,
                    sceneTitle: 'Membandingkan Pecahan',
                    storyContent:
                        '3/4 lebih besar dari 1/4 karena pembilangnya lebih besar dengan penyebut yang sama.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 6,
                    sceneTitle: 'Penjumlahan Pecahan',
                    storyContent:
                        '2/5 + 1/5 = 3/5',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 7,
                    sceneTitle: 'Pecahan Ke Desimal',
                    storyContent:
                        '1/10 = 0,1',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 8,
                    sceneTitle: 'Desimal Ke Pecahan',
                    storyContent:
                        '0,5 = 1/2',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 9,
                    sceneTitle: 'Contoh Soal',
                    storyContent:
                        'Jika sebuah kue dibagi menjadi 4 bagian sama besar dan kamu memakan 1 bagian, maka kamu memakan 1/4 kue.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 10,
                    sceneTitle: 'Penerapan Pecahan',
                    storyContent:
                        'Pecahan digunakan saat membagi makanan, mengukur bahan masakan, dan menghitung bagian suatu benda.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 11,
                    sceneTitle: 'Rangkuman',
                    storyContent:
                        '• Pecahan menyatakan bagian dari keseluruhan.\n• Pecahan memiliki pembilang dan penyebut.\n• Pecahan dapat dibandingkan, dijumlahkan, dan diubah menjadi desimal.',
                    pageType: 'summary',
                },
            ],
        },

        {
            title: 'Kpk Dan Fpb',
            educationLevel: 'primary',
            topic: 'kpk_dan_fpb',
            description:
                'Mempelajari kelipatan, faktor, KPK, dan FPB untuk menyelesaikan berbagai masalah matematika.',
            orderIndex: 8,
            xpReward: 75,
            isPublished: true,
            pages: [
                {
                    pageNumber: 1,
                    sceneTitle: 'Jadwal Latihan Bersama',
                    storyContent:
                        'Dua tim olahraga memiliki jadwal latihan berbeda. Untuk mengetahui kapan mereka berlatih bersama lagi, diperlukan konsep KPK. Sedangkan untuk membagi kelompok secara merata digunakan FPB.',
                    pageType: 'story',
                },
                {
                    pageNumber: 2,
                    sceneTitle: 'Kelipatan Bilangan',
                    storyContent:
                        'Kelipatan diperoleh dari hasil perkalian suatu bilangan dengan bilangan asli.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 3,
                    sceneTitle: 'Contoh Kelipatan',
                    storyContent:
                        'Kelipatan 4 adalah 4, 8, 12, 16, 20, dan seterusnya.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 4,
                    sceneTitle: 'Faktor Bilangan',
                    storyContent:
                        'Faktor adalah bilangan yang dapat membagi habis suatu bilangan.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 5,
                    sceneTitle: 'Contoh Faktor',
                    storyContent:
                        'Faktor 12 adalah 1, 2, 3, 4, 6, dan 12.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 6,
                    sceneTitle: 'Faktorisasi Prima',
                    storyContent:
                        '20 = 2 × 2 × 5 = 2² × 5',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 7,
                    sceneTitle: 'KPK',
                    storyContent:
                        'KPK adalah Kelipatan Persekutuan Terkecil dari dua bilangan atau lebih.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 8,
                    sceneTitle: 'Contoh KPK',
                    storyContent:
                        'KPK dari 6 dan 8 adalah 24.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 9,
                    sceneTitle: 'FPB',
                    storyContent:
                        'FPB adalah Faktor Persekutuan Terbesar dari dua bilangan atau lebih.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 10,
                    sceneTitle: 'Contoh FPB',
                    storyContent:
                        'FPB dari 15 dan 25 adalah 5.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 11,
                    sceneTitle: 'Rangkuman',
                    storyContent:
                        '• Kelipatan diperoleh dari hasil perkalian.\n• Faktor adalah pembagi suatu bilangan.\n• KPK digunakan mencari kelipatan persekutuan terkecil.\n• FPB digunakan mencari faktor persekutuan terbesar.',
                    pageType: 'summary',
                },
            ],
        },

        {
            title: 'Pecahan Dan Desimal',
            educationLevel: 'primary',
            topic: 'pecahan_dan_desimal',
            description:
                'Mempelajari operasi hitung pecahan, desimal, dan persen serta penerapannya dalam kehidupan sehari-hari.',
            orderIndex: 9,
            xpReward: 100,
            isPublished: true,
            pages: [
                {
                    pageNumber: 1,
                    sceneTitle: 'Diskon Di Toko',
                    storyContent:
                        'Saat berbelanja, Rina melihat tulisan diskon 20%. Ia bertanya-tanya apa arti angka tersebut. Dari situ Rina mulai belajar hubungan antara pecahan, desimal, dan persen.',
                    pageType: 'story',
                },
                {
                    pageNumber: 2,
                    sceneTitle: 'Pecahan Dan Desimal',
                    storyContent:
                        'Pecahan dapat diubah menjadi desimal dan sebaliknya.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 3,
                    sceneTitle: 'Perkalian Pecahan',
                    storyContent:
                        '1/2 × 1/3 = 1/6',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 4,
                    sceneTitle: 'Pembagian Pecahan',
                    storyContent:
                        '3/4 ÷ 1/2 = 3/2',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 5,
                    sceneTitle: 'Perkalian Desimal',
                    storyContent:
                        '0,5 × 0,4 = 0,2',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 6,
                    sceneTitle: 'Persen',
                    storyContent:
                        'Persen berarti per seratus.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 7,
                    sceneTitle: 'Mengubah Pecahan Menjadi Persen',
                    storyContent:
                        '1/4 = 25%',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 8,
                    sceneTitle: 'Menghitung Persentase',
                    storyContent:
                        '20% dari 50.000 = 10.000',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 9,
                    sceneTitle: 'Penerapan Persen',
                    storyContent:
                        'Persen digunakan untuk diskon, bunga tabungan, dan statistik.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 10,
                    sceneTitle: 'Contoh Soal',
                    storyContent:
                        'Jika sebuah barang mendapat diskon 25%, maka pembeli hanya membayar 75% dari harga awal.',
                    pageType: 'explanation',
                },
                {
                    pageNumber: 11,
                    sceneTitle: 'Rangkuman',
                    storyContent:
                        '• Pecahan dapat diubah menjadi desimal dan persen.\n• Pecahan dapat dikalikan dan dibagi.\n• Persen digunakan dalam berbagai aktivitas sehari-hari seperti diskon dan tabungan.',
                    pageType: 'summary',
                },
            ],
        },
    ];

    for (const moduleData of modules) {
        const { pages, ...moduleOnly } = moduleData;

        await prisma.module.create({
            data: {
                ...moduleOnly,
                pages: {
                    create: pages,
                },
            },
        });
    }

    console.log(`Successfully seeded ${modules.length} modules`);
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });