import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"


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

export const updateProfilePicture = async (req, res) => {
    try {
        const { _id } = req.usuario
        let newProfilePicture = req.file ? req.file.filename : null
        if(!newProfilePicture) {
            return res.status(400).json({
                success: false,
                message: "No se encontro un archivo en la petición"
            })
        }

        const user = await User.findById(_id)
        if(user.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicture)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Foto de perfil actualizada con exito!!",
            profilePicture: user.profilePicture
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar foto de perfil",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { _id } = req.usuario
        const { newPassword, oldPassword } = req.body

        const user = await User.findById(_id)

        const matchNewPassword = await verify(user.password, newPassword)
        if(matchNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const matchOldPassword = await verify(user.password, oldPassword)
        if(!matchOldPassword) {
            return res.status(400).json({
                success: false,
                message: "Tienes que ingresar tu contraseña actual....."
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(_id, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "La contraseña se actualizado!!!"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la contraseña",
            error: err.message
        })
    }
}