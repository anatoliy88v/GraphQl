import { forwardRef, Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicResolver } from './topic.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicRepository } from './topic.repository';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicRepository]),
    forwardRef(() => CourseModule),
  ],
  providers: [TopicResolver, TopicService],
  exports: [TopicService],
})
export class TopicModule {}
