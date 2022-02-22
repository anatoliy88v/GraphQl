import { forwardRef, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { CourseRepository } from './course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from 'src/teacher/teacher.module';
import { UserModule } from 'src/user/user.module';
import { TopicModule } from 'src/topic/topic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseRepository]),
    forwardRef(() => TeacherModule),
    forwardRef(() => TopicModule),
    forwardRef(() => UserModule),
  ],
  providers: [CourseResolver, CourseService],
  exports: [CourseService],
})
export class CourseModule {}
