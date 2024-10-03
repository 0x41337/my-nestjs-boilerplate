import { Injectable } from "@nestjs/common"

import { PrismaService } from "@/prisma/prisma.service"
import { CreateUserDto } from "@/users/dto/create-user.dto"
import { UpdateUserDto } from "@/users/dto/update-user.dto"

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        try {
            await this.prisma.user.create({
                data: createUserDto,
            })

            return { success: true, message: "User created successfully" }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async findAll() {
        try {
            const users = await this.prisma.user.findMany()
            return { success: true, users }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async findOne(id: string) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id,
                },
            })
            return { success: true, user }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        try {
            await this.prisma.user.update({
                where: {
                    id,
                },
                data: updateUserDto,
            })

            return { success: true, message: "User updated successfully" }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async remove(id: string) {
        try {
            await this.prisma.user.delete({
                where: {
                    id,
                },
            })

            return { success: true, message: "User deleted successfully" }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
}
