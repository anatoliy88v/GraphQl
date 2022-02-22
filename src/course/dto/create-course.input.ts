import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  description: string;
}
