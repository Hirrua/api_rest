import { Router } from "express";
import homeController from "../controllers/home.controller.js"
import userController from "../controllers/user.controller.js"

const routes = Router()

routes.use('/', homeController)
routes.use('/users/', userController)

export default routes