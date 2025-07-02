import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorHandler } from './common/middleware/error.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // or specify allowed origins like ['http://localhost:5500']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
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

  app.useGlobalFilters(new ErrorHandler());

  await app.listen(process.env.PORT ?? 15975);

  // console.log(
  //   `Server running 😁  http://${process.env.APP_HOST}:${process.env.APP_PORT}/api`,
  // );
  console.log(`✅✅✅✅✅ Server running 😁  ${process.env.BASE_URL}/api`)
  console.log(
    `💹✅ Swagger  : ${process.env.BASE_URL}/api/swagger`,
  );
}
bootstrap();
