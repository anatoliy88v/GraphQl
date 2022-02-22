import { forwardRef, Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherRepository } from './teacher.repository';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherRepository]),
    forwardRef(() => CourseModule),
  ],
  providers: [TeacherResolver, TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
