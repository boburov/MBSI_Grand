// Birinchi admin'ni yaratadi/yangilaydi. `npm run seed` orqali ishlatiladi.
// Idempotent: qayta ishga tushsa parolni yangilaydi.
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const env = require('./config/env')
const { connectDb } = require('./config/db')
const Admin = require('./models/Admin')

async function seed() {
  const { username, password } = env.adminSeed
  if (!username || !password) {
    throw new Error(
      'ADMIN_SEED_USERNAME va ADMIN_SEED_PASSWORD ni server/.env faylida to‘ldiring.',
    )
  }

  await connectDb()

  const passwordHash = await bcrypt.hash(password, 10)
  const admin = await Admin.findOneAndUpdate(
    { username: username.toLowerCase() },
    { username: username.toLowerCase(), passwordHash, role: 'superadmin' },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  )

  console.log(`Admin tayyor: ${admin.username} (rol: ${admin.role})`)
  await mongoose.disconnect()
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed xatosi:', err.message)
    process.exit(1)
  })
