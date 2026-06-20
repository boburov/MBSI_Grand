const express = require('express')
const mongoose = require('mongoose')
const grantRoutes = require('./grantRoutes')
const authRoutes = require('./authRoutes')
const leadRoutes = require('./leadRoutes')

const router = express.Router()

// Health check.
router.get('/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1
  res.json({ status: 'ok', db: connected ? 'connected' : 'disconnected' })
})

router.use('/grant-applications', grantRoutes)
router.use('/auth', authRoutes)
router.use('/leads', leadRoutes)

module.exports = router
