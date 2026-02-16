import animeListController from "../controller/animeList-controller.js"
import express from "express"
import { authMiddleware } from "../middleware/auth-middleware.js"

export const userRouter = express.Router()
userRouter.use(authMiddleware)


userRouter.post("/api/v1/watchList", animeListController.addAnime)
userRouter.get("/api/v1/watchList", animeListController.getAnimeList)
userRouter.patch("/api/v1/watchList", animeListController.updateAnimeData)
userRouter.delete("/api/v1/watchList", animeListController.removeAnime)