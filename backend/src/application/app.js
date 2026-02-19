import express from "express"
import { publicRouter } from "../router/publicRouter.js"
import { errorMiddleWare } from "../middleware/error-middleware.js"
import { userRouter } from "../router/userRouter.js"
import cors from "cors"

export const web = express()
web.use(cors())
web.use(express.json())
web.use(publicRouter)
web.use(userRouter)
web.use(errorMiddleWare)