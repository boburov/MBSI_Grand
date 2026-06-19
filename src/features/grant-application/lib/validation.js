// Ko'p qadamli grant arizasi uchun bosqichma-bosqich validatsiya.
// Barcha maydonlar ixtiyoriy — bo'sh qoldirilsa xato chiqmaydi.
// Faqat to'ldirilgan maydonlar formati tekshiriladi (yosh, telefon, selfi turi).

import { isValidUzPhone } from './phone'

function validateStep1(values) {
  const errors = {}

  if (String(values.age).trim()) {
    const age = Number(values.age)
    if (!Number.isFinite(age) || age < 5 || age > 100) {
      errors.age = 'To‘g‘ri yosh kiriting'
    }
  }

  if (
    values.phone.trim() &&
    values.phone.replace(/\D/g, '') !== '998' &&
    !isValidUzPhone(values.phone)
  ) {
    errors.phone = "To'liq raqam kiriting (+998 XX XXX XX XX)"
  }

  return errors
}

function validateStep2() {
  return {}
}

function validateStep3() {
  return {}
}

function validateStep4(values) {
  const errors = {}
  if (values.selfie.length && !values.selfie[0].type.startsWith('image/')) {
    errors.selfie = 'Faqat rasm fayli qabul qilinadi'
  }

  return errors
}

const STEP_VALIDATORS = [
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
]

// Bitta bosqichni tekshiradi (0 dan boshlab).
export function validateGrantStep(step, values) {
  const validator = STEP_VALIDATORS[step]
  return validator ? validator(values) : {}
}

// Barcha bosqichlarni tekshiradi — yuborishdan oldin.
export function validateGrantApplication(values) {
  return STEP_VALIDATORS.reduce(
    (acc, validator) => ({ ...acc, ...validator(values) }),
    {},
  )
}
