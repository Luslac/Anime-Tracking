import { prisma } from "../src/application/database.js"
import request from "supertest"
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest'
import { web } from "../src/application/app.js"
import { deleteAllTestingTableData, createTestingUser } from "./test-utils.js"
import { fa } from "zod/v4/locales"

afterAll(async () => {
    await prisma.$disconnect()
})

describe('Anime List API', () => {
    let token
    let userId

    beforeEach(async () => {
        await deleteAllTestingTableData()
        await createTestingUser()

        const loginResponse = await request(web)
            .post('/api/v1/login')
            .send({
                username: 'testing',
                password: 'testing123'
            })

        token = loginResponse.body.data.token
        userId = loginResponse.body.data.user.id
    })

    afterEach(async () => {
        await deleteAllTestingTableData()
    })

    describe('POST /api/v1/watchList', () => {
        it('should add anime to watchlist successfully', async () => {
            const response = await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'WATCHING'
                })

            expect(response.status).toBe(201)
            expect(response.body.success).toBe(true)
            expect(response.body.data).toHaveProperty('id')
            expect(response.body.data.animeId).toBe(5114)
            expect(response.body.data.status).toBe('WATCHING')
        })

        it('should reject duplicate anime in watchlist', async () => {
            // Add first time
            await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'WATCHING'
                })

            // Try to add again
            const response = await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'COMPLETED'
                })

            expect(response.status).toBe(400)
            expect(response.body.success).toBe(false)
            expect(response.body.errors).toContain('already')
        })

        it('should reject without authentication', async () => {
            const response = await request(web)
                .post('/api/v1/watchList')
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'WATCHING'
                })

            expect(response.status).toBe(401)
            expect(response.body.errors).toBe('Unauthorized')
        })

        it('should reject invalid status', async () => {
            const response = await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'INVALID_STATUS'
                })

            expect(response.body.success).toBe(false)
        })

        it('should set startedAt when status is WATCHING', async () => {
            const response = await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'WATCHING'
                })

            expect(response.status).toBe(201)
            expect(response.body.data.startedAt).toBeTruthy()
        })

        it('should not set startedAt when status is PLAN_TO_WATCH', async () => {
            const response = await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'PLAN_TO_WATCH'
                })

            expect(response.status).toBe(201)
            expect(response.body.data.startedAt).toBeNull()
        })
    })

    describe('GET /api/v1/watchList', () => {
        beforeEach(async () => {
            // Add multiple anime for testing
            await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'WATCHING'
                })

            await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 1535,
                    image_url: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
                    title: "Death Note",
                    status: 'COMPLETED'
                })

            await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 16498,
                    image_url: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
                    title: "Attack on Titan",
                    status: 'PLAN_TO_WATCH'
                })
        })

        it('should get all anime in watchlist', async () => {
            const response = await request(web)
                .get('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.data).toHaveLength(3)
        })

        it('should filter by status WATCHING', async () => {
            const response = await request(web)
                .get('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .query({ status: 'WATCHING' })

            expect(response.status).toBe(200)
            expect(response.body.data).toHaveLength(1)
            expect(response.body.data[0].status).toBe('WATCHING')
            expect(response.body.data[0].title).toBe('Fullmetal Alchemist: Brotherhood')
        })

        it('should filter by status COMPLETED', async () => {
            const response = await request(web)
                .get('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .query({ status: 'COMPLETED' })

            expect(response.status).toBe(200)
            expect(response.body.data).toHaveLength(1)
            expect(response.body.data[0].title).toBe('Death Note')
        })

        it('should return 404 when no anime matches filter', async () => {
            const response = await request(web)
                .get('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .query({ status: 'DROPPED' })

            expect(response.body.success).toBe(false)
        })

        it('should filter by multiple parameters', async () => {
            const response = await request(web)
                .get('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .query({
                    status: 'WATCHING',
                    isFavorite: false
                })
                
            expect(response.body.success).toBe(false)
        })

        it('should reject without authentication', async () => {
            const response = await request(web)
                .get('/api/v1/watchList')

            expect(response.status).toBe(401)
        })

        it('should return empty array when user has no anime', async () => {
            await prisma.animeList.deleteMany({ where: { userId } })

            const response = await request(web)
                .get('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(404)
        })
    })

    describe('PATCH /api/v1/watchList', () => {
        beforeEach(async () => {
            await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'WATCHING'
                })
        })

        it('should update anime status successfully', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    status: 'COMPLETED'
                })
                console.log(response.body)
            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.data.status).toBe('COMPLETED')
        })

        it('should update rating successfully', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    rating: 9
                })

            expect(response.status).toBe(200)
            expect(response.body.data.rating).toBe(9)
        })

        it('should update score successfully', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    score: 10
                })

            expect(response.status).toBe(200)
            expect(response.body.data.score).toBe(10)
        })

        it('should update multiple fields at once', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    status: 'COMPLETED',
                    rating: 10,
                    score: 10,
                    episodesWatched: 64,
                    notes: 'Amazing anime!',
                    isFavorite: true
                })

            expect(response.status).toBe(200)
            expect(response.body.data.status).toBe('COMPLETED')
            expect(response.body.data.rating).toBe(10)
            expect(response.body.data.score).toBe(10)
            expect(response.body.data.episodesWatched).toBe(64)
            expect(response.body.data.notes).toBe('Amazing anime!')
            expect(response.body.data.isFavorite).toBe(true)
        })

        it('should set completedAt when status changed to COMPLETED', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    status: 'COMPLETED'
                })

            expect(response.status).toBe(200)
            expect(response.body.data.completedAt).toBeTruthy()
        })

        it('should reject rating below 1', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    rating: 0
                })

            expect(response.status).toBe(400)
            expect(response.body.errors).toContain('Rating must be between 1-10')
        })

        it('should reject rating above 10', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    rating: 11
                })

            expect(response.status).toBe(400)
            expect(response.body.errors).toContain('Rating must be between 1-10')
        })

        it('should reject score below 1', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    score: 0
                })

            expect(response.status).toBe(400)
        })

        it('should reject score above 10', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    score: 11
                })

            expect(response.status).toBe(400)
        })

        it('should return 404 when anime not in list', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 99999,
                    status: 'COMPLETED'
                })

            expect(response.status).toBe(404)
            expect(response.body.errors).toBe('Anime not found in your list')
        })

        it('should reject without authentication', async () => {
            const response = await request(web)
                .patch('/api/v1/watchList')
                .send({
                    animeId: 5114,
                    status: 'COMPLETED'
                })

            expect(response.status).toBe(401)
        })
    })

    describe('DELETE /api/v1/watchList', () => {
        beforeEach(async () => {
            await request(web)
                .post('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114,
                    image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    title: "Fullmetal Alchemist: Brotherhood",
                    status: 'WATCHING'
                })
        })

        it('should delete anime from watchlist successfully', async () => {
            const response = await request(web)
                .delete('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114
                })

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.message).toContain('removed')
        })

        it('should verify anime is deleted', async () => {
            await request(web)
                .delete('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 5114
                })

            const getResponse = await request(web)
                .get('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)

            expect(getResponse.body.success).toBe(false)
        })

        it('should return 404 when anime not in list', async () => {
            const response = await request(web)
                .delete('/api/v1/watchList')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    animeId: 99999
                })

            expect(response.status).toBe(404)
        })

        it('should reject without authentication', async () => {
            const response = await request(web)
                .delete('/api/v1/watchList')
                .send({
                    animeId: 5114
                })

            expect(response.status).toBe(401)
        })

        it('should not delete other user anime', async () => {
            // Create another user
            await request(web)
                .post('/api/v1/registration')
                .send({
                    username: 'otheruser',
                    password: 'password123',
                    name: 'Other User'
                })

            const otherLoginResponse = await request(web)
                .post('/api/v1/login')
                .send({
                    username: 'otheruser',
                    password: 'password123'
                })

            const otherToken = otherLoginResponse.body.data.token

            // Try to delete first user's anime with other user's token
            const response = await request(web)
                .delete('/api/v1/watchList')
                .set('Authorization', `Bearer ${otherToken}`)
                .send({
                    animeId: 5114
                })

            expect(response.status).toBe(404)
        })
    })
})