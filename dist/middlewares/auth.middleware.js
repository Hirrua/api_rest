"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _jwtjs = require('../utils/jwt.js');

const authenticationMiddleware = (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({ error: 'No token' })
    }

    const [_, token] = authorization.split(' ')
    const payload =  _jwtjs.authenticateToken.call(void 0, token)

    if(!payload) {
        return res.status(401).json({ error: 'Invalid token' })
    }
    
    res.locals.payload = payload
    return next()
}

exports. default = authenticationMiddleware