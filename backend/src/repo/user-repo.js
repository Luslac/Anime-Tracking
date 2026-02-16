import { prisma } from "../application/database.js"

const create = async (data) => {
    return prisma.user.create({
        data,
        select: {
            id: true,
            name: true,
            username: true,
        }})
}

const find = async (where) => {
    return prisma.user.findFirst({
        where,
        select: {
            id: true,
            name: true,
            username: true,
        }})
}

const findWithPassword = async (where) => {
    return prisma.user.findFirst({
        where,
        select: {
            id: true,
            name: true,
            username: true,
            password: true
        }})
}

const findUnique = async (where) => {
    return prisma.user.findUnique({
        where
    })
}

const findMany = async (where, options = {}) => {
    return await prisma.user.findMany({
        where,
        ...options
    })
}


const update = async (where, data, options = {}) => {
    return await prisma.user.update({
        where,
        data,
        ...options
    })
}


export default {
    create, find, findMany, update, findWithPassword, findUnique
}