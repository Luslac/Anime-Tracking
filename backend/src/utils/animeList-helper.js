import { ResponseError } from "../error/response-error.js";
import animeListRepo from "../repo/animeList-repo.js";

export const existingEntry = async (userId, animeId) => {
    const isExist = await animeListRepo.findUnique({
        userId_animeId: { userId, animeId }
    })

    if (isExist) {
        throw new ResponseError(400, 'Anime already in your list');
    }
}