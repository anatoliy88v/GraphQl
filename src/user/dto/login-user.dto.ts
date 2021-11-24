import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Should be of type string' })
  @IsEmail({}, { message: 'Email is incorrect' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  password: string;
}
