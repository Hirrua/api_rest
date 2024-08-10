import { Router } from 'express'
import multerConfig from '../config/multer.config.js'
import multer from 'multer'
import photoSchema from '../validation/photo.validation.js'
import { createPhoto, deletePhoto, showPhoto } from '../services/photo.services.js'
import authenticationMiddleware from "../middlewares/auth.middleware.js"

const photoController = Router()
const upload = multerConfig.single('archive')

photoController.post('/', authenticationMiddleware, (req, res, next) => {
    upload(req, res, async (error) => {
        try {
            if (error instanceof multer.MulterError) {
                return res.status(400).json({ errors: error.message })
            }
            if (!req.file) {
                return res.status(400).json({ errors: "No file uploaded" })
            }

            const file_data = {
                originalname: req.file.originalname,
                filename: req.file.filename,
                animal_id: parseInt(req.body.animal_id)
            }

            const { error: validationError } = photoSchema.validate(file_data, { abortEarly: false })
            if (validationError) {
                return res.status(400).json({ errors: validationError.details.map(detail => detail.message) })
            }

            const { photo_animal, photo_url } = await createPhoto(file_data)
            return res.json({ photo: photo_animal, url: photo_url })
        } catch (error) {
            return res.status(500).json({ errors: error.message })
        }
    })
})

photoController.delete('/:id', authenticationMiddleware, async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const photo = await showPhoto(id)
        if (!photo) {
            return res.status(404).json({ errors: "Photo not found" })
        }

        await deletePhoto(id)

        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json({ errors: error.message })
    }
})

export default photoController
