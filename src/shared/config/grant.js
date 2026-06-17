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
    description: 'Atletika, jamoaviy va yakkakurash sport turlari.',
    requirement: 'Musobaqalarda qatnashganlik dalili.',
    conditions: ['Diplom yoki guvohnoma', 'So‘nggi 2 yil natijalari'],
    howToWin: ['Yuqori daraja afzal', 'Sovrinli o‘rinlar baholanadi'],
  },
  {
    value: 'social-activity',
    label: 'Ijtimoiy faollik',
    description: 'Volontyorlik va ijtimoiy loyihalardagi faollik.',
    requirement: 'Loyihada ishtirok tasdig‘i.',
    conditions: ['Ishtirokni tasdiqlovchi hujjat', 'Foto/video material'],
    howToWin: ['Loyiha ta’siri muhim', 'Yetakchilik e’tirof etiladi'],
  },
  {
    value: 'certificate',
    label: 'Sertifikat',
    description: 'IELTS, SAT, CEFR yoki kasbiy sertifikatlar.',
    requirement: 'Amaldagi sertifikat nusxasi.',
    conditions: ['Muddati tugamagan sertifikat', 'O‘quvchining o‘ziga tegishli'],
    howToWin: ['Yuqori ball afzal', 'Xalqaro sertifikat ustun'],
  },
  {
    value: 'creativity',
    label: 'Ijodiylik (video montaj)',
    description: 'Video montaj, dizayn va kontent yaratish.',
    requirement: 'Portfolio yoki havola.',
    conditions: ['Tayyor ijodiy ishlar', 'Mustaqil mehnat'],
    howToWin: ['Sifat va mahorat baholanadi', 'Original kontent ustun'],
  },
  {
    value: 'olympiad',
    label: 'Fan olimpiadasi',
    description: '9–11-sinflar uchun olimpiada natijalari.',
    requirement: 'Olimpiada diplomi/sovrini.',
    conditions: ['Diplom yoki guvohnoma', 'So‘nggi yil natijalari'],
    howToWin: ['Respublika bosqichi ustun', 'Sovrinli o‘rinlar baholanadi'],
  },
  {
    value: 'social-rating',
    label: 'Ijtimoiy reyting',
    description: 'O‘quvchining umumiy faolligi va reytingi.',
    requirement: 'Maktab tavsifnomasi.',
    conditions: ['Rahbariyat tavsifnomasi', 'O‘quv va intizom'],
    howToWin: ['Barqaror natijalar', 'Faollik e’tirof etiladi'],
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
