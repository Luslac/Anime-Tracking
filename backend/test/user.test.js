import {prisma} from "../src/application/database.js"
import request from "supertest"
import { describe, it, expect, beforeEach, afterAll, afterEach } from 'vitest';
import { web } from "../src/application/app.js";
import { deleteAllTestingTableData } from "./test-utils.js";

afterAll(async () => {
    await prisma.$disconnect()
})


describe('POST /api/v1/registration', () => {

    beforeEach(async () => {
        await deleteAllTestingTableData()
        
    })
    afterEach(async () => {
        await deleteAllTestingTableData()
    })

    it("Should Register New User", async () => {
        const response = await request(web)
        .post('/api/v1/registration')
        .send({
            username: 'testing',
            password: 'password123',
            name: 'Test User'
        })
        
        console.log(response.body)
        expect(response.status).toBe(201)
        expect(response.body.success).toBe(true)
        expect(response.body.data.user.username).toBe("testing")
        expect(response.body.data.user.name).toBe("Test User")
    })

    it("Reject double username", async () => {
        await request(web)
        .post('/api/v1/registration')
        .send({
            username: 'testing',
            password: 'password123',
            name: 'Test User'
        })

        const response = await request(web)
        .post('/api/v1/registration')
        .send({
            username: 'testing',
            password: 'password123',
            name: 'Test User'
        })

        console.log(response.body)
        expect(response.status).toBe(409)
    })

    it('should reject short password', async () => {
        const response = await request(web)
        .post('/api/v1/registration')
        .send({
            username: 'testing',
            password: '123',
            name: 'Test'
        })

        expect(response.status).toBe(400)
    })
})

describe('POST /api/v1/login', () => {
    beforeEach(async () => {
        await deleteAllTestingTableData()
        
    })
    afterEach(async () => {
        await deleteAllTestingTableData()
    })

    

    it("Should Login Succesfully", async () => {
        await request(web)
        .post('/api/v1/registration')
        .send({
            username: "testing",
            password: "test1234",
            name: "testerr"
        })

        const response = await request(web)
        .post('/api/v1/login')
        .send({
            username: "testing",
            password: "test1234"
        })
        expect(response.status).toBe(200)
    })
})