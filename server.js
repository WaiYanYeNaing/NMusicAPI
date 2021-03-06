const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const multer = require('multer')
const port = process.env.PORT || 8000

connectDB()

const upload = multer({ dest: './uploads' })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))
// app.use(upload.single())
// app.use(express.static('public'))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/nfts', upload.single('image'), require('./routes/nftRoutes'))
// app.use('/api/musics', require('./routes/musics'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(
        __dirname,
        '../',
        'frontend',
        '.next',
        'server',
        'pages',
        'index.html'
      )
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
