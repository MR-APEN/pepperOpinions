import { hash } from "argon2"
import User from "../user/user.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { error } from "console"

const __dirname = dirname(fileURLToPath(import.meta.url))

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

export const updateUser = async (req, res) => {
    try {
        const { _id } = req.usuario
        const data = req.body

        const userUpdate = await User.findByIdAndUpdate(_id, data, {new: true})

        res.status(200).json({
            success: true,
            message: "Usuario actualizado",
            userUpdate
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar usuario",
            error: err.message
        })
    }
}