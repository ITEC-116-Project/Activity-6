import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserCrudService } from './user-crud.service';

@ApiTags('users')
@Controller('user-crud')
export class UserCrudController {
  constructor(private readonly userCrudService: UserCrudService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    isArray: true,
  })
  findAll() {
    return this.userCrudService.findAll(); // fetch all users
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  create(@Body() createUserDto: any) {
    return this.userCrudService.create(createUserDto);
  }
}

