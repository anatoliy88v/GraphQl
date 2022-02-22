import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTeacherInput {
  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsEmail({}, { message: 'Email is incorrect' })
  @IsNotEmpty()
  email: string;

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
