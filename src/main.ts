import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add a global prefix to all routes
  app.setGlobalPrefix('api/v1');

  // Add a global validation pipe, which will validate all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(envs.port);
  console.log(`Server is running on: http://localhost:${envs.port}`);
}
bootstrap();
