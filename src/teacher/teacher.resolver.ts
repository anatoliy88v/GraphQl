import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { Course } from 'src/course/course.entity';
import { CourseService } from 'src/course/course.service';
import { forwardRef, Inject } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(
    private readonly teacherService: TeacherService,
    @Inject(forwardRef(() => CourseService)) private courseService: CourseService,
  ) {}

  @Mutation(() => Teacher)
  createTeacher(@Args('createTeacherInput') createTeacherInput: CreateTeacherInput) {
    return this.teacherService.createTeacher(createTeacherInput);
  }

  @Query(() => [Teacher], { name: 'getAllTeachers' })
  getAllTeachers() {
    return this.teacherService.getAllTeachers();
  }

  @Query(() => Teacher, { name: 'getTeacherById' })
  getTeacherById(@Args('id', { type: () => Int }) id: number) {
    return this.teacherService.getTeacherById(id);
  }

  @ResolveField(() => Course)
  course(@Parent() teacher: Teacher) {
    return this.courseService.getCourseById(teacher.courseId);
  }

  @ResolveField(() => [User])
  users(@Parent() user: User) {
    return this.courseService.getUsersByCourseId(user.courseId);
  }

  @Mutation(() => Teacher)
  updateTeacher(@Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput) {
    return this.teacherService.update(updateTeacherInput.id, updateTeacherInput);
  }

  @Mutation(() => Teacher)
  removeTeacher(@Args('id', { type: () => Int }) id: number) {
    return this.teacherService.remove(id);
  }
}
