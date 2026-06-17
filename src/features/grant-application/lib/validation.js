// Ko'p qadamli grant arizasi uchun bosqichma-bosqich validatsiya.
// Har bir bosqich uchun alohida tekshiruv, "Keyingi" tugmasida ishlatiladi.

import { isValidUzPhone } from './phone'

function validateStep1(values) {
  const errors = {}

  if (!values.firstName.trim()) errors.firstName = 'Ismingizni kiriting'
  if (!values.lastName.trim()) errors.lastName = 'Familiyangizni kiriting'

  const age = Number(values.age)
  if (!String(values.age).trim()) {
    errors.age = 'Yoshingizni kiriting'
  } else if (!Number.isFinite(age) || age < 5 || age > 100) {
    errors.age = 'To‘g‘ri yosh kiriting'
  }

  if (!values.fatherName.trim()) errors.fatherName = 'Ota ismini kiriting'
  if (!values.motherName.trim()) errors.motherName = 'Ona ismini kiriting'

  if (!values.socialRegistry)
    errors.socialRegistry = 'Ijtimoiy reyestr holatini tanlang'

  if (!values.phone.trim() || values.phone.replace(/\D/g, '') === '998') {
    errors.phone = 'Telefon raqamingizni kiriting'
  } else if (!isValidUzPhone(values.phone)) {
    errors.phone = "To'liq raqam kiriting (+998 XX XXX XX XX)"
  }

  return errors
}

function validateStep2(values) {
  const errors = {}
  if (!values.school.trim()) errors.school = 'O‘qigan joyingizni kiriting'
  if (!values.academicInfo.trim())
    errors.academicInfo = 'Akademik ma‘lumotlaringizni yozing'
  if (!values.certificates.length)
    errors.certificates = 'Kamida bitta sertifikat/fayl yuklang'
  return errors
}

function validateStep3(values) {
  const errors = {}
  if (!values.socialActivity.trim())
    errors.socialActivity = 'Qatnashgan tadbirlaringizni yozing'
  return errors
}

function validateStep4(values) {
  const errors = {}
  if (!values.selfie.length) {
    errors.selfie = 'Selfi rasmini yuklang'
  } else if (!values.selfie[0].type.startsWith('image/')) {
    errors.selfie = 'Faqat rasm fayli qabul qilinadi'
  }

  if (!values.discount) {
    errors.discount = 'Javobni tanlang'
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
