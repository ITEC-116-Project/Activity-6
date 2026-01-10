import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Activity 6 API')
    .setDescription('API documentation for Activity 6 Movies and User Management')
    .setVersion('1.0')
    .addTag('movies', 'Movie management endpoints')
    .addTag('users', 'User management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Backend running on http://localhost:${process.env.PORT || 3000}`);
  console.log(`Swagger API documentation available at http://localhost:${process.env.PORT || 3000}/api`);
}
bootstrap();
