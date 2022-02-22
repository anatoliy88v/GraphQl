import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class AddUserDto {
  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsEmail({}, { message: 'Email is incorrect' })
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString({ message: 'Should be of type string' })
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' }
  )
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  avatar: string;

  @Field()
  @IsNotEmpty()
  courseId: number;
}
