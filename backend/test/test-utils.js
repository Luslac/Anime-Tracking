import { prisma } from "../src/application/database.js";
import bcrypt from "bcryptjs"

export const createTestingUser = async () => {
    await prisma.user.create({
        data: {
            username: "testing",
            password: await bcrypt.hash("testing123",10),
            name: "Amamiya"
        }
    })
}


export const deleteAllTestingTableData = async () => {
    await prisma.animeList.deleteMany({})
    await prisma.user.deleteMany({})
}