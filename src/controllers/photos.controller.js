import { Router } from 'express'
import multerConfig from '../config/multer.config.js'
import multer from 'multer'
import photoSchema from '../validation/photo.validation.js'
import createPhoto from '../services/photo.services.js'

const photoController = Router()
const upload = multerConfig.single('archive')

photoController.post('/', (req, res, next) => {
  upload(req, res, async(error) => {
    try {
      const file_data = {
        originalname: req.file.originalname,
        filename: req.file.filename,
        animal_id: parseInt(req.body.animal_id)
      }

      const { error: validationError } = photoSchema.validate(file_data, { abortEarly: false })
      if (validationError) {
        return res.status(400).json({ errors: validationError.details.map(detail => detail.message) })
      }

      if (error instanceof multer.MulterError) {
        return res.status(400).json({ errors: error.message })
      }

      const photo = await createPhoto(file_data)
      return res.json(photo)
    
    } catch (error) {
      return res.status(500).json({ errors: error.message })
    }
  })
})
export default photoController
