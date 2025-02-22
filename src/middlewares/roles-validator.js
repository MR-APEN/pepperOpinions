export const hasRoles = (...roles) => {
    return (req, res, next) => {
        if(!req.usuario) {
            return res.status(500).json({
                success: false,
                message: "Se requiere verificar un role"
            })
        }

        if(!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                success: false,
                message: `La petición solicita uno de estos roles: ${roles}`
            })
        }
        next()
    }
}