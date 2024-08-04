import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const fetchUsers = async () => {
    try {
        return await prisma.user.findMany()
    } catch (error) {
        throw new Error('Failed to fetch users')
    }
}

const showUser = async (userId) => {
    try {
        return await prisma.user.findUnique({ where: { id: parseInt(userId) } })
    } catch (error) {
        throw new Error('Failed to fetch user')
    }
}

const createUser = async (userData) => {
    try {
        let { name, email, password, cpf, rg } = userData

        const salt = bcrypt.genSaltSync()
        password = await bcrypt.hash(password, salt)

        return await prisma.user.create({ data: { name, email, password, cpf, rg } })
    } catch (error) {
        throw new Error('Failed to create user')
    }
}

const updateUser = async (userData, userId) => {
    try {
        let { name, cpf, rg } = userData
        return await prisma.user.update({ where: { id: parseInt(userId) }, data: { name, cpf, rg } })

    } catch (error) {
        throw new Error('Failed to update user')
    }
}

const deleteUser = async (userId) => {
    try {
        return await prisma.user.delete({ where: { id: parseInt(userId) } })

    } catch (error) {
        throw new Error('Failed to delete user')
    }
}

export { createUser, fetchUsers, showUser, updateUser, deleteUser }
