"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _usercontrollerjs = require('../controllers/user.controller.js'); var _usercontrollerjs2 = _interopRequireDefault(_usercontrollerjs);
var _animalscontrollerjs = require('../controllers/animals.controller.js'); var _animalscontrollerjs2 = _interopRequireDefault(_animalscontrollerjs);
var _photoscontrollerjs = require('../controllers/photos.controller.js'); var _photoscontrollerjs2 = _interopRequireDefault(_photoscontrollerjs);

const routes = _express.Router.call(void 0, )

routes.use('/users/', _usercontrollerjs2.default)
routes.use('/animals/', _animalscontrollerjs2.default)
routes.use('/photos/', _photoscontrollerjs2.default)

exports. default = routes