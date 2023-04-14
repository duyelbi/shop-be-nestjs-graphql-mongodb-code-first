import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const limit = configService.get<string>('app.limit');
  app.use(express.urlencoded({ extended: true, limit: `${limit}` }));
  app.use(express.json({ limit: `${limit}` }));
  app.enableCors({
    origin: function (origin, callback) {
      callback(null, true);
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
