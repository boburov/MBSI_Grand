const env = require('../config/env')
const Lead = require('../models/Lead')
const { asyncHandler } = require('../utils/asyncHandler')
const { normalizePhone } = require('../utils/phone')
const { sendLeadToTelegram } = require('../services/telegram')

// Multer faylidan public URL va Telegram uchun meta quradi.
function toFileMeta(file) {
  return {
    localPath: file.path,
    publicUrl: `${env.serverUrl}/uploads/${file.filename}`,
    originalName: file.originalname,
  }
}

// POST /api/grant-applications (multipart) — yangi ariza yaratadi.
const createLead = asyncHandler(async (req, res) => {
  const b = req.body
  const files = req.files || {}

  const phone = normalizePhone(b.phone)
  if (!phone) {
    return res
      .status(400)
      .json({ message: 'To‘g‘ri telefon raqam kiriting (+998 XX XXX XX XX).' })
  }

  const certificates = (files.certificates || []).map(toFileMeta)
  const socialCertificates = (files.socialCertificates || []).map(toFileMeta)
  const selfie = (files.selfie || []).map(toFileMeta)
  const allFiles = [...certificates, ...socialCertificates, ...selfie]

  const ageNum = b.age != null && String(b.age).trim() ? Number(b.age) : undefined

  const lead = await Lead.create({
    firstName: b.firstName || undefined,
    lastName: b.lastName || undefined,
    age: Number.isFinite(ageNum) ? ageNum : undefined,
    fatherName: b.fatherName || undefined,
    motherName: b.motherName || undefined,
    socialRegistry: b.socialRegistry || undefined,
    phone,
    phoneDisplay: b.phone || undefined,
    school: b.school || undefined,
    academicInfo: b.academicInfo || undefined,
    socialActivity: b.socialActivity || undefined,
    discount: b.discount || undefined,
    certificateUrls: certificates.map((f) => f.publicUrl),
    socialCertificateUrls: socialCertificates.map((f) => f.publicUrl),
    selfieUrl: selfie[0]?.publicUrl,
  })

  // Telegramga jo'natamiz — xatosi javobga ta'sir qilmaydi (service ichida yutiladi).
  await sendLeadToTelegram(lead, allFiles)

  res.status(201).json({ id: lead._id, message: 'Arizangiz qabul qilindi' })
})

module.exports = { createLead }
