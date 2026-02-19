import { ZodError } from "zod"
import { ResponseError } from "../error/response-error.js"
import { logger } from "../application/logging.js"

const errorMiddleWare = async (err, req, res, next) => {
    if (!err) {
        next()
        return
    }
    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message,
            status: err.status,
            success: false
        })
        
    } else if (err instanceof ZodError) {
        res.status(400).json({
            errors: "Validation Error",
            success: false,
            status: 400,
            details: err.flatten().fieldErrors
        })

    } else {
        logger.error('Internal Server Error', { 
            error: err.message, 
            stack: err.stack,
            path: req.path 
        })

        res.status(500).json({
            errors: "Internal Server Error",
            status: 500,
            success: false
        })
    }
}

export {
    errorMiddleWare
}