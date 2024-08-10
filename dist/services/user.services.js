"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _client = require('@prisma/client');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jwtjs = require('../utils/jwt.js');

const prisma = new (0, _client.PrismaClient)()

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

        const salt = _bcryptjs2.default.genSaltSync()
        password = await _bcryptjs2.default.hash(password, salt)

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
   const compare = await _bcryptjs2.default.compare(password, user.password)

   if(!user || !compare) {
        throw new Error('User or password invalid')
   }

   const { id } = user
   const token = _jwtjs.generateJWT.call(void 0, { id, email })
   return token
}

exports.createUser = createUser; exports.fetchUsers = fetchUsers; exports.showUser = showUser; exports.updateUser = updateUser; exports.deleteUser = deleteUser; exports.authentication = authentication;
