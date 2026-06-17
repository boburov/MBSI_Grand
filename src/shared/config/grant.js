// Grant dasturi ma'lumotlari
export const GRANT = {
  totalFund: '1 000 000 000 so‘m',
  winnersPerDirection: 3,
}

// Har bir o'rin uchun grant mukofoti (har yo'nalish bo'yicha)
export const GRANT_PRIZES = [
  { place: '1', label: '1-o‘rin', amount: '15 mln so‘m', tier: 'gold' },
  { place: '2', label: '2-o‘rin', amount: '10 mln so‘m', tier: 'silver' },
  { place: '3', label: '3-o‘rin', amount: '5 mln so‘m', tier: 'bronze' },
]

// Grant yo'nalishlari — har biridan 3 ta g'olib (1, 2, 3-o'rin)
// Har bir yo'nalish dropdown ichida batafsil ochiladi:
//  - description: qisqa tavsif
//  - requirement: asosiy talab (kartochkada ko'rinadi)
//  - conditions: qatnashish shartlari (ro'yxat)
//  - howToWin: qanday grant yutish mumkin (ro'yxat)
export const GRANT_DIRECTIONS = [
  {
    value: 'sport',
    label: 'Sport',
    description:
      'Yengil atletika, jamoaviy va yakkakurash sport turlari bo‘yicha yutuqlar.',
    requirement:
      'Viloyat yoki respublika darajasidagi musobaqalarda qatnashganlik dalili.',
    conditions: [
      'Rasmiy musobaqalarda qatnashganlikni tasdiqlovchi diplom yoki guvohnoma',
      'So‘nggi 2 yil ichidagi natijalar hisobga olinadi',
      'Murabbiy yoki tashkilotchi tavsiyanomasi (ixtiyoriy, qo‘shimcha ball)',
    ],
    howToWin: [
      'Eng yuqori darajadagi (respublika > viloyat > tuman) natijalar afzal',
      'Sovrinli o‘rinlar va medallar alohida baholanadi',
      'Komissiya jismoniy tayyorgarlik va izchillikni ham hisobga oladi',
    ],
  },
  {
    value: 'social-activity',
    label: 'Ijtimoiy faollik',
    description:
      'Volontyorlik, jamoat tashabbuslari va ijtimoiy loyihalardagi faollik.',
    requirement:
      'Tashkil etilgan tadbir yoki loyihada ishtirok etganlik tasdig‘i.',
    conditions: [
      'Volontyorlik yoki ijtimoiy loyihada ishtirokni tasdiqlovchi hujjat',
      'Loyiha natijasi yoki ta’sirini ko‘rsatuvchi foto/video material',
      'Tashkilot yoki rahbar tomonidan berilgan tasdiqnoma',
    ],
    howToWin: [
      'Loyihaning jamiyatga real ta’siri va ko‘lami baholanadi',
      'Tashabbusning muntazamligi (bir martalik emas) muhim',
      'Yetakchilik roli alohida e’tirof etiladi',
    ],
  },
  {
    value: 'certificate',
    label: 'Sertifikat',
    description:
      'IELTS, SAT, CEFR yoki kasbiy yo‘nalishdagi xalqaro/milliy sertifikatlar.',
    requirement: 'Amaldagi rasmiy sertifikat nusxasi.',
    conditions: [
      'Amal qilish muddati tugamagan rasmiy sertifikat',
      'Sertifikat o‘quvchining o‘ziga tegishli bo‘lishi shart',
      'Bir nechta sertifikat bo‘lsa, barchasini biriktirish mumkin',
    ],
    howToWin: [
      'Yuqori ball va daraja (masalan IELTS 6.5+, SAT 1300+) afzal',
      'Xalqaro sertifikatlar milliylarga nisbatan yuqori baholanadi',
      'Bir nechta yo‘nalishdagi sertifikatlar umumiy ballni oshiradi',
    ],
  },
  {
    value: 'creativity',
    label: 'Ijodiylik (video montaj)',
    description:
      'Video montaj, dizayn va kontent yaratish bo‘yicha ijodiy ishlar.',
    requirement: 'Tayyor ishlaringiz (portfolio yoki havola).',
    conditions: [
      'Kamida 1–3 ta tayyor ijodiy ish (portfolio yoki havola)',
      'Ishlar o‘quvchining mustaqil mehnati bo‘lishi kerak',
      'YouTube, Instagram yoki Google Drive havolasi qabul qilinadi',
    ],
    howToWin: [
      'Ijodiy g‘oya, sifat va texnik mahorat baholanadi',
      'Original kontent qayta ishlangan materialdan ustun',
      'Tanlov yoki loyihalardagi yutuqlar qo‘shimcha ball beradi',
    ],
  },
  {
    value: 'olympiad',
    label: 'Fan olimpiadasi',
    description: '9–11-sinf o‘quvchilari uchun fan olimpiadalaridagi natijalar.',
    requirement:
      'Tuman, viloyat yoki respublika olimpiadasidagi diplom/sovrin.',
    conditions: [
      'Olimpiada diplomi yoki sovrinli o‘rin guvohnomasi',
      '9–11-sinf o‘quvchilari uchun',
      'So‘nggi o‘quv yili natijalari ustuvor hisobga olinadi',
    ],
    howToWin: [
      'Respublika bosqichi natijalari eng yuqori baholanadi',
      '1-, 2-, 3-o‘rinlar va sertifikatlar alohida ball oladi',
      'Bir nechta fandan natija umumiy reytingni oshiradi',
    ],
  },
  {
    value: 'social-rating',
    label: 'Ijtimoiy reyting',
    description:
      'O‘quvchining umumiy faolligi va jamoadagi ijtimoiy reytingi.',
    requirement: 'Maktab yoki muassasa tomonidan berilgan tavsifnoma.',
    conditions: [
      'Maktab yoki muassasa rahbariyatining tavsifnomasi',
      'O‘quv va intizom ko‘rsatkichlari',
      'Jamoadagi faollik va obro‘ni tasdiqlovchi ma’lumotlar',
    ],
    howToWin: [
      'Barqaror o‘qish natijalari va namunali xulq baholanadi',
      'Sinf va maktab hayotidagi faollik hisobga olinadi',
      'Tengdoshlar va ustozlar e’tirofi qo‘shimcha ball beradi',
    ],
  },
]

