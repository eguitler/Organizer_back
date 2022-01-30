const mongoose = require('mongoose')

const connectDb = () => {
  mongoose.connect(process.env.DB_URI)
    .then(() => {
      console.log('DB Connected...')
    })
    .catch((err) => {
      console.log('DB Error: ', err)
    })
}

module.exports = connectDb
