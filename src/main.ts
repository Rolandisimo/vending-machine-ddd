import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that don't have decorators
      forbidNonWhitelisted: true, // Errors if extra properties are sent
      transform: true, // Automatically converts types
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
