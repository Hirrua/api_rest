"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var yup = _interopRequireWildcard(_yup);

const genderEnum = ['M', 'F']
const animalSchema = yup.object().shape({
    name: yup.string().max(100).nullable(),
    date_birth: yup.date().nullable(),
    age: yup.number().integer().min(0).nullable(),
    weight: yup.number().min(0).nullable(),
    height: yup.number().min(0).nullable(),
    breed: yup.string().max(50).nullable(),
    gender: yup.mixed().oneOf(genderEnum).required("O campo genero é obrigatório"),
    user_id: yup.number().required("Precisa vincular a um usuário")
})

exports. default = animalSchema