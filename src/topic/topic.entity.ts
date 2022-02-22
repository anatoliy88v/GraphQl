import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Topic {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  image: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  courseId: number;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.topics, { onDelete: 'CASCADE', eager: false })
  course: Course;
}
