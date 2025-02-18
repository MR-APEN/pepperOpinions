import { body } from "express-validator"
import { validateField } from "./field-validator.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"
import { emailExist, userNameExist } from "../helpers/db-validator.js"

export const registerValidator = [
    body("name", "El nombre es requerido").notEmpty(),
    body("surname", "El apellido es requerido").notEmpty(),
    body("username","El username es requerido").notEmpty(),
    body("email","El email es requerido").notEmpty(),
    body("email", "No es un email válido").isEmail(),
    body("email").custom(emailExist),
    body("username").custom(userNameExist),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validateField,
    deleteFileOnError,
    handleErrors
]