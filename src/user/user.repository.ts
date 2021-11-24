import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
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
      phone,
      state,
      stripeId,
      gender,
      birthday,
      age,
      favoriteFood,
      discount,
    } = addUserDto;
    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.name = name;
    user.phone = phone;
    user.state = state;
    user.stripeId = stripeId;
    user.gender = gender;
    user.birthday = birthday;
    user.age = age;
    user.favoriteFood = favoriteFood;
    user.discount = discount;

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
