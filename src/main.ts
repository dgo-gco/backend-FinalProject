import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  };
  app.setGlobalPrefix('api');
  app.enableCors(corsOptions);
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
