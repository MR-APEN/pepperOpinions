import { Router } from "express"
import { createCategory, updateCategory, deleteCategory } from "./category.controller.js"
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validator.js"

const router = Router()

/**
 * @swagger
 * /createCategory:
 *   post:
 *     summary: Crea una categoría
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post(
    "/createCategory",
    createCategoryValidator, 
    createCategory
)

/**
 * @swagger
 * /updateCategory/{uid}:
 *   put:
 *     summary: Actualiza categorias
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       400:
 *         description: Error en la solicitud
 */
router.put(
    "/updateCategory/:uid",
    updateCategoryValidator,
    updateCategory
)


/**
 * @swagger
 * /deleteCategory/{uid}:
 *   delete:
 *     summary: Elimina una categoría
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       400:
 *         description: Error en la solicitud
 */
router.delete(
    "/deleteCategory/:uid",
    deleteCategoryValidator,
    deleteCategory
)

export default router