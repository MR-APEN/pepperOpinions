import { Router } from "express"
import { createComment, updateComment, deleteComment } from "./comment.controller.js"
import { createCommentValidator, updateCommentValidator, deleteCommentValidator } from "../middlewares/comment-validator.js"

const router = Router()

/**
 * @swagger
 * /createComment:
 *   post:
 *     summary: Crea un comentario
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               textC:
 *                 type: string
 *               publication:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post(
    "/createComment",
    createCommentValidator, 
    createComment
)

/**
 * @swagger
 * /updateComment/{cid}:
 *   put:
 *     summary: Actualiza los comentarios
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               textC:
 *                 type: string
 *               publication:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado
 *       400:
 *         description: Error en la solicitud
 */
router.put(
    "/updateComment/:cid",
    updateCommentValidator,
    updateComment
)

/**
 * @swagger
 * /deleteComment/{cid}:
 *   delete:
 *     summary: Elimina un comentario
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: Comentario eliminado
 *       400:
 *         description: Error en la solicitud
 */
router.delete(
    "/deleteComment/:cid",
    deleteCommentValidator,
    deleteComment
)

export default router