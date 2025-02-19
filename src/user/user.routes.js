import { Router } from "express"
import { updateUser, updateProfilePicture, updatePassword } from "./user.controller.js"
import { updateUserValidator, updateProfilePictureValidator, updatePasswordValidator } from "../middlewares/user-validator.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
*               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Error en la solicitud
 */
router.put("/updateUser", updateUserValidator, updateUser)

/**
 * @swagger
 * /updateProfilePicture:
 *   patch:
 *     summary: Actualiza la foto de perfil de un usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada
 *       400:
 *         description: Error en la solicitud
 */
router.patch(
    "/updateProfilePicture",
    uploadProfilePicture.single("profilePicture"),
    updateProfilePictureValidator,
    updateProfilePicture
)

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Actualiza la contraseña de un usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: Error en la solicitud
 */
router.patch(
    "/updatePassword",
    updatePasswordValidator,
    updatePassword
)

export default router