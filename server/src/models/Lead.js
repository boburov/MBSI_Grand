const mongoose = require('mongoose')

// Grant arizasi (qoldirilgan ariza / lead).
const leadSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    age: { type: Number, min: 5, max: 100 },
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    socialRegistry: { type: String, enum: ['yes', 'no'] },

    // Kanonik shakl (+998XXXXXXXXX) — uniqueness kaliti.
    phone: { type: String, required: true, trim: true, unique: true },
    // Foydalanuvchi kiritgan formatlangan ko'rinish (admin panelda ko'rsatish uchun).
    phoneDisplay: { type: String, trim: true },

    school: { type: String, trim: true },
    academicInfo: { type: String, trim: true },
    socialActivity: { type: String, trim: true },
    discount: { type: String, enum: ['25', '50', '75', '100'] },

    // Yuklangan fayllarning public URL'lari.
    certificateUrls: { type: [String], default: [] },
    socialCertificateUrls: { type: [String], default: [] },
    selfieUrl: { type: String },

    status: {
      type: String,
      enum: ['new', 'reviewed', 'accepted', 'rejected'],
      default: 'new',
    },
  },
  { timestamps: true },
)

// Telefon raqam unique — dublikat insertда MongoDB 11000 xatosi tashlaydi.
leadSchema.index({ phone: 1 }, { unique: true })

module.exports = mongoose.model('Lead', leadSchema)
