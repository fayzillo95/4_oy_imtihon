import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import { initReleations } from './modules/file.menegment/movie/entities/releation.entities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // await initReleations(),
  app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT ?? 12312);
  
  console.log(`http://${process.env.APP_HOST}:${process.env.APP_PORT}/api`)
}
bootstrap();

