import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserForResponse } from '../interfaces/user-interfaces';

export interface Response<UserForResponse> {
  user: UserForResponse;
}

@Injectable()
export class UserInterceptor<T>
  implements NestInterceptor<T, Response<UserForResponse>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<UserForResponse>> {
    return next.handle().pipe(
      map((user) => ({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          state: user.state,
          phone: user.phone,
          gender: user.gender,
          birthday: user.birthday,
          age: user.age,
          favoriteFood: user.favoriteFood,
          discount: user.discount,
        },
      })),
    );
  }
}
