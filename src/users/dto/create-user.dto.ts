import {Profile} from "@prisma/client";
import {IsOptional} from "class-validator";
import {CreateAuthDto} from "../../auth/dto/create-auth.dto";

export class CreateUserDto extends CreateAuthDto {
  @IsOptional()
  profile?: Profile;

  @IsOptional()
  roles?: number[];
}
