import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Teacher {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  avatar: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  courseId: number;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.teachers, { onDelete: 'CASCADE', eager: false })
  course: Course;
}
