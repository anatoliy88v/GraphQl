import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { Teacher } from './teacher.entity';
import { TeacherRepository } from './teacher.repository';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRepository)
    private teacherRepository: TeacherRepository,
  ) {}

  async createTeacher(createTeacherInput: CreateTeacherInput): Promise<Teacher> {
    const teacher = this.teacherRepository.create(createTeacherInput);
    return await this.teacherRepository.save(teacher);
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  async getTeacherById(id: number): Promise<Teacher> {
    return await this.teacherRepository.findOne(id);
  }

  async update(id: number, updateTeacherInput: UpdateTeacherInput): Promise<Teacher> {
    const teacher: Teacher = this.teacherRepository.create(updateTeacherInput);
    teacher.id = id;
    return await this.teacherRepository.save(teacher);
  }

  async remove(id: number): Promise<Teacher> {
    const teacher = this.getTeacherById(id);
    if (teacher) {
      const response = await this.teacherRepository.delete(id);
      if (response.affected === 1) {
        return teacher;
      }
    } else {
      throw new NotFoundException('Teacher not found');
    }
  }
}
