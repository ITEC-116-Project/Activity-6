import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../typeorm/entities/users';
import { Admin } from '../../typeorm/entities/admin';

@Injectable()
export class UserCrudService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  findAll() {
    return this.userRepository.find(); // fetch all users from DB
  }

  async create(createUserDto: any) {
    const role = createUserDto.role || 'user';

    if (role === 'admin') {
      // Save to admin_act6 table
      const admin = this.adminRepository.create({
        ...createUserDto,
        role: 'admin',
      });
      return await this.adminRepository.save(admin);
    } else {
      // Save to users table
      const user = this.userRepository.create({
        ...createUserDto,
        role: 'user',
      });
      return await this.userRepository.save(user);
    }
  }
}
