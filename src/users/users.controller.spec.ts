import { PrismaClient } from "@prisma/client"
import { Test, TestingModule } from "@nestjs/testing"
import { mockDeep, DeepMockProxy } from "vitest-mock-extended"

import { UsersService } from "@/users/users.service"
import { UsersController } from "@/users/users.controller"

import { PrismaService } from "@/prisma/prisma.service"

describe("UsersController", () => {
    let prisma: DeepMockProxy<PrismaClient>
    let controller: UsersController

    const date = new Date(Date.now())

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [PrismaService, UsersService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile()

        prisma = module.get(PrismaService)
        controller = module.get<UsersController>(UsersController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("should create user", async () => {
        prisma.user.create.mockResolvedValueOnce({
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            createdAt: date,
            updatedAt: date,
        })

        const result = await controller.create({
            name: "John Doe",
            email: "john.doe@example.com",
        })

        expect(result.success).toBe(true)
    })

    it("should find all users", async () => {
        prisma.user.findMany.mockResolvedValueOnce([])

        const result = await controller.findAll()
        expect(result.success).toBe(true)
    })

    it("should find one user", async () => {
        prisma.user.findFirst.mockResolvedValueOnce({
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            createdAt: date,
            updatedAt: date,
        })

        const result = await controller.findOne("1")
        expect(result.success).toBe(true)
    })

    it("should update user", async () => {
        prisma.user.update.mockResolvedValueOnce({
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            createdAt: date,
            updatedAt: date,
        })

        const result = await controller.update("1", {})
        expect(result.success).toBe(true)
    })

    it("should delete user", async () => {
        prisma.user.delete.mockResolvedValueOnce({
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            createdAt: date,
            updatedAt: date,
        })

        const result = await controller.remove("1")
        expect(result.success).toBe(true)
    })
})
