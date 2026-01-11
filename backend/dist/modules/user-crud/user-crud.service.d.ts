import { Repository } from 'typeorm';
import { User } from '../../typeorm/entities/users';
import { Admin } from '../../typeorm/entities/admin';
export declare class UserCrudService {
    private userRepository;
    private adminRepository;
    constructor(userRepository: Repository<User>, adminRepository: Repository<Admin>);
    findAll(): Promise<User[]>;
    create(createUserDto: any): Promise<User[]>;
}
