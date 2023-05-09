import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }
  // console.log('users.controller.ts');

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // return this.userService.create(createUserDto)
    return 'createUser';
  }

  @Get()
  async getUser() {
    // return this.userService.findAll()
    return 'findAll!';
  };

}
