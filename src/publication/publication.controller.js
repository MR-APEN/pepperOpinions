import Publication from "../publication/publication.model.js"

export const createPublication = async (req, res) => {
    try {
        const { _id } = req.usuario
        const data = req.body
    
        const publication = new Publication({
            ...data,
            user: _id
        });

        await publication.save()

        const populatePublication =  await Publication.findById(publication._id).populate("user","username").populate("category","name")
    
        res.status(201).json({
            success: true,
            message: "Publicación realizada con exito!!!",
            populatePublication
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear publicación :(",
            error: err.message
        })
    }
}

export const updatePublication = async (req, res) => {
    try {
        const { _id } = req.usuario
        const { pid } = req.params
        const data = req.body

        const publication = await Publication.findById(pid);

        if (publication.user.toString() !== _id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No puedes editar esta publicación"
            })
        }

        const publicationUpdate = await Publication.findByIdAndUpdate(pid, data, {new: true})

        res.status(200).json({
            success: true,
            message: "Publicación actualizada con exito!!",
            publicationUpdate
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar publicación",
            error: err.message
        })
    }
}

export const deletePublication = async (req, res) => {
    try {
        const { _id } = req.usuario
        const { pid } = req.params
  
        const publication = await Publication.findById(pid);

        if(publication.user.toString() !== _id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No puedes eliminar esta publicación"
            })
        }

        const publicationDelete = await Publication.findByIdAndUpdate(pid,{ status: false },{ new: true })
  
  
        return res.status(200).json({
            success: true,
            message: "Publicación eliminada con exito!!",
            publicationDelete
        })
  
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar publicación :(",
            error: err.message
        })
    }
  }