import { ObjectType, Field } from '@nestjs/graphql';
import { Teacher } from 'src/teacher/teacher.entity';
import { Topic } from 'src/topic/topic.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Course {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.course, { eager: true })
  users: User[];

  @Field(() => [Teacher], { nullable: true })
  @OneToMany(() => Teacher, (teacher) => teacher.course, { eager: true })
  teachers: Teacher[];

  @Field(() => [Topic], { nullable: true })
  @OneToMany(() => Topic, (topic) => topic.course, { eager: true })
  topics: Topic[];
}
