// Telefon raqamni kanonik shaklga keltiradi: +998XXXXXXXXX (probelsiz).
// "+998 90 123 45 67", "998901234567", "0901234567" -> "+998901234567"
// Bu uniqueness uchun ishonchli kalit beradi.
function normalizePhone(raw) {
  if (!raw) return ''
  let digits = String(raw).replace(/\D/g, '') // faqat raqamlar

  if (digits.startsWith('998')) {
    digits = digits.slice(3)
  } else if (digits.startsWith('0')) {
    digits = digits.replace(/^0+/, '')
  }

  // O'zbekiston milliy raqami 9 ta raqam
  if (digits.length !== 9) return ''
  return `+998${digits}`
}

module.exports = { normalizePhone }
