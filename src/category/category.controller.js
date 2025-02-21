import Category from "../category/category.model.js"

export const defaultCategory = async () => {
    const firstCategory = {
        "name": "Noticias"
    }

    const category = await Category.findOne({name: firstCategory.name})
    if(!category) {
        await Category.create(firstCategory)
        console.log(`Categoría predeterminada creada: ${firstCategory.name}`)
    }
}

export const createCategory = async (req, res) => {
    try {
        const data = req.body

        const category = await Category.create(data)

        return res.status(201).json({
            message: "Categoria creada con exito!!!",
            name: category.name
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error al crear categoría",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { uid } = req.params
        const data = req.body

        const categoryUpdate = await Category.findByIdAndUpdate(uid, data, {new: true})

        res.status(200).json({
            success: true,
            message: "Categoría actualizada con exito!!",
            categoryUpdate
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la categoría :(",
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { uid } = req.params

        await Category.findByIdAndUpdate(uid, {status: false})

        res.status(200).json({
            success: true,
            message: "Categoría elimanada con exito !!"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al desactivar categoría :(",
            error: err.message
        })
    }
}