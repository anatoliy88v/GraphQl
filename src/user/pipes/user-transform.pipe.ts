import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class UserTransformPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const data = { ...value };

    // Transform email and date
    if (data.email && data.email.length) {
      data.email = data.email.toLowerCase();
    }
    if (data.birthday && data.birthday.length) {
      data.birthday = new Date(data.birthday);
    }

    // validate other params using class validator approach
    if (!metatype || !this.validateMetaType(metatype)) {
      return data;
    }
    const object = plainToClass(metatype, data);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid Input Data');
    }
    return data;
  }

  private validateMetaType(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Date];
    return !types.includes(metatype);
  }
}
