/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

  async validateUser(email: string, password: string) {
    if (!email) {
      console.error('Email is required')
      throw new BadRequestException('Email is required')
    }

    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) return null

    const passwordMatch = await bcrypt.compare(password, user.password)
    return passwordMatch ? user : null
  }

  async login(email: string, password: string) {

    try {

      const validateUser = await this.validateUser(email, password)

      if (!validateUser) {
        console.error('Invalid credentials')
        throw new UnauthorizedException('Invalid credentials')
      }

      const user = await this.prisma.user.findUnique({
        where: { email }
      })

      const payload = { username: user.email, sub: user.id }

      const access_token = await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_KEY,
        expiresIn: '2h'
      })

      return {
        access_token: access_token
      }
    }

    catch (error) {
      console.error(error)
      throw new Error(`Error logging in: ${error}`)
    }

  }
}
