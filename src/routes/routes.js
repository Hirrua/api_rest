import { Router } from "express";
import userController from "../controllers/user.controller.js"

const routes = Router()

routes.use('/users/', userController)

export default routes