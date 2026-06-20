const mongoose = require('mongoose')

// Admin panel foydalanuvchisi. Parol hash bcrypt bilan saqlanadi.
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: { type: String, trim: true, lowercase: true },
    // Javoblarda chiqmasligi uchun select:false; loginда .select('+passwordHash') bilan o'qiladi.
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Admin', adminSchema)
