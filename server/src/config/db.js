const mongoose = require('mongoose')
const env = require('./env')

// MongoDB'ga ulanadi. Muvaffaqiyatsizlikda xato tashlaydi (chaqiruvchi to'xtatadi).
async function connectDb() {
  mongoose.set('strictQuery', true)
  await mongoose.connect(env.mongoUri)
  console.log('MongoDB ulandi:', mongoose.connection.host)
  return mongoose.connection
}

module.exports = { connectDb }
