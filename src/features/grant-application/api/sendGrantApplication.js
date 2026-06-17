const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

const API = `https://api.telegram.org/bot${BOT_TOKEN}`

const SOCIAL_REGISTRY_LABELS = {
  yes: 'Ha, ijtimoiy reyestrda bor',
  no: 'Yo‘q, ijtimoiy reyestrda yo‘q',
}

// HTML parse_mode uchun maxsus belgilarni ekranlash
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function phoneLink(phone) {
  const clean = String(phone).replace(/[^\d+]/g, '')
  return `<a href="tel:${clean}">${escapeHtml(phone)}</a>`
}

function buildMessage(values) {
  const time = new Date().toLocaleString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const registry =
    SOCIAL_REGISTRY_LABELS[values.socialRegistry] || values.socialRegistry

  return [
    '🎓 <b>YANGI GRANT ARIZASI</b>',
    '➖➖➖➖➖➖➖➖➖➖',
    '',
    '👤 <b>Shaxsiy ma‘lumotlar</b>',
    `Ism familiya: ${escapeHtml(`${values.firstName} ${values.lastName}`)}`,
    `Yoshi: ${escapeHtml(values.age)}`,
    `Ota ismi: ${escapeHtml(values.fatherName)}`,
    `Ona ismi: ${escapeHtml(values.motherName)}`,
    `Ijtimoiy reyestr: ${escapeHtml(registry)}`,
    '',
    '📚 <b>Akademik ma‘lumotlar</b>',
    `O‘qigan joyi: ${escapeHtml(values.school)}`,
    `${escapeHtml(values.academicInfo)}`,
    '',
    '🤝 <b>Ijtimoiy faollik</b>',
    `${escapeHtml(values.socialActivity)}`,
    '',
    '💸 <b>Qabul qilinadigan chegirma</b>',
    `${escapeHtml(values.discount)}% chegirma bo‘lsa o‘qishga tayyor`,
    '',
    '➖➖➖➖➖➖➖➖➖➖',
    `📞 <b>Telefon:</b> ${phoneLink(values.phone)}`,
    '',
    `🕒 <i>${escapeHtml(time)}</i>`,
  ].join('\n')
}

async function callTelegram(method, formData) {
  const res = await fetch(`${API}/${method}`, {
    method: 'POST',
    body: formData,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.ok) {
    throw new Error(data.description || 'Telegram xatosi: ariza yuborilmadi.')
  }
  return data
}

// Faylni rasm yoki document sifatida yuboradi (caption bilan).
async function sendFile(file, caption) {
  const isImage = file.type.startsWith('image/')
  const method = isImage ? 'sendPhoto' : 'sendDocument'
  const field = isImage ? 'photo' : 'document'

  const form = new FormData()
  form.append('chat_id', CHAT_ID)
  form.append(field, file, file.name)
  if (caption) {
    form.append('caption', caption)
    form.append('parse_mode', 'HTML')
  }
  await callTelegram(method, form)
}

// To'liq grant arizasini Telegram'ga yuboradi: avval matn, keyin barcha fayllar.
// Muvaffaqiyatda hech narsa qaytarmaydi; xatolikda Error tashlaydi.
export async function sendGrantApplication(values) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error(
      'Telegram sozlanmagan: .env faylida VITE_TELEGRAM_BOT_TOKEN va VITE_TELEGRAM_CHAT_ID ni to‘ldiring.',
    )
  }

  const fullName = `${values.firstName} ${values.lastName}`

  // 1) Asosiy ariza matni
  const textForm = new FormData()
  textForm.append('chat_id', CHAT_ID)
  textForm.append('text', buildMessage(values))
  textForm.append('parse_mode', 'HTML')
  textForm.append('disable_web_page_preview', 'true')
  await callTelegram('sendMessage', textForm)

  // 2) Akademik sertifikatlar/fayllar (ketma-ket — Telegram rate-limit uchun)
  for (const file of values.certificates) {
    await sendFile(file, `📄 Sertifikat — ${escapeHtml(fullName)}`)
  }

  // 3) Ijtimoiy faollik sertifikatlari
  for (const file of values.socialCertificates) {
    await sendFile(file, `🤝 Ijtimoiy faollik — ${escapeHtml(fullName)}`)
  }

  // 4) Selfi rasm
  for (const file of values.selfie) {
    await sendFile(file, `🤳 Selfi — ${escapeHtml(fullName)}`)
  }
}
