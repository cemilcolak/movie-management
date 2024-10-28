import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        snapshot: true,
    });
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('Movie Management API')
        .setDescription('The movie management API description')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',  // Optional but clarifies format
            },
            'accessToken',  // Give this auth a unique name
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document); // 'api/docs' route for Swagger documentation

    await app.listen(process.env.PORT ?? 3000);
    console.log('Application is running on: http://localhost:3000/api');
    console.log('Application documentation is running on: http://localhost:3000/api/docs');
}

bootstrap();
