// Grant arizasini backend serverga yuboradi.
// Server (NestJS) arizani PostgreSQL'ga saqlaydi.
// Eslatma: fayllar (sertifikat/selfi) hozircha yuborilmaydi — keyingi bosqich.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Formadagi qiymatlardan faqat matn/select maydonlarini ajratib oladi.
// Fayl massivlar (certificates, socialCertificates, selfie) yuborilmaydi.
function buildPayload(values) {
  const trimmedAge = String(values.age ?? '').trim()
  return {
    firstName: values.firstName || undefined,
    lastName: values.lastName || undefined,
    age: trimmedAge ? Number(trimmedAge) : undefined,
    fatherName: values.fatherName || undefined,
    motherName: values.motherName || undefined,
    socialRegistry: values.socialRegistry || undefined,
    phone: values.phone || undefined,
    school: values.school || undefined,
    academicInfo: values.academicInfo || undefined,
    socialActivity: values.socialActivity || undefined,
    discount: values.discount || undefined,
  }
}

// Muvaffaqiyatda hech narsa qaytarmaydi; xatolikda Error tashlaydi
// (formaning handleSubmit shu xatoni ushlab foydalanuvchiga ko'rsatadi).
export async function sendGrantApplication(values) {
  let res
  try {
    res = await fetch(`${API_URL}/api/grant-applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(values)),
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
