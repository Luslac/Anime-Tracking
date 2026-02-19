import { ResponseError } from "../error/response-error.js"
import animeListRepo from "../repo/animeList-repo.js"
import { existingEntry } from "../utils/animeList-helper.js"


const addAnime = async (data, userId) => {
    const { animeId, image_url, title, status } = data
    await existingEntry(userId, animeId)

    const newData = await animeListRepo.create(
        { 
        userId,
        animeId,
        image_url,
        title,
        status,
        startedAt: status === 'WATCHING' ? new Date() : null
        }
    )

    return newData
}

const getAnimeList = async (userId, filters = {}) => {
    const { status, isFavorite, score, rating } = filters
    const listAnime = await animeListRepo.findMany(
        { userId: userId }
    )
    if (listAnime.length <= 0) {
        throw new ResponseError(404, "Never added anime to list")
    }
    const where = {
        userId: userId,
        ...(status && { status }),
        ...(isFavorite !== undefined && { isFavorite }),
        ...(score && { score }),
        ...(rating && { rating })
    }

    const data = await animeListRepo.findMany(where)
    if (data.length <= 0) {
        throw new ResponseError(404, "Anime Not Found")
    }

    return data
}

const updateAnimeData = async (data, userId) => {
    const { animeId, score, status, rating, episodesWatched, notes, isFavorite } = data

    const existing = await animeListRepo.find({ userId, animeId })

    if (!existing) {
        throw new ResponseError(404, 'Anime not found in your list')
    }

    const dataToUpdate = {}

    if (status) {
        dataToUpdate.status = status
        const now = new Date()
        
        if (status === 'WATCHING' && !existing.startedAt) {
            dataToUpdate.startedAt = now
        }
        if (status === 'COMPLETED') {
            dataToUpdate.completedAt = now
            if (!existing.startedAt) dataToUpdate.startedAt = now
        }
    }


    const validateRange = (value, name) => {
        if (value !== undefined) {
            if (value < 0 || value > 10) { 
                throw new ResponseError(400, `${name} must be between 0-10`)
            }
            return value
        }
        return undefined
    };

    dataToUpdate.rating = validateRange(rating, 'Rating')
    dataToUpdate.score = validateRange(score, 'Score')
    
    if (episodesWatched !== undefined) dataToUpdate.episodesWatched = episodesWatched
    if (isFavorite !== undefined) dataToUpdate.isFavorite = isFavorite
    if (notes !== undefined) dataToUpdate.notes = notes

    return await animeListRepo.update(
        { 
            userId_animeId: { userId, animeId } 
        }, 
        dataToUpdate
    );
}

const removeAnime = async (userId, animeId) => {

    const existing = await animeListRepo.find(
        { userId: userId, animeId: animeId }
    )

    if (!existing) {
        throw new ResponseError(404, 'Anime not found in your list')
    }

    const result = await animeListRepo.remove(
        { userId_animeId: { userId, animeId } }
    )

    return {
        animeId,
        title: result.title
    }
}
export default {
    addAnime, getAnimeList, updateAnimeData, removeAnime
}