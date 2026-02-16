import userServices from "../services/user-svs.js"

const registration = async (req, res, next) => {
    try {
        const result = await userServices.registration(req)
        res.status(201).json({
            success: true,
            message: "New User Created",
            data: {
                user: {
                    username: result.username,
                    name: result.name
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userServices.login(req.body)
        res.status(200).json({
            success: true,
            message: "Login success",
            data: {
                token: result.token,
                user: {
                    username: result.username,
                    name: result.name
                }
            }
        })

    } catch (error) {
        next(error)
    }
}


export default {
    registration, login
}