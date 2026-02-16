import { ResponseError } from "../error/response-error.js"
import userRepo from "../repo/user-repo.js"
import bcrypt from "bcryptjs"

export const checkExistingUser = async (userCheck) => {
    const user = await userRepo.find({
        username: userCheck.username
    })
    if (user) {
        throw new ResponseError(409, "User Already Exists")
    }

    return user
}

export const getUserOrThrow = async (logUser) => {
    const user = await userRepo.findWithPassword({
        username: logUser.username 
    })
    
    if (!user) {
        throw new ResponseError(404, "User not found")
    }
    
    return user
}

export const isPasswordValid = async (plainPassword, hashedPassword) => {
    const isValid = await bcrypt.compare(plainPassword, hashedPassword)
    if (!isValid) {
        throw new ResponseError(401,"Username or Password Wrong")
    }
}