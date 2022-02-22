import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AddUserDto } from './dto/add-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(addUserDto: AddUserDto): Promise<User> {
    const {
      email,
      password,
      name,
      avatar,
      courseId,
    } = addUserDto;
    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.name = name;
    user.avatar = avatar;
    user.courseId = courseId;

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
