import { UserCrudService } from './user-crud.service';
export declare class UserCrudController {
    private readonly userCrudService;
    constructor(userCrudService: UserCrudService);
    findAll(): Promise<import("../../typeorm/entities/users").User[]>;
    create(createUserDto: any): Promise<import("../../typeorm/entities/users").User[]>;
}
