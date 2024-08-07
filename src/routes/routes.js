import { Router } from "express";
import userController from "../controllers/user.controller.js"
import animalsController from "../controllers/animals.controller.js"
import photoController from "../controllers/photos.controller.js"

const routes = Router()

routes.use('/users/', userController)
routes.use('/animals/', animalsController)
routes.use('/photos/', photoController)

export default routes