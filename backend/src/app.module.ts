import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MoviesModule } from './modules/movies/movies.module';
import { UserCrudModule } from './modules/user-crud/user-crud.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mysql = require('mysql2/promise');

interface EnsureDatabaseOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

async function ensureDatabaseExists(options: EnsureDatabaseOptions) {
  const connection = await mysql.createConnection({
    host: options.host,
    port: options.port,
    user: options.username,
    password: options.password,
  });

  try {
    await connection.query(
      'CREATE DATABASE IF NOT EXISTS ?? CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci',
      [options.database],
    );
  } finally {
    await connection.end();
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        const host = config.get<string>('DB_HOST') || 'localhost';
        const port = parseInt(config.get<string>('DB_PORT') || '3306', 10);
        const username = config.get<string>('DB_USER') || 'root';
        const password = config.get<string>('DB_PASS') || '';
        const database = config.get<string>('DB_NAME') || 'itec_116_db';

        await ensureDatabaseExists({ host, port, username, password, database });

        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          entities: [__dirname + '/typeorm/entities/**/*.{ts,js}', __dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: ['query', 'error'],
        };
      },
    }),
    MoviesModule,
    UserCrudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}