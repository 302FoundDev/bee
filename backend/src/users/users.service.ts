/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service'
import { User } from '@prisma/client'
import { CreateUserDto } from 'src/dto/users.dto'
import { url } from 'inspector'

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  async existingUser(email): Promise<boolean> {

    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      })

      return !!user
    }

    catch (error) {
      throw new Error(`Error checking user existence: ${error}`)
    }

  }

  async register(createUserDto: CreateUserDto) {

    try {

      const { full_name, email, password } = createUserDto

      const existingUser = await this.existingUser(email)

      if (existingUser) throw 'User already exists'

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await this.prisma.user.create({
        data: {
          full_name,
          email,
          password: hashedPassword
        }
      })

      return user
    }

    catch (error) {
      throw (`Error creating user: ${error}`)
    }

  }

  async getUserData(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: { urls: true }
      })

      if (!user) {
        throw new Error('User not found')
      }

      const { password, ...userData } = user
      const { urls } = userData

      return { ...userData, urls }

    } catch (error) {
      console.error(`Error getting user: ${error.message}`)
      throw new Error(`Error getting user: ${error.message}`)
    }
  }

  async updateUser(id: number, data: User) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data
      })

      return user
    } catch (error) {
      console.error(`Error updating user: ${error.message}`)
      throw new Error(`Error updating user: ${error.message}`)
    }
  }

  async deleteUser(userId: number) {
    try {
      const relations = await this.prisma.url.deleteMany({
        where: { userId }
      })

      const user = await this.prisma.user.delete({
        where: { id: userId }
      })

      return { status: 'success', message: 'User deleted successfully', user, relations }
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`)
      throw new Error(`Error deleting user: ${error.message}`)
    }
  }

}
