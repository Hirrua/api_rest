import * as yup from "yup"

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

export default animalSchema