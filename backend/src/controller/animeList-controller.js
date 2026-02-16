import animeListServices from "../services/animeList-svs.js"

const addAnime = async (req, res, next) => {
    try {
        const userId = req.user.id
        const data = req.body

        const result = await animeListServices.addAnime(data, userId)
        res.status(201).json({
            success: true,
            message: "New Anime Add To List",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAnimeList = async (req, res, next) => {
    try {
        const userId = req.user.id
        const query  = req.query

        const result = await animeListServices.getAnimeList(userId, query)
        res.status(200).json({
            success: true,
            message: "Get Anime On Your List",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateAnimeData = async (req, res, next) => {
    try {
        const userId = req.user.id
        const data = req.body

        const result = await animeListServices.updateAnimeData(data, userId)
        res.status(200).json({
            success: true,
            message: "Data Updated",
            data: result 
        })
    } catch (error) {
        next(error)
    }
}

const removeAnime = async (req, res, next) => {
    try {
        const userId = req.user.id
        const animeId = req.body.animeId

        const result = await animeListServices.removeAnime(userId, animeId)
        res.status(200).json({
            success: true,
            message: `${result.title} removed from list`,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default {
    addAnime, getAnimeList, updateAnimeData, removeAnime
}