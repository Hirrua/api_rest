"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var yup = _interopRequireWildcard(_yup);

const photoSchema = yup.object().shape({
    originalname: yup.string().required("Campo não pode estar vazio"),
    filename: yup.string().required("Campo não pode estar vazio"),
    animal_id: yup.number().required("Precisa vincular a um animal")
})

exports. default = photoSchema