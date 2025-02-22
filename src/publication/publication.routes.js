import { Router } from "express"
import { createPublication, updatePublication, deletePublication } from "./publication.controller.js"
import { createPublicationValidator, updatePublicationValidator, deletePublicationValidator } from "../middlewares/publication-validator.js"

const router = Router()

/**
 * @swagger
 * /createPublication:
 *   post:
 *     summary: Crea una publicación
 *     tags: [Publication]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               maintext:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post(
    "/createPublication",
    createPublicationValidator, 
    createPublication
)

/**
 * @swagger
 * /updatePublication/{pid}:
 *   put:
 *     summary: Actualiza publicaciones
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Publication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               maintext:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación actualizada
 *       400:
 *         description: Error en la solicitud
 */
router.put(
    "/updatePublication/:pid",
    updatePublicationValidator,
    updatePublication
)

/**
 * @swagger
 * /deletePublication/{pid}:
 *   delete:
 *     summary: Elimina una publicación
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Publication]
 *     responses:
 *       200:
 *         description: Publication eliminada
 *       400:
 *         description: Error en la solicitud
 */
router.delete(
    "/deletePublication/:pid",
    deletePublicationValidator,
    deletePublication
)

export default router
