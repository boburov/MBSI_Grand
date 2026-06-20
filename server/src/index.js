const fs = require('fs')
const env = require('./config/env')
const { connectDb } = require('./config/db')
const { createApp } = require('./app')

async function start() {
  // Uploads papkasi mavjudligini kafolatlaymiz.
  fs.mkdirSync(env.uploadsDir, { recursive: true })

  await connectDb()

  const app = createApp()
  app.listen(env.port, () => {
    console.log(`Server ishga tushdi: http://localhost:${env.port}`)
  })
}

start().catch((err) => {
  console.error('Server ishga tushmadi:', err.message)
  process.exit(1)
})
