import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserDto {
  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsEmail({}, { message: 'Email is incorrect' })
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  password: string;
}
