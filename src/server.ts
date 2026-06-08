import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './infrastructure/database/data-source';

async function bootstrap() {
  await AppDataSource.initialize();
  console.log('Data Source has been initialized!');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
bootstrap();
