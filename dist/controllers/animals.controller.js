"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _animalvalidationjs = require('../validation/animal.validation.js'); var _animalvalidationjs2 = _interopRequireDefault(_animalvalidationjs);
var _authmiddlewarejs = require('../middlewares/auth.middleware.js'); var _authmiddlewarejs2 = _interopRequireDefault(_authmiddlewarejs);
var _animalservicesjs = require('../services/animal.services.js');

const animalsController = _express.Router.call(void 0, )

animalsController.get('/', async(req, res, next) => { 
    try {
        const animals = await _animalservicesjs.fetchAnimals.call(void 0, )
        return res.status(200).json(animals)
    } catch (error) {
        next(error)
    }
})

animalsController.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const animal = await _animalservicesjs.showAnimal.call(void 0, id)

        if(!animal) {
            return res.status(404).json({ errors: "Animal not found" })
        }

        return res.status(200).json(animal)
    } catch (error) {
        next(error)
    }
})

animalsController.post('/', _authmiddlewarejs2.default, async(req, res, next) => {
    try {
        const { error } = _animalvalidationjs2.default.validate(req.body, { abortEarly: false })
        if(error) {
            return res.status(400).json({ errors: error.details })
        }

        const new_animal = await _animalservicesjs.createAnimal.call(void 0, req.body)
        return res.status(201).json(new_animal)

    } catch (error) {
        next(error)
    }
})

animalsController.put('/:id', _authmiddlewarejs2.default, async(req, res, next) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(400).json({ errors: "ID required" })
        }

        const animal = await _animalservicesjs.showAnimal.call(void 0, id)
        if(!animal) {
            return res.status(404).json({ errors: "Animal not found" })
        }

        const update_animal = await _animalservicesjs.updateAnimal.call(void 0, req.body, id)
        return res.status(200).json(update_animal)

    } catch (error) {
        next(error)
    }
})

animalsController.delete('/:id', _authmiddlewarejs2.default, async(req, res, next) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(400).json({ errors: "ID required" })
        }

        const animal = await _animalservicesjs.showAnimal.call(void 0, id)
        if(!animal) {
            return res.status(404).json({ errors: "Animal not found" })
        }

        await _animalservicesjs.deleteAnimal.call(void 0, id)
        return res.status(204).json(null)

    } catch (error) {
        next(error)
    }
})

exports. default = animalsController