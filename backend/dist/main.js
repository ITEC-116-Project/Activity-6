"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Activity 6 API')
        .setDescription('API documentation for Activity 6 Movies and User Management')
        .setVersion('1.0')
        .addTag('movies', 'Movie management endpoints')
        .addTag('users', 'User management endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
    console.log(`Backend running on http://localhost:${process.env.PORT || 3000}`);
    console.log(`Swagger API documentation available at http://localhost:${process.env.PORT || 3000}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map