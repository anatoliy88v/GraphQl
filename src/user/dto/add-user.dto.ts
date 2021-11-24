import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsPhoneNumber,
  IsInt,
  IsArray,
  IsNumber,
} from 'class-validator';

export class AddUserDto {
  @IsString({ message: 'Should be of type string' })
  @IsEmail({}, { message: 'Email is incorrect' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Should be of type string' })
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' }
  )
  @IsNotEmpty()
  password: string;

  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  state: string;

  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  stripeId: string;

  @IsBoolean({ message: 'Should be of type string' })
  @IsNotEmpty()
  gender: boolean;

  @IsDate({ message: 'Should be of type Date' })
  @IsNotEmpty()
  birthday: string;

  @IsInt({ message: 'Should be of type number' })
  @IsNotEmpty()
  age: number;

  @IsArray()
  @IsNotEmpty()
  favoriteFood: string[];

  @IsNumber()
  @IsNotEmpty()
  discount: number;
}
