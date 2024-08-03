import { Router } from "express"
import userSchema from "../validation/user.validation.js"
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()
const userController = Router()

userController.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        await userSchema.validate(req.body, { abortEarly: false })
        let { name, email, password, cpf, rg } = req.body

        const salt = bcrypt.genSaltSync()
        password = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                cpf,
                rg
            }
        })

        return res.json(user)
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
       next(error)
    }

})

export default userController