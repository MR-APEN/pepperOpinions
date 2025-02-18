import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Pepper Opinions API",
            version:"1.0.0",
            description: "API para gestionar opiniones",
            contact:{
                name: "Javier Apen",
                email: "japen-2023128@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3003/pepperOpinions/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
export { swaggerDocs, swaggerUi }
