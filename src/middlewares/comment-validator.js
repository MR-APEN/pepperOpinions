import { body, param } from "express-validator"
import { validateField } from "./field-validator.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./jwt-validator.js"
import { commentExist } from "../helpers/db-validator.js"

export const createCommentValidator = [
    validateJWT,
    body("textC", "El texto es requerido").notEmpty(),
    validateField,
    handleErrors
]

export const updateCommentValidator = [
    validateJWT,
    param("cid", "No es un ID válido de MongoDB").isMongoId(),
    param("cid").custom(commentExist),
    validateField,
    handleErrors
]

export const deleteCommentValidator = [
    validateJWT,
    param("cid", "No es un ID válido de MongoDB").isMongoId(),
    param("cid").custom(commentExist),
    validateField,
    handleErrors
]