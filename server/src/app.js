const express = require('express')
const cors = require('cors')
const env = require('./config/env')
const routes = require('./routes')
const { errorHandler } = require('./middleware/errorHandler')

// Express app'ni quradi (port bog'lamaydi — testlanadigan/importlanadigan).
function createApp() {
  const app = express()

  app.use(cors({ origin: env.clientOrigins }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Yuklangan fayllar public URL orqali xizmat qilinadi.
  app.use('/uploads', express.static(env.uploadsDir))

  app.use('/api', routes)

  // Xato ishlovchi — eng oxirida.
  app.use(errorHandler)

  return app
}

module.exports = { createApp }
