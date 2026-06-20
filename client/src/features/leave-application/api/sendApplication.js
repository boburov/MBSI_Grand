import { GRANT_DIRECTIONS } from '../../../shared/config/grant'

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

// value -> label (yo'nalish nomini chiroyli ko'rsatish uchun)
const DIRECTION_LABELS = Object.fromEntries(
  GRANT_DIRECTIONS.map((d) => [d.value, d.label]),
)

// HTML parse_mode uchun maxsus belgilarni ekranlash
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Telefon raqamni bosiladigan havolaga aylantirish
function phoneLink(phone) {
  const clean = String(phone).replace(/[^\d+]/g, '')
  return `<a href="tel:${clean}">${escapeHtml(phone)}</a>`
}

// Telegram username'ni bosiladigan havolaga aylantirish
function telegramLink(tg) {
  const handle = String(tg).trim().replace(/^@/, '')
  if (!handle) return escapeHtml(tg)
  return `<a href="https://t.me/${escapeHtml(handle)}">@${escapeHtml(handle)}</a>`
}

function buildMessage(values) {
  const direction = DIRECTION_LABELS[values.direction] || values.direction
  const time = new Date().toLocaleString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return [
    '🎓 <b>YANGI GRANT ARIZASI</b>',
    '➖➖➖➖➖➖➖➖➖➖',
    '',
    `👤 <b>Ism familiya</b>`,
    `${escapeHtml(values.name)}`,
    '',
    `🎯 <b>Yo‘nalish</b>`,
    `${escapeHtml(direction)}`,
    '',
    `🏫 <b>O‘qigan joyi</b>`,
    `${escapeHtml(values.school)}`,
    '',
    `⭐ <b>Maxsus qobiliyatlari</b>`,
    `${escapeHtml(values.skills)}`,
    '',
    '➖➖➖➖➖➖➖➖➖➖',
    `📞 <b>Telefon:</b> ${phoneLink(values.phone)}`,
    `✈️ <b>Telegram:</b> ${telegramLink(values.telegram)}`,
    '',
    `🕒 <i>${escapeHtml(time)}</i>`,
  ].join('\n')
}

// Arizani Telegram bot orqali shaxsiy chatga yuboradi.
// Muvaffaqiyatda hech narsa qaytarmaydi; xatolikda Error tashlaydi.
export async function sendApplication(values) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error(
      'Telegram sozlanmagan: .env faylida VITE_TELEGRAM_BOT_TOKEN va VITE_TELEGRAM_CHAT_ID ni to‘ldiring.',
    )
  }

  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: buildMessage(values),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    },
  )

  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.ok) {
    throw new Error(data.description || 'Telegram xatosi: ariza yuborilmadi.')
  }
}
