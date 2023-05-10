import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [UsersModule, LoggerModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService], npm
})
export class AuthModule { }
