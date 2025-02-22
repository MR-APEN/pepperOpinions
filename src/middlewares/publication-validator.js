import { body, param } from "express-validator"
import { validateField } from "./field-validator.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./jwt-validator.js"
import { publicationExist } from "../helpers/db-validator.js"

export const createPublicationValidator = [
    validateJWT,
    body("title", "El titulo es requerido").notEmpty(),
    body("maintext", "El texto principal es requerido").notEmpty(),
    validateField,
    handleErrors
]

export const updatePublicationValidator = [
    validateJWT,
    param("pid", "No es un ID válido de MongoDB").isMongoId(),
    param("pid").custom(publicationExist),
    validateField,
    handleErrors
]

export const deletePublicationValidator = [
    validateJWT,
    param("pid", "No es un ID válido de MongoDB").isMongoId(),
    param("pid").custom(publicationExist),
    validateField,
    handleErrors
]