import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createPhoto = async ({ originalname, filename, animal_id }) => {
  try {
    const animal = await prisma.animal.findUnique({ where: { id: animal_id } })

    if (!animal) {
      throw new Error('Animal not found')
    }

    const photo_animal = await prisma.photo.create({
      data: { originalname, filename, animal_id },
    })

    return photo_animal
  } catch (error) {
    console.error('Error creating photo:', error)
    throw new Error('Failed to save photo: ' + error.message)
  }
}

export default createPhoto
