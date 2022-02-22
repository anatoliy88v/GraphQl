import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as typeOrmConfig from '../ormconfig.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CourseModule } from './course/course.module';
import { TeacherModule } from './teacher/teacher.module';
import { TopicModule } from './topic/topic.module';
require('dotenv').config();

console.log(typeOrmConfig);
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
    }),
    UserModule,
    CourseModule,
    TeacherModule,
    TopicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
