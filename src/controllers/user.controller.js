import { Router } from "express"
import userSchema from "../validation/user.validation.js"
import { authentication, createUser, deleteUser, fetchUsers, showUser, updateUser } from "../services/user.services.js"
import authenticationMiddleware from "../middlewares/auth.middleware.js"

const userController = Router()

userController.get('/', async(req, res, next) => {
    try {
        const users = await fetchUsers()

        if(!users) {
            return res.status(404).json({ errors: "No users found" })
        }

        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

userController.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const user = await showUser(id)

        if(!user) {
            return res.status(404).json({ errors: "User not found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

userController.post('/', async(req, res, next) => {
    try {
        const { error } = await userSchema.validate(req.body, { abortEarly: false })

        if(error) {
            return res.status(400).json({ errors: error.details })
        }

        const new_user = await createUser(req.body)
        return res.status(201).json(new_user)
        
    } catch (error) {
       next(error)
    }
})

userController.put('/:id', authenticationMiddleware, async(req, res, next) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(400).json({ errors: "Id not found" })
        }

        const user = await showUser(id)
        if(!user) {
            return res.status(404).json({ errors: "User not found" })
        }
        
        const update_user = await updateUser(req.body, id)
        return res.status(200).json(update_user)

    } catch (error) {
        next(error)
    }
})

userController.delete('/:id', authenticationMiddleware, async(req, res, next) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(404).json({ errors: "Id not found" })
        }

        const user = await showUser(id)
        if(!user) {
            return res.status(404).json({ errors: "User not found" })
        }

        await deleteUser(id)
        return res.status(204).json(null)

    } catch (error) {
        next(error)
    }
})

userController.post('/login', async(req, res, next) => {
    try {
        const token = await authentication(req.body)
        res.status(201).json({ token })
    } catch (error) {
        next(error)
    }
})

export default userController