// Grant yutsa beriladigan imkoniyatlar
export const GRANT_BENEFITS = [
  {
    icon: 'wallet',
    title: 'Pul mukofoti',
    text: 'Har bir yo‘nalish bo‘yicha 1-o‘rin 15 mln, 2-o‘rin 10 mln, 3-o‘rin 5 mln so‘mgacha grant.',
  },
  {
    icon: 'graduation',
    title: 'O‘qish chegirmasi',
    text: 'G‘oliblar uchun maktabda o‘qish to‘lovida sezilarli chegirma imkoniyati.',
  },
  {
    icon: 'book',
    title: 'Bepul tayyorgarlik',
    text: 'SAT, IELTS va CEFR imtihonlariga maxsus tayyorgarlik kurslariga kirish.',
  },
  {
    icon: 'users',
    title: 'Mentorlik',
    text: 'Tajribali ustozlar va mutaxassislar bilan individual mentorlik dasturi.',
  },
  {
    icon: 'award',
    title: 'Sertifikat va e’tirof',
    text: 'Rasmiy grant g‘olibi sertifikati va maktab tadbirlarida e’tirof.',
  },
  {
    icon: 'rocket',
    title: 'Universitetga yo‘l',
    text: 'Jahon darajasidagi universitetlarga hujjat topshirishda yordam va tavsiya.',
  },
]

// O'tgan yilgi grant g'oliblari fikrlari (namuna — real izohlar bilan almashtiring)
export const TESTIMONIALS = [
  {
    name: 'Jahongir Tursunov',
    role: 'Sport yo‘nalishi · 1-o‘rin',
    year: '2025',
    text: 'Grant menga nafaqat moliyaviy yordam, balki o‘zimga bo‘lgan ishonchni berdi. Endi respublika musobaqalariga ko‘proq tayyorgarlik ko‘rmoqdaman.',
  },
  {
    name: 'Madina Ergasheva',
    role: 'Ijtimoiy faollik · 1-o‘rin',
    year: '2025',
    text: 'Ijtimoiy loyihalarim e’tirof etilgani men uchun katta turtki bo‘ldi. Grant tufayli yangi tashabbuslarni boshlashga imkon topdim.',
  },
  {
    name: 'Sarvar Ochilov',
    role: 'Fan olimpiadasi · 1-o‘rin',
    year: '2025',
    text: 'Olimpiadaga tayyorgarlik ko‘rishda mentorlik dasturi juda yordam berdi. Grant bilan kelajakdagi maqsadlarimga yaqinlashdim.',
  },
]

// G'olib o'quvchilar video chiqishlari (YouTube).
// DEMO: youtubeId — vaqtincha namuna videolar. Real videolar tayyor bo'lganda
// faqat youtubeId ni o'zgartiring (YouTube havolasidagi v=... qismi).
// Masalan: https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  youtubeId: 'dQw4w9WgXcQ'
export const WINNER_VIDEOS = [
  {
    youtubeId: 'dQw4w9WgXcQ', // DEMO
    name: 'Jahongir Tursunov',
    role: 'Sport yo‘nalishi · 1-o‘rin',
    year: '2025',
  },
  {
    youtubeId: 'M7lc1UVf-VE', // DEMO
    name: 'Madina Ergasheva',
    role: 'Ijtimoiy faollik · 1-o‘rin',
    year: '2025',
  },
  {
    youtubeId: 'scYbps9Kvew', // DEMO
    name: 'Sarvar Ochilov',
    role: 'Fan olimpiadasi · 1-o‘rin',
    year: '2025',
  },
]
