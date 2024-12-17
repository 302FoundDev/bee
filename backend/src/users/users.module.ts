/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaService } from 'src/prisma.service'
import { JwtAuthGuard } from 'src/auth/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtAuthGuard, JwtService],
  exports: [UsersService, JwtAuthGuard, JwtService]
})
export class UsersModule {}
