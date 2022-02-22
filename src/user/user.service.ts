import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AddUserDto } from './dto/add-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async signUp(addUserDto: AddUserDto): Promise<User> {
    try {
      const user = await this.userRepository.signUp(addUserDto);
      return user;
    } catch (error) {
      console.log(error);
      throw new ConflictException(`Email ${addUserDto.email} already exists`);
    }
  }

  async signIn(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    const validatedUser = await this.validateUserPassword(user, loginUserDto);
    if (!validatedUser) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    return user;
  }

  private async validateUserPassword(user: User, loginUserDto: LoginUserDto): Promise<User> {
    if (await user?.validatePassword(loginUserDto.password)) {
      return user;
    } else {
      return null;
    }
  }
}
