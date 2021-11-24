import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AddUserDto } from './dto/add-user.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { UserForResponse } from './interfaces/user-interfaces';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserLoginForResponse } from './interfaces/user-login-interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async addUser(addUserDto: AddUserDto): Promise<UserLoginForResponse> {
    try {
      const user = await this.userRepository.signUp(addUserDto);
      const accessToken = this.generateAccessToken(user);
      return { user, accessToken };
    } catch (error) {
      console.log(error);
      throw new ConflictException(`Email ${addUserDto.email} already exists`);
    }
  }

  async addUserV2(addUserDto: AddUserDto): Promise<UserForResponse> {
    try {
      const user = await this.userRepository.signUp(addUserDto);
      return user;
    } catch (error) {
      console.log(error);
      throw new ConflictException(`Email ${addUserDto.email} already exists`);
    }
  }

  async signIn(loginUserDto: LoginUserDto): Promise<UserLoginForResponse> {
    const user = await this.userRepository.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    const validatedUser = await this.validateUserPassword(user, loginUserDto);
    if (!validatedUser) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const accessToken = this.generateAccessToken(user);
    return {
      user,
      accessToken,
    };
  }

  async signInV2(loginUserDto: LoginUserDto): Promise<UserLoginForResponse> {
    const user = await this.userRepository.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    const validatedUser = await this.validateUserPassword(user, loginUserDto);
    if (!validatedUser) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const accessToken = this.generateAccessToken(user);
    const userForResponse = this.serializeUserForResponse(user);
    return {
      user: userForResponse,
      accessToken,
    };
  }

  private serializeUserForResponse(user: UserForResponse): UserForResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      state: user.state,
      phone: user.phone,
      gender: user.gender,
      birthday: user.birthday,
      age: user.age,
      favoriteFood: user.favoriteFood,
      discount: user.discount,
    };
  }

  private async validateUserPassword(user: User, loginUserDto: LoginUserDto): Promise<User> {
    if (await user?.validatePassword(loginUserDto.password)) {
      return user;
    } else {
      return null;
    }
  }

  private generateAccessToken(user): string {
    const payload: JwtPayload = { email: user.email };
    return this.jwtService.sign(payload);
  }
}
