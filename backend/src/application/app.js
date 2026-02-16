import express from "express"
import { publicRouter } from "../router/publicRouter.js"
import { errorMiddleWare } from "../middleware/error-middleware.js"
import { userRouter } from "../router/userRouter.js"


export const web = express()

web.use(express.json())
web.use(publicRouter)
web.use(userRouter)
web.use(errorMiddleWare)