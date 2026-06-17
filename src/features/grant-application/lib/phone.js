// O'zbekiston telefon raqamini +998 formatida formatlash va tekshirish.
// Foydalanuvchi kiritgan har qanday belgidan faqat raqamlarni oladi va
// "+998 90 123 45 67" ko'rinishida formatlaydi.

// Kiritilgan matnni "+998 XX XXX XX XX" formatiga keltiradi.
export function formatUzPhone(input) {
  // Faqat raqamlarni qoldiramiz
  let digits = String(input).replace(/\D/g, '')

  // Boshidagi 998 ni olib tashlaymiz (keyin qayta qo'shamiz)
  if (digits.startsWith('998')) {
    digits = digits.slice(3)
  }
  // Agar foydalanuvchi 0 bilan boshlasa (mas. 0901234567), 0 ni olib tashlaymiz
  if (digits.startsWith('0')) {
    digits = digits.slice(1)
  }

  // Operator kodi + raqam — 9 ta raqamgacha
  digits = digits.slice(0, 9)

  // Bo'laklab formatlash: XX XXX XX XX
  const parts = []
  if (digits.length > 0) parts.push(digits.slice(0, 2))
  if (digits.length > 2) parts.push(digits.slice(2, 5))
  if (digits.length > 5) parts.push(digits.slice(5, 7))
  if (digits.length > 7) parts.push(digits.slice(7, 9))

  return parts.length ? `+998 ${parts.join(' ')}` : '+998 '
}

// Raqam to'liq (9 ta milliy raqam) ekanligini tekshiradi.
export function isValidUzPhone(value) {
  const digits = String(value).replace(/\D/g, '')
  // 998 + 9 raqam = 12, yoki to'g'ridan-to'g'ri 9 raqam
  const national = digits.startsWith('998') ? digits.slice(3) : digits
  return national.length === 9
}
