import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './infrastructure/database/data-source';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
async function bootstrap() {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.use(cookieParser());
    const config = new DocumentBuilder()
        .setTitle('Paw Cloud API')
        .setDescription('API documentation for Paw Cloud Solution')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}
bootstrap();
