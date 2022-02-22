import { CreateTeacherInput } from './create-teacher.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeacherInput extends PartialType(CreateTeacherInput) {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field()
  courseId: number;
}
