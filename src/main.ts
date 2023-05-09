import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

import { Logger, ValidationPipe } from '@nestjs/common';
import { PORT } from '@shared/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(PORT || 3000, () =>
    Logger.log(`App listening on port: ${PORT} 🚀`, 'SERVER'),
  );
}
bootstrap();
