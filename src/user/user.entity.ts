import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';

@ObjectType()
@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  salt: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

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
  @ManyToOne(() => Course, (course) => course.users, { onDelete: 'CASCADE', eager: false })
  course: Course;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
