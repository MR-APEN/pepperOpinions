import { Router } from "express"
import { createPublication } from "./publication.controller.js"
import { createPublicationValidator } from "../middlewares/publication-validator.js"

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

export default router
