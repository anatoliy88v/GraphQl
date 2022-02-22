import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
