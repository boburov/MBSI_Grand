const jwt = require('jsonwebtoken')
const env = require('../config/env')
const { asyncHandler } = require('../utils/asyncHandler')

// POST /api/auth/login — admin login (.env'dagi credential bilan), JWT qaytaradi.
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body || {}

  if (!username || !password) {
    return res.status(400).json({ message: 'Login va parolni kiriting.' })
  }

  const ok =
    String(username).trim() === env.admin.username &&
    String(password) === env.admin.password
  if (!ok) {
    return res.status(401).json({ message: 'Login yoki parol noto‘g‘ri.' })
  }

  const token = jwt.sign(
    { sub: env.admin.username, username: env.admin.username, role: 'admin' },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  )

  res.json({
    token,
    admin: { username: env.admin.username, role: 'admin' },
  })
})

module.exports = { login }
