const jwt = require('jsonwebtoken')
const env = require('../config/env')

// JWT'ni tekshiradi va req.admin'ga yozadi. Token yo'q/yaroqsiz bo'lsa 401.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Avtorizatsiya talab qilinadi.' })
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret)
    req.admin = { id: payload.sub, username: payload.username, role: payload.role }
    next()
  } catch {
    return res.status(401).json({ message: 'Sessiya tugagan. Qaytadan kiring.' })
  }
}

module.exports = { requireAuth }
