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
export const GRANT_DIRECTIONS = [
  {
    value: 'sport',
    label: 'Sport',
    description:
      'Yengil atletika, jamoaviy va yakkakurash sport turlari bo‘yicha yutuqlar.',
    requirement:
      'Viloyat yoki respublika darajasidagi musobaqalarda qatnashganlik dalili.',
  },
  {
    value: 'social-activity',
    label: 'Ijtimoiy faollik',
    description:
      'Volontyorlik, jamoat tashabbuslari va ijtimoiy loyihalardagi faollik.',
    requirement:
      'Tashkil etilgan tadbir yoki loyihada ishtirok etganlik tasdig‘i.',
  },
  {
    value: 'certificate',
    label: 'Sertifikat',
    description:
      'IELTS, SAT, CEFR yoki kasbiy yo‘nalishdagi xalqaro/milliy sertifikatlar.',
    requirement: 'Amaldagi rasmiy sertifikat nusxasi.',
  },
  {
    value: 'creativity',
    label: 'Ijodiylik (video montaj)',
    description:
      'Video montaj, dizayn va kontent yaratish bo‘yicha ijodiy ishlar.',
    requirement: 'Tayyor ishlaringiz (portfolio yoki havola).',
  },
  {
    value: 'olympiad',
    label: 'Fan olimpiadasi',
    description: '9–11-sinf o‘quvchilari uchun fan olimpiadalaridagi natijalar.',
    requirement:
      'Tuman, viloyat yoki respublika olimpiadasidagi diplom/sovrin.',
  },
  {
    value: 'social-rating',
    label: 'Ijtimoiy reyting',
    description:
      'O‘quvchining umumiy faolligi va jamoadagi ijtimoiy reytingi.',
    requirement: 'Maktab yoki muassasa tomonidan berilgan tavsifnoma.',
  },
]
