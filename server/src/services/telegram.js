const fs = require('fs')
const path = require('path')
const axios = require('axios')
const FormData = require('form-data')
const env = require('../config/env')

// HTML parse_mode uchun maxsus belgilarni ekranlash (client sendApplication.js uslubi).
function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function phoneLink(phone) {
  const clean = String(phone || '').replace(/[^\d+]/g, '')
  return `<a href="tel:${clean}">${escapeHtml(phone)}</a>`
}

const apiBase = () => `https://api.telegram.org/bot${env.telegram.botToken}`

const DISCOUNT_LABEL = (d) => (d ? `${d}%` : '—')
const REGISTRY_LABEL = (r) => (r === 'yes' ? 'Ha, bor' : r === 'no' ? 'Yo‘q' : '—')
const dash = (v) => (v ? escapeHtml(v) : '—')

// Ariza haqida summary matn + barcha fayl URL'lari (havola sifatida).
function buildSummary(lead, allFiles) {
  const lines = [
    '🎓 <b>YANGI GRANT ARIZASI</b>',
    '➖➖➖➖➖➖➖➖➖➖',
    '',
    `👤 <b>Ism familiya:</b> ${dash(lead.firstName)} ${dash(lead.lastName)}`,
    `🎂 <b>Yoshi:</b> ${lead.age ?? '—'}`,
    `👨 <b>Otasi:</b> ${dash(lead.fatherName)}`,
    `👩 <b>Onasi:</b> ${dash(lead.motherName)}`,
    `📋 <b>Ijtimoiy reyestr:</b> ${REGISTRY_LABEL(lead.socialRegistry)}`,
    `📞 <b>Telefon:</b> ${phoneLink(lead.phoneDisplay || lead.phone)}`,
    `🏫 <b>O‘qigan joyi:</b> ${dash(lead.school)}`,
    `💯 <b>Chegirma:</b> ${DISCOUNT_LABEL(lead.discount)}`,
    '',
    `📚 <b>Akademik:</b> ${dash(lead.academicInfo)}`,
    `🤝 <b>Ijtimoiy faollik:</b> ${dash(lead.socialActivity)}`,
  ]

  if (allFiles.length) {
    lines.push('', '📎 <b>Fayllar:</b>')
    allFiles.forEach((f, i) => {
      lines.push(`${i + 1}. <a href="${f.publicUrl}">${escapeHtml(f.originalName)}</a>`)
    })
  }

  return lines.join('\n')
}

// Rasm bo'lsa sendPhoto, aks holda sendDocument bilan faylni kanalga yuklaydi.
// Caption ichida public URL — Telegramdan bosib ochish uchun.
async function sendFile(file, captionBase) {
  const isImage = /\.(jpe?g|png|webp)$/i.test(file.originalName)
  const method = isImage ? 'sendPhoto' : 'sendDocument'
  const field = isImage ? 'photo' : 'document'

  const form = new FormData()
  form.append('chat_id', env.telegram.channelId)
  form.append('caption', `${captionBase}\n${file.publicUrl}`)
  form.append('parse_mode', 'HTML')
  form.append(field, fs.createReadStream(file.localPath), {
    filename: path.basename(file.localPath),
  })

  await axios.post(`${apiBase()}/${method}`, form, {
    headers: form.getHeaders(),
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  })
}

// Lead'ni Telegram kanalga jo'natadi: avval summary, keyin har bir fayl.
// Telegram sozlanmagan bo'lsa — warn + return. Hech qachon throw qilmaydi
// (ariza saqlanishiga ta'sir qilmasligi uchun).
async function sendLeadToTelegram(lead, allFiles) {
  if (!env.telegram.enabled) {
    console.warn('Telegram sozlanmagan — kanalga yuborish o‘tkazib yuborildi.')
    return
  }

  try {
    await axios.post(`${apiBase()}/sendMessage`, {
      chat_id: env.telegram.channelId,
      text: buildSummary(lead, allFiles),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })
  } catch (err) {
    console.error('Telegram summary xatosi:', err.response?.data || err.message)
  }

  const captionBase = `${escapeHtml(lead.firstName || '')} ${escapeHtml(
    lead.lastName || '',
  )} — ${escapeHtml(lead.phoneDisplay || lead.phone)}`

  for (const file of allFiles) {
    try {
      await sendFile(file, captionBase)
    } catch (err) {
      console.error(
        `Telegram fayl xatosi (${file.originalName}):`,
        err.response?.data || err.message,
      )
    }
  }
}

module.exports = { sendLeadToTelegram }
