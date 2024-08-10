const multer = require('multer')
const path = require('path')

const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  }
})

module.exports = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file))
    }
    return cb(null, true)
  },
  storage
})
