// Barcha env o'qishlari shu yerda markazlashtirilgan.
// Boot vaqtida muhim o'zgaruvchilar borligi tekshiriladi — yo'q bo'lsa aniq xato bilan to'xtaydi.
const path = require('path')
require('dotenv').config()

function required(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Muhim env o'zgaruvchisi yo'q: ${name}. server/.env faylini to'ldiring.`)
  }
  return value
}

const env = {
  port: Number(process.env.PORT) || 3000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  serverUrl: (process.env.SERVER_URL || 'http://localhost:3000').replace(/\/+$/, ''),

  mongoUri: required('MONGODB_URI'),

  jwtSecret: required('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    channelId: process.env.TELEGRAM_CHANNEL_ID || '',
    get enabled() {
      return Boolean(this.botToken && this.channelId)
    },
  },

  // Admin login ma'lumotlari .env'da saqlanadi (bitta admin).
  admin: {
    username: required('ADMIN_USERNAME'),
    password: required('ADMIN_PASSWORD'),
  },

  // Yuklangan fayllar papkasi (mutlaq yo'l)
  uploadsDir: path.join(__dirname, '..', '..', 'uploads'),
}

module.exports = env
