import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaClient, UsersModule, UrlsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
