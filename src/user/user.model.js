import { Schema, model } from "mongoose"

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "El nombre no puede exceder los 25 caracteres"]
    },
    surname:{
        type: String,
        required: [true, "El apellido es requerido"],
        maxLength: [25, "El apellido no puede exceder los 25 caracteres"]
    },
    username:{
        type: String,
        required: [true,"El nombre de usuario es requerido"],
        unique:true
    },
    email:{
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    profilePicture:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"],
        default: "USER_ROLE"
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

export default model("User", userSchema)