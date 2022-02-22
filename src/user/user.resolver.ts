import { forwardRef, Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';
import { CourseService } from 'src/course/course.service';
import { Teacher } from 'src/teacher/teacher.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { Topic } from 'src/topic/topic.entity';
import { AddUserDto } from './dto/add-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => CourseService)) private courseService: CourseService,
    @Inject(forwardRef(() => CourseService)) private teacherService: TeacherService,
  ) {}

  @Query(() => [User], { name: 'getAllUsers' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query(() => User, { name: 'getUserById' })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @ResolveField(() => Course)
  course(@Parent() user: User) {
    return this.courseService.getCourseById(user.courseId);
  }

  @ResolveField(() => [Teacher])
  teachers(@Parent() user: User) {
    return this.courseService.getTeachersByCourseId(user.courseId);
  }

  @ResolveField(() => [Topic])
  topics(@Parent() user: User) {
    return this.courseService.getTopicsByCourseId(user.courseId);
  }

  @Mutation(() => User, { name: 'signUp' })
  signUp(@Args('addUserDto') addUserDto: AddUserDto) {
    return this.userService.signUp(addUserDto);
  }

  @Mutation(() => User, { name: 'signIn' })
  signIn(@Args('loginUserDto') loginUserDto: LoginUserDto) {
    return this.userService.signIn(loginUserDto);
  }
}
