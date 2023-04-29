import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRespository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRespository) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }
}
