import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCrudService } from './user-crud.service';
import { UserCrudController } from './user-crud.controller';
import { User } from '../../typeorm/entities/users';
import { Admin } from '../../typeorm/entities/admin';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin]), // Make repositories available for injection
  ],
  controllers: [UserCrudController],
  providers: [UserCrudService],
})
export class UserCrudModule {}
