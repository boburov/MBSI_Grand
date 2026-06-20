const multer = require('multer')

// Markaziy xato ishlovchi. Javob shakli: { message } (client data.message o'qiydi).
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Telefon (yoki boshqa unique maydon) dublikat — MongoDB 11000.
  if (err && err.code === 11000) {
    return res.status(409).json({
      message: 'Bu telefon raqami bilan allaqachon ariza qoldirilgan.',
    })
  }

  // Multer xatolari (hajm / fayl turi / kutilmagan field).
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Fayl hajmi juda katta (har biri ≤10MB bo‘lishi kerak).',
      })
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: 'Faqat rasm yoki PDF fayllar qabul qilinadi.',
      })
    }
    return res.status(400).json({ message: 'Fayl yuklashda xatolik.' })
  }

  // Mongoose validatsiya xatosi.
  if (err && err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Ma’lumotlar noto‘g‘ri kiritilgan.' })
  }

  console.error('Kutilmagan xato:', err)
  res.status(err.status || 500).json({
    message: err.publicMessage || 'Serverda xatolik. Keyinroq urinib ko‘ring.',
  })
}

module.exports = { errorHandler }
