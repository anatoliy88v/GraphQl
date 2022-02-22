import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTopicInput {
  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString({ message: 'Should be of type string' })
  @IsNotEmpty()
  image: string;

  @Field()
  @IsNotEmpty()
  courseId: number;
}
