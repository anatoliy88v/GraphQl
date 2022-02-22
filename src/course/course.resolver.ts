import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput) {
    return this.courseService.createCourse(createCourseInput);
  }

  @Query(() => [Course], { name: 'getAllCourses' })
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Query(() => Course, { name: 'getCourseById' })
  getCourseById(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.getCourseById(id);
  }

  @Mutation(() => Course)
  updateCourse(@Args('updateCourseInput') updateCourseInput: UpdateCourseInput) {
    return this.courseService.update(updateCourseInput.id, updateCourseInput);
  }

  @Mutation(() => Course)
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.remove(id);
  }
}
