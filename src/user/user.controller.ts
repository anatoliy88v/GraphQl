import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInterceptor } from './interceptors/user.interceptor';
import { UserForResponse } from './interfaces/user-interfaces';
import { UserLoginForResponse } from './interfaces/user-login-interfaces';
import { UserTransformPipe } from './pipes/user-transform.pipe';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Version('1')
  @Post('/signup')
  @UsePipes(UserTransformPipe, ValidationPipe)
  addUser(@Body() addUserDto: AddUserDto): Promise<UserLoginForResponse> {
    return this.userService.addUser(addUserDto);
  }

  @Version('2')
  @Post('/signup')
  @UseInterceptors(UserInterceptor)
  @UsePipes(UserTransformPipe, ValidationPipe)
  addUserV2(@Body() addUserDto: AddUserDto): Promise<UserForResponse> {
    return this.userService.addUserV2(addUserDto);
  }

  @Version('1')
  @Post('/signin')
  signIn(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<UserLoginForResponse> {
    return this.userService.signIn(loginUserDto);
  }

  @Version('2')
  @Post('/signin')
  @UseInterceptors(UserInterceptor)
  signInV2(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<UserLoginForResponse> {
    return this.userService.signInV2(loginUserDto);
  }
}
