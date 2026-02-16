import userController from "../controller/user-controller.js";
import express from "express"

export const publicRouter = express.Router()

publicRouter.post("/api/v1/registration", userController.registration)
publicRouter.post("/api/v1/login", userController.login)