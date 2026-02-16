import {z} from "zod"

export const registrationValidation = z.object({
    username : z.string().max(100), 
    password : z.string().min(8).max(200),
    name : z.string().min(3).max(100)
})

export const loginValidation = z.object({
    username : z.string().max(100), 
    password : z.string().min(8).max(200)
})