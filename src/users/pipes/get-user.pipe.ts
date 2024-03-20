import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class GetUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('pipe--value');
    console.log(value);
    return value;
  }
}