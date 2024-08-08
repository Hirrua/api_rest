import * as yup from "yup"

const photoSchema = yup.object().shape({
    originalname: yup.string().required("Campo não pode estar vazio"),
    filename: yup.string().required("Campo não pode estar vazio"),
    animal_id: yup.number().required("Precisa vincular a um animal")
})

export default photoSchema