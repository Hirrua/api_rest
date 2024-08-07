import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const SECRET = process.env.TOKEN_SECRET
const jwtConfig = {
    expiresIn: process.env.TOKE_TIME,
    algorithm: 'HS256',
}

const generateJWT = (payload) => {
    return jwt.sign(payload, SECRET, jwtConfig)
}

const authenticateToken = (token) => {
    if(!token) {
        throw { status: 401, message: "No token" }
    }

    try {
        const introspection = jwt.verify(token, SECRET, jwtConfig)
        return introspection
    } catch (error) {
        console.log("error", e.message)
        throw { status: 401, message: "token inválido" }
    }
}

export { generateJWT, authenticateToken }