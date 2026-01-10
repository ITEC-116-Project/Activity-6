"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const movies_module_1 = require("./modules/movies/movies.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mysql = require('mysql2/promise');
async function ensureDatabaseExists(options) {
    const connection = await mysql.createConnection({
        host: options.host,
        port: options.port,
        user: options.username,
        password: options.password,
    });
    try {
        await connection.query('CREATE DATABASE IF NOT EXISTS ?? CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci', [options.database]);
    }
    finally {
        await connection.end();
    }
}
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                async useFactory(config) {
                    const host = config.get('DB_HOST') || 'localhost';
                    const port = parseInt(config.get('DB_PORT') || '3306', 10);
                    const username = config.get('DB_USER') || 'root';
                    const password = config.get('DB_PASS') || '';
                    const database = config.get('DB_NAME') || 'itec_116_db';
                    await ensureDatabaseExists({ host, port, username, password, database });
                    return {
                        type: 'mysql',
                        host,
                        port,
                        username,
                        password,
                        database,
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: true,
                        logging: ['query', 'error'],
                    };
                },
            }),
            movies_module_1.MoviesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map