const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const env = require('../config/env')

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10MB — client MAX_FILE_MB bilan mos
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
])
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.pdf'])

// Fayl nomidagi xavfli belgilarni tozalaydi.
function sanitize(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, env.uploadsDir),
  filename: (req, file, cb) => {
    const random = crypto.randomBytes(6).toString('hex')
    cb(null, `${Date.now()}-${random}-${sanitize(file.originalname)}`)
  },
})

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase()
  if (ALLOWED_MIME.has(file.mimetype) || ALLOWED_EXT.has(ext)) {
    return cb(null, true)
  }
  cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname))
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_BYTES },
})

// Forma kalitlari bilan aniq mos field'lar.
const grantUpload = upload.fields([
  { name: 'certificates', maxCount: 10 },
  { name: 'socialCertificates', maxCount: 10 },
  { name: 'selfie', maxCount: 1 },
])

module.exports = { grantUpload, MAX_FILE_BYTES }
