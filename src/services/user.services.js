import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateJWT } from '../utils/jwt.js'

const prisma = new PrismaClient()

const fetchUsers = async () => {
    try {
        return await prisma.user.findMany()
    } catch (error) {
        throw new Error('Failed to fetch users')
    }
}

const showUser = async (user_id) => {
    try {
        return await prisma.user.findUnique({ where: { id: parseInt(user_id) }, include: { Animal: true } })
    } catch (error) {
        throw new Error('Failed to fetch user')
    }
}

const createUser = async (user_data) => {
    try {
        let { name, email, password, cpf, rg } = user_data

        const salt = bcrypt.genSaltSync()
        password = await bcrypt.hash(password, salt)

        return await prisma.user.create({ data: { name, email, password, cpf, rg } })
    } catch (error) {
        throw new Error('Failed to create user')
    }
}

const updateUser = async (user_data, user_id) => {
    try {
        let { name, cpf, rg } = user_data
        return await prisma.user.update({ where: { id: parseInt(user_id) }, data: { name, cpf, rg } })

    } catch (error) {
        throw new Error('Failed to update user')
    }
}

const deleteUser = async (user_id) => {
    try {
        return await prisma.user.delete({ where: { id: parseInt(user_id) } })

    } catch (error) {
        throw new Error('Failed to delete user')
    }
}

const authentication = async({ email, password }) => {
   if(!email || !password) {
        throw new Error('Require missing')
   }

   const user = await prisma.user.findUnique({ where: { email } })
   const compare = await bcrypt.compare(password, user.password)

   if(!user || !compare) {
        throw new Error('User or password invalid')
   }

   const { id } = user
   const token = generateJWT({ id, email })
   return token
}

export { createUser, fetchUsers, showUser, updateUser, deleteUser, authentication }
