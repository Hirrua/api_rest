import { authenticateToken } from "../utils/jwt.js"

const authenticationMiddleware = (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({ error: 'No token' })
    }

    const [_, token] = authorization.split(' ')
    const payload =  authenticateToken(token)

    if(!payload) {
        return res.status(401).json({ error: 'Invalid token' })
    }
    
    res.locals.payload = payload
    return next()
}

export default authenticationMiddleware