// Grant arizasini backend serverga yuboradi (Express + MongoDB).
// Matn maydonlari va fayllar (sertifikat/selfi) multipart/form-data orqali yuboriladi.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const TEXT_FIELDS = [
  'firstName',
  'lastName',
  'age',
  'fatherName',
  'motherName',
  'socialRegistry',
  'phone',
  'school',
  'academicInfo',
  'socialActivity',
  'discount',
]

// Formadagi qiymatlardan FormData quradi: bo'sh bo'lmagan matn maydonlari + barcha fayllar.
function buildFormData(values) {
  const fd = new FormData()

  for (const key of TEXT_FIELDS) {
    const val = values[key]
    if (val != null && String(val).trim() !== '') {
      fd.append(key, val)
    }
  }

  // Fayl massivlar — har bir faylni bir xil field nomi bilan qo'shamiz.
  for (const file of values.certificates || []) {
    fd.append('certificates', file)
  }
  for (const file of values.socialCertificates || []) {
    fd.append('socialCertificates', file)
  }
  if (values.selfie?.[0]) {
    fd.append('selfie', values.selfie[0])
  }

  return fd
}

// Muvaffaqiyatda hech narsa qaytarmaydi; xatolikda Error tashlaydi
// (formaning handleSubmit shu xatoni ushlab foydalanuvchiga ko'rsatadi).
// Dublikat telefon (409) bo'lsa server xabari avtomatik ko'rsatiladi.
export async function sendGrantApplication(values) {
  let res
  try {
    // Content-Type qo'ymaymiz — brauzer multipart boundary'ni o'zi qo'yadi.
    res = await fetch(`${API_URL}/api/grant-applications`, {
      method: 'POST',
      body: buildFormData(values),
    })
  } catch {
    throw new Error('Serverga ulanib bo‘lmadi. Internetni tekshiring.')
  }

  if (!res.ok) {
    let message = 'Arizani yuborib bo‘lmadi. Keyinroq urinib ko‘ring.'
    try {
      const data = await res.json()
      if (data?.message) {
        message = Array.isArray(data.message)
          ? data.message.join(', ')
          : data.message
      }
    } catch {
      // javob JSON bo'lmasa, standart xabar qoladi
    }
    throw new Error(message)
  }
}
