import { PrismaClient } from '@prisma/client'
import dotenv from "dotenv"

dotenv.config()
const prisma = new PrismaClient()

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

        const photo_url = `${process.env.BASE_URL}/uploads/${photo_animal.filename}`

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

export { createPhoto, showPhoto, deletePhoto }
