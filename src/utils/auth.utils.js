import bcrypt from "bcryptjs"

export default async function compare_password(password, hash){
    return await bcrypt.compare(password, hash)
}