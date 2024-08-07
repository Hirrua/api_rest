import { Router } from 'express'
import multerConfig from '../config/multer.config.js'
import multer from 'multer'

const photoController = Router()
const upload = multerConfig.single('archive')

photoController.post('/', async (req, res, next) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ errors: error.message })
    } else if (error) {
      return res.status(500).json({ errors: error.message })
    }
    res.json(req.file)
  });
})

export default photoController
