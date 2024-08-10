"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _client = require('@prisma/client');

const prisma = new (0, _client.PrismaClient)()

const fetchAnimals = async() => {
    try {
        return await prisma.animal.findMany()
    } catch (error) {
        throw new Error('Failed to fetch animals')
    }
}

const showAnimal = async(animal_id) => {
    try {
        return await prisma.animal.findUnique({ where: { id: parseInt(animal_id) }, include: { photo: true } })
    } catch (error) {
        throw new Error("Failed to show an animal")
    }
}

const createAnimal = async(animal_data) => {
    try {
        const { name, date_birth, age, weight, height, breed, gender, user_id } = animal_data

        if (!user_id) {
            throw new Error("User ID is required")
        }

        const animal = prisma.animal.create({ data: {
            name,
            date_birth,
            age,
            weight,
            height,
            breed,
            gender,
            user_id
            } 
        })

        return animal
    } catch (error) {
        throw new Error('Failed to create animal')
    }
}

const updateAnimal = async(animal_data, animal_id) => {
    try {  
        const { name, date_birth, age, weight, height, breed, gender, user_id } = animal_data

        if (!user_id) {
            throw new Error("User ID is required")
        }

        const animal = prisma.animal.update({ 
            where: { id: parseInt(animal_id) },
            data: {
                name,
                date_birth,
                age,
                weight,
                height,
                breed,
                gender,
                user_id
            }
        })

        return animal
    } catch (error) {
        throw new Error("Failed to update animal")
    }
}

const deleteAnimal = async(animal_id) => {
    try {
        await prisma.animal.delete({ where: { id: parseInt(animal_id) } })
        
    } catch (error) {
        throw new Error("Failed to delete animal")
    }
}

exports.fetchAnimals = fetchAnimals; exports.createAnimal = createAnimal; exports.showAnimal = showAnimal; exports.updateAnimal = updateAnimal; exports.deleteAnimal = deleteAnimal;