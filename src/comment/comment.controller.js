import Comment from "../comment/comment.model.js"

export const createComment = async (req, res) => {
    try {
        const { _id } = req.usuario
        const data = req.body
    
        const comment = new Comment({
            ...data,
            user: _id
        });

        await comment.save()

        const populateComment =  await Comment.findById(comment._id).populate("user","username").populate("publication","title")
    
        res.status(201).json({
            success: true,
            message: "Comentario creado con exito!!!",
            populateComment
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear comentario :(",
            error: err.message
        })
    }
}

export const updateComment = async (req, res) => {
    try {
        const { _id } = req.usuario
        const { cid } = req.params
        const data = req.body

        const comment = await Comment.findById(cid);

        if (comment.user.toString() !== _id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No puedes editar este comentario"
            })
        }

        const commentUpdate = await Comment.findByIdAndUpdate(cid, data, {new: true})

        res.status(200).json({
            success: true,
            message: "Comentario actualizado con exito!!",
            commentUpdate
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el comentario",
            error: err.message
        })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { _id } = req.usuario
        const { cid } = req.params
  
        const comment = await Comment.findById(cid);

        if(comment.user.toString() !== _id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No puedes eliminar este comentario"
            })
        }

        const commentDelete = await Comment.findByIdAndUpdate(cid,{ status: false },{ new: true })
  
        return res.status(200).json({
            success: true,
            message: "Comentario eliminado con exito!!",
            commentDelete
        })
  
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar comentario :(",
            error: err.message
        })
    }
  }