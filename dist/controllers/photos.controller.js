"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multerconfigjs = require('../config/multer.config.js'); var _multerconfigjs2 = _interopRequireDefault(_multerconfigjs);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _photovalidationjs = require('../validation/photo.validation.js'); var _photovalidationjs2 = _interopRequireDefault(_photovalidationjs);
var _photoservicesjs = require('../services/photo.services.js');
var _authmiddlewarejs = require('../middlewares/auth.middleware.js'); var _authmiddlewarejs2 = _interopRequireDefault(_authmiddlewarejs);

const photoController = _express.Router.call(void 0, )
const upload = _multerconfigjs2.default.single('archive')

photoController.post('/', _authmiddlewarejs2.default, (req, res, next) => {
    upload(req, res, async (error) => {
        try {
            if (error instanceof _multer2.default.MulterError) {
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

            const { error: validationError } = _photovalidationjs2.default.validate(file_data, { abortEarly: false })
            if (validationError) {
                return res.status(400).json({ errors: validationError.details.map(detail => detail.message) })
            }

            const { photo_animal, photo_url } = await _photoservicesjs.createPhoto.call(void 0, file_data)
            return res.json({ photo: photo_animal, url: photo_url })
        } catch (error) {
            return res.status(500).json({ errors: error.message })
        }
    })
})

photoController.delete('/:id', _authmiddlewarejs2.default, async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const photo = await _photoservicesjs.showPhoto.call(void 0, id)
        if (!photo) {
            return res.status(404).json({ errors: "Photo not found" })
        }

        await _photoservicesjs.deletePhoto.call(void 0, id)

        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json({ errors: error.message })
    }
})

exports. default = photoController
