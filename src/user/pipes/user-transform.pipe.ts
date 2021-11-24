import { PipeTransform } from '@nestjs/common';

export class UserTransformPipe implements PipeTransform {
  transform(value: any) {
    const data = { ...value };
    if (data.email && data.email.length) {
      data.email = data.email.toLowerCase();
    }
    if (data.birthday && data.birthday.length) {
      data.birthday = new Date(data.birthday);
    }
    return data;
  }
}
