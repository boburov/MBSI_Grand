const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('../config/env')
const Admin = require('../models/Admin')
const { asyncHandler } = require('../utils/asyncHandler')

// POST /api/auth/login — admin login, JWT qaytaradi.
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body || {}

  if (!username || !password) {
    return res.status(400).json({ message: 'Login va parolni kiriting.' })
  }

  const admin = await Admin.findOne({
    username: String(username).trim().toLowerCase(),
  }).select('+passwordHash')

  const ok = admin && (await bcrypt.compare(password, admin.passwordHash))
  if (!ok) {
    return res.status(401).json({ message: 'Login yoki parol noto‘g‘ri.' })
  }

  const token = jwt.sign(
    { sub: admin._id.toString(), username: admin.username, role: admin.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  )

  res.json({
    token,
    admin: { id: admin._id, username: admin.username, role: admin.role },
  })
})

module.exports = { login }
