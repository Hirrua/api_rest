"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _uservalidationjs = require('../validation/user.validation.js'); var _uservalidationjs2 = _interopRequireDefault(_uservalidationjs);
var _userservicesjs = require('../services/user.services.js');
var _authmiddlewarejs = require('../middlewares/auth.middleware.js'); var _authmiddlewarejs2 = _interopRequireDefault(_authmiddlewarejs);

const userController = _express.Router.call(void 0, )

userController.get('/', async(req, res, next) => {
    try {
        const users = await _userservicesjs.fetchUsers.call(void 0, )

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
        const user = await _userservicesjs.showUser.call(void 0, id)

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
        const { error } = await _uservalidationjs2.default.validate(req.body, { abortEarly: false })

        if(error) {
            return res.status(400).json({ errors: error.details })
        }

        const new_user = await _userservicesjs.createUser.call(void 0, req.body)
        return res.status(201).json(new_user)
        
    } catch (error) {
       next(error)
    }
})

userController.put('/:id', _authmiddlewarejs2.default, async(req, res, next) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(400).json({ errors: "Id not found" })
        }

        const user = await _userservicesjs.showUser.call(void 0, id)
        if(!user) {
            return res.status(404).json({ errors: "User not found" })
        }
        
        const update_user = await _userservicesjs.updateUser.call(void 0, req.body, id)
        return res.status(200).json(update_user)

    } catch (error) {
        next(error)
    }
})

userController.delete('/:id', _authmiddlewarejs2.default, async(req, res, next) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(404).json({ errors: "Id not found" })
        }

        const user = await _userservicesjs.showUser.call(void 0, id)
        if(!user) {
            return res.status(404).json({ errors: "User not found" })
        }

        await _userservicesjs.deleteUser.call(void 0, id)
        return res.status(204).json(null)

    } catch (error) {
        next(error)
    }
})

userController.post('/login', async(req, res, next) => {
    try {
        const token = await _userservicesjs.authentication.call(void 0, req.body)
        res.status(201).json({ token })
    } catch (error) {
        next(error)
    }
})

exports. default = userController