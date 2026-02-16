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

    const { animeId, score, status, rating, episodesWatched, notes, isFavorite } = data;

    const existing = await animeListRepo.find(
        { userId: userId, animeId: animeId }
    )

    if (!existing) {
        throw new ResponseError(404, 'Anime not found in your list')
    }

    const dataToUpdate = {}

    if (status) {
        dataToUpdate.status = status
        if (status === 'WATCHING' && !existing.startedAt) {
            dataToUpdate.startedAt = new Date()
        }
        if (status === 'COMPLETED') {
            dataToUpdate.completedAt = new Date()
        }
    }

    if (rating !== undefined) {
        if (rating < 1 || rating > 10) {
            throw new ResponseError(400, 'Rating must be between 1-10')
        }
        dataToUpdate.rating = rating
    }

    if (score !== undefined) {
        if (score < 1 || score > 10) {
            throw new ResponseError(400, 'Score must be between 1-10')
        }
        dataToUpdate.score = score
    }

    if (episodesWatched !== undefined) {
        dataToUpdate.episodesWatched = episodesWatched
    }

    if (isFavorite !== undefined) {
        dataToUpdate.isFavorite = isFavorite
    }

    if (notes !== undefined) {
        dataToUpdate.notes = notes
    }

    const newData = await animeListRepo.update(
        { userId_animeId: { userId: userId, animeId: animeId } },
        { ...dataToUpdate }
    )

    return newData
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