import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOptions = {
    origin: 'https://reach-ticv.onrender.com',
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  };
  app.setGlobalPrefix('api');
  app.enableCors(corsOptions);
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
