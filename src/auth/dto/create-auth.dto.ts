import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: `用户名长度必须在$constraint1到$constraint2之间,当前传递的值是$value`
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: `密码长度必须在$constraint1到$constraint2之间`
  })
  password: string;
}
