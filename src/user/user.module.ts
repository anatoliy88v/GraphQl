import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';
import { UserResolver } from './user.resolver';
import { CourseModule } from 'src/course/course.module';
import { TeacherModule } from 'src/teacher/teacher.module';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
    forwardRef(() => CourseModule),
    forwardRef(() => TeacherModule),
  ],
  providers: [UserService, JwtStrategy, UserResolver],
  exports: [JwtStrategy, PassportModule, UserService],
})
export class UserModule {}
