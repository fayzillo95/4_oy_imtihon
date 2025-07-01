import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('UzMovie.com')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('users') // Example tag
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document); // Swagger UI available at /api

  await app.listen(process.env.APP_PORT ?? 12312);

  console.log(
    `Server running 😁  http://${process.env.APP_HOST}:${process.env.APP_PORT}/api`,
  );
  console.log(
    `💹✅ Swagger  : http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/swagger`,
  );
}
bootstrap();
