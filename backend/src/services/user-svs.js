import userRepo from "../repo/user-repo.js"
import { checkExistingUser, getUserOrThrow, isPasswordValid } from "../utils/user-helper.js"
import { loginValidation, registrationValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const registration = async (req) => {
    const user = validate(registrationValidation, req.body)

    await checkExistingUser(user)

    user.password = await bcrypt.hash(user.password, 10)
    return userRepo.create({
        username: user.username,
        password: user.password,
        name: user.name
    })
}


const login = async (userReq) => {
    const request = validate(loginValidation, userReq)
    const user = await getUserOrThrow(request)
    await isPasswordValid(request.password, user.password)

    const token = jwt.sign(
        {   
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,       
        { expiresIn: process.env.JWT_EXPIRES_IN })
    
    return {
        username: user.username,
        name: user.username,
        token: token
    }
}
export default  {
    registration, login
}