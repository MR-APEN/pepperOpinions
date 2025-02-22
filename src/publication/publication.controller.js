import Publication from "../publication/publication.model.js"

export const createPublication = async (req, res) => {
    try {
        const { _id } = req.usuario
        const data = req.body
    
        console.log("hola")

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