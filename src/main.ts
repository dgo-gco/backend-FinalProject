import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Mongoose } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOptions = {
    origin: 'https://fantastic-trifle-538811.netlify.app/',
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  };
  app.setGlobalPrefix('api');
  app.enableCors(corsOptions);
  app.use(cookieParser());

  const mongooseInstance = app.get<Mongoose>(Mongoose);
  const mongooseConnection = mongooseInstance.connection;
  mongooseConnection.once('connected', () => {
    app.listen(process.env.PORT, () => {
      console.log('Application is listening on port', process.env.PORT);
    });
  });
}
bootstrap();
