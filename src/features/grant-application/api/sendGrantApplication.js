const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

const API = `https://api.telegram.org/bot${BOT_TOKEN}`

// Telegram cheklovlari
const MAX_GROUP_SIZE = 10 // bitta media group'dagi maksimal fayl soni

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

// Har bir bo'linib ketgan postga qo'shiladigan qisqa identifikator:
// ism + telefon raqami — kanalda arizani tez topib olish uchun.
// Telefon kelmagan bo'lsa ham fayl egasiz qolmasligi uchun "—" qo'yiladi.
function buildTag(values) {
  const fullName = `${values.firstName || ''} ${values.lastName || ''}`.trim()
  const name = fullName ? escapeHtml(fullName) : 'Noma‘lum'
  const phone = values.phone ? phoneLink(values.phone) : '—'
  return `👤 <b>${name}</b>\n📞 ${phone}`
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
    buildTag(values),
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

async function callTelegram(method, body) {
  const isForm = body instanceof FormData
  const res = await fetch(`${API}/${method}`, {
    method: 'POST',
    ...(isForm ? {} : { headers: { 'Content-Type': 'application/json' } }),
    body: isForm ? body : JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.ok) {
    throw new Error(data.description || 'Telegram xatosi: ariza yuborilmadi.')
  }
  return data
}

// Bitta faylni rasm yoki document sifatida yuboradi (caption bilan).
// Albom faqat 1 ta faylda bo'lib qolgan holatlar uchun.
async function sendSingleFile(file, caption) {
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

// Bir guruh faylni bitta media group (albom) qilib yuboradi — ya'ni bitta post.
// caption faqat birinchi faylga biriktiriladi; Telegram albomda shu matnni ko'rsatadi.
async function sendAlbum(filesChunk, caption) {
  // Rasm va PDF bitta albomda aralasha olmaydi: agar barchasi rasm bo'lsa "photo",
  // aks holda hammasini "document" sifatida yuboramiz (baribir bitta post bo'ladi).
  const allImages = filesChunk.every((f) => f.type.startsWith('image/'))
  const type = allImages ? 'photo' : 'document'

  const form = new FormData()
  form.append('chat_id', CHAT_ID)

  const media = filesChunk.map((file, i) => {
    const attachName = `file${i}`
    form.append(attachName, file, file.name)
    return {
      type,
      media: `attach://${attachName}`,
      ...(caption && i === 0 ? { caption, parse_mode: 'HTML' } : {}),
    }
  })
  form.append('media', JSON.stringify(media))

  await callTelegram('sendMediaGroup', form)
}

// Bitta kategoriyadagi fayllarni yuboradi. HAR BIR postning captioniga
// MAJBURIY ravishda "kategoriya nomi + ism + telefon" biriktiriladi —
// shunda kanalda istalgan post kimniki ekani aniq ko'rinadi va egasiz qolmaydi.
async function sendCategory(catFiles, label, values) {
  if (!catFiles || catFiles.length === 0) return

  // Majburiy caption: kategoriya + ism + telefon. Har bir postda takrorlanadi.
  const caption = `<b>${label}</b>\n${buildTag(values)}`

  // 10 talik guruhlarga bo'lamiz (Telegram albom cheklovi); har bo'lak — alohida post.
  for (let i = 0; i < catFiles.length; i += MAX_GROUP_SIZE) {
    const chunk = catFiles.slice(i, i + MAX_GROUP_SIZE)
    if (chunk.length === 1) {
      await sendSingleFile(chunk[0], caption)
    } else {
      await sendAlbum(chunk, caption)
    }
  }
}

// To'liq grant arizasini Telegram'ga yuboradi:
//   1) Avval to'liq ariza matni (alohida xabar).
//   2) So'ng fayllar kategoriyalar bo'yicha alohida post bo'lib boradi —
//      HAR BIR postda ism + telefon raqami majburiy ravishda bo'ladi.
// Muvaffaqiyatda hech narsa qaytarmaydi; xatolikda Error tashlaydi.
export async function sendGrantApplication(values) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error(
      'Telegram sozlanmagan: .env faylida VITE_TELEGRAM_BOT_TOKEN va VITE_TELEGRAM_CHAT_ID ni to‘ldiring.',
    )
  }

  // 1) Asosiy ariza matni (ism + telefon bu matnda ham bor)
  await callTelegram('sendMessage', {
    chat_id: CHAT_ID,
    text: buildMessage(values),
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  })

  // 2) Fayllar kategoriyalar bo'yicha — har bir postda ism + telefon majburiy
  await sendCategory(values.certificates, '📄 Sertifikat', values)
  await sendCategory(values.socialCertificates, '🤝 Ijtimoiy faollik', values)
  await sendCategory(values.selfie, '🤳 Selfi', values)
}
