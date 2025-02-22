import { body, param } from "express-validator"
import { validateField } from "./field-validator.js"
import { handleErrors } from "./handle-errors.js"
import { nameCategoryExist, categoryExist } from "../helpers/db-validator.js"
import { validateJWT } from "./jwt-validator.js"
import { hasRoles } from "./roles-validator.js"

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name", "El nombre de la categoría es requerido").notEmpty(),
    body("name").custom(nameCategoryExist),
    validateField,
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "No es un ID válido de MongoDB").isMongoId(),
    param("uid").custom(categoryExist),
    validateField,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid","No es un ID válido de MongoDB").isMongoId(),
    param("uid").custom(categoryExist),
    validateField,
    handleErrors
]

