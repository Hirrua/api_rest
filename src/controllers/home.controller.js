import { Router } from "express";

const homeController = Router()

homeController.get('/', (req, res, next) => {
    next()
    res.json({
        "message": "Teste"
    })
})

export default homeController