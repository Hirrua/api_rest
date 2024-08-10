import { Router } from "express"
import animalSchema from "../validation/animal.validation.js"
import authenticationMiddleware from "../middlewares/auth.middleware.js"
import { fetchAnimals, createAnimal, showAnimal, updateAnimal, deleteAnimal } from "../services/animal.services.js"

const animalsController = Router()

animalsController.get('/', async(req, res, next) => { 
    try {
        const animals = await fetchAnimals()
        return res.status(200).json(animals)
    } catch (error) {
        next(error)
    }
})

animalsController.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const animal = await showAnimal(id)

        if(!animal) {
            return res.status(404).json({ errors: "Animal not found" })
        }

        return res.status(200).json(animal)
    } catch (error) {
        next(error)
    }
})

animalsController.post('/', authenticationMiddleware, async(req, res, next) => {
    try {
        const { error } = animalSchema.validate(req.body, { abortEarly: false })
        if(error) {
            return res.status(400).json({ errors: error.details })
        }

        const new_animal = await createAnimal(req.body)
        return res.status(201).json(new_animal)

    } catch (error) {
        next(error)
    }
})

animalsController.put('/:id', authenticationMiddleware, async(req, res, next) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(400).json({ errors: "ID required" })
        }

        const animal = await showAnimal(id)
        if(!animal) {
            return res.status(404).json({ errors: "Animal not found" })
        }

        const update_animal = await updateAnimal(req.body, id)
        return res.status(200).json(update_animal)

    } catch (error) {
        next(error)
    }
})

animalsController.delete('/:id', authenticationMiddleware, async(req, res, next) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(400).json({ errors: "ID required" })
        }

        const animal = await showAnimal(id)
        if(!animal) {
            return res.status(404).json({ errors: "Animal not found" })
        }

        await deleteAnimal(id)
        return res.status(204).json(null)

    } catch (error) {
        next(error)
    }
})

export default animalsController