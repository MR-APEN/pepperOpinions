import { Schema, model } from "mongoose"

const categorySchema = Schema({
    name:{
        type: String,
        unique: true,
        required: [true, "El nombre de la categoría es requerido"],
        maxLength: [25, "No puede exceder los 25 caracteres el nombre"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Category", categorySchema)