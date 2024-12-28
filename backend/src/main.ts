/* eslint-disable prettier/prettier */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN2,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('bee')
    .setDescription('The Bee API description')
    .setVersion('1.0')
    .addTag('bee')
    .addCookieAuth('access_token', { type: 'http' })
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT || 5000;
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();
