import { Schema, model } from "mongoose"

const publicationSchema = Schema({
    title:{
        type: String,
        required: [true, "El titulo de la publicación es requerido"],
        maxLength: [25, "El titulo no puede exceder los 25 caracteres"]
    },
    maintext:{
        type: String,
        required: [true, "El texto principal es requerido para la publicación"],
        maxLength: [100, "El texto principal no puede exceder los 25 caracteres"]
    },
    category:{
        type: Schema.ObjectId,
        ref: 'Category',
        required: [true]
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User',
        required: [true]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
    versionKey: false
})

export default model("Publication", publicationSchema)