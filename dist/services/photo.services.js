"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _client = require('@prisma/client');
var _appconfig = require('../config/app.config'); var _appconfig2 = _interopRequireDefault(_appconfig);

const prisma = new (0, _client.PrismaClient)()

const showPhoto = async(photo_id) => {
    try {
        return await prisma.photo.findUnique({ where: { id: photo_id } })
    } catch (error) {
        throw new Error("Failed to show photo")
    }
}

const createPhoto = async ({ originalname, filename, animal_id }) => {
    try {
        const animal = await prisma.animal.findUnique({ where: { id: animal_id } })
        if (!animal) {
            throw new Error("Animal not found")
        }

        const photo_animal = await prisma.photo.create({
            data: { originalname, filename, animal_id },
        })

        const photo_url = `${_appconfig2.default.url}/uploads/${photo_animal.filename}`

        return { photo_animal, photo_url }
    } catch (error) {
        throw new Error("Failed to save photo")
    }
}

const deletePhoto = async(photo_id) => {
    try {
        console.log("service", photo_id)
        return await prisma.photo.delete({ where: { id: photo_id } })
    } catch (error) {
        throw new Error("Failed to delete photo")
    }
}

exports.createPhoto = createPhoto; exports.showPhoto = showPhoto; exports.deletePhoto = deletePhoto;
