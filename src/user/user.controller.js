import { hash } from "argon2"
import User from "../user/user.model.js"

export const defaultUserAdmin = async () => {
    const defaultUser = {
        "name": "Javier",
        "surname": "Apen",
        "username": "Admin1",
        "email": "japen@gmail.com",
        "password": "Ja123456#",
        "profilePicture": "admin_image.jpg",
        "role": "ADMIN_ROLE"
    }

    const user = await User.findOne({email: defaultUser.email})
    if(!user){
        defaultUser.password =  await hash(defaultUser.password)
        await User.create(defaultUser)
        console.log(`Admin creado email: ${defaultUser.email}, Username: ${defaultUser.username}, Contraseña: Ja123456#`)
    }
}