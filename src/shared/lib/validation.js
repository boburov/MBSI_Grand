export function validateApplication(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Ismingizni kiriting'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Ism juda qisqa'
  }

  if (!values.direction) {
    errors.direction = 'Yo‘nalishni tanlang'
  }

  if (!values.school.trim()) {
    errors.school = 'O‘qigan joyingizni kiriting'
  }

  if (!values.skills.trim()) {
    errors.skills = 'Maxsus qobiliyatlaringizni yozing'
  }

  const phoneDigits = values.phone.replace(/\D/g, '')
  if (!values.phone.trim()) {
    errors.phone = 'Telefon raqamingizni kiriting'
  } else if (phoneDigits.length < 9) {
    errors.phone = "To'liq raqam kiriting"
  }

  if (!values.telegram.trim()) {
    errors.telegram = 'Telegram username kiriting'
  }

  return errors
}
