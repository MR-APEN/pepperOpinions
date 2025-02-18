import { hash } from "argon2"
import User from "../user/user.model.js"

export const register = async (req, res) => {
    try {
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data)

        return res.status(201).json({
            message: "Usuario registrado con exito!!",
            username: user.username,
            email: user.email
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar usuario",
            error: err.message
        })
    }
}