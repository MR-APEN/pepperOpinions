import { Schema, model } from "mongoose"

const commentSchema = new Schema({
    textC:{
        type: String,
        required: [true, "El contenido es requerido"],
        maxLength: [100, "El comentario no puede exceder los 100 caracteres "]
    },
    publication:{
        type: Schema.Types.ObjectId,
        ref: "Publication",
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
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

export default model("Comment", commentSchema);