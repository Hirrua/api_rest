"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var yup = _interopRequireWildcard(_yup);

const userSchema = yup.object().shape({
    name: yup.string().min(4).required("O nome de usuário é obrigatório"),
    email: yup.string().email("Email inválido").required("O campo email é obrigatório"),
    password: yup.string().required("O campo email é obrigatório"),
    cpf: yup.string().max(14).required("O campo CPF é obrigtório"),
    rg: yup.string().max(14).required("O campo RG é obrigtório")
})

exports. default = userSchema