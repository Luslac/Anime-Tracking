import { prisma } from "../application/database.js"

const create = async (data) => {
    return prisma.animeList.create({
        data
        })
}

const find = async (where) => {
    return prisma.animeList.findFirst({
        where 
    })
}

const findUnique = async (where) => {
    return prisma.animeList.findUnique({
        where
    })
}

const findMany = async (where, options = {}) => {
    return await prisma.animeList.findMany({
        where,
        ...options
    })
}

const update = async (where, data, options = {}) => {
    return await prisma.animeList.update({
        where,
        data,
        ...options
    })
}

const updateMany = async (where, data) => {
    return prisma.animeList.updateMany({
        where,
        data
    })
}

const remove = async (where) => {
    return prisma.animeList.delete({
        where
    })
}

const removeMany = async (where) => {
    return prisma.animeList.deleteMany({
        where
    })
}

const count = async (where) => {
    return prisma.animeList.count({
        where
    })
}

const groupBy = async (by, where, options = {}) => {
    return prisma.animeList.groupBy({
        by,
        where,
        ...options
    })
}

export default {
    create, find, findMany, update, groupBy, count, removeMany, remove, updateMany, findUnique
}