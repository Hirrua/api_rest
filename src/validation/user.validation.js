import * as yup from "yup"

const userSchema = yup.object().shape({
    name: yup.string().min(4).required("O nome de usuário é obrigatório"),
    email: yup.string().email("Email inválido").required("O campo email é obrigatório"),
    password: yup.string().required("O campo email é obrigatório"),
    cpf: yup.string().max(14).required("O campo CPF é obrigtório"),
    rg: yup.string().max(14).required("O campo RG é obrigtório")
})

export default userSchema