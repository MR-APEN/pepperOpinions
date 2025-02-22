import { body } from "express-validator"
import { validateField } from "./field-validator.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./jwt-validator.js"

export const createPublicationValidator = [
    validateJWT,
    body("title", "El titulo es requerido").notEmpty(),
    body("maintext", "El texto principal es requerido").notEmpty(),
    validateField,
    handleErrors
]