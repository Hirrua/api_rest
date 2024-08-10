"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config()

const SECRET = process.env.TOKEN_SECRET
const jwtConfig = {
    expiresIn: process.env.TOKE_TIME,
    algorithm: 'HS256',
}

const generateJWT = (payload) => {
    return _jsonwebtoken2.default.sign(payload, SECRET, jwtConfig)
}

const authenticateToken = (token) => {
    if(!token) {
        throw { status: 401, message: "No token" }
    }

    try {
        const introspection = _jsonwebtoken2.default.verify(token, SECRET, jwtConfig)
        return introspection
    } catch (error) {
        console.log("error", e.message)
        throw { status: 401, message: "token inválido" }
    }
}

exports.generateJWT = generateJWT; exports.authenticateToken = authenticateToken;