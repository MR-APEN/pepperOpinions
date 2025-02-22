import User from "../user/user.model.js"
import Category from "../category/category.model.js"

export const emailExist = async (email= "") => {
    const exist = await User.findOne({email})
    if(exist) {
        throw new Error(`El email: ${email} ya fue registrado`)
    }
}

export const userNameExist = async (username= "") => {
    const exist = await User.findOne({username})
    if(exist) {
        throw new Error(`El username: ${username} ya fue registrado`)
    }
}

export const userExist = async (uid = "") => {
    const exist = await User.findById(uid)
    if(!exist) {
        throw new Error(`No existe un usuario con el ID: ${uid}`)
    }
}

export const nameCategoryExist = async (name= "") => {
    const exist = await Category.findOne({name})
    if(exist) {
        throw new Error(`La categoría: ${name} ya fue registrada`)
    }
}

export const categoryExist = async (uid= "") => {
    const exist = await Category.findById(uid)
    if(!exist) {
        throw new Error(`No existe la categoría con el ID: ${uid}`)
    }
}