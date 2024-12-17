/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { UrlsController } from './urls.controller'
import { UrlsService } from './urls.service'
import { PrismaService } from 'src/prisma.service'
import { JwtAuthGuard } from 'src/auth/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UrlsController],
  providers: [UrlsService, PrismaService, JwtAuthGuard, JwtService],
  exports: [UrlsService, JwtAuthGuard, JwtService]
})
export class UrlsModule {}
