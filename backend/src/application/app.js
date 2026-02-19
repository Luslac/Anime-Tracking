import express from "express"
import { publicRouter } from "../router/publicRouter.js"
import { errorMiddleWare } from "../middleware/error-middleware.js"
import { userRouter } from "../router/userRouter.js"
import cors from "cors"

export const web = express()

const allowedOrigins = [
    'http://localhost:5173',           
    process.env.FRONTEND_URL,
    
]

web.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
        },
        credentials: true
    }))
web.use(express.json())
web.get('/', (req, res) => {
    res.status(200).send('OK')
})
web.use(publicRouter)
web.use(userRouter)
web.use(errorMiddleWare)