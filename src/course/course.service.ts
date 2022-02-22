import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/teacher.entity';
import { Topic } from 'src/topic/topic.entity';
import { User } from 'src/user/user.entity';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}

  async createCourse(createCourseInput: CreateCourseInput): Promise<Course> {
    const course = this.courseRepository.create(createCourseInput);
    return await this.courseRepository.save(course);
  }

  async getAllCourses(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async getCourseById(id: number): Promise<Course> {
    return await this.courseRepository.findOne(id);
  }

  async getTeachersByCourseId(id: number): Promise<Teacher[]> {
    const course = await this.courseRepository.findOne(id);
    return course.teachers;
  }

  async getUsersByCourseId(id: number): Promise<User[]> {
    const course = await this.courseRepository.findOne(id);
    return course.users;
  }

  async getTopicsByCourseId(id: number): Promise<Topic[]> {
    const course = await this.courseRepository.findOne(id);
    return course.topics;
  }

  async update(id: number, updateCourseInput: UpdateCourseInput): Promise<Course> {
    const course: Course = this.courseRepository.create(updateCourseInput);
    course.id = id;
    return await this.courseRepository.save(course);
  }

  async remove(id: number): Promise<Course> {
    const course = this.getCourseById(id);
    if (course) {
      const response = await this.courseRepository.delete(id);
      if (response.affected === 1) {
        return course;
      }
    } else {
      throw new NotFoundException('Course not found');
    }
  }
}
