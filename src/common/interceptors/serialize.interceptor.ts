import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { plainToInstance } from "class-transformer";

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {

  }


  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          // 设置为true之后，所有经过interceptor的接口都需要设置expose或exclude
          excludeExtraneousValues: true
        });
      })
    );
  }
}